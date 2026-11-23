// mend: one patch tool for every AI edit format, as SPEC.md (version 1) says.
// Reads a unified diff, SEARCH/REPLACE blocks, a V4A patch, or JSON text-editor
// calls, finds the lines an edit names even when their whitespace drifted, and
// changes every file or none. Node 22, standard library only.
// Run as: node main.ts [--format=NAME] [--check] [--strict] [PATCH]

import { mkdirSync, readFileSync, rmSync, statSync, writeFileSync, writeSync } from 'node:fs';
import { dirname } from 'node:path';

const FORMATS = ['auto', 'unified', 'search-replace', 'v4a', 'json'];

/** A patch that cannot be read in its format: report `error: parse <line>`. */
class ParseErr {
  readonly line: number;
  constructor(line: number) {
    this.line = line;
  }
}

/** One edit that failed: report `error: <code> <path>`. */
class EditErr {
  readonly code: string;
  readonly path: string;
  constructor(code: string, path: string) {
    this.code = code;
    this.path = path;
  }
}

const isBlank = (s: string): boolean => s.trim() === '';
const trimEndWs = (s: string): string => s.replace(/[ \t]+$/, '');
const trimWs = (s: string): string => s.replace(/^[ \t]+/, '').replace(/[ \t]+$/, '');
const leadWs = (s: string): string => {
  const m = /^[ \t]*/.exec(s);
  return m === null ? '' : m[0];
};

/** A patch's lines: split at \n, one trailing \r removed each, no empty piece after a final \n. */
function splitPatchLines(text: string): string[] {
  if (text === '') return [];
  const lines = text.split('\n');
  if (text.endsWith('\n')) lines.pop();
  return lines.map((l) => (l.endsWith('\r') ? l.slice(0, -1) : l));
}

/** A path is safe when it is not empty, does not start with /, holds no \, and no segment is empty, . or ... */
function isSafePath(p: string): boolean {
  if (p === '' || p.startsWith('/') || p.includes('\\')) return false;
  return p.split('/').every((s) => s !== '' && s !== '.' && s !== '..');
}

/** A file's lines under its own line break, plus whether it ends with one. */
interface Doc {
  lines: string[];
  br: string;
  finalNl: boolean;
}

function parseDoc(text: string): Doc {
  if (text === '') return { lines: [], br: '\n', finalNl: false };
  const i = text.indexOf('\n');
  const br = i > 0 && text[i - 1] === '\r' ? '\r\n' : '\n';
  const parts = text.split(br);
  const finalNl = text.endsWith(br);
  if (finalNl) parts.pop();
  return { lines: parts, br, finalNl };
}

function renderDoc(doc: Doc): string {
  if (doc.lines.length === 0) return '';
  return doc.lines.join(doc.br) + (doc.finalNl ? doc.br : '');
}

/** The tree as the edits leave it: `cur` holds changed paths (null: deleted). */
class WorkTree {
  private base = new Map<string, string | null>();
  readonly cur = new Map<string, string | null>();
  readonly moves: Array<[string, string]> = [];

  readOriginal(p: string): string | null {
    if (!this.base.has(p)) {
      let v: string | null = null;
      try {
        if (statSync(p).isFile()) v = readFileSync(p, 'utf8');
      } catch {
        v = null;
      }
      this.base.set(p, v);
    }
    return this.base.get(p) as string | null;
  }

  read(p: string): string | null {
    return this.cur.has(p) ? (this.cur.get(p) as string | null) : this.readOriginal(p);
  }
}

type Edit = (tree: WorkTree) => void;

/** One line of a replacement: a context line names its index in the old lines, a new line does not. */
interface NewPart {
  text: string;
  ctx: number | null;
}

function lineEq(line: string, pat: string, tier: number): boolean {
  if (tier === 0) return line === pat;
  if (tier === 1) return trimEndWs(line) === trimEndWs(pat);
  return trimWs(line) === trimWs(pat);
}

/** Every position where `old` matches `lines` at this tier; overlapping allowed. */
function occurrences(lines: string[], old: string[], tier: number): number[] {
  const out: number[] = [];
  const n = old.length;
  if (n === 0) return out;
  for (let i = 0; i + n <= lines.length; i++) {
    let ok = true;
    for (let j = 0; j < n; j++) {
      if (!lineEq(lines[i + j] as string, old[j] as string, tier)) {
        ok = false;
        break;
      }
    }
    if (ok) out.push(i);
  }
  return out;
}

