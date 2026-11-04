# Global connection secret identifier fix

Change: CHG-20261103-GLOBAL-SECRET-ID. Requirement: resolve the reported failure after Google sign-in, account-encryption setup and creation of a vault.

The Global plugin ID, a real 36-character local UUID and `encryption` produced a 65-character host secret identifier. Obsidian accepts at most 64 characters. The full synthetic connection reproduced `Invalid host secret ID` in `applyConfiguration`, after a scoped device session had already been issued. Earlier sign-in tests used shorter synthetic local IDs and did not exercise the complete connection path.

Global reads, writes, edits and clearing now use the `enc` suffix, retaining the full plugin ID and local UUID. China keeps its original identifier. Account authorization, encryption derivation and server protocols are unchanged. Existing cloud vaults are retained; the reported retry created two same-name vaults, which must not be silently deleted or recreated.

Verification: Windows targeted suite 49/49 on Node 24.14.0; WSL targeted suite 35/35 on Node 26.12.1, with an additional 35/35 compatibility run on Node 22.22.1. Both edition builds, edition isolation and diff whitespace checks passed. The Windows run is not a Node 26 release gate, and no release was requested or performed. The regression covers a full first connection under the host ID constraint, persistence and reload, same-app local-vault isolation, clearing after cloud-vault deletion, and unchanged China secret names.

The installed isolated Global bundle's prior source receipt matched every runtime input except this patch's `src/plugin.js`. The fixed candidate is installed only in the existing isolated test vault. Native reload was attempted but Windows denied window activation / cursor access; actual user password entry, reconnect and synchronization are not marked passed. No credentials were read, no accounts/vaults were deleted, and no server or China/formal-vault deployment was performed.

Windows native acceptance remains pending. macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS are unverified on physical devices. Original file contents, source mtimes and synchronization state are unchanged by this patch. The prior isolated bundle is retained for recovery, but it retains the connection defect.
