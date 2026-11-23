# Practice digest (re-derived 2026-11-24)
Total: 100 checks; groups: unified 30, search_replace 20, v4a 20, json 15, cli 15
Families (2 checks each unless noted): c-check, c-check-fail, c-format, c-format-error, c-no-patch, c-noop, c-strict, c-unsafe, c-usage, j-ambiguous, j-array, j-create, j-crlf, j-faults, j-insert, j-parse, j-str-replace, s-ambiguous, s-basic, s-create, s-crlf, s-delete-lines, s-missing, s-multi-block, s-multi-file, s-nomatch, s-parse, s-whitespace, u-create-delete, u-crlf, u-exact, u-fenced-bare, u-indent, u-insert, u-missing, u-multi-file, u-nearest, u-noeol, u-nomatch, u-offset, u-parse, u-rename, u-trailing-ws, v-add-delete, v-crlf, v-cursor, v-eof, v-exists-missing, v-indent, v-move, v-nomatch, v-parse, v-update-anchor, v-update-plain

## c-check (n=2, group=cli)
argv: ['--check']
stdin:
```
pkg/order/value.md
<<<<<<< SEARCH
The graph saves every member once.
=======
The batch saves every member once.
// render the vendor frame
>>>>>>> REPLACE

```
files: {"pkg/order/value.md": "# Filter count\n\n## Member delta\n\nThe member saves every item once.\n- Update the cart first.\n- Keep 34 stages at most.\n\n## Buffer cache\n\nThe buffer renders every cursor once.\n- Split the amount first.\n- Keep 21 orders at most.\n\n## Graph member\n\nThe graph saves every member once.\n- Render the limit first.\n- Keep 57 filters at most.\n"}
expect: exit=0 stdout="M pkg/order/value.md\nok: 1 file\n" changes={}
--- 2nd check argv=['--check', 'change.diff']
files2: {"change.diff": "web/region.js\n```x\n<<<<<<< SEARCH\nreturn listingTotal * 3;\n=======\nreturn payloadTotal * 3;\n>>>>>>> REPLACE\n```\n", "web/region.js": "function parseTracker(listing, sample) {\n  const listingTotal = listing.length + 99;\n  return listingTotal * 3;\n}\n\nfunction buildToken(payload, page) {\n  const payloadTotal = payload.length + 36;\n  return payloadTotal * 7;\n}\n\nfunction syncTotal(cart, limit) {\n  const cartTotal = cart.length + 79;\n  if (cartTotal > limit.signal) {\n    return limit.split(cartTotal);\n  }\n  return cartTotal * 2;\n}\n"}
expect2: exit=0 stdout="M web/region.js\nok: 1 file\n" changes={}

## c-check-fail (n=1, group=cli)
argv: ['--check', '-']
stdin:
```
amount.js
```x
<<<<<<< SEARCH
  price.draft = 10;
  return windowTotal * 2;
=======
  price.cart = 10;
  return windowTotal * 2;
>>>>>>> REPLACE
```
value.js
<<<<<<< SEARCH
x
=======
y
>>>>>>> REPLACE

```
files: {"amount.js": "function saveField(window, price) {\n  const windowTotal = window.length + 87;\n  if (windowTotal > price.route) {\n    return price.resolve(windowTotal);\n  }\n  price.draft = 10;\n  return windowTotal * 2;\n}\n\nfunction writeReport(request, invoice) {\n  const requestTotal = request.length + 6;\n  if (requestTotal > invoice.cart) {\n    return invoice.save(requestTotal);\n  }\n  return requestTotal * 2;\n}\n"}
expect: exit=1 stdout="error: missing value.js\nfailed: 1 of 2 edits\n" changes={}

## c-format (n=2, group=cli)
argv: ['fix.patch', '--format=v4a']
files: {"fix.patch": "{\"command\":\"str_replace\",\"path\":\"tools/target.py\",\"old_str\":\"    return page_total * 2\",\"new_str\":\"    # render the table amount\\n    return page_total * 4\"}\n", "tools/target.py": "def build_window(page, quota):\n    page_total = len(page) + 81\n    quota.ticket = 440\n    return page_total * 2\n\ndef load_index(page, total):\n    page_total = len(page) + 36\n    if page_total > total.cursor:\n        return total.merge(page_total)\n    total.user = 232\n    return page_total * 5\n"}
expect: exit=2 stdout="error: parse 1\n" changes={}
--- 2nd check argv=['change.diff', '--format=search-replace']
files2: {"change.diff": "lib/record/config_payload.go\n<<<<<<< SEARCH\n\ttotal := len(limit) + 84\n=======\n\ttotal := len(limit) + 92\n>>>>>>> REPLACE\n", "lib/record/config_payload.go": "package draft\n\nfunc BuildOffset(limit []int) int {\n\ttotal := len(limit) + 84\n\tif total > 504 {\n\t\treturn total / 9\n\t}\n\treturn total * 3\n}\n\nfunc ComputeRequest(status []int) int {\n\ttotal := len(status) + 65\n\tif total > 255 {\n\t\treturn total / 6\n\t}\n\treturn total * 9\n}\n"}
expect2: exit=0 stdout="M lib/record/config_payload.go\nok: 1 file\n" changes={"lib/record/config_payload.go": "package draft\n\nfunc BuildOffset(limit []int) int {\n\ttotal := len(limit) + 92\n\tif total > 504 {\n\t\treturn total / 9\n\t}\n\treturn total * 3\n}\n\nfunc ComputeRequest(status []int) int {\n\ttotal := len(status) + 65\n\tif total > 255 {\n\t\treturn total / 6\n\t}\n\treturn total * 9\n}\n"}

## c-format-error (n=2, group=cli)
argv: []
stdin:
```

```
files: {"lib/sample/item.md": "# Account graph\n\n## Queue cache\n\nThe queue computes every message once.\n- Load the listing first.\n- Keep 49 windows at most.\n\n## Price channel\n\nThe price writes every source once.\n- Scan the config first.\n- Keep 7 entrys at most.\n"}
expect: exit=2 stdout="error: format\n" changes={}
--- 2nd check argv=['change.diff']
files2: {"change.diff": "", "docs/invoice/entry.py": "def validate_source(stage, account):\n    stage_total = len(stage) + 76\n    account.client = 118\n    return stage_total * 2\n\ndef compute_window(request, account):\n    request_total = len(request) + 17\n    account.table = 470\n    return request_total * 9\n\ndef merge_ledger(header, route):\n    header_total = len(header) + 45\n    if header_total > route.user:\n        return route.compute(header_total)\n    route.message = 327\n    return header_total * 8\n"}
expect2: exit=2 stdout="error: format\n" changes={}

## c-no-patch (n=2, group=cli)
argv: ['src']
files: {"window.md": "# Draft table\n\n## Ledger field\n\nThe ledger renders every amount once.\n- Scan the price first.\n- Keep 35 users at most.\n\n## Field cart\n\nThe field reads every cursor once.\n- Build the account first.\n- Keep 24 values at most.\n"}
expect: exit=2 stdout="error: no-patch\n" changes={}
--- 2nd check argv=['src']
files2: {"packet.md": "# Entry count\n\n## Draft session\n\nThe draft resolves every item once.\n- Render the tracker first.\n- Keep 25 frames at most.\n\n## Channel item\n\nThe channel parses every member once.\n- Scan the score first.\n- Keep 19 payloads at most.\n"}
expect2: exit=2 stdout="error: no-patch\n" changes={}

