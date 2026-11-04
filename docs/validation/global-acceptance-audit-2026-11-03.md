# Global acceptance audit

Change: CHG-20261103-GLOBAL-ACCEPTANCE-AUDIT. Requirement: review what remains unfinished and untested after the user reports the overseas PC flow passed except payment. Documentation only; no service, account, billing, China deployment or formal-vault mutation.

## Accepted evidence

The user reports PC ordinary end-to-end acceptance in the Windows isolated Global-Test-Vault context. No detailed case inventory or observed bundle hash was supplied; do not expand this to fault injection, every provider, every quota, other physical platforms or payment. Earlier automated and agent-operated Stripe sandbox checks are separate evidence.

Read-only overseas host audit on 2026-11-03: current release resolves to prevalidation-20261103-20gb-unlimited. Core, pay, manage, user and Caddy are active. The last backup service result is success with exit status 0. The timer last ran 2026-11-03 08:13:30 UTC (16:13:30 Asia/Shanghai); next run is 2026-11-04 08:14:54 UTC (16:14:54 Asia/Shanghai). These checks prove service/timer state, not checkout, current-archive restore or indefinite reliability. Older deployment receipts are historical and must not be mistaken for this current release.

## Remaining work and evidence gaps

- Payment: repeat the current catalog's monthly/yearly checkout, entitlement refresh, duplicate/delayed callbacks, cancellation, failed renewal, expiry and refunds in Stripe test mode. Earlier sandbox success predates later account, catalog and pricing changes. Real charging remains intentionally disabled.
- Physical platforms: macOS, desktop Linux, Android, iPhone and iPad need their own real-host acceptance. Windows/WSL tests cannot substitute. Include touch/narrow screen, browser/app return, lock/background/restart and mixed-device synchronization.
- Exceptional flows: record real interruption/restart during creation, lost replies without duplicate vaults, expired/wrong/throttled OTP, canceled/denied OAuth, account isolation and plan-limit enforcement. Existing synthetic coverage is not complete physical acceptance.
- Data integrity: validate representative mixed-device notes, attachments, encrypted notes, conflicts, rename/delete/history recovery, exact body and original source mtime with isolated fixtures. General PC acceptance is not an enumerated proof of every scenario.
- Recovery: local encrypted backup and isolated WSL restoration have prior evidence, but the latest auth/deletion state needs a fresh isolated restore and full ARM rebuild drill. Preserve closed-account guards so old backups do not resurrect deleted identities. Current local-only backups do not provide continuing off-machine redundancy; automatic standby takeover was explicitly deferred.
- Operations: both Bastion targets have prior actual SSH evidence. A real home-IP change and full recovery drill remain unverified. Independent outage, disk/backup failure notifications and notification delivery have no complete evidence in the reviewed records; verify configuration before claiming coverage.
- Storage credential: recorded R2 prevalidation credential expires 2026-12-02. No rotation was performed in this audit; verify the active credential and rotate before expiry if still applicable.
- Language following: Global plugin/pay following Obsidian's language remains a plan, not implemented runtime behavior. Current English Global UI is separate from this feature.
- Publication: the test candidate is installed in the isolated vault; public Global plugin Release and formal launch are separate unfinished delivery gates. Independent account management web UI and automatic failover were deliberately deferred, not defects.

The English website/legal pages and Google public audience were completed in the session after older records describing those blockers. Do not relist those historical blockers as current failures. Mail has prior Gmail inbox and SPF/DKIM/DMARC evidence; other recipient providers, production-volume limits and broad rendering still lack acceptance. DMARC remains observation-only in the recorded configuration.