/** The first tier (0, then 1, then 2; 0 only when strict) where `old` occurs at least once. */
function firstTier(
  lines: string[],
  old: string[],
  strict: boolean,
  from: number,
  eofOnly: boolean,
): { tier: number; pos: number[] } | null {
  const tiers = strict ? [0] : [0, 1, 2];
  for (const t of tiers) {
    let pos = occurrences(lines, old, t).filter((p) => p >= from);
    if (eofOnly) pos = pos.filter((p) => p + old.length === lines.length);
    if (pos.length > 0) return { tier: t, pos };
  }
  return null;
}

/** The first line at or after `from` equal to `pat` at the first tier where one is (single line). */
function findAnchor(lines: string[], pat: string, from: number, strict: boolean): number {
  const tiers = strict ? [0] : [0, 1, 2];
  for (const t of tiers) {
    for (let i = from; i < lines.length; i++) {
      if (lineEq(lines[i] as string, pat, t)) return i;
    }
  }
  return -1;
}

/**
 * Replace `old` at position `at` with the new parts. A context part is written as the file's own
 * matched line. At tier 2 every other part is re-indented: its leading P (the old first line's
 * leading spaces/tabs) is replaced by F (the file's first matched line's).
 */
function spliceLines(
  fileLines: string[],
  at: number,
  old: string[],
  parts: NewPart[],
  tier: number,
): string[] {
  const out = fileLines.slice(0, at);
  if (tier === 2 && old.length > 0) {
    const f = leadWs(fileLines[at] as string);
    const p = leadWs(old[0] as string);
    for (const part of parts) {
      if (part.ctx !== null) {
        out.push(fileLines[at + part.ctx] as string);
      } else if (part.text !== '' && part.text.trim() !== '' && part.text.startsWith(p)) {
        out.push(f + part.text.slice(p.length));
      } else {
        out.push(part.text);
      }
    }
  } else {
    for (const part of parts) {
      if (part.ctx !== null) out.push(fileLines[at + part.ctx] as string);
      else out.push(part.text);
    }
  }
  out.push(...fileLines.slice(at + old.length));
  return out;
}

/* ---- JSON edits (section 9) ---- */

/** One JSON edit object, or null when it is not one. A wrong command or a missing or mistyped key is a fault. */
function jsonEdit(v: unknown): Edit | null {
  if (v === null || typeof v !== 'object' || Array.isArray(v)) return null;
  const o = v as Record<string, unknown>;
  if (typeof o.path !== 'string') return null;
  const p = o.path;
  if (o.command === 'create') {
    if (typeof o.file_text !== 'string') return null;
    const text = o.file_text;
    return (tree) => {
      if (!isSafePath(p)) throw new EditErr('unsafe', p);
      if (tree.read(p) !== null) throw new EditErr('exists', p);
      tree.cur.set(p, text);
    };
  }
  if (o.command === 'str_replace') {
    if (typeof o.old_str !== 'string' || o.old_str === '') return null;
    if (o.new_str !== undefined && typeof o.new_str !== 'string') return null;
    const oldS = o.old_str;
    const newS = (o.new_str as string | undefined) ?? '';
    return (tree) => {
      if (!isSafePath(p)) throw new EditErr('unsafe', p);
      const cur = tree.read(p);
      if (cur === null) throw new EditErr('missing', p);
      const crlf = parseDoc(cur).br === '\r\n';
      const norm = (s: string): string => (crlf ? s.replaceAll('\r\n', '\n') : s);
      const t = norm(cur);
      const oldN = norm(oldS);
      let count = 0;
      let at = -1;
      for (let k = t.indexOf(oldN); k >= 0; k = t.indexOf(oldN, k + 1)) {
        count += 1;
        if (at < 0) at = k;
      }
      if (count === 0) throw new EditErr('no-match', p);
      if (count > 1) throw new EditErr('ambiguous', p);
      const out = t.slice(0, at) + norm(newS) + t.slice(at + oldN.length);
      tree.cur.set(p, crlf ? out.replaceAll('\n', '\r\n') : out);
    };
  }
  if (o.command === 'insert') {
    if (typeof o.insert_line !== 'number' || !Number.isInteger(o.insert_line)) return null;
    if (typeof o.new_str !== 'string') return null;
    const lineNo = o.insert_line;
    const add = splitPatchLines(o.new_str);
    return (tree) => {
      if (!isSafePath(p)) throw new EditErr('unsafe', p);
      const cur = tree.read(p);
      if (cur === null) throw new EditErr('missing', p);
      const doc = parseDoc(cur);
      if (lineNo < 0 || lineNo > doc.lines.length) throw new EditErr('no-match', p);
      const out = doc.lines.slice();
      out.splice(lineNo, 0, ...add);
      tree.cur.set(p, renderDoc({ lines: out, br: doc.br, finalNl: doc.finalNl }));
    };
  }
  return null;
}

