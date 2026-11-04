# Global Community submission preparation

Change: CHG-20261104-GLOBAL-COMMUNITY-SUBMIT. User explicitly requests publishing and submitting the overseas plugin. Domestic services and installed vaults are outside this change.

The official Community form accepts the Global repository and requires Developer Policies agreement and a continued-maintenance commitment. Those commitments have not been accepted and no submission is claimed. The official guide requires a GitHub Release; the existing snapshot remains preview-only until the separate Global release gates are satisfied.

Policy review found automatic client diagnostic upload. The Global build now retains local task logs, bounded local Android diagnostics and manual diagnostic export, but neither queues nor uploads remote diagnostic telemetry. Legacy outboxes are discarded during Global load; upload entry points independently reject Global calls. Account authentication, encrypted synchronization, device presence for user-visible device management and peer discovery, and billing requests remain service operations, not analytics. Server access logging remains a separate privacy disclosure.

Five timer lint warnings are fixed using window.clearInterval. Seven warnings remain reviewed: six fetch references preserve abort/streaming/bounded response and redirect checks; replacing them with requestUrl would lose required cancellation semantics. The codec .obsidian literal rejects reserved metadata paths even with a custom configDir; it does not read host configuration from a hardcoded directory. No lint rules are suppressed. Local lint is not official approval.

Before the diagnostic change, Windows Node26.12.1 passed335 tests; WSL passed334 with one Windows-only NTFS-stream test skipped. Both regional builds/isolation checks passed, and Global lint reported zero errors/seven warnings. The post-change verification is recorded below when executed.

Fresh physical acceptance on Windows, macOS, Linux desktop, Android, iPhone and iPad remains unverified for this exact candidate. Prior Windows user reports concern an earlier bundle. WSL is not Linux desktop acceptance. No real Stripe charge or full-platform acceptance is claimed.

## Post-change verification

Windows Node26.12.1 complete suite:337 passed, zero failed/skipped. WSL Node26.12.1 complete suite:336 passed, zero failed, one Windows-only NTFS-stream test skipped. Both regional builds and Global closure pass. Global local lint:zero errors, seven reviewed warnings. Focused diagnostic/ordering checks:16 passed. The first Windows full run had one attachment-relative-order assertion failure in notes-first.test.mjs; that unchanged test passed on focused rerun and complete rerun. This intermittent result is retained as a validation limitation, not silently discarded. Only Markdown-before-attachments is the product requirement; no attachment-order implementation change is included.