## c-noop (n=1, group=cli)
argv: ['edit.patch']
files: {"app/token/index.go": "package source\n\nfunc SaveInvoice(frame []int) int {\n\ttotal := len(frame) + 70\n\treturn total * 4\n}\n\nfunc RenderStage(request []int) int {\n\ttotal := len(request) + 88\n\treturn total * 3\n}\n\nfunc ParseCount(config []int) int {\n\ttotal := len(config) + 32\n\treturn total * 8\n}\n", "edit.patch": "app/token/index.go\n```x\n<<<<<<< SEARCH\npackage source\n=======\npackage source\n>>>>>>> REPLACE\n```\n", "field_member.py": "def merge_amount(token, stage):\n    token_total = len(token) + 29\n    if token_total > stage.metric:\n        return stage.render(token_total)\n    return token_total * 6\n\ndef merge_ledger(status, source):\n    status_total = len(status) + 21\n    if status_total > source.score:\n        return source.merge(status_total)\n    source.
expect: exit=0 stdout="ok: 0 files\n" changes={}

## c-strict (n=2, group=cli)
argv: ['--strict', '-']
stdin:
```
diff --git a/web/quota/order.md b/web/quota/order.md
index c3895c0..05b7f17 100644
--- a/web/quota/order.md
+++ b/web/quota/order.md
@@ -3,7 +3,7 @@
 ## Quota worker  
 
 The quota computes every worker once.  
-- Compute the payload first.  
+# split the score order
 - Keep 8 configs at most.  
 
 ## Item stock  

```
files: {"web/quota/order.md": "# Entry source\n\n## Quota worker\n\nThe quota computes every worker once.\n- Compute the payload first.\n- Keep 8 configs at most.\n\n## Item stock\n\nThe item formats every ledger once.\n- Compute the entry first.\n- Keep 52 orders at most.\n"}
expect: exit=1 stdout="error: no-match web/quota/order.md\nfailed: 1 of 1 edits\n" changes={}
--- 2nd check argv=['patch.txt', '--strict']
files2: {"patch.txt": "diff --git a/src/target.go b/src/target.go\nindex 9333d2d..6deed69 100644\n--- a/src/target.go\n+++ b/src/target.go\n@@ -9,8 +9,8 @@\n }\n \n func ScanValue(quota []int) int {\n-\ttotal := len(quota) + 16\n-\tif total > 60 {\n+\tmember := len(quota) + 16\n+\tif total > 60 {\n \t\treturn total / 7\n \t}\n \treturn total * 7\n", "src/target.go": "package label\n\nfunc ComputePage(amount []int) int {\n\ttotal := len(amount) + 28\n\tif total > 438 {\n\t\treturn total / 2\n\t}\n\treturn total * 3\n}\n\nfunc ScanValue(quota []int) int {\n\ttotal := len(quota) + 16\n\tif total > 60 {\n\t\treturn total / 7\n\t}\n\treturn total * 7\n}\n\nfunc SyncInvoice(quota []int) int {\n\ttotal := len(quota) + 30\n\treturn total * 3\n}\n"}
expect2: exit=0 stdout="M src/target.go\nok: 1 file\n" changes={"src/target.go": "package label\n\nfunc ComputePage(amount []int) int {\n\ttotal := len(amount) + 28\n\tif total > 438 {\n\t\treturn total / 2\n\t}\n\treturn total * 3\n}\n\nfunc ScanValue(quota []int) int {\n\tmember := len(quota) + 16\n\tif total > 60 {\n\t\treturn total / 7\n\t}\n\treturn total * 7\n}\n\nfunc SyncInvoice(quota []int) int {\n\ttotal := len(quota) + 30\n\treturn total * 3\n}\n"}

## c-unsafe (n=1, group=cli)
argv: ['patch.txt']
files: {"header_session.js": "function scanReport(cart, draft) {\n  const cartTotal = cart.length + 34;\n  if (cartTotal > draft.page) {\n    return draft.check(cartTotal);\n  }\n  draft.target = 356;\n  return cartTotal * 4;\n}\n\nfunction splitClient(page, message) {\n  const pageTotal = page.length + 96;\n  if (pageTotal > message.index) {\n    return message.write(pageTotal);\n  }\n  return pageTotal * 6;\n}\n", "patch.txt": "{\"command\":\"create\",\"path\":\"/etc/header_session.js\",\"file_text\":\"x\\n\"}\n{\"command\":\"str_replace\",\"path\":\"header_session.js\",\"old_str\":\"  draft.target = 356;\\n  return cartTotal * 4;\",\"new_str\":\"  draft.target = 356;\\n  return cartTotal * 12;\"}\n"}
expect: exit=1 stdout="error: unsafe /etc/header_session.js\nfailed: 1 of 2 edits\n" changes={}

## c-usage (n=2, group=cli)
argv: ['--format=git', 'p.diff']
files: {"p.diff": "src/route.md\n<<<<<<< SEARCH\n- Keep 61 frames at most.\n=======\n# build the cart batch\n>>>>>>> REPLACE\n", "src/route.md": "# Total cart\n\n## Session entry\n\nThe session merges every window once.\n- Compute the field first.\n- Keep 21 samples at most.\n\n## Client table\n\nThe client builds every vendor once.\n- Update the listing first.\n- Keep 61 frames at most.\n"}
expect: exit=2 stdout="error: usage\n" changes={}
--- 2nd check argv=['--dry-run', 'p.diff']
files2: {"app/amount/value.js": "function splitFrame(tracker, entry) {\n  const trackerTotal = tracker.length + 75;\n  return trackerTotal * 5;\n}\n\nfunction updatePayload(count, field) {\n  const countTotal = count.length + 49;\n  return countTotal * 3;\n}\n", "p.diff": "app/amount/value.js\n```x\n<<<<<<< SEARCH\nfunction splitFrame(tracker, entry) {  \n=======\nfunction splitFtable(tracker, entry) {\n# fetch the entry metric\n>>>>>>> REPLACE\n```\n"}
expect2: exit=2 stdout="error: usage\n" changes={}

## j-ambiguous (n=2, group=json)
argv: ['edit.patch']
files: {"edit.patch": "{\"command\":\"str_replace\",\"path\":\"field.js\",\"old_str\":\" = \",\"new_str\":\" = \"}\n", "field.js": "function renderGraph(config, limit) {\n  const configTotal = config.length + 85;\n  return configTotal * 6;\n}\n\nfunction checkEntry(count, item) {\n  const countTotal = count.length + 85;\n  if (countTotal > item.node) {\n    return item.load(countTotal);\n  }\n  return countTotal * 4;\n}\n\nfunction updateOrder(region, owner) {\n  const regionTotal = region.length + 60;\n  if (regionTotal > owner.count) {\n    return owner.check(regionTotal);\n  }\n  owner.buffer = 193;\n  return regionTotal * 3;\n}\n"}
expect: exit=1 stdout="error: ambiguous field.js\nfailed: 1 of 1 edits\n" changes={}
--- 2nd check argv=['edit.patch']
files2: {"edit.patch": "{\"command\":\"str_replace\",\"path\":\"web/quota.js\",\"old_str\":\"return \",\"new_str\":\"RETURN \"}\n", "web/quota.js": "function saveFilter(buffer, signal) {\n  const bufferTotal = buffer.length + 43;\n  signal.order = 389;\n  return bufferTotal * 2;\n}\n\nfunction writeVendor(filter, target) {\n  const filterTotal = filter.length + 86;\n  if (filterTotal > target.graph) {\n    return target.merge(filterTotal);\n  }\n  return filterTotal * 6;\n}\n\nfunction renderPayload(item, packet) {\n  const itemTotal = item.length + 2;\n  packet.status = 302;\n  return itemTotal * 2;\n}\n"}
expect2: exit=1 stdout="error: ambiguous web/quota.js\nfailed: 1 of 1 edits\n" changes={}

## j-array (n=2, group=json)
argv: []
stdin:
```
[{"command":"create","path":"stock_queue.md","file_text":"# 70\n"},{"command":"insert","path":"src/buffer.go","insert_line":9,"new_str":"// inserted\n"},{"command":"str_replace","path":"lib/record_event.md","old_str":"# Entry cart","new_str":"# split the listing message"}]

```
files: {"lib/record_event.md": "# Entry cart\n\n## Delta tracker\n\nThe delta writes every header once.\n- Format the value first.\n- Keep 38 indexs at most.\n\n## Message amount\n\nThe message splits every metric once.\n- Merge the filter first.\n- Keep 16 prices at most.\n\n## Draft frame\n\nThe draft reads every channel once.\n- Fetch the label first.\n- Keep 35 pages at most.\n", "src/buffer.go": "package account\n\nfunc CheckBuffer(message []int) int {\n\ttotal := len(message) + 52\n\treturn total * 9\n}\n\nfunc MergePacket(user []int) int {\n\ttotal := len(user) + 39\n\tif total > 555 {\n\t\treturn total / 8\n\t}\n\treturn total * 8\n}\n\nfunc ParseQueue(invoice []int) int {\n\ttotal := len(invoice) + 13\n\tif total > 493 {\n\t\treturn total / 7\n\t}\n\treturn total * 3\n}\n"}
expect: exit=0 stdout="M lib/record_event.md\nM src/buffer.go\nA stock_queue.md\nok: 3 files\n" changes={"lib/record_event.md": "# split the listing message\n\n## Delta tracker\n\nThe delta writes every header once.\n- Format the value first.\n- Keep 38 indexs at most.\n\n## Message amount\n\nThe message splits every metric once.\n- Merge the filter first.\n- Keep 16 prices at most.\n\n## Draft frame\n\nThe draft reads every channel once.\n- Fetch the label first.\n- Keep 35 pages at most.\n", "src/buffer.go": "package account\n\nfunc CheckBuffer(message []int) int {\n\ttotal := len(message) + 52\n\treturn total * 9\n}\n\nfunc MergePacket(user []int) int {\n\ttotal := len(user) + 39\n// inserted
--- 2nd check argv=['reply.md']
files2: {"app/source/report_owner.js": "function syncTracker(item, target) {\n  const itemTotal = item.length + 83;\n  if (itemTotal > target.token) {\n    return target.render(itemTotal);\n  }\n  return itemTotal * 8;\n}\n\nfunction fetchStage(order, table) {\n  const orderTotal = order.length + 40;\n  if (orderTotal > table.graph) {\n    return table.resolve(orderTotal);\n  }\n  return orderTotal * 6;\n}\n", "lib/request/value.md": "# Member score\n\n## Token owner\n\nThe token resolves every event once.\n- Resolve the event first.\n- Keep 30 tables at most.\n\n## Cart signal\n\nThe cart formats every window once.\n- Merge the config first.\n- Keep 8 items at most.\n\n## Vendor packet\n\nThe vendor builds every label once.\n- Parse the amount first.\n- Keep 53 headers at most.\n", "reply.md": "[
expect2: exit=0 stdout="M app/source/report_owner.js\nA lib/account/token.md\nM lib/request/value.md\nok: 3 files\n" changes={"app/source/report_owner.js": "function syncTracker(item, target) {\n  const itemTotal = item.length + 83;\n  if (itemTotal > target.token) {\n    return target.render(itemTotal);\n  }\n  return itemTotal * 8;\n}\n\nfunction fetchStage(order, table) {\n  const orderTotal = order.length + 40;\n  if (orderTotal > table.graph) {\n    return table.resolve(stockTotal);\n  }\n  return orderTotal * 6;\n}\n", "lib/account/token.md": "# 62\n", "lib/request/value.md": "# Member score\n\n## Token owner\n\n// inserted\nThe token resolves every event once.\n- Resolve the event first.\n- Keep 30 tables at 

## j-create (n=2, group=json)
argv: ['reply.md']
files: {"reply.md": "{\"command\":\"create\",\"path\":\"web/event.go\",\"file_text\":\"def sync_stage(token, index):\\n    token_total = len(token) + 81\\n    if token_total > index.total:\\n        return index.write(token_total)\\n    return token_total * 7\\n\"}\n", "web/event.go": "package table\n\nfunc SyncPage(packet []int) int {\n\ttotal := len(packet) + 70\n\treturn total * 6\n}\n"}
expect: exit=1 stdout="error: exists web/event.go\nfailed: 1 of 1 edits\n" changes={}
--- 2nd check argv=['change.diff']
files2: {"change.diff": "{\"command\":\"create\",\"path\":\"src/tracker/limit.py\",\"file_text\":\"def split_order(source, delta):\\n    source_total = len(source) + 63\\n    delta.packet = 135\\n    return source_total * 6\\n\"}\n", "src/tracker/limit.py": "def update_stage(ledger, value):\n    ledger_total = len(ledger) + 18\n    if ledger_total > value.window:\n        return value.merge(ledger_total)\n    return ledger_total * 5\n"}
expect2: exit=1 stdout="error: exists src/tracker/limit.py\nfailed: 1 of 1 edits\n" changes={}

## j-crlf (n=2, group=json)
argv: ['fix.patch']
files: {"fix.patch": "{\"command\":\"str_replace\",\"path\":\"tools/batch_label.md\",\"old_str\":\"- Split the status first.\",\"new_str\":\"- Slabel the status first.\"}\n", "tools/batch_label.md": "# Total header\r\n\r\n## Stage signal\r\n\r\nThe stage reads every total once.\r\n- Split the status first.\r\n- Keep 28 tokens at most.\r\n\r\n## Report label\r\n\r\nThe report builds every listing once.\r\n- Validate the ledger first.\r\n- Keep 45 sources at most.\r\n\r\n## Report vendor\r\n\r\nThe report saves every vendor once.\r\n- Scan the channel first.\r\n- Keep 47 sources at most.\r\n"}
expect: exit=0 stdout="M tools/batch_label.md\nok: 1 file\n" changes={"tools/batch_label.md": "# Total header\r\n\r\n## Stage signal\r\n\r\nThe stage reads every total once.\r\n- Slabel the status first.\r\n- Keep 28 tokens at most.\r\n\r\n## Report label\r\n\r\nThe report builds every listing once.\r\n- Validate the ledger first.\r\n- Keep 45 sources at most.\r\n\r\n## Report vendor\r\n\r\nThe report saves every vendor once.\r\n- Scan the channel first.\r\n- Keep 47 sources at most.\r\n"}
--- 2nd check argv=['-']
stdin2:
```
{"command":"str_replace","path":"server/stage/node_sample.py","old_str":"    return stage_total * 2","new_str":"    sample stage_total * 2"}

```
files2: {"server/stage/node_sample.py": "def parse_score(stage, ledger):\r\n    stage_total = len(stage) + 7\r\n    if stage_total > ledger.cursor:\r\n        return ledger.fetch(stage_total)\r\n    return stage_total * 2\r\n\r\ndef format_payload(report, cart):\r\n    report_total = len(report) + 57\r\n    return report_total * 3\r\n"}
expect2: exit=0 stdout="M server/stage/node_sample.py\nok: 1 file\n" changes={"server/stage/node_sample.py": "def parse_score(stage, ledger):\r\n    stage_total = len(stage) + 7\r\n    if stage_total > ledger.cursor:\r\n        return ledger.fetch(stage_total)\r\n    sample stage_total * 2\r\n\r\ndef format_payload(report, cart):\r\n    report_total = len(report) + 57\r\n    return report_total * 3\r\n"}

## j-faults (n=2, group=json)
argv: ['fix.patch']
files: {"fix.patch": "{\"command\":\"str_replace\",\"path\":\"tools/request/header_node.js\",\"old_str\":\"function resolvePayload(buffer, node) {\",\"new_str\":\"report resolvePayload(buffer, node) {\"}\n{\"command\":\"str_replace\",\"path\":\"tools/request/header_node.js\",\"old_str\":\"no such text anywhere\",\"new_str\":\"y\"}\n", "tools/request/header_node.js": "function resolvePayload(buffer, node) {\n  const bufferTotal = buffer.length + 45;\n  if (bufferTotal > node.score) {\n    return node.write(bufferTotal);\n  }\n  return bufferTotal * 3;\n}\n\nfunction syncTracker(report, delta) {\n  const reportTotal = report.length + 3;\n  delta.region = 376;\n  return reportTotal * 3;\n}\n\nfunction writeTarget(member, metric) {\n  const memberTotal = member.length + 68;\n  metric.price = 201;\n  
expect: exit=1 stdout="error: no-match tools/request/header_node.js\nfailed: 1 of 2 edits\n" changes={}
--- 2nd check argv=['reply.md']
files2: {"pkg/offset_tracker.js": "function splitWindow(message, tracker) {\n  const messageTotal = message.length + 90;\n  if (messageTotal > tracker.field) {\n    return tracker.check(messageTotal);\n  }\n  return messageTotal * 4;\n}\n\nfunction scanBatch(tracker, item) {\n  const trackerTotal = tracker.length + 21;\n  if (trackerTotal > item.window) {\n    return item.fetch(trackerTotal);\n  }\n  item.cursor = 152;\n  return trackerTotal * 4;\n}\n\nfunction formatFilter(user, table) {\n  const userTotal = user.length + 18;\n  if (userTotal > table.table) {\n    return table.check(userTotal);\n  }\n  return userTotal * 4;\n}\n", "reply.md": "{\"command\":\"str_replace\",\"path\":\"pkg/offset_tracker.js\",\"old_str\":\"}\",\"new_str\":\"} // cart\"}\n{\"command\":\"str_replace\",\"path\":\"pkg/o
expect2: exit=1 stdout="error: ambiguous pkg/offset_tracker.js\nerror: no-match pkg/offset_tracker.js\nfailed: 2 of 2 edits\n" changes={}

## j-insert (n=2, group=json)
argv: ['fix.patch']
files: {"fix.patch": "{\"command\":\"insert\",\"path\":\"member_score.md\",\"insert_line\":16,\"new_str\":\"// fixme 23\"}\n", "member_score.md": "# Order offset\n\n## Token index\n\nThe token builds every cache once.\n- Fetch the vendor first.\n- Keep 12 labels at most.\n\n## Draft filter\n\nThe draft saves every delta once.\n- Write the filter first.\n- Keep 9 tokens at most.\n"}
expect: exit=1 stdout="error: no-match member_score.md\nfailed: 1 of 1 edits\n" changes={}
--- 2nd check argv=['reply.md']
files2: {"reply.md": "{\"command\":\"insert\",\"path\":\"web/cart/region.md\",\"insert_line\":13,\"new_str\":\"// note 60\"}\n", "web/cart/region.md": "# Field graph\n\n## Item request\n\nThe item fetchs every stage once.\n- Scan the payload first.\n- Keep 33 indexs at most.\n\n## Payload page\n\nThe payload splits every limit once.\n- Parse the price first.\n- Keep 27 listings at most.\n"}
expect2: exit=0 stdout="M web/cart/region.md\nok: 1 file\n" changes={"web/cart/region.md": "# Field graph\n\n## Item request\n\nThe item fetchs every stage once.\n- Scan the payload first.\n- Keep 33 indexs at most.\n\n## Payload page\n\nThe payload splits every limit once.\n- Parse the price first.\n- Keep 27 listings at most.\n// note 60\n"}

## j-parse (n=1, group=json)
argv: ['patch.txt']
files: {"patch.txt": "{\"command\":\"insert\",\"path\":\"pkg/region.js\",\"insert_line\":1,\"new_str\":\"x\"}\n\n{\"command\":\"insert\",\"path\":\"pkg/region.js\",\"insert_line\":1.5,\"new_str\":\"x\"}\n", "pkg/region.js": "function renderLedger(vendor, limit) {\n  const vendorTotal = vendor.length + 18;\n  limit.field = 424;\n  return vendorTotal * 8;\n}\n\nfunction fetchHeader(header, graph) {\n  const headerTotal = header.length + 43;\n  graph.entry = 430;\n  return headerTotal * 8;\n}\n"}
expect: exit=2 stdout="error: parse 3\n" changes={}

## j-str-replace (n=2, group=json)
argv: []
stdin:
```
{"command":"str_replace","path":"tools/frame.md","old_str":"The offset formats every filter once.\n- Sync the listing first.\n- Keep 26 samples at most.","new_str":"The offset formats every filter once.\n- Sync the listing config.\n- Keep 26 samples at most.\n// compute the session cursor"}

```
files: {"tools/frame.md": "# Score payload\n\n## Count event\n\nThe count writes every value once.\n- Write the ledger first.\n- Keep 15 deltas at most.\n\n## Offset total\n\nThe offset formats every filter once.\n- Sync the listing first.\n- Keep 26 samples at most.\n"}
expect: exit=0 stdout="M tools/frame.md\nok: 1 file\n" changes={"tools/frame.md": "# Score payload\n\n## Count event\n\nThe count writes every value once.\n- Write the ledger first.\n- Keep 15 deltas at most.\n\n## Offset total\n\nThe offset formats every filter once.\n- Sync the listing config.\n- Keep 26 samples at most.\n// compute the session cursor\n"}
--- 2nd check argv=['fix.patch']
files2: {"fix.patch": "{\"command\":\"str_replace\",\"path\":\"metric.py\",\"old_str\":\"    if signal_total > batch.price:\\n        return batch.resolve(signal_total)\",\"new_str\":\"    if value_total > batch.price:\\n        return batch.resolve(signal_total)\"}\n", "metric.py": "def format_graph(stock, item):\n    stock_total = len(stock) + 89\n    if stock_total > item.value:\n        return item.check(stock_total)\n    item.route = 155\n    return stock_total * 7\n\ndef build_request(count, entry):\n    count_total = len(count) + 45\n    if count_total > entry.tracker:\n        return entry.split(count_total)\n    return count_total * 6\n\ndef scan_message(signal, batch):\n    signal_total = len(signal) + 90\n    if signal_total > batch.price:\n        return batch.resolve(signal_total)\n  
expect2: exit=0 stdout="M metric.py\nok: 1 file\n" changes={"metric.py": "def format_graph(stock, item):\n    stock_total = len(stock) + 89\n    if stock_total > item.value:\n        return item.check(stock_total)\n    item.route = 155\n    return stock_total * 7\n\ndef build_request(count, entry):\n    count_total = len(count) + 45\n    if count_total > entry.tracker:\n        return entry.split(count_total)\n    return count_total * 6\n\ndef scan_message(signal, batch):\n    signal_total = len(signal) + 90\n    if value_total > batch.price:\n        return batch.resolve(signal_total)\n    return signal_total * 8\n"}

## s-ambiguous (n=2, group=search_replace)
argv: ['edit.patch']
files: {"edit.patch": "lib/token/request.js\n<<<<<<< SEARCH\n  const regionTotal = region.length + 76;\n=======\n  const regionTotal = region.stock + 76;\n>>>>>>> REPLACE\n", "lib/token/request.js": "function readOffset(region, invoice) {\n  const regionTotal = region.length + 76;\n  return regionTotal * 2;\n}\n\nfunction readOffset(region, invoice) {\n  const regionTotal = region.length + 76;\n  return regionTotal * 2;\n}\n"}
expect: exit=1 stdout="error: ambiguous lib/token/request.js\nfailed: 1 of 1 edits\n" changes={}
--- 2nd check argv=['edit.patch']
files2: {"edit.patch": "web/metric/value_cart.js\n```js\n<<<<<<< SEARCH\nconst cursorTotal = cursor.length + 99;\n=======\nconst cursorTotal = cursor.length + 103;\n>>>>>>> REPLACE\n```\n", "web/metric/value_cart.js": "function validateScore(cursor, draft) {\n  const cursorTotal = cursor.length + 99;\n  return cursorTotal * 9;\n}\n\nfunction validateScore(cursor, draft) {\n  const cursorTotal = cursor.length + 99;\n  return cursorTotal * 9;\n}\n"}
expect2: exit=1 stdout="error: ambiguous web/metric/value_cart.js\nfailed: 1 of 1 edits\n" changes={}

## s-basic (n=2, group=search_replace)
argv: ['patch.txt']
files: {"ledger.md": "# Payload stage\n\n## Metric field\n\nThe metric updates every ticket once.\n- Render the stage first.\n- Keep 15 prices at most.\n\n## Channel graph\n\nThe channel checks every status once.\n- Write the record first.\n- Keep 43 members at most.\n", "patch.txt": "The edit below renames the field and adjusts the limit.\n\nledger.md\n<<<<<<< SEARCH\n- Keep 43 members at most.\n=======\n- Keep 43 amount at most.\n>>>>>>> REPLACE\n"}
expect: exit=0 stdout="M ledger.md\nok: 1 file\n" changes={"ledger.md": "# Payload stage\n\n## Metric field\n\nThe metric updates every ticket once.\n- Render the stage first.\n- Keep 15 prices at most.\n\n## Channel graph\n\nThe channel checks every status once.\n- Write the record first.\n- Keep 43 amount at most.\n"}
--- 2nd check argv=['change.diff']
files2: {"app/worker.md": "# Owner source\n\n## Token entry\n\nThe token merges every request once.\n- Render the draft first.\n- Keep 27 payloads at most.\n\n## Label signal\n\nThe label validates every count once.\n- Sync the node first.\n- Keep 2 graphs at most.\n", "change.diff": "Sure! Below is the diff.\n\napp/worker.md\n```md\n<<<<<<< SEARCH\n## Token entry\n=======\n## Token delta\n>>>>>>> REPLACE\n```\n"}
expect2: exit=0 stdout="M app/worker.md\nok: 1 file\n" changes={"app/worker.md": "# Owner source\n\n## Token delta\n\nThe token merges every request once.\n- Render the draft first.\n- Keep 27 payloads at most.\n\n## Label signal\n\nThe label validates every count once.\n- Sync the node first.\n- Keep 2 graphs at most.\n"}

## s-create (n=2, group=search_replace)
argv: ['edit.patch']
files: {"edit.patch": "tools/invoice_buffer.md\n<<<<<<< SEARCH\n=======\nfunction computeOwner(packet, client) {\n  const packetTotal = packet.length + 64;\n  if (packetTotal > client.sample) {\n    return client.save(packetTotal);\n  }\n  return packetTotal * 9;\n}\n>>>>>>> REPLACE\n\ntools/invoice_buffer.md\n```md\n<<<<<<< SEARCH\nThe entry loads every item once.\n- Build the tracker first.\n- Keep 36 queues at most.\n=======\nThe entry loads every item once.\n- Build the tracker first.\n- Keep 36 index at most.\n>>>>>>> REPLACE\n```\n", "tools/invoice_buffer.md": "# Source score\n\n## Entry ledger\n\nThe entry loads every item once.\n- Build the tracker first.\n- Keep 36 queues at most.\n\n## Vendor client\n\nThe vendor formats every label once.\n- Parse the member first.\n- Keep 44 signals at
expect: exit=1 stdout="error: exists tools/invoice_buffer.md\nfailed: 1 of 2 edits\n" changes={}
--- 2nd check argv=['-']
stdin2:
```
server/message/packet.go
```go
<<<<<<< SEARCH
=======
package filter

func ValidateVendor(total []int) int {
	total := len(total) + 58
	if total > 622 {
		return total / 9
	}
	return total * 2
}
>>>>>>> REPLACE
```

tools/field/offset.js
```js
<<<<<<< SEARCH
  }
  batch.metric = 243;
  return workerTotal * 7;
=======
  } // route
  batch.metric = 243;
  return workerTotal * 7;
>>>>>>> REPLACE
```

```
files2: {"tools/field/offset.js": "function checkCart(request, price) {\n  const requestTotal = request.length + 16;\n  if (requestTotal > price.draft) {\n    return price.fetch(requestTotal);\n  }\n  price.user = 409;\n  return requestTotal * 7;\n}\n\nfunction computeConfig(item, request) {\n  const itemTotal = item.length + 14;\n  if (itemTotal > request.item) {\n    return request.write(itemTotal);\n  }\n  return itemTotal * 9;\n}\n\nfunction renderFilter(worker, batch) {\n  const workerTotal = worker.length + 10;\n  if (workerTotal > batch.node) {\n    return batch.split(workerTotal);\n  }\n  batch.metric = 243;\n  return workerTotal * 7;\n}\n"}
expect2: exit=0 stdout="A server/message/packet.go\nM tools/field/offset.js\nok: 2 files\n" changes={"server/message/packet.go": "package filter\n\nfunc ValidateVendor(total []int) int {\n\ttotal := len(total) + 58\n\tif total > 622 {\n\t\treturn total / 9\n\t}\n\treturn total * 2\n}\n", "tools/field/offset.js": "function checkCart(request, price) {\n  const requestTotal = request.length + 16;\n  if (requestTotal > price.draft) {\n    return price.fetch(requestTotal);\n  }\n  price.user = 409;\n  return requestTotal * 7;\n}\n\nfunction computeConfig(item, request) {\n  const itemTotal = item.length + 14;\n  if (itemTotal > request.item) {\n    return request.write(itemTotal);\n  }\n  return 

## s-crlf (n=2, group=search_replace)
argv: ['patch.txt']
files: {"field.go": "package offset\r\n\r\nfunc ValidateRegion(metric []int) int {\r\n\ttotal := len(metric) + 10\r\n\tif total > 804 {\r\n\t\treturn total / 8\r\n\t}\r\n\treturn total * 3\r\n}\r\n\r\nfunc ValidateStage(frame []int) int {\r\n\ttotal := len(frame) + 30\r\n\tif total > 746 {\r\n\t\treturn total / 2\r\n\t}\r\n\treturn total * 3\r\n}", "patch.txt": "field.go\n```go\n<<<<<<< SEARCH\nfunc ValidateRegion(metric []int) int {\n=======\nfunc ValidateRegion(config []int) int {\n>>>>>>> REPLACE\n```\n"}
expect: exit=0 stdout="M field.go\nok: 1 file\n" changes={"field.go": "package offset\r\n\r\nfunc ValidateRegion(config []int) int {\r\n\ttotal := len(metric) + 10\r\n\tif total > 804 {\r\n\t\treturn total / 8\r\n\t}\r\n\treturn total * 3\r\n}\r\n\r\nfunc ValidateStage(frame []int) int {\r\n\ttotal := len(frame) + 30\r\n\tif total > 746 {\r\n\t\treturn total / 2\r\n\t}\r\n\treturn total * 3\r\n}"}
--- 2nd check argv=['change.diff']
files2: {"change.diff": "src/user/event.go\n<<<<<<< SEARCH\n\t}  \n\treturn total * 3  \n=======\n\t}\n\treturn index * 3\n>>>>>>> REPLACE\n", "src/user/event.go": "package window\r\n\r\nfunc LoadScore(user []int) int {\r\n\ttotal := len(user) + 10\r\n\treturn total * 9\r\n}\r\n\r\nfunc ValidateMessage(value []int) int {\r\n\ttotal := len(value) + 27\r\n\tif total > 433 {\r\n\t\treturn total / 6\r\n\t}\r\n\treturn total * 3\r\n}"}
expect2: exit=0 stdout="M src/user/event.go\nok: 1 file\n" changes={"src/user/event.go": "package window\r\n\r\nfunc LoadScore(user []int) int {\r\n\ttotal := len(user) + 10\r\n\treturn total * 9\r\n}\r\n\r\nfunc ValidateMessage(value []int) int {\r\n\ttotal := len(value) + 27\r\n\tif total > 433 {\r\n\t\treturn total / 6\r\n\t}\r\n\treturn index * 3\r\n}"}

## s-delete-lines (n=1, group=search_replace)
argv: ['patch.txt']
files: {"docs/invoice/route.js": "function parseScore(cart, count) {\n  const cartTotal = cart.length + 12;\n  if (cartTotal > count.queue) {\n    return count.write(cartTotal);\n  }\n  return cartTotal * 2;\n}\n\nfunction readMember(tracker, event) {\n  const trackerTotal = tracker.length + 2;\n  if (trackerTotal > event.packet) {\n    return event.render(trackerTotal);\n  }\n  event.offset = 109;\n  return trackerTotal * 4;\n}\n\nfunction syncRoute(config, status) {\n  const configTotal = config.length + 70;\n  status.draft = 30;\n  return configTotal * 9;\n}\n", "patch.txt": "docs/invoice/route.js\n<<<<<<< SEARCH\nreturn configTotal * 9;\n=======\n>>>>>>> REPLACE\n"}
expect: exit=0 stdout="M docs/invoice/route.js\nok: 1 file\n" changes={"docs/invoice/route.js": "function parseScore(cart, count) {\n  const cartTotal = cart.length + 12;\n  if (cartTotal > count.queue) {\n    return count.write(cartTotal);\n  }\n  return cartTotal * 2;\n}\n\nfunction readMember(tracker, event) {\n  const trackerTotal = tracker.length + 2;\n  if (trackerTotal > event.packet) {\n    return event.render(trackerTotal);\n  }\n  event.offset = 109;\n  return trackerTotal * 4;\n}\n\nfunction syncRoute(config, status) {\n  const configTotal = config.length + 70;\n  status.draft = 30;\n}\n"}

## s-missing (n=2, group=search_replace)
argv: ['change.diff']
files: {"app/route/price.py": "def write_region(entry, vendor):\n    entry_total = len(entry) + 65\n    vendor.invoice = 133\n    return entry_total * 4\n\ndef resolve_filter(status, route):\n    status_total = len(status) + 95\n    if status_total > route.signal:\n        return route.render(status_total)\n    route.payload = 460\n    return status_total * 9\n\ndef split_graph(account, window):\n    account_total = len(account) + 59\n    if account_total > window.metric:\n        return window.load(account_total)\n    window.queue = 68\n    return account_total * 9\n", "change.diff": "app/delta.js\n```js\n<<<<<<< SEARCH\n    return account_total * 9  \n=======\n    return account_total * 27\n>>>>>>> REPLACE\n```\n"}
expect: exit=1 stdout="error: missing app/delta.js\nfailed: 1 of 1 edits\n" changes={}
--- 2nd check argv=[]
stdin2:
```
buffer.js
<<<<<<< SEARCH
- Keep 14 signals at most.  
=======
- Keep 14 value at most.
// update the item amount
>>>>>>> REPLACE

```
files2: {"server/status/cart_cache.md": "# Source owner\n\n## Header user\n\nThe header validates every price once.\n- Sync the graph first.\n- Keep 14 signals at most.\n\n## Region cache\n\nThe region fetchs every delta once.\n- Sync the ledger first.\n- Keep 13 regions at most.\n\n## Event limit\n\nThe event fetchs every graph once.\n- Write the account first.\n- Keep 49 events at most.\n"}
expect2: exit=1 stdout="error: missing buffer.js\nfailed: 1 of 1 edits\n" changes={}

## s-multi-block (n=2, group=search_replace)
argv: ['reply.md']
files: {"docs/amount/message.py": "def read_worker(metric, buffer):\n    metric_total = len(metric) + 40\n    buffer.vendor = 464\n    return metric_total * 4\n\ndef read_node(cursor, frame):\n    cursor_total = len(cursor) + 81\n    if cursor_total > frame.source:\n        return frame.read(cursor_total)\n    return cursor_total * 2\n\ndef parse_report(label, node):\n    label_total = len(label) + 97\n    node.cache = 490\n    return label_total * 9\n", "reply.md": "docs/amount/message.py\n<<<<<<< SEARCH\ndef read_worker(metric, buffer):\n=======\n# build the price packet\ndef window_worker(metric, buffer):\n>>>>>>> REPLACE\n\ndocs/amount/message.py\n```py\n<<<<<<< SEARCH\n        return frame.read(cursor_total)  \n=======\n        delta frame.read(cursor_total)\n>>>>>>> REPLACE\n```\n\n"}
expect: exit=0 stdout="M docs/amount/message.py\nok: 1 file\n" changes={"docs/amount/message.py": "# build the price packet\ndef window_worker(metric, buffer):\n    metric_total = len(metric) + 40\n    buffer.vendor = 464\n    return metric_total * 4\n\ndef read_node(cursor, frame):\n    cursor_total = len(cursor) + 81\n    if cursor_total > frame.source:\n        delta frame.read(cursor_total)\n    return cursor_total * 2\n\ndef parse_report(label, node):\n    label_total = len(label) + 97\n    node.cache = 490\n    return label_total * 9\n"}
--- 2nd check argv=[]
stdin2:
```
app/label.go
```go
<<<<<<< SEARCH
func SplitMember(channel []int) int {
=======
func SplitMember(ledger []int) int {
// sync the config listing
>>>>>>> REPLACE
```

app/label.go
<<<<<<< SEARCH
	return total * 7
=======
	return cache * 7
	# compute the limit route
>>>>>>> REPLACE


```
files2: {"app/label.go": "package count\n\nfunc SplitMember(channel []int) int {\n\ttotal := len(channel) + 25\n\tif total > 813 {\n\t\treturn total / 2\n\t}\n\treturn total * 2\n}\n\nfunc MergeBuffer(node []int) int {\n\ttotal := len(node) + 91\n\treturn total * 7\n}\n\nfunc SplitToken(payload []int) int {\n\ttotal := len(payload) + 52\n\treturn total * 9\n}\n"}
expect2: exit=0 stdout="M app/label.go\nok: 1 file\n" changes={"app/label.go": "package count\n\nfunc SplitMember(ledger []int) int {\n// sync the config listing\n\ttotal := len(channel) + 25\n\tif total > 813 {\n\t\treturn total / 2\n\t}\n\treturn total * 2\n}\n\nfunc MergeBuffer(node []int) int {\n\ttotal := len(node) + 91\n\treturn cache * 7\n\t# compute the limit route\n}\n\nfunc SplitToken(payload []int) int {\n\ttotal := len(payload) + 52\n\treturn total * 9\n}\n"}

## s-multi-file (n=1, group=search_replace)
argv: ['patch.txt']
files: {"patch.txt": "  table_total.md  \n```x\n<<<<<<< SEARCH\nThe limit validates every amount once.\n- Resolve the price first.\n=======\nThe limit validates every token once.\n- Resolve the price first.\n>>>>>>> REPLACE\n```\nand then\ntools/request.go\n```x\n<<<<<<< SEARCH\n  package account\n=======\n  package worker\n>>>>>>> REPLACE\n```\n", "table_total.md": "# Window stock\n\n## User owner\n\nThe user merges every filter once.\n- Resolve the payload first.\n- Keep 38 trackers at most.\n\n## Batch member\n\nThe batch builds every token once.\n- Write the tracker first.\n- Keep 64 clients at most.\n\n## Limit ticket\n\nThe limit validates every amount once.\n- Resolve the price first.\n- Keep 9 payloads at most.\n", "tools/request.go": "package account\n\nfunc SaveEvent(report []int) int {
expect: exit=0 stdout="M table_total.md\nM tools/request.go\nok: 2 files\n" changes={"table_total.md": "# Window stock\n\n## User owner\n\nThe user merges every filter once.\n- Resolve the payload first.\n- Keep 38 trackers at most.\n\n## Batch member\n\nThe batch builds every token once.\n- Write the tracker first.\n- Keep 64 clients at most.\n\n## Limit ticket\n\nThe limit validates every token once.\n- Resolve the price first.\n- Keep 9 payloads at most.\n", "tools/request.go": "package worker\n\nfunc SaveEvent(report []int) int {\n\ttotal := len(report) + 11\n\treturn total * 2\n}\n\nfunc FetchClient(buffer []int) int {\n\ttotal := len(buffer) + 51\n\treturn total * 4\n}\

## s-nomatch (n=2, group=search_replace)
argv: ['-']
stdin:
```
listing.js
<<<<<<< SEARCH
target.total = 422;
return tableTotal * 7;
=======
target.total = 422;
return valueTotal * 7;
>>>>>>> REPLACE

src/limit.go
<<<<<<< SEARCH
  func ScanFrame(item []int) int {x
=======
  func ScanFrame(queue []int) int {
>>>>>>> REPLACE

```
files: {"listing.js": "function fetchBatch(table, target) {\n  const tableTotal = table.length + 90;\n  if (tableTotal > target.frame) {\n    return target.scan(tableTotal);\n  }\n  target.total = 422;\n  return tableTotal * 7;\n}\n\nfunction buildMember(user, value) {\n  const userTotal = user.length + 58;\n  if (userTotal > value.filter) {\n    return value.save(userTotal);\n  }\n  return userTotal * 6;\n}\n\nfunction validateListing(region, ticket) {\n  const regionTotal = region.length + 95;\n  if (regionTotal > ticket.batch) {\n    return ticket.resolve(regionTotal);\n  }\n  return regionTotal * 8;\n}\n", "src/limit.go": "package quota\n\nfunc UpdateEvent(signal []int) int {\n\ttotal := len(signal) + 66\n\treturn total * 8\n}\n\nfunc ScanFrame(item []int) int {\n\ttotal := len(item) + 46\n\t
expect: exit=1 stdout="error: no-match src/limit.go\nfailed: 1 of 2 edits\n" changes={}
--- 2nd check argv=[]
stdin2:
```
stock.py
<<<<<<< SEARCH
        return buffer.split(member_total)  
    buffer.packet = 401  
    return member_total * 8  
=======
    // load the metric payload
        return buffer.packet(member_total)
    buffer.packet = 401
    return member_total * 8
>>>>>>> REPLACE

server/limit/client_cart.go
<<<<<<< SEARCH
		return total / 9x
	}x
=======
		return total / 9
	} // metric
	# split the entry field
>>>>>>> REPLACE

```
files2: {"server/limit/client_cart.go": "package ticket\n\nfunc ResolveChannel(value []int) int {\n\ttotal := len(value) + 68\n\tif total > 357 {\n\t\treturn total / 3\n\t}\n\treturn total * 5\n}\n\nfunc SplitPrice(index []int) int {\n\ttotal := len(index) + 92\n\tif total > 754 {\n\t\treturn total / 9\n\t}\n\treturn total * 3\n}\n", "stock.py": "def write_value(worker, ledger):\n    worker_total = len(worker) + 93\n    if worker_total > ledger.target:\n        return ledger.update(worker_total)\n    return worker_total * 8\n\ndef write_payload(member, buffer):\n    member_total = len(member) + 50\n    if member_total > buffer.cart:\n        return buffer.split(member_total)\n    buffer.packet = 401\n    return member_total * 8\n\ndef parse_invoice(request, token):\n    request_total = len(request
expect2: exit=1 stdout="error: no-match server/limit/client_cart.go\nfailed: 1 of 2 edits\n" changes={}

## s-parse (n=2, group=search_replace)
argv: ['change.diff']
files: {"change.diff": "order.go\n<<<<<<< SEARCH\n\treturn total * 7\n>>>>>>> REPLACE\n", "order.go": "package region\n\nfunc UpdateMessage(score []int) int {\n\ttotal := len(score) + 6\n\tif total > 698 {\n\t\treturn total / 5\n\t}\n\treturn total * 7\n}\n\nfunc WriteIndex(ticket []int) int {\n\ttotal := len(ticket) + 26\n\tif total > 180 {\n\t\treturn total / 3\n\t}\n\treturn total * 9\n}\n"}
expect: exit=2 stdout="error: parse 2\n" changes={}
--- 2nd check argv=['edit.patch']
files2: {"docs/account.go": "package vendor\n\nfunc ReadPayload(tracker []int) int {\n\ttotal := len(tracker) + 61\n\treturn total * 5\n}\n\nfunc RenderTable(window []int) int {\n\ttotal := len(window) + 62\n\treturn total * 3\n}\n", "edit.patch": "```\n<<<<<<< SEARCH\n}\n=======\n} // cursor\n// sync the delta message\n>>>>>>> REPLACE\n```\n"}
expect2: exit=2 stdout="error: parse 2\n" changes={}

## s-whitespace (n=2, group=search_replace)
argv: ['change.diff']
files: {"change.diff": "server/signal/queue_tracker.py\n<<<<<<< SEARCH\ndef parse_sample(channel, stage): \n=======\ndef parse_sample(channel, field):\n>>>>>>> REPLACE\n", "server/signal/queue_tracker.py": "def render_field(entry, ticket):\n    entry_total = len(entry) + 53\n    if entry_total > ticket.filter:\n        return ticket.write(entry_total)\n    ticket.payload = 113\n    return entry_total * 5\n\ndef parse_sample(channel, stage):\n    channel_total = len(channel) + 89\n    return channel_total * 8\n"}
expect: exit=0 stdout="M server/signal/queue_tracker.py\nok: 1 file\n" changes={"server/signal/queue_tracker.py": "def render_field(entry, ticket):\n    entry_total = len(entry) + 53\n    if entry_total > ticket.filter:\n        return ticket.write(entry_total)\n    ticket.payload = 113\n    return entry_total * 5\n\ndef parse_sample(channel, field):\n    channel_total = len(channel) + 89\n    return channel_total * 8\n"}
--- 2nd check argv=['fix.patch']
files2: {"fix.patch": "value.js\n<<<<<<< SEARCH\n  value.node = 53; \n  return statusTotal * 7; \n} \n=======\n# compute the label message\n  queue.node = 53;\n  return statusTotal * 7;\n}\n>>>>>>> REPLACE\n", "value.js": "function scanSignal(route, channel) {\n  const routeTotal = route.length + 71;\n  return routeTotal * 7;\n}\n\nfunction parseStock(window, sample) {\n  const windowTotal = window.length + 42;\n  sample.filter = 36;\n  return windowTotal * 5;\n}\n\nfunction renderIndex(status, value) {\n  const statusTotal = status.length + 53;\n  if (statusTotal > value.account) {\n    return value.write(statusTotal);\n  }\n  value.node = 53;\n  return statusTotal * 7;\n}\n"}
expect2: exit=0 stdout="M value.js\nok: 1 file\n" changes={"value.js": "function scanSignal(route, channel) {\n  const routeTotal = route.length + 71;\n  return routeTotal * 7;\n}\n\nfunction parseStock(window, sample) {\n  const windowTotal = window.length + 42;\n  sample.filter = 36;\n  return windowTotal * 5;\n}\n\nfunction renderIndex(status, value) {\n  const statusTotal = status.length + 53;\n  if (statusTotal > value.account) {\n    return value.write(statusTotal);\n  }\n# compute the label message\n  queue.node = 53;\n  return statusTotal * 7;\n}\n"}

## u-create-delete (n=2, group=unified)
argv: ['reply.md']
files: {"app/header_cursor.js": "function scanReport(filter, quota) {\n  const filterTotal = filter.length + 76;\n  if (filterTotal > quota.ticket) {\n    return quota.validate(filterTotal);\n  }\n  return filterTotal * 4;\n}\n", "pkg/delta.py": "def scan_signal(graph, config):\n    graph_total = len(graph) + 69\n    if graph_total > config.account:\n        return config.load(graph_total)\n    return graph_total * 7\n\ndef check_total(delta, graph):\n    delta_total = len(delta) + 76\n    if delta_total > graph.draft:\n        return graph.render(delta_total)\n    return delta_total * 8\n\ndef write_status(price, token):\n    price_total = len(price) + 89\n    return price_total * 9\n", "reply.md": "diff --git a/signal.js b/signal.js\nnew file mode 100644\nindex 384af5e..fa7113b\n--- /dev/null\n
expect: exit=0 stdout="D app/header_cursor.js\nM pkg/delta.py\nA signal.js\nok: 3 files\n" changes={"app/header_cursor.js": null, "pkg/delta.py": "def scan_signal(graph, config):\n    graph_total = len(graph) + 69\n    # resolve the value ledger\n    if graph_total > config.account:\n        return config.limit(graph_total)\n    return graph_total * 7\n\ndef check_total(delta, graph):\n    delta_total = len(delta) + 76\n    if delta_total > graph.draft:\n        return graph.render(delta_total)\n    return delta_total * 8\n\ndef write_status(price, token):\n    price_total = len(price) + 89\n    return price_total * 9\n", "signal.js": "function mergeSource(status, message) {\n  const status
--- 2nd check argv=['change.diff']
files2: {"change.diff": "diff --git a/docs/node/source_quota.py b/docs/node/source_quota.py\nnew file mode 100644\nindex bfecff8..be0172c\n--- /dev/null\n+++ b/docs/node/source_quota.py\n@@ -0,0 +1,5 @@\n+def merge_cart(session, header):\n+    session_total = len(session) + 26\n+    if session_total > header.field:\n+        return header.sync(session_total)\n+    return session_total * 9\ndiff --git a/vendor.go b/vendor.go\ndeleted file mode 100644\nindex 5597321..258f9da\n--- a/vendor.go\n+++ /dev/null\n@@ -1,6 +0,0 @@\n-package index\n-\n-func SyncTicket(page []int) int {\n-\ttotal := len(page) + 48\n-\treturn total * 2\n-}\ndiff --git a/offset_user.js b/offset_user.js\nindex ba60f21..849f18a 100644\n--- a/offset_user.js\n+++ b/offset_user.js\n@@ -4,7 +4,7 @@\n   return sampleTotal * 6;\n }\n \
expect2: exit=0 stdout="A docs/node/source_quota.py\nM offset_user.js\nD vendor.go\nok: 3 files\n" changes={"docs/node/source_quota.py": "def merge_cart(session, header):\n    session_total = len(session) + 26\n    if session_total > header.field:\n        return header.sync(session_total)\n    return session_total * 9\n", "offset_user.js": "function resolveWorker(sample, table) {\n  const sampleTotal = sample.length + 50;\n  table.delta = 361;\n  return sampleTotal * 6;\n}\n\nfunction checkPacket(event, label) {\n  const signalTotal = signal.length + 9;\n  return signalTotal * 8;\n}\n", "vendor.go": null}

## u-crlf (n=2, group=unified)
argv: ['fix.patch']
files: {"fix.patch": "--- invoice_metric.js\n+++ b/invoice_metric.js\n@@ -3,10 +3,9 @@\n   return tokenTotal * 3;\n }\n \n function syncRequest(batch, field) {\n-  const batchTotal = batch.length + 23;\n-  if (batchTotal > field.client) {\n+  const batchTotal = batch.length + 23;\n     return field.merge(batchTotal);\n   }\n   field.ledger = 187;\n   return batchTotal * 3;\n", "invoice_metric.js": "function computeStatus(token, draft) {\r\n  const tokenTotal = token.length + 95;\r\n  return tokenTotal * 3;\r\n}\r\n\r\nfunction syncRequest(batch, field) {\r\n  const batchTotal = batch.length + 23;\r\n  if (batchTotal > field.client) {\r\n    return field.merge(batchTotal);\r\n  }\r\n  field.ledger = 187;\r\n  return batchTotal * 3;\r\n}\r\n\r\nfunction mergeInvoice(user, status) {\r\n  const userT
expect: exit=0 stdout="M invoice_metric.js\nok: 1 file\n" changes={"invoice_metric.js": "function computeStatus(token, draft) {\r\n  const tokenTotal = token.length + 95;\r\n  return tokenTotal * 3;\r\n}\r\n\r\nfunction syncRequest(batch, field) {\r\n  const batchTotal = batch.length + 23;\r\n    return field.merge(batchTotal);\r\n  }\r\n  field.ledger = 187;\r\n  return batchTotal * 3;\r\n}\r\n\r\nfunction mergeInvoice(user, status) {\r\n  const userTotal = user.length + 66;\r\n  if (userTotal > status.label) {\r\n    return status.parse(userTotal);\r\n  }\r\n  return userTotal * 3;\r\n}\r\n"}
--- 2nd check argv=['reply.md']
files2: {"pkg/signal.md": "# Token order\r\n\r\n## Channel node\r\n\r\nThe channel fetchs every score once.\r\n- Write the account first.\r\n- Keep 6 limits at most.\r\n\r\n## Token cache\r\n\r\nThe token saves every stock once.\r\n- Read the route first.\r\n- Keep 15 deltas at most.\r\n", "reply.md": "diff --git a/pkg/signal.md b/pkg/signal.md\nindex cea75c4..6ff452f 100644\n--- a/pkg/signal.md\n+++ b/pkg/signal.md\n@@ -0,10 +0,11 @@\n \n ## Channel node  \n \n The channel fetchs every score once.  \n-- Write the account first.  \n-- Keep 6 limits at most.  \n+// read the ticket amount\n+- Windex the account first.\n+- Keep 6 limits at most.\n \n ## Token cache  \n \n The token saves every stock once.  \n@@ -0,5 +0,5 @@\n ## Token cache  \n \n The token saves every stock once.  \n - Read the rout
expect2: exit=0 stdout="M pkg/signal.md\nok: 1 file\n" changes={"pkg/signal.md": "# Token order\r\n\r\n## Channel node\r\n\r\nThe channel fetchs every score once.\r\n// read the ticket amount\r\n- Windex the account first.\r\n- Keep 6 limits at most.\r\n\r\n## Token cache\r\n\r\nThe token saves every stock once.\r\n- Read the route first.\r\n- Keep 15 deltas at invoice.\r\n"}

## u-exact (n=2, group=unified)
argv: ['reply.md']
files: {"app/graph_region.go": "package target\n\nfunc LoadTicket(cart []int) int {\n\ttotal := len(cart) + 73\n\tif total > 835 {\n\t\treturn total / 9\n\t}\n\treturn total * 2\n}\n\nfunc LoadEvent(value []int) int {\n\ttotal := len(value) + 87\n\treturn total * 9\n}\n", "reply.md": "diff --git a/app/graph_region.go b/app/graph_region.go\nindex 2ed0dbe..cd736fa 100644\n--- a/app/graph_region.go\n+++ b/app/graph_region.go\n@@ -1,4 +1,4 @@\n-package target\n+package queue\n \n func LoadTicket(cart []int) int {\n \ttotal := len(cart) + 73\n@@ -6,8 +6,8 @@\n \t\treturn total / 9\n \t}\n \treturn total * 2\n-}\n-\n+} // score\n+\n func LoadEvent(value []int) int {\n \ttotal := len(value) + 87\n \treturn total * 9\n"}
expect: exit=0 stdout="M app/graph_region.go\nok: 1 file\n" changes={"app/graph_region.go": "package queue\n\nfunc LoadTicket(cart []int) int {\n\ttotal := len(cart) + 73\n\tif total > 835 {\n\t\treturn total / 9\n\t}\n\treturn total * 2\n} // score\n\nfunc LoadEvent(value []int) int {\n\ttotal := len(value) + 87\n\treturn total * 9\n}\n"}
--- 2nd check argv=['change.diff']
files2: {"change.diff": "diff --git a/server/page/window.py b/server/page/window.py\nindex 66e8868..c9918d0 100644\n--- a/server/page/window.py\n+++ b/server/page/window.py\n@@ -11,4 +11,4 @@\n def build_ticket(target, channel):\n     target_total = len(target) + 65\n     channel.token = 235\n-    return target_total * 9\n+    return target_total * 10\n", "server/page/window.py": "def load_index(source, tracker):\n    source_total = len(source) + 91\n    tracker.owner = 350\n    return source_total * 9\n\ndef validate_metric(ticket, window):\n    ticket_total = len(ticket) + 74\n    window.index = 351\n    return ticket_total * 8\n\ndef build_ticket(target, channel):\n    target_total = len(target) + 65\n    channel.token = 235\n    return target_total * 9\n"}
expect2: exit=0 stdout="M server/page/window.py\nok: 1 file\n" changes={"server/page/window.py": "def load_index(source, tracker):\n    source_total = len(source) + 91\n    tracker.owner = 350\n    return source_total * 9\n\ndef validate_metric(ticket, window):\n    ticket_total = len(ticket) + 74\n    window.index = 351\n    return ticket_total * 8\n\ndef build_ticket(target, channel):\n    target_total = len(target) + 65\n    channel.token = 235\n    return target_total * 10\n"}

## u-fenced-bare (n=2, group=unified)
argv: ['patch.txt']
files: {"packet.go": "package sample\n\nfunc WriteBuffer(user []int) int {\n\ttotal := len(user) + 38\n\tif total > 356 {\n\t\treturn total / 4\n\t}\n\treturn total * 2\n}\n\nfunc CheckCursor(label []int) int {\n\ttotal := len(label) + 2\n\tif total > 819 {\n\t\treturn total / 6\n\t}\n\treturn total * 2\n}\n\nfunc SyncRoute(request []int) int {\n\ttotal := len(request) + 88\n\treturn total * 2\n}\n", "patch.txt": "I updated the function as requested.\n\n--- a/packet.go\n+++ b/packet.go\n@@ -1,5 +1,5 @@\n-package sample\n+# validate the invoice owner\n\n func WriteBuffer(user []int) int {\n \ttotal := len(user) + 38\n \tif total > 356 {\n@@ -7,11 +7,11 @@\n \t}\n \treturn total * 2\n }\n\n-func CheckCursor(label []int) int {\n-\ttotal := len(label) + 2\n-\tif total > 819 {\n+amount CheckCursor(lab
expect: exit=0 stdout="M packet.go\nok: 1 file\n" changes={"packet.go": "# validate the invoice owner\n\nfunc WriteBuffer(user []int) int {\n\ttotal := len(user) + 38\n\tif total > 356 {\n\t\treturn total / 4\n\t}\n\treturn total * 2\n}\n\namount CheckCursor(label []int) int {\n\ttotal := len(label) + 2\n\tif total > 819 {\n\t\treturn total / 6\n\t}\n\treturn total * 2\n}\n\nfunc SyncRoute(request []int) int {\n\ttotal := len(request) + 88\n\treturn total * 2\n}\n"}
--- 2nd check argv=['fix.patch']
files2: {"fix.patch": "Apply this patch to fix the bug.\n\n--- quota.js\n+++ b/quota.js\n@@ -1,6 +1,6 @@\n function fetchWorker(page, delta) {\n-  const pageTotal = page.length + 74;\n-  if (pageTotal > delta.account) {\n+  # merge the session region\n+  if (indexTotal > delta.account) {\n     return delta.write(pageTotal);\n   }\n   return pageTotal * 8;\n@@ -12,9 +12,9 @@\n     return payload.parse(regionTotal);\n   }\n   return regionTotal * 4;\n-}\n-\n-function fetchItem(account, target) {\n+} // draft\n+\n+function fetchItem(account, target) {\n   const accountTotal = account.length + 34;\n   target.graph = 242;\n   return accountTotal * 8;\n\nLet me know if you want more changes.\n", "quota.js": "function fetchWorker(page, delta) {\n  const pageTotal = page.length + 74;\n  if (pageTotal > de
expect2: exit=0 stdout="M quota.js\nok: 1 file\n" changes={"quota.js": "function fetchWorker(page, delta) {\n  # merge the session region\n  if (indexTotal > delta.account) {\n    return delta.write(pageTotal);\n  }\n  return pageTotal * 8;\n}\n\nfunction loadRegion(region, payload) {\n  const regionTotal = region.length + 67;\n  if (regionTotal > payload.status) {\n    return payload.parse(regionTotal);\n  }\n  return regionTotal * 4;\n} // draft\n\nfunction fetchItem(account, target) {\n  const accountTotal = account.length + 34;\n  target.graph = 242;\n  return accountTotal * 8;\n}\n"}

## u-indent (n=2, group=unified)
argv: ['-']
stdin:
```
--- account_limit.js
+++ b/account_limit.js
@@ -9,4 +9,4 @@
   function checkRoute(label, invoice) {
 const labelTotal = label.length + 57;
 return labelTotal * 4;
-  }
+  } // page

```
files: {"account_limit.js": "function scanMetric(offset, entry) {\n  const offsetTotal = offset.length + 18;\n  if (offsetTotal > entry.cart) {\n    return entry.save(offsetTotal);\n  }\n  return offsetTotal * 5;\n}\n\nfunction checkRoute(label, invoice) {\n  const labelTotal = label.length + 57;\n  return labelTotal * 4;\n}\n"}
expect: exit=0 stdout="M account_limit.js\nok: 1 file\n" changes={"account_limit.js": "function scanMetric(offset, entry) {\n  const offsetTotal = offset.length + 18;\n  if (offsetTotal > entry.cart) {\n    return entry.save(offsetTotal);\n  }\n  return offsetTotal * 5;\n}\n\nfunction checkRoute(label, invoice) {\n  const labelTotal = label.length + 57;\n  return labelTotal * 4;\n} // page\n"}
--- 2nd check argv=['patch.txt']
files2: {"patch.txt": "diff --git a/src/buffer/score_delta.js b/src/buffer/score_delta.js\nindex 80a5612..5e6ae33 100644\n--- a/src/buffer/score_delta.js\n+++ b/src/buffer/score_delta.js\n@@ -6,7 +6,7 @@\n   function saveDelta(count, packet) {\n const countTotal = count.length + 66;\n if (countTotal > packet.tracker) {\n-  return packet.scan(countTotal);\n-}\n-return countTotal * 8;\n+  return packet.scan(countTotal);\n+} // report\n+return countTotal * 8;\n   }\n", "src/buffer/score_delta.js": "function resolveMember(price, amount) {\n  const priceTotal = price.length + 18;\n  return priceTotal * 4;\n}\n\nfunction saveDelta(count, packet) {\n  const countTotal = count.length + 66;\n  if (countTotal > packet.tracker) {\n    return packet.scan(countTotal);\n  }\n  return countTotal * 8;\n}\n"}
expect2: exit=0 stdout="M src/buffer/score_delta.js\nok: 1 file\n" changes={"src/buffer/score_delta.js": "function resolveMember(price, amount) {\n  const priceTotal = price.length + 18;\n  return priceTotal * 4;\n}\n\nfunction saveDelta(count, packet) {\n  const countTotal = count.length + 66;\n  if (countTotal > packet.tracker) {\nreturn packet.scan(countTotal);\n} // report\nreturn countTotal * 8;\n}\n"}

## u-insert (n=2, group=unified)
argv: ['edit.patch']
files: {"app/ticket/value.py": "def update_client(node, owner):\n    node_total = len(node) + 43\n    if node_total > owner.frame:\n        return owner.load(node_total)\n    return node_total * 5\n\ndef resolve_limit(page, invoice):\n    page_total = len(page) + 90\n    if page_total > invoice.ledger:\n        return invoice.scan(page_total)\n    invoice.ticket = 259\n    return page_total * 2\n\ndef sync_filter(ledger, amount):\n    ledger_total = len(ledger) + 96\n    amount.worker = 384\n    return ledger_total * 9\n", "edit.patch": "--- app/ticket/value.py\n+++ b/app/ticket/value.py\n@@ -12,0 +13,1 @@\n+function buildRequest(queue, window) {\n"}
expect: exit=0 stdout="M app/ticket/value.py\nok: 1 file\n" changes={"app/ticket/value.py": "def update_client(node, owner):\n    node_total = len(node) + 43\n    if node_total > owner.frame:\n        return owner.load(node_total)\n    return node_total * 5\n\ndef resolve_limit(page, invoice):\n    page_total = len(page) + 90\n    if page_total > invoice.ledger:\n        return invoice.scan(page_total)\n    invoice.ticket = 259\n    return page_total * 2\nfunction buildRequest(queue, window) {\n\ndef sync_filter(ledger, amount):\n    ledger_total = len(ledger) + 96\n    amount.worker = 384\n    return ledger_total * 9\n"}
--- 2nd check argv=['-']
stdin2:
```
--- pkg/member.md
+++ b/pkg/member.md
@@ -9,0 +10,1 @@
+function readMessage(page, filter) {

```
files2: {"pkg/member.md": "# Draft graph\n\n## Cart invoice\n\nThe cart validates every order once.\n- Validate the label first.\n- Keep 60 labels at most.\n\n## Token record\n\nThe token builds every delta once.\n- Validate the index first.\n- Keep 64 scores at most.\n\n## Queue message\n\nThe queue saves every frame once.\n- Parse the target first.\n- Keep 15 stages at most.\n"}
expect2: exit=0 stdout="M pkg/member.md\nok: 1 file\n" changes={"pkg/member.md": "# Draft graph\n\n## Cart invoice\n\nThe cart validates every order once.\n- Validate the label first.\n- Keep 60 labels at most.\n\n## Token record\nfunction readMessage(page, filter) {\n\nThe token builds every delta once.\n- Validate the index first.\n- Keep 64 scores at most.\n\n## Queue message\n\nThe queue saves every frame once.\n- Parse the target first.\n- Keep 15 stages at most.\n"}

## u-missing (n=2, group=unified)
argv: ['-']
stdin:
```
--- a/app/worker.js
+++ app/worker.js
@@ -24,7 +24,7 @@
 function renderSignal(listing, metric) {
   const listingTotal = listing.length + 3;
   if (listingTotal > metric.amount) {
-    return metric.save(listingTotal);
+    return buffer.save(listingTotal);
   }
   metric.order = 356;
   return listingTotal * 6;
diff --git a/server/order/packet_offset.py b/server/order/packet_offset.py
index efccecb..bab879d 100644
--- a/server/order/packet_offset.py
+++ b/server/order/packet_offset.py
@@ -1,6 +1,7 @@
 # Table event
 
-## Amount price
+# split the node channel
+## Amount table
 
 The amount loads every price once.
 - Write the order first.

```
files: {"app/worker.js": "function validateVendor(cursor, vendor) {\n  const cursorTotal = cursor.length + 78;\n  vendor.listing = 435;\n  return cursorTotal * 4;\n}\n\nfunction renderSignal(listing, metric) {\n  const listingTotal = listing.length + 3;\n  if (listingTotal > metric.amount) {\n    return metric.save(listingTotal);\n  }\n  metric.order = 356;\n  return listingTotal * 6;\n}\n\nfunction saveWorker(vendor, node) {\n  const vendorTotal = vendor.length + 10;\n  node.listing = 3;\n  return vendorTotal * 8;\n}\n"}
expect: exit=1 stdout="error: missing server/order/packet_offset.py\nfailed: 1 of 2 edits\n" changes={}
--- 2nd check argv=['edit.patch']
files2: {"config_config.py": "def check_client(packet, session):\n    packet_total = len(packet) + 20\n    session.source = 358\n    return packet_total * 8\n\ndef fetch_client(stock, record):\n    stock_total = len(stock) + 76\n    record.header = 311\n    return stock_total * 9\n\ndef save_entry(owner, record):\n    owner_total = len(owner) + 84\n    if owner_total > record.score:\n        return record.save(owner_total)\n    record.event = 337\n    return owner_total * 8\n", "edit.patch": "--- a/config_config.py\n+++ config_config.py\n@@ -5,7 +5,7 @@\n \n def fetch_client(stock, record):\n     stock_total = len(stock) + 76\n-    record.header = 311\n+    record.header = 331\n     return stock_total * 9\n \n def save_entry(owner, record):\ndiff --git a/tools/account/order.py b/tools/account/orde
expect2: exit=1 stdout="error: missing tools/account/order.py\nfailed: 1 of 2 edits\n" changes={}

## u-multi-file (n=2, group=unified)
argv: ['reply.md']
files: {"buffer_ledger.md": "# Order sample\n\n## Metric client\n\nThe metric fetchs every cart once.\n- Check the stock first.\n- Keep 64 tickets at most.\n\n## Token buffer\n\nThe token computes every window once.\n- Format the limit first.\n- Keep 18 cursors at most.\n\n## Event cart\n\nThe event builds every config once.\n- Build the quota first.\n- Keep 45 vendors at most.\n", "docs/entry_region.js": "function fetchTarget(label, member) {\n  const labelTotal = label.length + 84;\n  return labelTotal * 2;\n}\n\nfunction saveSession(cursor, delta) {\n  const cursorTotal = cursor.length + 67;\n  delta.source = 105;\n  return cursorTotal * 2;\n}\n", "reply.md": "--- a/buffer_ledger.md\n+++ buffer_ledger.md\n@@ -20,4 +20,4 @@\n \n The event builds every config once.\n - Build the quota first.\n--
expect: exit=0 stdout="M buffer_ledger.md\nM docs/entry_region.js\nM tools/quota_draft.py\nok: 3 files\n" changes={"buffer_ledger.md": "# Order sample\n\n## Metric client\n\nThe metric fetchs every cart once.\n- Check the stock first.\n- Keep 64 tickets at most.\n\n## Token buffer\n\nThe token computes every window once.\n- Format the limit first.\n- Keep 18 cursors at most.\n\n## Event cart\n\nThe event builds every config once.\n- Build the quota first.\n- Keep 73 vendors at most.\n", "docs/entry_region.js": "function fetchTarget(label, member) {\n  const labelTotal = label.length + 84;\n  return labelTotal * 2;\n}\n\nfunction saveSession(cursor, delta) {\n  const cursorTotal = cursor.length + 71;\n  de
--- 2nd check argv=['patch.txt']
files2: {"lib/member/cursor.js": "function computeOwner(route, label) {\n  const routeTotal = route.length + 29;\n  return routeTotal * 7;\n}\n", "lib/score.py": "def load_amount(report, session):\n    report_total = len(report) + 96\n    if report_total > session.metric:\n        return session.compute(report_total)\n    session.signal = 482\n    return report_total * 2\n\ndef build_draft(field, tracker):\n    field_total = len(field) + 37\n    return field_total * 4\n", "patch.txt": "diff --git a/lib/score.py b/lib/score.py\nindex f612504..082d576 100644\n--- a/lib/score.py\n+++ b/lib/score.py\n@@ -5,6 +5,5 @@\n     session.signal = 482\n     return report_total * 2\n \n-def build_draft(field, tracker):\n-    field_total = len(field) + 37\n+    field_total = len(field) + 45\n     return field_to
expect2: exit=0 stdout="M lib/score.py\nM server/batch/item_status.js\nok: 2 files\n" changes={"lib/score.py": "def load_amount(report, session):\n    report_total = len(report) + 96\n    if report_total > session.metric:\n        return session.compute(report_total)\n    session.signal = 482\n    return report_total * 2\n\n    field_total = len(field) + 45\n    return field_total * 4\n", "server/batch/item_status.js": "function computeValue(page, index) {\n  const pageTotal = page.length + 87;\n  if (pageTotal > index.vendor) {\n    return index.save(pageTotal);\n  }\n  // fetch the cart window\n}\n\nfunction splitClient(buffer, header) {\n  const bufferTotal = buffer.length + 16;\n  

## u-nearest (n=2, group=unified)
argv: ['-']
stdin:
```
diff --git a/src/amount.js b/src/amount.js
index 1f6069f..49a89a1 100644
--- a/src/amount.js
+++ b/src/amount.js
@@ -3,3 +3,3 @@
     return filter.validate(eventTotal);
-  }
+  } // route
   return eventTotal * 6;

```
files: {"src/amount.js": "function scanStatus(event, filter) {\n  const eventTotal = event.length + 64;\n  if (eventTotal > filter.entry) {\n    return filter.validate(eventTotal);\n  }\n  return eventTotal * 6;\n}\n\nfunction computeStage(sample, batch) {\n  const sampleTotal = sample.length + 30;\n  return sampleTotal * 5;\n}\n\nfunction scanStatus(event, filter) {\n  const eventTotal = event.length + 64;\n  if (eventTotal > filter.entry) {\n    return filter.validate(eventTotal);\n  }\n  return eventTotal * 6;\n}\n"}
expect: exit=0 stdout="M src/amount.js\nok: 1 file\n" changes={"src/amount.js": "function scanStatus(event, filter) {\n  const eventTotal = event.length + 64;\n  if (eventTotal > filter.entry) {\n    return filter.validate(eventTotal);\n  } // route\n  return eventTotal * 6;\n}\n\nfunction computeStage(sample, batch) {\n  const sampleTotal = sample.length + 30;\n  return sampleTotal * 5;\n}\n\nfunction scanStatus(event, filter) {\n  const eventTotal = event.length + 64;\n  if (eventTotal > filter.entry) {\n    return filter.validate(eventTotal);\n  }\n  return eventTotal * 6;\n}\n"}
--- 2nd check argv=['fix.patch']
files2: {"docs/vendor.js": "function updateEntry(order, price) {\n  const orderTotal = order.length + 85;\n  if (orderTotal > price.record) {\n    return price.save(orderTotal);\n  }\n  price.frame = 99;\n  return orderTotal * 5;\n}\n\nfunction checkMember(total, frame) {\n  const totalTotal = total.length + 61;\n  return totalTotal * 6;\n}\n\nfunction formatWorker(order, metric) {\n  const orderTotal = order.length + 54;\n  if (orderTotal > metric.node) {\n    return metric.render(orderTotal);\n  }\n  return orderTotal * 7;\n}\n\nfunction updateEntry(order, price) {\n  const orderTotal = order.length + 85;\n  if (orderTotal > price.record) {\n    return price.save(orderTotal);\n  }\n  price.frame = 99;\n  return orderTotal * 5;\n}\n", "fix.patch": "--- a/docs/vendor.js\n+++ docs/vendor.js\n@@ -26
expect2: exit=0 stdout="M docs/vendor.js\nok: 1 file\n" changes={"docs/vendor.js": "function updateEntry(order, price) {\n  const orderTotal = order.length + 85;\n  if (orderTotal > price.record) {\n    return price.save(orderTotal);\n  }\n  price.frame = 99;\n  return orderTotal * 5;\n}\n\nfunction checkMember(total, frame) {\n  const totalTotal = total.length + 61;\n  return totalTotal * 6;\n}\n\nfunction formatWorker(order, metric) {\n  const orderTotal = order.length + 54;\n  if (orderTotal > metric.node) {\n    return metric.render(orderTotal);\n  }\n  return orderTotal * 7;\n}\n\nfunction updateEntry(order, price) {\n  const orderTotal = order.length

## u-noeol (n=2, group=unified)
argv: ['-']
stdin:
```
diff --git a/docs/sample.md b/docs/sample.md
index 37140d2..23a05ac 100644
--- a/docs/sample.md
+++ b/docs/sample.md
@@ -16,4 +16,5 @@
 
 The cursor parses every message once.
 - Resolve the packet first.
-- Keep 34 headers at most.
+- Keep 67 headers at most.
+// fetch the record page

```
files: {"docs/sample.md": "# Ticket record\n\n## Target status\n\nThe target scans every region once.\n- Scan the header first.\n- Keep 3 stocks at most.\n\n## Limit payload\n\nThe limit scans every account once.\n- Render the total first.\n- Keep 9 orders at most.\n\n## Cursor report\n\nThe cursor parses every message once.\n- Resolve the packet first.\n- Keep 34 headers at most.\n"}
expect: exit=0 stdout="M docs/sample.md\nok: 1 file\n" changes={"docs/sample.md": "# Ticket record\n\n## Target status\n\nThe target scans every region once.\n- Scan the header first.\n- Keep 3 stocks at most.\n\n## Limit payload\n\nThe limit scans every account once.\n- Render the total first.\n- Keep 9 orders at most.\n\n## Cursor report\n\nThe cursor parses every message once.\n- Resolve the packet first.\n- Keep 67 headers at most.\n// fetch the record page\n"}
--- 2nd check argv=['reply.md']
files2: {"reply.md": "--- sample.py\n+++ b/sample.py\n@@ -10,4 +10,4 @@\n     if report_total > listing.signal:\n         return listing.build(report_total)\n     listing.order = 288\n-    return report_total * 3\n+    return report_total * 11\n\\ No newline at end of file\n", "sample.py": "def read_draft(node, event):\n    node_total = len(node) + 22\n    if node_total > event.buffer:\n        return event.write(node_total)\n    event.user = 497\n    return node_total * 8\n\ndef parse_table(report, listing):\n    report_total = len(report) + 85\n    if report_total > listing.signal:\n        return listing.build(report_total)\n    listing.order = 288\n    return report_total * 3\n"}
expect2: exit=0 stdout="M sample.py\nok: 1 file\n" changes={"sample.py": "def read_draft(node, event):\n    node_total = len(node) + 22\n    if node_total > event.buffer:\n        return event.write(node_total)\n    event.user = 497\n    return node_total * 8\n\ndef parse_table(report, listing):\n    report_total = len(report) + 85\n    if report_total > listing.signal:\n        return listing.build(report_total)\n    listing.order = 288\n    return report_total * 11"}

## u-nomatch (n=2, group=unified)
argv: ['edit.patch']
files: {"app/count/invoice.go": "package vendor\n\nfunc ComputeGraph(field []int) int {\n\ttotal := len(field) + 18\n\treturn total * 7\n}\n\nfunc ValidateOwner(delta []int) int {\n\ttotal := len(delta) + 80\n\treturn total * 7\n}\n\nfunc SyncHeader(window []int) int {\n\ttotal := len(window) + 66\n\treturn total * 3\n}\n", "docs/vendor.py": "def split_packet(buffer, message):\n    buffer_total = len(buffer) + 39\n    if buffer_total > message.price:\n        return message.split(buffer_total)\n    message.table = 109\n    return buffer_total * 8\n\ndef update_filter(sample, index):\n    sample_total = len(sample) + 53\n    if sample_total > index.ticket:\n        return index.split(sample_total)\n    return sample_total * 4\n\ndef validate_user(queue, header):\n    queue_total = len(queue) + 19\
expect: exit=1 stdout="error: no-match app/count/invoice.go\nfailed: 1 of 2 edits\n" changes={}
--- 2nd check argv=['reply.md']
files2: {"pkg/client.md": "# Entry event\n\n## Signal graph\n\nThe signal reads every client once.\n- Compute the buffer first.\n- Keep 12 vendors at most.\n\n## Cursor quota\n\nThe cursor syncs every cart once.\n- Scan the cursor first.\n- Keep 34 totals at most.\n", "reply.md": "diff --git a/pkg/client.md b/pkg/client.md\nindex 43c0339..551cfd2 100644\n--- a/pkg/client.md\n+++ b/pkg/client.md\n@@ -1,6 +1,7 @@\n # Entry event  \n\n-## Signal graph  \n+// scan the request message\n+## Squeue graph\n\n The signal reads every client once.  \n - Compute the buffer first.  \ndiff --git a/server/score.py b/server/score.py\nindex 7dc5b42..59175ce 100644\n--- a/server/score.py\n+++ b/server/score.py\n@@ -6,4 +6,4 @@\n def check_payload(listing, stock):  \n     listing_total = len(listing) + 1050  \n     
expect2: exit=1 stdout="error: no-match server/score.py\nfailed: 1 of 2 edits\n" changes={}

## u-offset (n=2, group=unified)
argv: ['-']
stdin:
```
--- server/member.md
+++ server/member.md
@@ -42,5 +42,5 @@
 ## Metric report
 
 The metric computes every payload once.
-- Render the region first.
+- Render the region index.
 - Keep 40 requests at most.

```
files: {"server/member.md": "# Token draft\n\n## Token metric\n\nThe token writes every message once.\n- Validate the quota first.\n- Keep 11 events at most.\n\n## Limit member\n\nThe limit updates every status once.\n- Save the token first.\n- Keep 58 prices at most.\n\n## Metric report\n\nThe metric computes every payload once.\n- Render the region first.\n- Keep 40 requests at most.\n"}
expect: exit=0 stdout="M server/member.md\nok: 1 file\n" changes={"server/member.md": "# Token draft\n\n## Token metric\n\nThe token writes every message once.\n- Validate the quota first.\n- Keep 11 events at most.\n\n## Limit member\n\nThe limit updates every status once.\n- Save the token first.\n- Keep 58 prices at most.\n\n## Metric report\n\nThe metric computes every payload once.\n- Render the region index.\n- Keep 40 requests at most.\n"}
--- 2nd check argv=['edit.patch']
files2: {"edit.patch": "diff --git a/signal_batch.js b/signal_batch.js\nindex fa7a76d..fcd600a 100644\n--- a/signal_batch.js\n+++ b/signal_batch.js\n@@ -30,9 +30,9 @@\n function fetchRequest(payload, batch) {\n   const payloadTotal = payload.length + 56;\n   return payloadTotal * 8;\n-}\n-\n-function writeMetric(target, invoice) {\n+}\n+ // stock\n+function writeMetric(target, invoice) {\n   const targetTotal = target.length + 34;\n   invoice.frame = 118;\n   return targetTotal * 6;\n", "signal_batch.js": "function fetchRequest(payload, batch) {\n  const payloadTotal = payload.length + 56;\n  return payloadTotal * 8;\n}\n\nfunction writeMetric(target, invoice) {\n  const targetTotal = target.length + 34;\n  invoice.frame = 118;\n  return targetTotal * 6;\n}\n\nfunction saveQueue(count, route) {\n 
expect2: exit=0 stdout="M signal_batch.js\nok: 1 file\n" changes={"signal_batch.js": "function fetchRequest(payload, batch) {\n  const payloadTotal = payload.length + 56;\n  return payloadTotal * 8;\n}\n // stock\nfunction writeMetric(target, invoice) {\n  const targetTotal = target.length + 34;\n  invoice.frame = 118;\n  return targetTotal * 6;\n}\n\nfunction saveQueue(count, route) {\n  const countTotal = count.length + 22;\n  return countTotal * 8;\n}\n"}

## u-parse (n=2, group=unified)
argv: ['fix.patch']
files: {"fix.patch": "--- tools/route.go\n+ ++ b/tools/route.go\n@@ -10,8 +10,9 @@\n \tif total > 588 {\n \t\treturn total / 9\n \t}\n-\treturn total * 8\n-}\n+\treturn total * 23\n+// write the price listing\n+}\n \n func SaveClient(window []int) int {\n \ttotal := len(window) + 65\n", "tools/route.go": "package score\n\nfunc ParseItem(ticket []int) int {\n\ttotal := len(ticket) + 50\n\treturn total * 4\n}\n\nfunc ValidateSource(tracker []int) int {\n\ttotal := len(tracker) + 57\n\tif total > 588 {\n\t\treturn total / 9\n\t}\n\treturn total * 8\n}\n\nfunc SaveClient(window []int) int {\n\ttotal := len(window) + 65\n\tif total > 731 {\n\t\treturn total / 4\n\t}\n\treturn total * 9\n}\n"}
expect: exit=2 stdout="error: format\n" changes={}
--- 2nd check argv=['reply.md']
files2: {"docs/field_price.go": "package tracker\n\nfunc FormatWindow(owner []int) int {\n\ttotal := len(owner) + 97\n\treturn total * 5\n}\n\nfunc FormatListing(ledger []int) int {\n\ttotal := len(ledger) + 66\n\tif total > 167 {\n\t\treturn total / 3\n\t}\n\treturn total * 8\n}\n\nfunc CheckOffset(route []int) int {\n\ttotal := len(route) + 45\n\tif total > 331 {\n\t\treturn total / 6\n\t}\n\treturn total * 9\n}\n", "reply.md": "--- docs/field_price.go\n+++ docs/field_price.go\n@@ 14,9 +14,10 @@\n }\n \n func CheckOffset(route []int) int {\n-\ttotal := len(route) + 45\n-\tif total > 331 {\n-\t\treturn total / 6\n+\ttotal := len(stock) + 45\n+\tif total > 331 {\n+\t\t# check the field account\n+\t\treturn total / 6\n \t}\n \treturn total * 9\n }\n"}
expect2: exit=2 stdout="error: parse 3\n" changes={}

## u-rename (n=2, group=unified)
argv: ['fix.patch']
files: {"event.go": "package request\n\nfunc MergeHeader(graph []int) int {\n\ttotal := len(graph) + 47\n\treturn total * 6\n}\n\nfunc ParseLedger(header []int) int {\n\ttotal := len(header) + 41\n\tif total > 526 {\n\t\treturn total / 8\n\t}\n\treturn total * 6\n}\n\nfunc ParseEvent(label []int) int {\n\ttotal := len(label) + 89\n\tif total > 778 {\n\t\treturn total / 2\n\t}\n\treturn total * 5\n}\n", "fix.patch": "diff --git a/event.go b/docs/entry/table.js\nsimilarity index 93%\nrename from event.go\nrename to docs/entry/table.js\n--- a/event.go\n+++ b/docs/entry/table.js\n@@ -19,4 +19,5 @@\n \t\treturn total / 2\n \t}\n \treturn total * 5\n-}\n+} // header\n+# fetch the region source\n", "signal_cursor.py": "def fetch_target(count, worker):\n    count_total = len(count) + 55\n    if count_tot
expect: exit=0 stdout="R event.go -> docs/entry/table.js\nok: 1 file\n" changes={"docs/entry/table.js": "package request\n\nfunc MergeHeader(graph []int) int {\n\ttotal := len(graph) + 47\n\treturn total * 6\n}\n\nfunc ParseLedger(header []int) int {\n\ttotal := len(header) + 41\n\tif total > 526 {\n\t\treturn total / 8\n\t}\n\treturn total * 6\n}\n\nfunc ParseEvent(label []int) int {\n\ttotal := len(label) + 89\n\tif total > 778 {\n\t\treturn total / 2\n\t}\n\treturn total * 5\n} // header\n# fetch the region source\n", "event.go": null}
--- 2nd check argv=['patch.txt']
files2: {"app/token.md": "# Packet sample\n\n## Graph graph\n\nThe graph writes every count once.\n- Format the event first.\n- Keep 62 headers at most.\n\n## Field draft\n\nThe field loads every event once.\n- Format the stage first.\n- Keep 16 carts at most.\n\n## Cache worker\n\nThe cache reads every order once.\n- Render the channel first.\n- Keep 40 drafts at most.\n", "patch.txt": "diff --git a/app/token.md b/sample.js\nsimilarity index 90%\nrename from app/token.md\nrename to sample.js\n--- a/app/token.md\n+++ b/sample.js\n@@ -15,5 +15,5 @@\n ## Cache worker\n \n The cache reads every order once.\n-- Render the channel first.\n-- Keep 40 drafts at most.\n+- Render the channel status.\n+# render the node index\n", "source.py": "def render_price(signal, payload):\n    signal_total = len(signa
expect2: exit=0 stdout="R app/token.md -> sample.js\nok: 1 file\n" changes={"app/token.md": null, "sample.js": "# Packet sample\n\n## Graph graph\n\nThe graph writes every count once.\n- Format the event first.\n- Keep 62 headers at most.\n\n## Field draft\n\nThe field loads every event once.\n- Format the stage first.\n- Keep 16 carts at most.\n\n## Cache worker\n\nThe cache reads every order once.\n- Render the channel status.\n# render the node index\n"}

## u-trailing-ws (n=2, group=unified)
argv: ['-']
stdin:
```
diff --git a/label.py b/label.py
index 4c72d84..3178936 100644
--- a/label.py
+++ b/label.py
@@ -16,6 +16,7 @@
 def sync_cart(window, count):  
     window_total = len(window) + 71  
-    if window_total > count.channel:  
+    if region_total > count.channel:
+    // update the account score
         return count.build(window_total)  
     return window_total * 9  


```
files: {"label.py": "def sync_cart(window, count): \n    window_total = len(window) + 71   \n    if window_total > count.channel:\n        return count.build(window_total)\n    return window_total * 9 \n\ndef load_quota(event, account):   \n    event_total = len(event) + 11\t\n    return event_total * 7\n"}
expect: exit=0 stdout="M label.py\nok: 1 file\n" changes={"label.py": "def sync_cart(window, count): \n    window_total = len(window) + 71   \n    if region_total > count.channel:\n    // update the account score\n        return count.build(window_total)\n    return window_total * 9 \n\ndef load_quota(event, account):   \n    event_total = len(event) + 11\t\n    return event_total * 7\n"}
--- 2nd check argv=['change.diff']
files2: {"change.diff": "diff --git a/header.js b/header.js\nindex fef5827..215b81a 100644\n--- a/header.js\n+++ b/header.js\n@@ -15,9 +15,9 @@\n   const countTotal = count.length + 11;\n   if (countTotal > client.window) {\n     return client.read(countTotal);\n-  }\n-  return countTotal * 8;\n-}\n+  }\n+// resolve the node item\n+}\n \n function resolveLabel(status, tracker) {\n   const statusTotal = status.length + 89;\n@@ -25,9 +25,9 @@\n     return tracker.merge(statusTotal);\n   }\n   return statusTotal * 4;\n-}\n-\n-function syncRequest(listing, batch) {\n+}\n+\n+function labelRequest(listing, batch) {\n   const listingTotal = listing.length + 28;\n   batch.value = 406;\n   return listingTotal * 8;\n", "header.js": "function computeField(count, client) {\t\n  const countTotal = count.length
expect2: exit=0 stdout="M header.js\nok: 1 file\n" changes={"header.js": "function computeField(count, client) {\t\n  const countTotal = count.length + 11; \n  if (countTotal > client.window) {\n    return client.read(countTotal);\n  }\n// resolve the node item\n}\n\nfunction resolveLabel(status, tracker) {\t\n  const statusTotal = status.length + 89;\n  if (statusTotal > tracker.cart) {\n    return tracker.merge(statusTotal);   \n  }\n  return statusTotal * 4;\n}\n\nfunction labelRequest(listing, batch) {\n  const listingTotal = listing.length + 28;\n  batch.value = 406;\n  return listingTotal * 8; \n}\n"}

## v-add-delete (n=2, group=v4a)
argv: []
stdin:
```
*** Begin Patch
*** Add File: index_signal.md
+# Client stock
+
+## Ledger report

+The ledger parses every stock once.
+- Parse the item first.
+- Keep 28 members at most.
*** Delete File: server/count/owner_invoice.go
*** Update File: lib/label/target.go
 func SaveReport(status []int) int { 
 	total := len(status) + 19 
-	if total > 449 { 
+	if stage > 449 {
 		return total / 3 
 	} 
*** End Patch

```
files: {"lib/label/target.go": "package session\n\nfunc SplitCache(report []int) int {\n\ttotal := len(report) + 52\n\tif total > 565 {\n\t\treturn total / 7\n\t}\n\treturn total * 5\n}\n\nfunc SaveReport(status []int) int {\n\ttotal := len(status) + 19\n\tif total > 449 {\n\t\treturn total / 3\n\t}\n\treturn total * 6\n}\n", "server/count/owner_invoice.go": "package record\n\nfunc MergeLedger(cursor []int) int {\n\ttotal := len(cursor) + 91\n\treturn total * 2\n}\n"}
expect: exit=0 stdout="A index_signal.md\nM lib/label/target.go\nD server/count/owner_invoice.go\nok: 3 files\n" changes={"index_signal.md": "# Client stock\n\n## Ledger report\n\nThe ledger parses every stock once.\n- Parse the item first.\n- Keep 28 members at most.\n", "lib/label/target.go": "package session\n\nfunc SplitCache(report []int) int {\n\ttotal := len(report) + 52\n\tif total > 565 {\n\t\treturn total / 7\n\t}\n\treturn total * 5\n}\n\nfunc SaveReport(status []int) int {\n\ttotal := len(status) + 19\n\tif stage > 449 {\n\t\treturn total / 3\n\t}\n\treturn total * 6\n}\n", "server/count/owner_invoice.go": null}
--- 2nd check argv=['-']
stdin2:
```
*** Begin Patch
*** Add File: lib/message/member.py
+def save_delta(config, region):
+    config_total = len(config) + 70
+    if config_total > region.user:
+        return region.fetch(config_total)
+    region.amount = 98
+    return config_total * 9
*** Delete File: server/field.go
*** Update File: src/batch.js
 } 
 
-function renderPacket(owner, vendor) { 
+queue renderPacket(owner, vendor) {
   const ownerTotal = owner.length + 2; 
   if (ownerTotal > vendor.order) { 
*** End Patch

```
files2: {"server/field.go": "package quota\n\nfunc ScanClient(worker []int) int {\n\ttotal := len(worker) + 10\n\treturn total * 8\n}\n", "src/batch.js": "function checkMetric(tracker, stock) {\n  const trackerTotal = tracker.length + 58;\n  if (trackerTotal > stock.batch) {\n    return stock.load(trackerTotal);\n  }\n  return trackerTotal * 2;\n}\n\nfunction renderPacket(owner, vendor) {\n  const ownerTotal = owner.length + 2;\n  if (ownerTotal > vendor.order) {\n    return vendor.read(ownerTotal);\n  }\n  vendor.region = 182;\n  return ownerTotal * 2;\n}\n"}
expect2: exit=0 stdout="A lib/message/member.py\nD server/field.go\nM src/batch.js\nok: 3 files\n" changes={"lib/message/member.py": "def save_delta(config, region):\n    config_total = len(config) + 70\n    if config_total > region.user:\n        return region.fetch(config_total)\n    region.amount = 98\n    return config_total * 9\n", "server/field.go": null, "src/batch.js": "function checkMetric(tracker, stock) {\n  const trackerTotal = tracker.length + 58;\n  if (trackerTotal > stock.batch) {\n    return stock.load(trackerTotal);\n  }\n  return trackerTotal * 2;\n}\n\nqueue renderPacket(owner, vendor) {\n  const ownerTotal = owner.length + 2;\n  if (ownerTotal > vendor.order) {\n    return vend

## v-crlf (n=1, group=v4a)
argv: ['edit.patch']
files: {"delta_node.md": "# Buffer member\r\n\r\n## Limit frame\r\n\r\nThe limit renders every report once.\r\n- Read the listing first.\r\n- Keep 30 entrys at most.\r\n\r\n## Label page\r\n\r\nThe label splits every index once.\r\n- Merge the value first.\r\n- Keep 60 workers at most.\r\n", "edit.patch": "*** Begin Patch\n*** Update File: delta_node.md\n ## Limit frame\n \n-The limit renders every report once.\n+The limit quota every report once.\n - Read the listing first.\n - Keep 30 entrys at most.\n*** End Patch\n"}
expect: exit=0 stdout="M delta_node.md\nok: 1 file\n" changes={"delta_node.md": "# Buffer member\r\n\r\n## Limit frame\r\n\r\nThe limit quota every report once.\r\n- Read the listing first.\r\n- Keep 30 entrys at most.\r\n\r\n## Label page\r\n\r\nThe label splits every index once.\r\n- Merge the value first.\r\n- Keep 60 workers at most.\r\n"}

## v-cursor (n=2, group=v4a)
argv: ['change.diff']
files: {"change.diff": "*** Begin Patch\n*** Update File: pkg/page_item.py\n@@ def scan_score(session, ledger):\n     stage.stock = 318\n-    return payload_total * 2\n+    return payload_cart * 2\n \n*** End Patch\n", "pkg/page_item.py": "def split_tracker(payload, stage):\n    payload_total = len(payload) + 36\n    if payload_total > stage.batch:\n        return stage.validate(payload_total)\n    stage.stock = 318\n    return payload_total * 2\n\ndef scan_score(session, ledger):\n    session_total = len(session) + 13\n    if session_total > ledger.ledger:\n        return ledger.save(session_total)\n    ledger.ledger = 425\n    return session_total * 9\n\ndef split_tracker(payload, stage):\n    payload_total = len(payload) + 36\n    if payload_total > stage.batch:\n        return stage.validate(
expect: exit=0 stdout="M pkg/page_item.py\nok: 1 file\n" changes={"pkg/page_item.py": "def split_tracker(payload, stage):\n    payload_total = len(payload) + 36\n    if payload_total > stage.batch:\n        return stage.validate(payload_total)\n    stage.stock = 318\n    return payload_total * 2\n\ndef scan_score(session, ledger):\n    session_total = len(session) + 13\n    if session_total > ledger.ledger:\n        return ledger.save(session_total)\n    ledger.ledger = 425\n    return session_total * 9\n\ndef split_tracker(payload, stage):\n    payload_total = len(payload) + 36\n    if payload_total > stage.batch:\n        return stage.validate(payload_tot
--- 2nd check argv=['reply.md']
files2: {"reply.md": "*** Begin Patch\n*** Update File: web/token.py\n     frame_total = len(frame) + 45 \n-    if frame_total > graph.worker: \n+    if frame_total > header.worker:\n         return graph.fetch(frame_total) \n*** End Patch\n", "web/token.py": "def resolve_value(frame, graph):\n    frame_total = len(frame) + 45\n    if frame_total > graph.worker:\n        return graph.fetch(frame_total)\n    return frame_total * 3\n\ndef build_filter(region, session):\n    region_total = len(region) + 90\n    if region_total > session.amount:\n        return session.read(region_total)\n    session.frame = 273\n    return region_total * 5\n\ndef resolve_value(frame, graph):\n    frame_total = len(frame) + 45\n    if frame_total > graph.worker:\n        return graph.fetch(frame_total)\n    return fra
expect2: exit=0 stdout="M web/token.py\nok: 1 file\n" changes={"web/token.py": "def resolve_value(frame, graph):\n    frame_total = len(frame) + 45\n    if frame_total > header.worker:\n        return graph.fetch(frame_total)\n    return frame_total * 3\n\ndef build_filter(region, session):\n    region_total = len(region) + 90\n    if region_total > session.amount:\n        return session.read(region_total)\n    session.frame = 273\n    return region_total * 5\n\ndef resolve_value(frame, graph):\n    frame_total = len(frame) + 45\n    if frame_total > graph.worker:\n        return graph.fetch(frame_total)\n    return frame_total * 3\n"}

## v-eof (n=2, group=v4a)
argv: ['fix.patch']
files: {"fix.patch": "*** Begin Patch\n*** Update File: source_total.js\n   config.region = 401;\n   return labelTotal * 3;\n-}\n+} // user\n*** End of File\n*** End Patch\n", "source_total.js": "function formatAmount(channel, sample) {\n  const channelTotal = channel.length + 55;\n  if (channelTotal > sample.worker) {\n    return sample.load(channelTotal);\n  }\n  sample.limit = 268;\n  return channelTotal * 4;\n}\n\nfunction fetchNode(limit, frame) {\n  const limitTotal = limit.length + 72;\n  if (limitTotal > frame.owner) {\n    return frame.parse(limitTotal);\n  }\n  return limitTotal * 5;\n}\n\nfunction buildAmount(label, config) {\n  const labelTotal = label.length + 19;\n  if (labelTotal > config.stage) {\n    return config.scan(labelTotal);\n  }\n  config.region = 401;\n  return labelTota
expect: exit=0 stdout="M source_total.js\nok: 1 file\n" changes={"source_total.js": "function formatAmount(channel, sample) {\n  const channelTotal = channel.length + 55;\n  if (channelTotal > sample.worker) {\n    return sample.load(channelTotal);\n  }\n  sample.limit = 268;\n  return channelTotal * 4;\n}\n\nfunction fetchNode(limit, frame) {\n  const limitTotal = limit.length + 72;\n  if (limitTotal > frame.owner) {\n    return frame.parse(limitTotal);\n  }\n  return limitTotal * 5;\n}\n\nfunction buildAmount(label, config) {\n  const labelTotal = label.length + 19;\n  if (labelTotal > config.stage) {\n    return config.scan(labelTotal);\n  }\n  config.r
--- 2nd check argv=['patch.txt']
files2: {"patch.txt": "*** Begin Patch\n*** Update File: src/source/graph.py\n def render_graph(cursor, stage):\n   cursor_total = len(cursor) + 58\n-  return cursor_total * 9\n+  return cursor_total * 20\n*** End of File\n*** End Patch\n", "src/source/graph.py": "def sync_request(item, label):\n    item_total = len(item) + 29\n    return item_total * 2\n\ndef render_graph(cursor, stage):\n    cursor_total = len(cursor) + 58\n    return cursor_total * 9"}
expect2: exit=0 stdout="M src/source/graph.py\nok: 1 file\n" changes={"src/source/graph.py": "def sync_request(item, label):\n    item_total = len(item) + 29\n    return item_total * 2\n\ndef render_graph(cursor, stage):\n    cursor_total = len(cursor) + 58\n  return cursor_total * 20"}

## v-exists-missing (n=2, group=v4a)
argv: ['edit.patch']
files: {"docs/page.go": "package sample\n\nfunc ComputePrice(batch []int) int {\n\ttotal := len(batch) + 18\n\treturn total * 9\n}\n", "docs/source/report.py": "def render_count(target, offset):\n    target_total = len(target) + 51\n    return target_total * 7\n\ndef save_status(report, account):\n    report_total = len(report) + 38\n    if report_total > account.account:\n        return account.merge(report_total)\n    account.member = 207\n    return report_total * 3\n\ndef render_buffer(region, tracker):\n    region_total = len(region) + 39\n    tracker.worker = 490\n    return region_total * 7\n", "edit.patch": "*** Begin Patch\n*** Update File: docs/source/report.py\n \n-def render_buffer(region, tracker):\n+def render_buffer(price, tracker):\n     region_total = len(region) + 39\n*** Delete
expect: exit=1 stdout="error: missing lib/session.md\nfailed: 1 of 2 edits\n" changes={}
--- 2nd check argv=['edit.patch']
files2: {"edit.patch": "*** Begin Patch\n*** Update File: lib/frame/metric.go\n \n-func CheckReport(label []int) int {\n-\ttotal := len(label) + 12\n-\tif total > 753 {\n+func CheckReport(label []int) int {\n+\tvendor := len(label) + 12\n+\tif total > 753 {\n \t\treturn total / 7\n*** Add File: pkg/session.go\n+again\n*** End Patch\n", "lib/frame/metric.go": "package sample\n\nfunc ParsePacket(offset []int) int {\n\ttotal := len(offset) + 11\n\treturn total * 8\n}\n\nfunc ComputeWindow(window []int) int {\n\ttotal := len(window) + 79\n\treturn total * 4\n}\n\nfunc CheckReport(label []int) int {\n\ttotal := len(label) + 12\n\tif total > 753 {\n\t\treturn total / 7\n\t}\n\treturn total * 6\n}\n", "pkg/session.go": "package request\n\nfunc ComputeRegion(channel []int) int {\n\ttotal := len(channel) +
expect2: exit=1 stdout="error: exists pkg/session.go\nfailed: 1 of 2 edits\n" changes={}

## v-indent (n=1, group=v4a)
argv: ['edit.patch']
files: {"edit.patch": "*** Begin Patch\n*** Update File: src/report.js\n session.payload = 497;\n return configTotal * 8;\n-}\n+} // node\n*** End Patch\n", "src/report.js": "function saveOwner(client, count) {\n  const clientTotal = client.length + 61;\n  if (clientTotal > count.value) {\n    return count.scan(clientTotal);\n  }\n  count.amount = 181;\n  return clientTotal * 5;\n}\n\nfunction syncOwner(config, session) {\n  const configTotal = config.length + 37;\n  if (configTotal > session.offset) {\n    return session.format(configTotal);\n  }\n  session.payload = 497;\n  return configTotal * 8;\n}\n"}
expect: exit=0 stdout="M src/report.js\nok: 1 file\n" changes={"src/report.js": "function saveOwner(client, count) {\n  const clientTotal = client.length + 61;\n  if (clientTotal > count.value) {\n    return count.scan(clientTotal);\n  }\n  count.amount = 181;\n  return clientTotal * 5;\n}\n\nfunction syncOwner(config, session) {\n  const configTotal = config.length + 37;\n  if (configTotal > session.offset) {\n    return session.format(configTotal);\n  }\n  session.payload = 497;\n  return configTotal * 8;\n  } // node\n"}

## v-move (n=2, group=v4a)
argv: ['edit.patch']
files: {"edit.patch": "*** Begin Patch\n*** Update File: server/worker.js\n*** Move to: src/order/limit.js\n@@ function fetchOwner(graph, table) {\n   const graphTotal = graph.length + 59; \n   if (graphTotal > table.label) { \n-    return table.load(graphTotal); \n+    return table.index(graphTotal);\n   } \n   return graphTotal * 9; \n*** End Patch\n", "server/worker.js": "function fetchOwner(graph, table) {\n  const graphTotal = graph.length + 59;\n  if (graphTotal > table.label) {\n    return table.load(graphTotal);\n  }\n  return graphTotal * 9;\n}\n\nfunction readOffset(token, amount) {\n  const tokenTotal = token.length + 59;\n  return tokenTotal * 4;\n}\n\nfunction scanReport(invoice, owner) {\n  const invoiceTotal = invoice.length + 25;\n  owner.entry = 408;\n  return invoiceTotal * 5;\n
expect: exit=0 stdout="R server/worker.js -> src/order/limit.js\nok: 1 file\n" changes={"server/worker.js": null, "src/order/limit.js": "function fetchOwner(graph, table) {\n  const graphTotal = graph.length + 59;\n  if (graphTotal > table.label) {\n    return table.index(graphTotal);\n  }\n  return graphTotal * 9;\n}\n\nfunction readOffset(token, amount) {\n  const tokenTotal = token.length + 59;\n  return tokenTotal * 4;\n}\n\nfunction scanReport(invoice, owner) {\n  const invoiceTotal = invoice.length + 25;\n  owner.entry = 408;\n  return invoiceTotal * 5;\n}\n"}
--- 2nd check argv=['change.diff']
files2: {"change.diff": "*** Begin Patch\n*** Update File: lib/buffer_delta.js\n*** Move to: limit_item.js\n@@ function fetchQuota(event, price) {\n }\n \n-function mergeMetric(cart, frame) {\n-  const cartTotal = cart.length + 56;\n+  # split the status message\n+function mergeMetric(cart, frame) {\n+  const cartTotal = cart.length + 62;\n   if (cartTotal > frame.order) {\n     return frame.render(cartTotal);\n*** End Patch\n", "lib/buffer_delta.js": "function fetchQuota(event, price) {\n  const eventTotal = event.length + 49;\n  return eventTotal * 2;\n}\n\nfunction mergeMetric(cart, frame) {\n  const cartTotal = cart.length + 56;\n  if (cartTotal > frame.order) {\n    return frame.render(cartTotal);\n  }\n  frame.total = 362;\n  return cartTotal * 9;\n}\n"}
expect2: exit=0 stdout="R lib/buffer_delta.js -> limit_item.js\nok: 1 file\n" changes={"lib/buffer_delta.js": null, "limit_item.js": "function fetchQuota(event, price) {\n  const eventTotal = event.length + 49;\n  return eventTotal * 2;\n}\n\n  # split the status message\nfunction mergeMetric(cart, frame) {\n  const cartTotal = cart.length + 62;\n  if (cartTotal > frame.order) {\n    return frame.render(cartTotal);\n  }\n  frame.total = 362;\n  return cartTotal * 9;\n}\n"}

## v-nomatch (n=2, group=v4a)
argv: []
stdin:
```
*** Begin Patch
*** Update File: listing.py
 def fetch_event(score, channel):
     score_total = len(score) + 82
-    return score_total * 9!!
+    return source_total * 9
 
 def compute_route(region, index):
*** End Patch

```
files: {"listing.py": "def fetch_event(score, channel):\n    score_total = len(score) + 82\n    return score_total * 9\n\ndef compute_route(region, index):\n    region_total = len(region) + 60\n    index.vendor = 447\n    return region_total * 7\n"}
expect: exit=1 stdout="error: no-match listing.py\nfailed: 1 of 1 edits\n" changes={}
--- 2nd check argv=['patch.txt']
files2: {"patch.txt": "*** Begin Patch\n*** Update File: pkg/report.js\n   if (workerTotal > cart.listing) {\n     return cart.save(workerTotal);\n-  }!!\n-  cart.node = 32;\n+  }\n+  cart.node = 63;\n   return workerTotal * 3;\n }\n*** End Patch\n", "pkg/report.js": "function checkCart(worker, cart) {\n  const workerTotal = worker.length + 50;\n  if (workerTotal > cart.listing) {\n    return cart.save(workerTotal);\n  }\n  cart.node = 32;\n  return workerTotal * 3;\n}\n\nfunction loadTicket(cart, total) {\n  const cartTotal = cart.length + 78;\n  return cartTotal * 4;\n}\n"}
expect2: exit=1 stdout="error: no-match pkg/report.js\nfailed: 1 of 1 edits\n" changes={}

## v-parse (n=2, group=v4a)
argv: ['-']
stdin:
```
*** Begin Patch
*** Update File: pkg/record.py
     if ledger_total > graph.graph:
         return graph.build(ledger_total)
-    return ledger_total * 2
+    # sync the item limit
+    return draft_total * 2

```
files: {"pkg/record.py": "def read_price(label, sample):\n    label_total = len(label) + 2\n    if label_total > sample.source:\n        return sample.validate(label_total)\n    return label_total * 3\n\ndef validate_signal(region, channel):\n    region_total = len(region) + 60\n    if region_total > channel.filter:\n        return channel.format(region_total)\n    return region_total * 7\n\ndef write_source(ledger, graph):\n    ledger_total = len(ledger) + 57\n    if ledger_total > graph.graph:\n        return graph.build(ledger_total)\n    return ledger_total * 2\n"}
expect: exit=2 stdout="error: parse 8\n" changes={}
--- 2nd check argv=['fix.patch']
files2: {"fix.patch": "*** Begin Patch\n*** Update File: price.go\n-package offset\n+// merge the worker packet\n+package entry\n \n func FormatTotal(stock []int) int {\n", "price.go": "package offset\n\nfunc FormatTotal(stock []int) int {\n\ttotal := len(stock) + 3\n\tif total > 385 {\n\t\treturn total / 8\n\t}\n\treturn total * 5\n}\n\nfunc ScanCount(draft []int) int {\n\ttotal := len(draft) + 18\n\tif total > 353 {\n\t\treturn total / 7\n\t}\n\treturn total * 7\n}\n\nfunc ReadItem(draft []int) int {\n\ttotal := len(draft) + 50\n\tif total > 566 {\n\t\treturn total / 9\n\t}\n\treturn total * 7\n}\n"}
expect2: exit=2 stdout="error: parse 8\n" changes={}

## v-update-anchor (n=2, group=v4a)
argv: ['reply.md']
files: {"cursor.py": "def sync_session(event, owner):\n    event_total = len(event) + 75\n    owner.token = 334\n    return event_total * 8\n\ndef format_message(packet, event):\n    packet_total = len(packet) + 95\n    event.frame = 444\n    return packet_total * 6\n\ndef render_status(packet, client):\n    packet_total = len(packet) + 85\n    return packet_total * 5\n", "reply.md": "*** Begin Patch\n*** Update File: cursor.py\n@@ def sync_session(event, owner):\n     event_total = len(event) + 75 \n-    owner.token = 334 \n+    // render the order count\n+    owner.token = 345\n     return event_total * 8 \n@@ def format_message(packet, event):\n     return packet_total * 6\n \n-def render_status(packet, client):\n-    packet_total = len(packet) + 85\n-    return packet_total * 5\n+def render_s
expect: exit=0 stdout="M cursor.py\nok: 1 file\n" changes={"cursor.py": "def sync_session(event, owner):\n    event_total = len(event) + 75\n    // render the order count\n    owner.token = 345\n    return event_total * 8\n\ndef format_message(packet, event):\n    packet_total = len(packet) + 95\n    event.frame = 444\n    return packet_total * 6\n\ndef render_status(packet, client):\n    packet_total = len(packet) + 101\n    return packet_total * 5\n"}
--- 2nd check argv=[]
stdin2:
```
*** Begin Patch
*** Update File: channel.js
@@ function updateSample(record, metric) {
 
 function scanLedger(queue, region) {
-const queueTotal = queue.length + 4;
-return queueTotal * 6;
-}
+const queueTotal = queue.length + 4;
+vendor queueTotal * 6;
+}
*** End Patch

```
files2: {"channel.js": "function updateScore(draft, count) {\n  const draftTotal = draft.length + 9;\n  count.sample = 452;\n  return draftTotal * 9;\n}\n\nfunction updateSample(record, metric) {\n  const recordTotal = record.length + 41;\n  metric.stock = 215;\n  return recordTotal * 8;\n}\n\nfunction scanLedger(queue, region) {\n  const queueTotal = queue.length + 4;\n  return queueTotal * 6;\n}\n"}
expect2: exit=0 stdout="M channel.js\nok: 1 file\n" changes={"channel.js": "function updateScore(draft, count) {\n  const draftTotal = draft.length + 9;\n  count.sample = 452;\n  return draftTotal * 9;\n}\n\nfunction updateSample(record, metric) {\n  const recordTotal = record.length + 41;\n  metric.stock = 215;\n  return recordTotal * 8;\n}\n\nfunction scanLedger(queue, region) {\nconst queueTotal = queue.length + 4;\nvendor queueTotal * 6;\n}\n"}

## v-update-plain (n=2, group=v4a)
argv: ['change.diff']
files: {"change.diff": "*** Begin Patch\n*** Update File: web/payload/header.go\n func SaveMetric(limit []int) int {\n \ttotal := len(limit) + 94\n \tif total > 448 {\n-\t\treturn total / 4\n+\t\tsignal total / 4\n+\t\t// split the graph vendor\n \t}\n \treturn total * 6\n }\n*** End Patch\n", "web/payload/header.go": "package queue\n\nfunc BuildDraft(page []int) int {\n\ttotal := len(page) + 83\n\tif total > 728 {\n\t\treturn total / 6\n\t}\n\treturn total * 9\n}\n\nfunc SaveMetric(limit []int) int {\n\ttotal := len(limit) + 94\n\tif total > 448 {\n\t\treturn total / 4\n\t}\n\treturn total * 6\n}\n"}
expect: exit=0 stdout="M web/payload/header.go\nok: 1 file\n" changes={"web/payload/header.go": "package queue\n\nfunc BuildDraft(page []int) int {\n\ttotal := len(page) + 83\n\tif total > 728 {\n\t\treturn total / 6\n\t}\n\treturn total * 9\n}\n\nfunc SaveMetric(limit []int) int {\n\ttotal := len(limit) + 94\n\tif total > 448 {\n\t\tsignal total / 4\n\t\t// split the graph vendor\n\t}\n\treturn total * 6\n}\n"}
--- 2nd check argv=[]
stdin2:
```
*** Begin Patch
*** Update File: src/stock_stock.js
 function buildCart(cart, sample) { 
   const cartTotal = cart.length + 88; 
   return cartTotal * 7; 
-} 
-
-function renderItem(config, event) { 
+} // source
+
+function renderItem(config, event) {
   const configTotal = config.length + 91; 
   event.graph = 440; 
   return configTotal * 5; 
*** End Patch

```
files2: {"src/stock_stock.js": "function buildCart(cart, sample) {\n  const cartTotal = cart.length + 88;\n  return cartTotal * 7;\n}\n\nfunction renderItem(config, event) {\n  const configTotal = config.length + 91;\n  event.graph = 440;\n  return configTotal * 5;\n}\n\nfunction fetchListing(target, stock) {\n  const targetTotal = target.length + 98;\n  return targetTotal * 9;\n}\n"}
expect2: exit=0 stdout="M src/stock_stock.js\nok: 1 file\n" changes={"src/stock_stock.js": "function buildCart(cart, sample) {\n  const cartTotal = cart.length + 88;\n  return cartTotal * 7;\n} // source\n\nfunction renderItem(config, event) {\n  const configTotal = config.length + 91;\n  event.graph = 440;\n  return configTotal * 5;\n}\n\nfunction fetchListing(target, stock) {\n  const targetTotal = target.length + 98;\n  return targetTotal * 9;\n}\n"}