/** The patch as JSON: one array of edit objects, or one edit object a line (blank lines ignored). */
function parseJson(text: string, lines: string[]): Edit[] {
  const first = lines.findIndex((l) => !isBlank(l));
  if (first < 0) throw new ParseErr(1);
  const edits: Edit[] = [];
  if (lines[first]!.trimStart().startsWith('[')) {
    let v: unknown;
    try {
      v = JSON.parse(text);
    } catch {
      throw new ParseErr(first + 1);
    }
    if (!Array.isArray(v)) throw new ParseErr(first + 1);
    for (const item of v) {
      const e = jsonEdit(item);
      if (e === null) throw new ParseErr(first + 1);
      edits.push(e);
    }
    return edits;
  }
  lines.forEach((l, idx) => {
    if (isBlank(l)) return;
    let e: Edit | null = null;
    try {
      e = jsonEdit(JSON.parse(l));
    } catch {
      e = null;
    }
    if (e === null) throw new ParseErr(idx + 1);
    edits.push(e);
  });
  return edits;
}

/* ---- Unified diffs (section 6) ---- */

interface Hunk {
  a: number;
  oldLines: string[];
  newParts: NewPart[];
  /** A `\` line follows this hunk's last context or `+` line. */
  noEol: boolean;
  /** A `\` line follows this hunk's last `+` line (false when it has none). */
  plusNoEol: boolean;
}

interface Section {
  oldPath: string | null;
  newPath: string | null;
  isCreate: boolean;
  isDelete: boolean;
  hunks: Hunk[];
}

/** The path after `--- ` or `+++ `: text after the four characters, up to the first tab, trimmed. */
function headerPath(line: string): string {
  const raw = line.slice(4).split('\t')[0] as string;
  const p = raw.trim();
  if (p.startsWith('a/') || p.startsWith('b/')) return p.slice(2);
  return p;
}

/** `diff --git a/<X> b/<Y>`: the two paths, or a parse error at its line. */
function diffGitPaths(line: string, lineNo: number): [string, string] {
  const rest = line.slice('diff --git '.length);
  if (!rest.startsWith('a/')) throw new ParseErr(lineNo);
  const k = rest.indexOf(' b/');
  if (k < 0) throw new ParseErr(lineNo);
  const x = rest.slice(2, k);
  const y = rest.slice(k + 3).trim();
  if (x === '' || y === '') throw new ParseErr(lineNo);
  return [x, y];
}

const HUNK_HEAD = /^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/;

/** A hunk header line: its A (the old start), or a parse error at its line. */
function hunkA(line: string, lineNo: number): number {
  const m = HUNK_HEAD.exec(line);
  if (m === null) throw new ParseErr(lineNo);
  return parseInt(m[1] as string, 10);
}

interface BodyEntry {
  kind: ' ' | '-' | '+' | '\\';
  text: string;
}

/** Read one hunk's body starting at `i`; returns the hunk and the index after its body. */
function readHunk(lines: string[], i: number, a: number): { hunk: Hunk; next: number } {
  const entries: BodyEntry[] = [];
  let j = i;
  while (j < lines.length) {
    const l = lines[j] as string;
    if (l.startsWith('diff --git ')) break;
    if (l.startsWith('--- ') && (lines[j + 1] ?? '').startsWith('+++ ')) break;
    if (l === '' || l.startsWith(' ') || l.startsWith('-') || l.startsWith('+') || l.startsWith('\\')) {
      entries.push({ kind: l === '' ? ' ' : (l[0] as ' ' | '-' | '+' | '\\'), text: l === '' ? '' : l.slice(1) });
      j += 1;
    } else break;
  }
  // Empty lines at the end of a body are not part of it.
  while (entries.length > 0) {
    const last = entries[entries.length - 1] as BodyEntry;
    if (last.kind === ' ' && last.text === '') entries.pop();
    else break;
  }
  const oldLines: string[] = [];
  const newParts: NewPart[] = [];
  for (const e of entries) {
    if (e.kind === ' ') {
      oldLines.push(e.text);
      newParts.push({ text: e.text, ctx: oldLines.length - 1 });
    } else if (e.kind === '-') {
      oldLines.push(e.text);
    } else if (e.kind === '+') {
      newParts.push({ text: e.text, ctx: null });
    }
  }
  let noEol = false;
  let plusNoEol = false;
  for (let k = entries.length - 1; k >= 0; k--) {
    const e = entries[k] as BodyEntry;
    if (e.kind === ' ' || e.kind === '+') {
      noEol = k + 1 < entries.length && entries[k + 1]!.kind === '\\';
      break;
    }
  }
  for (let k = entries.length - 1; k >= 0; k--) {
    const e = entries[k] as BodyEntry;
    if (e.kind === '+') {
      plusNoEol = k + 1 < entries.length && entries[k + 1]!.kind === '\\';
      break;
    }
  }
  return { hunk: { a, oldLines, newParts, noEol, plusNoEol }, next: j };
}

