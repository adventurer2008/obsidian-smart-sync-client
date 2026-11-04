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
