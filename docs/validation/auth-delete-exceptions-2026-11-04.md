# CHG-20261104-AUTH-DELETE-EXCEPTIONS

Requirement: the user reports storage entry/layout, ordinary three-platform synchronization and interruption recovery passed, then asks the agent to test login/deletion exceptions and interruption-recovery boundaries and fix defects. Preserve that user acceptance separately from the automated results below. Use synthetic identities, temporary vaults and loopback services only; never operate on the user's real account, email or notes.

## Reproduced defects and repairs

1. Authorization succeeded but the subsequent vault-list request failed: the dialog had marked itself completed before the request returned, suppressing retries. Retain the verified account API and retry only the vault listing; claim/device authorization is not repeated. Completion is set after picker preparation succeeds.
2. Inline email verification succeeded but the claim reply was lost: polling had not been started, leaving a consumed OTP unable to complete sign-in. Start bounded polling after verification, retain manual checking and recover uncertain network failures without resubmitting the OTP. Resend correctly clears the old timer handle and retry state.
3. Account switched while claim/principal requests were delayed: local vault/origin checks alone allowed overwriting another current account. Bind each in-flight request to the current account credential, recheck before saving, and check again after ACK. Account secrets themselves are never added to flow metadata.
4. A saved deletion reauthentication flow could be reused after changing accounts within the same local vault. Store only a SHA-256 binding to the current random credential, require a matching binding to reuse/claim reauthentication, and restart legacy pending reauthentication without that binding. Ordinary sign-in, account isolation, service domains and server contracts remain unchanged.
5. A closed delete confirmation still had a callable queued action. Invalidate it on close and recheck inside the exclusive operation before POST. An already submitted remote request cannot be canceled by closing the UI; an uncertain response does not produce local sign-out or a success notification. A late old-account response cannot announce success for the new current account.
6. Closing sign-in while vault listing was pending could open a late picker. Check dialog/account/vault/origin liveness after listing and before presenting the picker.
7. An old claim ACK could clear a newer pending reauthentication flow. Clear only the flow matching this request's identifier and verifier; leave newer flow storage intact. Reauthentication handoff failures are shown through normal notification after the old dialog has closed.

New regressions failed before the relevant fixes and passed afterward. The queued-exclusive test's first fixture incorrectly resolved a rejected operation; corrected the fixture to propagate rejection. Those first-run Windows/WSL failures are retained privately and are not recorded as product regressions passing. The prior inline-email fixture was extended with the host's registerInterval API when polling became part of that scenario.

## Platform and scenario boundaries

| Platform | Support / this execution |
| --- | --- |
| Windows desktop | Conditional host support; synthetic client, loopback service and build checks, not a new native-host exception acceptance |
| macOS desktop | Conditional shared host/API support; physical exception scenarios unverified |
| Linux desktop | Conditional shared host/API support; WSL is automated Linux runtime evidence, not native Linux Obsidian |
| Android | Conditional shared UI/lifecycle support; earlier user normal-flow acceptance retained, repaired exceptions need physical confirmation |
| iPhone/iOS | Conditional shared UI/lifecycle support; earlier user iOS report retained, repaired exceptions need physical confirmation |
| iPad/iPadOS | Conditional shared UI/lifecycle support; exact iOS device subtype not independently identified, repaired exceptions need physical confirmation |

Foreground/network recovery, repeated return events, hidden polling suspension, flow expiry, account/vault/service changes, canceled dialogs, lost replies and new-flow isolation are covered by automated fixtures. No new native API or CSS; the existing manual-check control becomes available when inline verification needs completion. Touch, accessibility, physical lock/background/process restart and OS scheduling are not certified by Node/JSDOM. Sync interruption/resume, encryption, body/source-mtime and paired-device regressions run separately in the complete suite. No claim of unlimited mobile background execution.

Only the existing CN deletion confirmation gets the same close/queue guard; China login and payment remain unchanged. Deletion still requires empty cloud storage, completed cleanup, identity proof and exact confirmation. No note contents, encryption keys, sync checkpoints or mtime formats change. Upgrading a pending legacy deletion verification may require starting verification again; logged-in credentials and notes are preserved. Code rollback uses retained artifacts and never restores deleted cloud accounts/data.

## Delivery status

Source repair and local verification only. No plugin installation, new Alpha publication, service deployment, real email, charge, account deletion or formal-vault operation is part of this execution. The currently published Alpha is not silently overwritten. Automated results are recorded below after completion.

## Completed verification

- Windows Node 26.12.1 complete Client suite: 355 passed, zero failures/skips. Set SMART_SYNC_SERVER_DIR explicitly so the paired three-device loopback service integration runs rather than skipping it.
- WSL Ubuntu Node 26.12.1 complete Client suite: 354 passed, one Windows-native NTFS-stream guard skipped, zero failures. Paired integration also ran against the explicit local Server checkout.
- Targeted Global host cases: 27/27, including eight newly added tests and the existing OTP/throttle/cancellation/expiry/foreground/account-close checks. Seven distinct failure conditions were demonstrated before their associated repairs; new queued/uncertain deletion assertions additionally retain the no-false-success boundary.
- Unchanged Server auth/auth-HTTP/account-close/device-lifecycle suites: 20/20 on Windows and 20/20 on WSL, using real temporary loopback services and synthetic provider/mail adapters. They cover expired/wrong OTP, throttles, PKCE/state/cookie/origin/host checks, replay and ownership, reauthentication, nonempty/pending-cleanup rejection, paid-account closure and delayed creation crossing closure. No real OAuth account, email, billing or hosted service was touched.
- Both CN/Global builds and 26-module dependency isolation checks passed. Community lint: zero errors, seven existing fetch/config-path warnings. Official Community review and native platform acceptance are not implied.

Final full-suite runs supersede the retained first-run fixture failure logs. Source and artifact fingerprints and logs are retained privately under the task's operator evidence directory, without copying credentials or real data into Git. No Server source change was necessary; no empty companion commit is created.

Subsequent user-authorized delivery: Global 1.1.5-alpha.3 was published for physical retesting on 2026-11-05, with exact snapshot and real Hub discovery/download verification. This supersedes the earlier source-only delivery status for publication, while physical acceptance remains pending. See global-alpha3-2026-11-05.md for changes, test steps and retained rollback artifacts.