/** The patch as unified diffs: its sections, each one edit. No section at all is no edit. */
function parseUnified(lines: string[]): Section[] {
  const sections: Section[] = [];
  let cur: Section | null = null;
  let pairOld: string | null = null;
  let pairNew: string | null = null;
  let renameOld: string | null = null;
  let renameNew: string | null = null;
  let diffOld: string | null = null;
  let diffNew: string | null = null;
  let inHeader = false;

  const close = (): void => {
    if (cur === null) return;
    cur.oldPath = pairOld ?? renameOld ?? diffOld;
    cur.newPath = pairNew ?? renameNew ?? diffNew;
    sections.push(cur);
    cur = null;
    pairOld = null;
    pairNew = null;
    renameOld = null;
    renameNew = null;
    diffOld = null;
    diffNew = null;
    inHeader = false;
  };
  const open = (): void => {
    close();
    cur = { oldPath: null, newPath: null, isCreate: false, isDelete: false, hunks: [] };
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i] as string;
    if (line.startsWith('diff --git ')) {
      const [x, y] = diffGitPaths(line, i + 1);
      open();
      diffOld = x;
      diffNew = y;
      inHeader = true;
      i += 1;
      continue;
    }
    if (line.startsWith('--- ') && (lines[i + 1] ?? '').startsWith('+++ ')) {
      if (inHeader && cur !== null) {
        if (pairOld === null) {
          pairOld = headerPath(line);
          pairNew = headerPath(lines[i + 1] as string);
        }
        i += 2;
        continue;
      }
      open();
      pairOld = headerPath(line);
      pairNew = headerPath(lines[i + 1] as string);
      inHeader = true;
      i += 2;
      continue;
    }
    if (inHeader && line.startsWith('--- ')) throw new ParseErr(i + 2);
    if (line.startsWith('@@')) {
      if (cur === null) throw new ParseErr(i + 1);
      const a = hunkA(line, i + 1);
      const { hunk, next } = readHunk(lines, i + 1, a);
      cur.hunks.push(hunk);
      inHeader = false;
      i = next;
      continue;
    }
    if (inHeader && cur !== null) {
      if (line.startsWith('rename from ')) renameOld = line.slice('rename from '.length).trim();
      else if (line.startsWith('rename to ')) renameNew = line.slice('rename to '.length).trim();
      else if (line === 'new file mode' || line.startsWith('new file mode ')) cur.isCreate = true;
      else if (line === 'deleted file mode' || line.startsWith('deleted file mode ')) cur.isDelete = true;
      i += 1;
      continue;
    }
    i += 1;
  }
  close();
  if (sections.length === 0) throw new ParseErr(1);
  return sections;
}

/** Apply one section's hunks to a document's lines; returns the new lines and final-break state. */
function applyHunks(doc: Doc, hunks: Hunk[], strict: boolean, failPath: string): Doc {
  let lines = doc.lines;
  let finalNl = doc.finalNl;
  let d = 0;
  for (const h of hunks) {
    if (h.oldLines.length === 0) {
      const at = Math.min(Math.max(h.a + d, 0), lines.length);
      const atEnd = at === lines.length;
      lines = spliceLines(lines, at, [], h.newParts, 0);
      if (atEnd) finalNl = !h.noEol;
      d += h.newParts.length;
      continue;
    }
    const hit = firstTier(lines, h.oldLines, strict, 0, false);
    if (hit === null) throw new EditErr('no-match', failPath);
    const target = h.a - 1 + d;
    let best = hit.pos[0] as number;
    let bestDist = Math.abs(best - target);
    for (const p of hit.pos) {
      const dist = Math.abs(p - target);
      if (dist < bestDist) {
        best = p;
        bestDist = dist;
      }
    }
    const atEnd = best + h.oldLines.length === lines.length;
    lines = spliceLines(lines, best, h.oldLines, h.newParts, hit.tier);
    if (atEnd) finalNl = !h.noEol;
    d += h.newParts.length - h.oldLines.length;
  }
  return { lines, br: doc.br, finalNl };
}

