# Smart Sync Client

Local source-publication candidate for Wujie Sync (China) and Smart Sync (Global). This directory has not been uploaded or approved for publication. [简体中文](README.zh-CN.md).

## Scope

The same runtime source is built with regional identity and service configuration. The Global service and complete English catalog are not ready for distribution. Google login, scan login and billing are design-only and not implemented here.
Server source, internal archives, private deployment/integration/native tools and evidence are excluded. This public unit-test subset is not full paired, production or physical-device acceptance.

## Build and test

Use Node 26.11.1. Run npm ci --ignore-scripts, npm test, npm run build:all, then npm run check:editions.
Regional outputs are artifacts/cn and artifacts/global. npm run build is local development only. No command here installs plugins, deploys services or publishes Releases.

## Accounts, network and privacy

Synchronization needs an approved account and the matching regional service. Content and paths are encrypted on the client; the service handles account/workspace identifiers, enrollment email, notebook/device labels, timestamps, ciphertext sizes and opaque identifiers. Keep the encryption passphrase safe; external login does not replace it.
China public-beta approval and existing access remain unchanged. No prices or recurring charges are introduced by this candidate. Do not enable multiple sync editions/providers on the same vault without resolving their interaction.
Installation and migration: https://github.com/adventurer2008/obsidian-smart-release
Privacy: https://github.com/adventurer2008/obsidian-smart-release/blob/main/PRIVACY.md

## License and provenance

Copyright (c) 2026 lihy. New Client candidates after the existing 0.1.81 release use Apache License 2.0; see LICENSE. Existing releases through 0.1.81 retain original MIT terms and assets. Dependency licenses remain in THIRD-PARTY-NOTICES.md. Apache-2.0 permits commercial reuse. Server software and hosted-service access are excluded.
PROVENANCE.json records the fixed source commit and unchanged runtime/resource hashes. The proposed public repository is obsidian-smart-sync-client; it has not been created.
