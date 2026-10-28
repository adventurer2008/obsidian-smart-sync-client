# Small-file pipeline validation — 2026-10-28

Requirement: CHG-20261028-SMALL-FILE-PIPELINE. Source base: `e425e4c769f2f82a0e24e7131e1c8504f8723f2f`.

## Scope and risk controls

- Implement next-window prefetch, task-list incremental rendering and checkpoint serialization reuse. Parallel file receiving was explicitly cancelled and is not implemented.
- The next prefetch owns separate caches. At most one next window is prepared; current and next windows may coexist. Receive/write/cursor/checkpoint publication remains serial. Pending speculative work settles before cleanup, including cancellation and failures.
- Existing window byte/item limits and checkpoint count/time/byte thresholds remain unchanged. Ciphertext/domain verification, content integrity, source modification times, attachment scope, retry persistence and commit publication barriers are retained.
- The task list retains unchanged row nodes, paging controls and expanded details. Changed failure/retry states update their actions; removed/page-excluded/workspace-excluded rows leave the cache.
- Checkpoint encoding compares all own primitive record fields and retains their serialized representation when unchanged. Nested/unknown values are serialized normally. Deleted records leave the bounded current-capture cache. Commit failure does not publish a new descriptor.
- Installed plugins and active synchronization libraries are not modified. This change has not been released or deployed.

## Validation

- Initial targeted Windows regression: 80 passed, zero failures (Node 24.14.0; compatibility evidence, not the prescribed Node 26 runtime).
- WSL Ubuntu / Node 26.12.1 full regression before the additional mixed-size case: 241 passed, zero failures, two skipped of 243. Skips: Windows-only NTFS streams and optional paired-service integration.
- Final Windows / Node 24.14.0 full regression including the mixed-size case: 243 passed, zero failures, one optional paired-service skip of 244. This is supplementary compatibility evidence; Windows Node 26.12.1 was not available in the selected local runtimes. The Windows-only NTFS case passed here.
- The optional paired-service three-device position/content/mtime integration was separately enabled with the local synthetic Server fixture on WSL Node 26.12.1: one passed, zero failures. It did not access hosted services.
- WSL Node 26 expanded prefetch suite: five passed, zero failures. Includes 4,096 small files with exact content/source mtime and fresh-engine checkpoint resume, and 2,048 mixed-size Markdown/attachment files with more than 30 MiB of verified content. In-memory fixtures avoid writing populated libraries to disk.
- Prefetch regression uses a gated current write to prove next-batch preparation overlaps without a second active file write or speculative cursor advancement. Authorization failure and cancellation tests require correct retry/draining and no speculative file application.
- DOM tests retain unchanged row nodes and expanded details while updating progress; exercise failure resolution, paging, scope changes and save-error visibility.
- Checkpoint tests cover in-place primitive/nested edits, deletions, corruption, write/rename/commit faults, descriptor rollback, queued captures and compaction.
- CN/Global builds and both isolation checks passed. Local Community lint: zero errors, five existing warnings; this is not official Community review.

## Synthetic CPU comparison

Run `node scripts/benchmark-small-file-metadata.mjs`. One Node 26.12.1 WSL observation, with 2,000 synthetic notes/indexes and 20 captures changing one note per capture: original full capture 522.7 ms, serialization reuse 94.4 ms (about 5.54 times faster for capture only). Both captures produced identical records. This is a CPU-only microbenchmark, not network performance, total synchronization throughput, or a guaranteed improvement on another machine.

## Acceptance boundaries

No replacement of the active comparison plugins, production-service traffic, full real-vault hash pass, optimized native Obsidian session or phone/iPad acceptance was performed. Independent synthetic tests do not prove absence of new bugs. Real throughput and peak-memory acceptance requires a separate controlled run using identical verified file sets; do not combine optimized results with the ongoing baseline comparison.