/** One unified section as one edit. */
function unifiedEdit(s: Section, strict: boolean): Edit {
  const oldP = s.oldPath as string;
  const newP = s.newPath as string;
  const isCreate = oldP === '/dev/null' || s.isCreate;
  const isDelete = !isCreate && (newP === '/dev/null' || s.isDelete);
  const isMove = !isCreate && !isDelete && oldP !== newP;
  return (tree) => {
    if (oldP !== '/dev/null' && !isSafePath(oldP)) throw new EditErr('unsafe', oldP);
    if (newP !== '/dev/null' && !isSafePath(newP)) throw new EditErr('unsafe', newP);
    if (isCreate) {
      if (tree.read(newP) !== null) throw new EditErr('exists', newP);
      const plus: string[] = [];
      for (const h of s.hunks) {
        for (const part of h.newParts) if (part.ctx === null) plus.push(part.text);
      }
      let finalNl = true;
      for (let k = s.hunks.length - 1; k >= 0; k--) {
        const h = s.hunks[k] as Hunk;
        const hasPlus = h.newParts.some((part) => part.ctx === null);
        if (hasPlus) {
          finalNl = !h.plusNoEol;
          break;
        }
      }
      tree.cur.set(newP, plus.length === 0 ? '' : plus.join('\n') + (finalNl ? '\n' : ''));
      return;
    }
    if (isDelete) {
      if (tree.read(oldP) === null) throw new EditErr('missing', oldP);
      tree.cur.set(oldP, null);
      return;
    }
    const cur = tree.read(oldP);
    if (cur === null) throw new EditErr('missing', oldP);
    if (isMove && tree.read(newP) !== null) throw new EditErr('exists', newP);
    const out = applyHunks(parseDoc(cur), s.hunks, strict, oldP);
    const text = renderDoc(out);
    if (isMove) {
      tree.cur.set(newP, text);
      tree.cur.set(oldP, null);
      tree.moves.push([oldP, newP]);
    } else {
      tree.cur.set(oldP, text);
    }
  };
}

/* ---- SEARCH/REPLACE blocks (section 7) ---- */

/** One SEARCH/REPLACE block as one edit. */
function srEdit(path: string, oldLines: string[], newLines: string[], strict: boolean): Edit {
  return (tree) => {
    if (!isSafePath(path)) throw new EditErr('unsafe', path);
    if (oldLines.length === 0) {
      if (tree.read(path) !== null) throw new EditErr('exists', path);
      tree.cur.set(path, newLines.length === 0 ? '' : newLines.join('\n') + '\n');
      return;
    }
    const cur = tree.read(path);
    if (cur === null) throw new EditErr('missing', path);
    const doc = parseDoc(cur);
    const hit = firstTier(doc.lines, oldLines, strict, 0, false);
    if (hit === null) throw new EditErr('no-match', path);
    if (hit.pos.length > 1) throw new EditErr('ambiguous', path);
    const parts: NewPart[] = newLines.map((text) => ({ text, ctx: null }));
    const out = spliceLines(doc.lines, hit.pos[0] as number, oldLines, parts, hit.tier);
    tree.cur.set(path, renderDoc({ lines: out, br: doc.br, finalNl: doc.finalNl }));
  };
}

/** The patch as SEARCH/REPLACE blocks. Lines outside blocks are ignored. */
function parseSearchReplace(lines: string[], strict: boolean): Edit[] {
  const edits: Edit[] = [];
  let prevEnd = -1;
  let prevPath: string | null = null;
  let i = 0;
  while (i < lines.length) {
    if (lines[i]!.trimEnd() !== '<<<<<<< SEARCH') {
      i += 1;
      continue;
    }
    const searchIdx = i;
    let path: string | null = null;
    for (let j = searchIdx - 1; j > prevEnd; j--) {
      const l = lines[j] as string;
      if (isBlank(l) || l.trim().startsWith('```')) continue;
      path = l.trim();
      break;
    }
    if (path === null) {
      if (prevPath === null) throw new ParseErr(searchIdx + 1);
      path = prevPath;
    }
    let eq = -1;
    for (let j = searchIdx + 1; j < lines.length; j++) {
      const t = lines[j]!.trimEnd();
      if (t === '=======') {
        eq = j;
        break;
      }
      if (t === '>>>>>>> REPLACE' || t === '<<<<<<< SEARCH') break;
    }
    if (eq < 0) throw new ParseErr(searchIdx + 1);
    let rep = -1;
    for (let j = eq + 1; j < lines.length; j++) {
      const t = lines[j]!.trimEnd();
      if (t === '>>>>>>> REPLACE') {
        rep = j;
        break;
      }
      if (t === '<<<<<<< SEARCH') break;
    }
    if (rep < 0) throw new ParseErr(searchIdx + 1);
    edits.push(srEdit(path, lines.slice(searchIdx + 1, eq), lines.slice(eq + 1, rep), strict));
    prevPath = path;
    prevEnd = rep;
    i = rep + 1;
  }
  if (edits.length === 0) throw new ParseErr(1);
  return edits;
}

