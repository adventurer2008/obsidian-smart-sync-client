# GitHub delivery and Community preparation

Change: CHG-20261104-GITHUB-COMMUNITY-PREP. Requirement: commit and push the accumulated maintained code, then prepare the Global Community candidate. No new version, tag, binary Release, listing submission, plugin installation or service deployment is part of this preparation step.

The canonical Client remains the only development source. The Global distribution snapshot is generated from its fixed commit using the existing private export tool. Server, deployment tools, credentials and private history stay outside public snapshots. Source and generated distribution commits do not establish that the same complete source is deployed: prior runtime delivery used scoped patches, while regional account parity remains source-only.

Preparation removes two empty exception handlers by sharing pending-creation cleanup. Malformed state cannot interrupt connection/deletion; another origin or vault cannot clear the pending operation. A synthetic regression covers these boundaries. The Chinese-message check permits Markdown as a format name, while continuing to reject English prose. No Chinese UI text, payment policy, sync data or source mtime changes.

Global metadata now references the published privacy policy, United States application hosting and previously verified outgoing mail. R2 storage geography remains separately unspecified in the privacy policy. This metadata is not a guarantee of current mail availability or formal Community approval.

## Executed verification

- Pinned Node 26.12.1 Windows complete Client suite with explicit local Server pairing: 335 passed, zero failed/skipped.
- Same pinned WSL Ubuntu suite: 334 passed, zero failed, one Windows-only NTFS stream-rejection test skipped. WSL is not native Linux desktop acceptance.
- Both regional builds and dependency-closure checks passed on Windows. Global Community lint: zero errors, 12 warnings; warnings remain review items, not Community approval. Generated snapshot reproduction is recorded in the distribution preparation report.
- Initial run retained an obsolete Chinese-language assertion failure on the technical format name Markdown and two empty-catch lint errors. The final source fixes those; the earlier failures are not represented as passing runs.
- Known credential-pattern scanning found no matches before staging. It cannot prove absence of arbitrary secrets. Raw logs remain ignored.

Physical Windows/macOS/Linux desktop/Android/iPhone/iPad acceptance is not performed by this source-delivery task. Existing user-reported Windows acceptance applies only to its earlier candidate. Fresh native secure storage, touch/narrow-screen, browser return, lock/background/restart, offline/mixed-device, install/upgrade and rollback acceptance remains pending. No formal vault is accessed.
