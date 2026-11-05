# Global 1.1.5-alpha.4 — direct browser handoff

CHG-20261105-GLOBAL-ALPHA4. Requirement: user asks to remove the mandatory My plan browser-link dialog, open the browser directly and retain a dialog only for exceptional cases; then explicitly authorizes publishing the next Alpha immediately after verification. Deliver Global 1.1.5-alpha.4, preserving alpha.3 and all older packages.

## Behavior and limits

- Prepare an authenticated, validated Global plan ticket while the mobile plan card is loading. Keep it in memory only, bound to the exact local vault identity, service origin and current account credential, for at most 90 seconds against the existing 120-second server ticket. Preparation does not navigate, open login, create a paid order or charge. Reuse a still-valid prepared ticket without another request; consume it on click. Expired, changed-identity or consumed entries must be replaced.
- With a prepared ticket, the real click opens the system browser in its original synchronous event stack. This avoids losing transient activation during account/payment-entry requests. On a cold/failed preparation, retain normal authenticated URL retrieval and try opening directly before offering the fallback.
- Mobile opening always uses noopener/noreferrer. A null return is not treated as proof of failure: native bridges and noopener can return null despite opening. Listen for blur, hidden visibility and page departure; these acknowledge observed host departure and cancel fallback. A thrown opening error offers the native link immediately. Without an observed handoff after 1.5 seconds, offer the native-link fallback only while the same live account/vault/origin/ticket is still valid and visible.
- This is bounded observation, not a guaranteed OS success/failure receipt. A host that opens a side-by-side browser without any departure/focus signal, or a very slow cold browser launch, may still show the conditional fallback. Keep that uncertainty explicit and retest Android/iOS multitasking on physical devices; do not claim perfect detection from a null return or desktop simulation.
- Repeated attempts cancel earlier monitors/close older fallback windows. Sign-out/unload clear monitors, cached tickets and fallback. Register one unload cleanup rather than accumulating one per click. Fallback links remain single-use, locally expiring and account-bound; no unrelated window can open after identity change/background/disposal.
- Desktop direct opening remains. CN guest/account flows retain their existing API/region behavior; mobile CN shares the direct-first fallback monitor but does not gain Global ticket preparation. No synchronization, encryption, body/key/mtime/progress, prices, Stripe order semantics or server contracts change.

Primary references: WebKit transient activation guidance https://webkit.org/blog/13862/the-user-activation-api/ and HTML window-open algorithm https://html.spec.whatwg.org/multipage/nav-history-apis.html#dom-open . No platform-native capability is inferred from a successful Node fixture.

## Verification and release gates

Targeted fixtures cover immediate opening without a modal, null noopener return followed by departure, thrown host failure, lack of acknowledgement, hidden/pagehide/disposal, account changes, invalid URLs, expiry, consumed tickets, preparation without login/navigation and no launch after unload. Cache tests assert browser opening occurs before another awaited request.

Freeze the maintained source; override only manifest/package/lock version metadata to alpha.4 in the isolated build snapshot. Run the exact snapshot Windows/WSL tests with the local paired Server, both regional builds and isolation, and current lint. Verify a ZIP containing exactly the three root program files, public file hashes and manifest, and actual maintained Hub combined-feed loading/download/tamper rejection. Keep old Alpha entries/assets, all service identities and Caddy config unchanged during static publication.

| Platform | Support / acceptance |
| --- | --- |
| Windows desktop | Existing direct browser path retained; automated runtime/build checks, physical update unverified |
| macOS desktop | Existing direct browser path retained; physical update unverified |
| Linux desktop | Existing direct browser path retained; WSL checks are not native Linux Obsidian acceptance |
| Android | Conditional direct-first mobile path; actual bridge/focus/multitasking behavior pending user test |
| iPhone/iOS | Conditional pre-prepared synchronous handoff; actual system-browser/lock/resume pending user test |
| iPad/iPadOS | Conditional pre-prepared handoff; physical split-view/side-by-side/browser-return pending user test |

Existing button and fallback-link layout remains; the fallback text now says to use the link only if the browser did not open. No new CSS/native API. Check narrow/touch and background/lock/restart on physical hosts. Offline preparation does not claim offline checkout; old clients remain compatible with the unchanged ticket API. Upgrade/rollback changes program files only, keeps data.json/secrets/sync state and never restores old cloud data. No real account operation, billing transaction or backend deployment is authorized by this download publication. Exact results and publication receipts follow below.

## Completed verification and publication

Frozen source: 7a244e0351ae0f92f0ce025889207f9ff6bbf948. The exact isolated alpha.4 snapshot overrides only manifest.json, package.json and package-lock.json root/package versions. Windows Node 26.12.1: 361/361 passed, no skips; WSL Node 26.12.1: 360 passed/one Windows-native NTFS guard skipped. Both run the explicit local paired-Server integration. CN/Global builds and 26-module isolation pass with snapshot-local dependencies. Current Global lint: zero errors/seven existing warnings. Targeted billing/card/auth checks pass, including four new browser-monitor and two preparation/cache guard tests.

Real Windows Chromium and WebKit regression harnesses import the fixed snapshot's billing helper and exercise a real user click: transient activation is true at the opening call, a popup is created, and its opener is null. Explicit modeled hybrid-host departure suppresses fallback; thrown opening failure, unacknowledged return, and changed-identity suppression behave as specified. These are browser-engine checks, not physical Android/iOS external-browser acknowledgement. Initial harness failures came from incorrect native timer method binding and focus transitions left by the previous popup; corrected timer binding and isolated each scenario in a fresh context before the passing runs. Runtime source did not change for that harness correction.

Published to the existing Global Alpha download site on 2026-11-05, with /download/releases.json and /download/alpha/releases.json both listing alpha.4 first. Preserved alpha.3/alpha.2/alpha.1/1.1.4 entries and all historical package bytes. ZIP: https://smartsync.cc/download/alpha/1.1.5-alpha.4/smart-sync-global-1.1.5-alpha.4.zip ; SHA-256 e49115701afcd582e40b9fc9659179b041cfc7991316183f943fcb27b751ac6c. ZIP inspection confirms exactly main.js/manifest.json/styles.css at the root with bytes matching the Global build receipt.

Static current switched atomically from global-auth-alpha3-20261105 to global-direct-alpha4-20261105. Server anonymous HTTPS verified all eight new/changed paths. Independent maintained Hub loader/Network verification discovers alpha.4 and retained history, downloads all three install files, checks identity/version/hashes, rejects synthetic main.js corruption and independently verifies ZIP hash. Combined index SHA-256: 0c1ce90ffbaa1407172787dca225b1c52d51d8d5e902f3264c5c5875ebd3a270. All eight application units and Caddy retain state/PID/invocation identity; Caddy configuration is unchanged. No application restart, backend deployment, backup run, real account/email/charge or installed-vault operation occurred.

Update through Hub → Smart Sync → Alpha → 1.1.5-alpha.4, reopen settings and wait for the plan card to load, then tap Get more storage. Expect a direct browser opening; test the exceptional native-link fallback separately. Actual Android/iPhone/iPad bridge/focus/split-view/background acknowledgement and native update remain pending user acceptance. Previous ordinary three-platform user acceptance remains as recorded. Protected source/build/browser/publication/Hub evidence is retained outside Git.