/* ---- V4A patches (section 8) ---- */

interface Chunk {
  anchor: string | null;
  eof: boolean;
  oldLines: string[];
  newParts: NewPart[];
}

const isSectionStart = (l: string): boolean =>
  l.startsWith('*** Add File: ') || l.startsWith('*** Delete File: ') || l.startsWith('*** Update File: ');

/** One V4A chunk's body entries as old lines and new parts. */
function chunkParts(entries: BodyEntry[]): { oldLines: string[]; newParts: NewPart[] } {
  const oldLines: string[] = [];
  const newParts: NewPart[] = [];
  for (const e of entries) {
    if (e.kind === ' ') {
      oldLines.push(e.text);
      newParts.push({ text: e.text, ctx: oldLines.length - 1 });
    } else if (e.kind === '-') {
      oldLines.push(e.text);
    } else if (e.kind === '+') {
      newParts.push({ text: e.text, ctx: null });
    }
  }
  return { oldLines, newParts };
}

/** One Update File section as one edit. */
function v4aUpdateEdit(path: string, moveTo: string | null, chunks: Chunk[], strict: boolean): Edit {
  return (tree) => {
    if (!isSafePath(path)) throw new EditErr('unsafe', path);
    if (moveTo !== null && !isSafePath(moveTo)) throw new EditErr('unsafe', moveTo);
    const cur = tree.read(path);
    if (cur === null) throw new EditErr('missing', path);
    if (moveTo !== null && tree.read(moveTo) !== null) throw new EditErr('exists', moveTo);
    const doc = parseDoc(cur);
    let cursor = 0;
    for (const ch of chunks) {
      if (ch.anchor !== null && ch.anchor !== '') {
        const a = findAnchor(doc.lines, ch.anchor, cursor, strict);
        if (a < 0) throw new EditErr('no-match', path);
        cursor = a + 1;
      }
      if (ch.oldLines.length === 0) {
        const at = ch.eof ? doc.lines.length : cursor;
        doc.lines = spliceLines(doc.lines, at, [], ch.newParts, 0);
        cursor = at + ch.newParts.length;
        continue;
      }
      const hit = firstTier(doc.lines, ch.oldLines, strict, cursor, ch.eof);
      if (hit === null) throw new EditErr('no-match', path);
      const pos = hit.pos[0] as number;
      doc.lines = spliceLines(doc.lines, pos, ch.oldLines, ch.newParts, hit.tier);
      cursor = pos + ch.newParts.length;
    }
    const text = renderDoc(doc);
    if (moveTo !== null) {
      tree.cur.set(moveTo, text);
      tree.cur.set(path, null);
      tree.moves.push([path, moveTo]);
    } else {
      tree.cur.set(path, text);
    }
  };
}

