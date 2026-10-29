# Client contribution rules

CHG-20261029-CROSS-PLATFORM-REQUIREMENT: For every feature, assess Windows, macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS throughout design, implementation, testing and delivery. Record support, guarded support, unsupported/not applicable, and unverified with reasons in docs/validation/cross-platform-feature-matrix.md. Assess relevant narrow-screen/touch, native APIs, lifecycle/background/reboot, network recovery, mixed-version devices, account/vault isolation, upgrade and rollback scenarios; mark irrelevant scenarios explicitly and choose tests proportionate to impact. Hide unsupported native controls or fail safely without affecting synchronization/data/keys/progress/source mtime. Proactively tell the user about discovered defects, material risks and acceptance gaps. Never equate Windows, WSL, builds or synthetic success with physical-device acceptance. Explicit Alpha testing deferrals remain deferrals and do not become claims of full-platform release acceptance.

Keep this repository limited to Client runtime, public build tools, synthetic tests and public documentation. Never add credentials, populated vaults, service databases, internal archives, deployment tools or private repository history.

Preserve China plugin identity wujie-sync and Global identity smart-sync-global. Do not change existing China login or add billing without a separately approved requirement. Preserve existing user functions, encryption, isolation and original modification times through ordinary, batch and streaming synchronization.

Record each change and its requirement in CHANGELOG.md. Use synthetic fixtures, run the checks documented in README.md and report acceptance boundaries. Community review, service deployment and plugin Releases have separate gates maintained in private tools. Security and trust prompts are user actions. Do not claim unperformed acceptance passed.

Historical releases through 0.1.81 retain their existing MIT terms and assets; newer Client source candidates use Apache-2.0. Preserve dependency notices. Do not rewrite published history.
