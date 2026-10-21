# Smart Sync Client

Shared Client source for Wujie Sync (China) and Smart Sync (Global). [简体中文](README.zh-CN.md).

## Scope

This is the Client development repository. Regional builds share the synchronization runtime, with separate identities and service configuration. China uses the existing approval and account flow. The Global service and complete English catalog are not ready for distribution. External login and billing are design-only and are not implemented here.

Server source, internal archives, deployment tools and private acceptance evidence are maintained privately. The public synthetic tests do not replace Client/Server integration, production, official Community review or physical-device acceptance.

## Build and test

Use Node 26.11.1:

```sh
npm ci --ignore-scripts
npm test
npm run build:all
npm run check:editions
npm ci --prefix tools/community-lint --ignore-scripts
npm run build:cn
npm run check:community
```

Regional outputs are in artifacts/cn and artifacts/global. The default build is for local development. These commands do not install plugins, deploy services or publish Releases. Windows and Linux CI run the same checks; a lint result does not constitute Community approval.

## Accounts, network and privacy

Synchronization needs an approved account and the matching regional service. Content and paths are encrypted on the client; the service handles account/workspace identifiers, enrollment email, notebook/device labels, timestamps, ciphertext sizes and opaque identifiers. Keep the encryption passphrase safe; external login does not replace it. No prices or recurring charges are introduced. Avoid running multiple sync providers on the same vault without resolving their interaction.

[China installation and distribution](https://github.com/adventurer2008/obsidian-smart-sync-release-cn) · [Privacy](https://github.com/adventurer2008/obsidian-smart-sync-release-cn/blob/main/PRIVACY.md). The Global distribution repository is a placeholder until its release gates pass.

## License and provenance

Copyright (c) 2026 lihy. New Client candidates after the existing 0.1.81 release use [Apache License 2.0](LICENSE). Existing releases through 0.1.81 retain their original MIT terms and assets. Dependency licenses remain in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md). Apache-2.0 permits commercial reuse; it grants no hosted-service access or Server rights.

[PROVENANCE.json](PROVENANCE.json) records the source snapshot and unchanged runtime/resource hashes. Regional distribution names are updated under CHG-20261021-06. This source publication does not issue a new plugin version or replace installed binaries.