/** The patch as a V4A patch: its sections, each one edit. */
function parseV4a(lines: string[], strict: boolean): Edit[] {
  const first = lines.findIndex((l) => !isBlank(l));
  if (first < 0) throw new ParseErr(1);
  if (lines[first]!.trim() !== '*** Begin Patch') throw new ParseErr(first + 1);
  let last = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (!isBlank(lines[i] as string)) {
      last = i;
      break;
    }
  }
  if (lines[last]!.trim() !== '*** End Patch') throw new ParseErr(lines.length + 1);
  const edits: Edit[] = [];
  let i = first + 1;
  while (i < last) {
    const line = lines[i] as string;
    if (isBlank(line)) {
      i += 1;
      continue;
    }
    if (line.startsWith('*** Add File: ')) {
      const path = line.slice('*** Add File: '.length).trim();
      const body: string[] = [];
      i += 1;
      while (i < last) {
        const l = lines[i] as string;
        if (isSectionStart(l)) break;
        if (isBlank(l)) {
          body.push('');
          i += 1;
          continue;
        }
        if (l.startsWith('+')) {
          body.push(l.slice(1));
          i += 1;
          continue;
        }
        throw new ParseErr(i + 1);
      }
      while (body.length > 0 && body[body.length - 1] === '') body.pop();
      edits.push(((p, b) => (tree: WorkTree): void => {
        if (!isSafePath(p)) throw new EditErr('unsafe', p);
        if (tree.read(p) !== null) throw new EditErr('exists', p);
        tree.cur.set(p, b.length === 0 ? '' : b.join('\n') + '\n');
      })(path, body));
      continue;
    }
    if (line.startsWith('*** Delete File: ')) {
      const path = line.slice('*** Delete File: '.length).trim();
      i += 1;
      while (i < last) {
        const l = lines[i] as string;
        if (isSectionStart(l)) break;
        if (isBlank(l)) {
          i += 1;
          continue;
        }
        throw new ParseErr(i + 1);
      }
      edits.push(((p) => (tree: WorkTree): void => {
        if (!isSafePath(p)) throw new EditErr('unsafe', p);
        if (tree.read(p) === null) throw new EditErr('missing', p);
        tree.cur.set(p, null);
      })(path));
      continue;
    }
    if (line.startsWith('*** Update File: ')) {
      const updateLine = i + 1;
      const path = line.slice('*** Update File: '.length).trim();
      i += 1;
      let moveTo: string | null = null;
      if (i < last && lines[i]!.startsWith('*** Move to: ')) {
        moveTo = lines[i]!.slice('*** Move to: '.length).trim();
        i += 1;
      }
      const chunks: Chunk[] = [];
      let entries: BodyEntry[] | null = null;
      let anchor: string | null = null;
      let eof = false;
      const finish = (strip: boolean): void => {
        if (entries === null) return;
        const kept = strip
          ? (() => {
              const copy = entries.slice();
              while (copy.length > 0) {
                const lastE = copy[copy.length - 1] as BodyEntry;
                if (lastE.kind === ' ' && lastE.text === '') copy.pop();
                else break;
              }
              return copy;
            })()
          : entries;
        const { oldLines, newParts } = chunkParts(kept);
        chunks.push({ anchor, eof, oldLines, newParts });
        entries = null;
        anchor = null;
        eof = false;
      };
      while (i < last) {
        const l = lines[i] as string;
        if (isSectionStart(l)) break;
        if (l.trimEnd() === '*** End of File') {
          if (entries !== null) {
            eof = true;
            finish(false);
          }
          i += 1;
          continue;
        }
        if (l.startsWith('@@')) {
          finish(false);
          entries = [];
          anchor = l.slice(2).trim();
          eof = false;
          i += 1;
          continue;
        }
        if (l.startsWith('*** ')) throw new ParseErr(i + 1);
        if (l === '' || l.startsWith(' ') || l.startsWith('-') || l.startsWith('+')) {
          if (entries === null) {
            entries = [];
            anchor = null;
            eof = false;
          }
          entries.push({ kind: l === '' ? ' ' : (l[0] as ' ' | '-' | '+' | '\\'), text: l === '' ? '' : l.slice(1) });
          i += 1;
          continue;
        }
        throw new ParseErr(i + 1);
      }
      finish(true);
      if (chunks.length === 0 && moveTo === null) throw new ParseErr(updateLine);
      edits.push(v4aUpdateEdit(path, moveTo, chunks, strict));
      continue;
    }
    throw new ParseErr(i + 1);
  }
  if (edits.length === 0) throw new ParseErr(1);
  return edits;
}

/* ---- Detecting the format (section 4) ---- */

function detectFormat(lines: string[]): string | null {
  const first = lines.findIndex((l) => !isBlank(l));
  if (first < 0) return null;
  if (lines[first]!.trim() === '*** Begin Patch') return 'v4a';
  const c = lines[first]!.trimStart()[0];
  if (c === '[' || c === '{') return 'json';
  if (lines.some((l) => l.trimEnd() === '<<<<<<< SEARCH')) return 'search-replace';
  if (
    lines.some(
      (l, idx) =>
        l.startsWith('diff --git ') || (l.startsWith('--- ') && (lines[idx + 1] ?? '').startsWith('+++ ')),
    )
  ) {
    return 'unified';
  }
  return null;
}

/* ---- Running (sections 1, 2 and 10) ---- */

