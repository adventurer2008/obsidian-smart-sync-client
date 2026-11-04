# Global Alpha 1.1.5-alpha.3

CHG-20261105-GLOBAL-ALPHA3. User requests publishing a new Alpha containing the committed login/deletion exception repairs and a clear retest checklist. Runtime changes are CHG-20261104-AUTH-DELETE-EXCEPTIONS (77dfb10772f09130addcd0f15e27d39a3ccdea0b); freeze the maintained source with this delivery record, overriding only manifest/package/lock version metadata in the isolated snapshot. Mainline and China version metadata remain unchanged. No application service deployment or Community listing change is part of this Alpha download publication.

## Changes since alpha.2

- After successful authorization, a lost vault-list reply retries listing without another account-device claim or duplicate picker.
- Verified inline email can complete a lost claim through bounded retry/manual checking without reusing a consumed OTP. Resend resets its old timer/retry state.
- Delayed account authorization is bound to the current account as well as vault/service context; old replies cannot overwrite a newly selected identity.
- Closing sign-in while listing is pending suppresses a late picker. An old ACK clears only its own pending flow, preserving newer identity verification.
- Deletion reauthentication is bound to the current account using a local credential hash. Switching accounts cannot reuse another account's saved verification. Legacy pending reauthentication may require restarting verification after this upgrade.
- Closing deletion confirmation invalidates its queued action before POST. An uncertain reply never becomes a local success, and late results cannot sign out or notify success for another current account. Existing empty-cloud, completed-cleanup, identity-proof and exact-confirmation requirements remain.

The previously deployed compact Global pricing web page and its five-card tablet row remain available through the existing storage entry; that stylesheet is not a new plugin change. All alpha.2 behavior outside the repairs is retained, including regional identity, encryption, source mtime, settings, secrets and progress formats.

## User retest checklist

Use isolated test accounts/vaults. After Hub update, confirm 1.1.5-alpha.3. Close any deletion verification already open before updating and begin it again.

| Scenario | Expected result |
| --- | --- |
| Browser sign-in, return to Obsidian, briefly disconnect/reconnect | Sign-in continues; vault picker appears once |
| Email code accepted, then network interrupted during completion | Completion can retry without demanding the already consumed code |
| Close sign-in while network response is pending | No late picker or unexpected new dialog |
| Switch accounts while an earlier login is still pending | The new account remains selected; old replies do not replace it |
| Begin a fresh identity verification while an older completion finishes | New verification remains available and is not cleared by the old completion |
| Open deletion, close/cancel before submitting | Account remains; a queued old confirmation cannot submit |
| Deletion prerequisites or wrong confirmation text | Existing rejection remains; no deletion success is shown |
| Test-account deletion with interrupted response | Do not infer success from a timeout; inspect the actual resulting account state separately |
| Ordinary synchronization and Get more storage | Existing successful flows remain available; verify representative body/source-mtime preservation |

Prior source verification: Windows 355/355, WSL 354 passed plus one Windows-specific skip, Server exception suites 20/20 on each runtime, both regional builds/isolation passed, lint zero errors/seven existing warnings. These do not substitute for exact Alpha artifact verification or physical-device exception acceptance.

Windows/macOS/Linux desktop/Android/iPhone/iPad are conditionally supported by the existing shared host APIs. Physical exception tests, touch, background/lock/reboot and mixed-version native-device acceptance remain pending for the repaired Alpha. Earlier user acceptance of ordinary iOS/Android/Windows flows is retained separately.

## Delivery gates

Verify the exact version-overridden snapshot and built resources, root-level three-file ZIP, independent combined/Alpha feed preservation, anonymous hashes and actual maintained Hub loader/download contract before marking publication complete. Preserve previous packages for code-only rollback; never restore old account/cloud data as part of plugin rollback. Update program files only and retain device data.json, secrets and other vault files. Delivery results are appended after execution.

## Publication completed

Published 1.1.5-alpha.3 to the existing Global Alpha download channel on 2026-11-05. Frozen source: 633412732c5437ca914a7d32e1cc9bf72372ffea, whose runtime repair bytes match 77dfb10. Snapshot-only overrides: manifest.json/package.json/package-lock.json root and package version. The exact snapshot passed Windows 355/355 and WSL 354 passed/one Windows-native NTFS test skipped, with paired local-Server integration enabled on both. Both regional builds and dependency isolation passed with snapshot-local locked dependencies. Source lint evidence is reused for unchanged runtime bytes: zero errors/seven existing warnings; official review is not claimed.

ZIP contains exactly main.js, manifest.json and styles.css at its root, with embedded bytes matching the Global build receipt. Download: https://smartsync.cc/download/alpha/1.1.5-alpha.3/smart-sync-global-1.1.5-alpha.3.zip . ZIP SHA-256: 659e80d984d82b37c7a53c177a5abdc7bb43a80a4dd24af424ea68ca4a78ff93. Both the combined Hub feed /download/releases.json and Alpha-only feed list alpha.3 first, retaining alpha.2/alpha.1/1.1.4 and all old entries/bytes. Only the declared download page, combined/Alpha indexes, new version directory and internal site manifest changed. Static current switched atomically from global-mobile-alpha2-20261104 to global-auth-alpha3-20261105 with the prior site retained.

Server-side anonymous HTTPS verifies all eight published paths. Independent Windows Node 26.12.1 verification bundles the maintained Hub loader and Network code with its test request adapter: it discovers Alpha:1.1.5-alpha.3, downloads all three install files, verifies hashes and manifest identity/version, rejects synthetic main.js corruption, and independently verifies the ZIP hash. Combined index SHA-256: 1b2f6d5402399334ca0a384c0d9da8ad55ac84d09e882c9dc83e5bd0b5fc01df. Actual Hub native installation and repaired iOS/Android/Windows exceptions remain pending user testing.

All eight application units and Caddy retain the same state/PID/invocation identity across static publication; Caddy configuration is unchanged. No service restart, backend deployment, backup operation, account access, charge, real email or installed-vault change occurred. Protected source/build/publication/Hub receipts are retained outside Git. Do not treat this test Alpha as stable or six-platform native acceptance.