function run(argv: string[]): { code: number; out: string[] } {
  const usage = (): { code: number; out: string[] } => ({ code: 2, out: ['error: usage'] });
  let format: string | null = null;
  let check = false;
  let strict = false;
  const pos: string[] = [];
  let ended = false;
  for (const a of argv) {
    if (!ended && a === '--') {
      ended = true;
    } else if (!ended && a.startsWith('-') && a !== '-') {
      if (a.startsWith('--format=')) {
        if (format !== null) return usage();
        const v = a.slice('--format='.length);
        if (!FORMATS.includes(v)) return usage();
        format = v;
      } else if (a === '--check') {
        if (check) return usage();
        check = true;
      } else if (a === '--strict') {
        if (strict) return usage();
        strict = true;
      } else {
        return usage();
      }
    } else {
      pos.push(a);
    }
  }
  if (pos.length > 1) return usage();
  const patchArg = pos.length === 0 || pos[0] === '-' ? null : (pos[0] as string);
  let text = '';
  try {
    text = readFileSync(patchArg ?? 0, 'utf8');
  } catch {
    if (patchArg !== null) return { code: 2, out: ['error: no-patch'] };
  }
  const lines = splitPatchLines(text);
  const kind = format === null || format === 'auto' ? detectFormat(lines) : format;
  if (kind === null) return { code: 2, out: ['error: format'] };
  let edits: Edit[];
  try {
    if (kind === 'json') edits = parseJson(text, lines);
    else if (kind === 'unified') edits = parseUnified(lines).map((s) => unifiedEdit(s, strict));
    else if (kind === 'search-replace') edits = parseSearchReplace(lines, strict);
    else edits = parseV4a(lines, strict);
    if (edits.length === 0) throw new ParseErr(1);
  } catch (e) {
    if (e instanceof ParseErr) return { code: 2, out: [`error: parse ${e.line}`] };
    throw e;
  }
  const tree = new WorkTree();
  const fails: EditErr[] = [];
  for (const edit of edits) {
    const snap = new Map(tree.cur);
    const mvLen = tree.moves.length;
    try {
      edit(tree);
    } catch (e) {
      if (!(e instanceof EditErr)) throw e;
      tree.cur.clear();
      for (const [k, v] of snap) tree.cur.set(k, v);
      tree.moves.length = mvLen;
      fails.push(e);
    }
  }
  if (fails.length > 0) {
    return {
      code: 1,
      out: [...fails.map((f) => `error: ${f.code} ${f.path}`), `failed: ${fails.length} of ${edits.length} edits`],
    };
  }
  // One line per changed path, in byte order; a move replaces its D and A lines and sorts by its new path.
  const entries: Array<{ key: string; line: string }> = [];
  const folded = new Set<string>();
  for (const [oldP, newP] of tree.moves) {
    const oOrig = tree.readOriginal(oldP);
    const oNow = tree.cur.has(oldP) ? (tree.cur.get(oldP) as string | null) : tree.readOriginal(oldP);
    const nOrig = tree.readOriginal(newP);
    const nNow = tree.cur.has(newP) ? (tree.cur.get(newP) as string | null) : tree.readOriginal(newP);
    if (oOrig !== null && oNow === null && nOrig === null && nNow !== null) {
      entries.push({ key: newP, line: `R ${oldP} -> ${newP}` });
      folded.add(oldP);
      folded.add(newP);
    }
  }
  for (const p of [...tree.cur.keys()]) {
    const was = tree.readOriginal(p);
    const now = tree.cur.get(p) as string | null;
    if (was === now || folded.has(p)) continue;
    entries.push({ key: p, line: `${was === null ? 'A' : now === null ? 'D' : 'M'} ${p}` });
  }
  entries.sort((a, b) => Buffer.compare(Buffer.from(a.key), Buffer.from(b.key)));
  const rows = entries.map((e) => e.line);
  if (!check) {
    const changed = [...tree.cur.keys()].filter((p) => tree.cur.get(p) !== tree.readOriginal(p));
    for (const p of changed) {
      if (tree.cur.get(p) === null) rmSync(p, { force: true });
    }
    for (const p of changed) {
      const now = tree.cur.get(p) as string | null;
      if (now === null) continue;
      mkdirSync(dirname(p), { recursive: true });
      writeFileSync(p, now);
    }
  }
  return { code: 0, out: [...rows, `ok: ${rows.length} ${rows.length === 1 ? 'file' : 'files'}`] };
}

const trialEnv = process.env.MAKEFUN_ENV_URL;
if (trialEnv !== undefined && trialEnv !== '') {
  // A trial: the kit's runner reads the checks from the env and runs this file on each one, without this variable.
  const { runTrial } = await import('./runner.ts');
  await runTrial(trialEnv);
} else {
  const r = run(process.argv.slice(2));
  writeSync(1, r.out.map((l) => `${l}\n`).join(''));
  process.exitCode = r.code;
}
