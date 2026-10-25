# Source change record

## Unreleased — CHG-20261025-17 — Default recent and search tools to right sidebar tabs

Requirements: U380/R390; DEC371. Create enabled recent-files and note-search tabs in the right sidebar after layout restoration without activating or revealing them. Reuse restored views, preserve user placement, remove duplicate ribbon icons and keep command-palette access and feature switches. Twelve targeted synthetic regressions and regional builds passed; native-host appearance remains unverified. No installation or release.

## Unreleased — CHG-20261025-16 — Clarify note-tool entrances and pending orders

Requirements: U379/R389; DEC370; CHG-20261025-16. Explain the ribbon and command-palette entrances for recent files and local note search. Add a recent-files command that follows its enable switch. Label a separate pending order without implying that an active subscription is unpaid. Preserve payment verification, current entitlement, note data and original modification times. Targeted synthetic tests passed; native-host acceptance and release are separate.

## Unreleased — CHG-20261025-10 — Explain first-use manual synchronization

Requirements: U376/R386; DEC367; user report on 2026-10-25: clicking Sync now on first use must prompt for purchase. For a disconnected China guest, show a plan-opening prompt immediately with Purchase and Existing account login actions, using the existing plan and login flows. Deduplicate the prompt and reject actions after dismissal or connection/identity changes. Keep free-plan eligibility, signed-in synchronization, pairing and background behavior unchanged. Synthetic regression and local build results are reported separately from native Obsidian acceptance; no release or service deployment.

## 1.0.2 — unreleased security hardening

CHG-20261023-46/47; Requirements: U370/R380, DEC361; U371/R381, DEC362. Reject Windows alternate data streams, reserved device names and ambiguous file names at ordinary and configuration filesystem boundaries while retaining POSIX names and original modification times. Upgrade the isolated Community lint tool to supported ESLint 10 and patched Moment 2.31.0, retain typed API checks, and require Node 26.12.1 or newer for development tooling. Refresh remote device restrictions after any in-flight presence poll. Pin manual-only workflow actions to reviewed Node 24 action commits. These source changes have not been published as a plugin release or deployed.


## 1.0.1 — CHG-20261023-45

Requirements: U369/R379; DEC360. On manual China synchronization, show a short capacity warning with one purchase action when fresh account usage exceeds the current plan, including refunded accounts. Mark over-capacity plans in settings. Keep existing synchronization and server quota enforcement, avoid background pop-ups, and reject stale account responses/actions. User-authorized quick production release; actual deployment acceptance is recorded privately.

## 1.0.0 local verification — CHG-20261023-41

Requirements: U366/R376; DEC357. Automatic GitHub Actions runs are replaced with local Windows and WSL validation maintained by the private release tools. Keep the optional hosted verification workflow manual-only. Runtime and published artifacts are unchanged by this workflow policy.


## 1.0.0 candidate — CHG-20261023-38/39/40

Requirements: U363/R373, U364/R374, U365/R375. China account creation uses the free or paid plan page; existing-account login no longer offers manual beta applications. Retain existing login, pairing, encryption and original file modification times. Prepare version 1.0.0 for staging acceptance; this is not a published plugin Release.


## 0.1.84 staging candidate — CHG-20261023-30

Requirements: U356/R366; DEC347. Include the subscription-card replacement fix after sign-in and free-to-paid upgrades. This is a staging-only candidate. Use the explicitly approved quick local profile while retaining targeted tests, build checks, exact paired CI and staging acceptance. No public plugin release or production deployment.


## Unreleased — CHG-20261023-26 — Replace stale subscription cards after sign-in and upgrades

Requirements: U351/R361; U353/R363; DEC342/344. Dispose the previous mount and its owned DOM before mounting a subscription card on a reused settings row. Show one free plan and opening date after sign-in, and only the current paid plan after an upgrade. Preserve usage, expiry, renewal timing and identity-bound async updates. Add regressions for remounts, late guest responses and free-to-paid upgrades. Local tests and regional builds only; no release or remote installation.

## Unreleased — CHG-20261022-11 — Collect purchase email on the plan page

Requirement: U326/R336; DEC317. Open the plan page directly for guests with a scoped purchase handoff, collect and confirm the email in the browser, and retain account isolation and pending-order resume. Align all plan prices and use a compact desktop plan and checkout layout. Payment status updates automatically; remove manual query and return-to-plans actions. Before any confirmed purchase, the plugin shows the pending status without presenting the order's capacity as an activated plan. Only local simulation identifies itself as such; no release, remote deployment or real charge is performed.

## Unreleased — CHG-20261022-10 — Compact plan purchase row

Requirement: U325/R335; DEC316. Present the unpaid plan entry as a single row with My plan on the left and a prominent Purchase button on the right. Remove the redundant unpaid title, keep current-order messages when present, and retain purchased plan details with renewal on the right. Update only the dedicated local Obsidian test profiles; no release or remote deployment.

## Unreleased — CHG-20261022-09 — Hide unpurchased plan capacity

Requirement: U324/R334; DEC315. Do not present the service's fallback quota as a user's purchased package. Hide capacity, usage and its progress bar without a signed-in account and an active paid plan. Keep one unpaid title and the purchase button, removing the redundant account-activation explanation and empty detail rows. Keep existing synchronization rights and the proposed trial design unchanged. Validate the unpaid 10GB fallback and signed-out cases, then update only the dedicated local test profiles; no remote deployment or release.

## Unreleased — CHG-20261022-08 — Purchase and renewal card

Requirement: U323/R333; DEC314. Show the CN plan, account-wide usage, expiry and current order in one settings card. Emphasize purchase for unpaid accounts and renewal within one calendar month of expiry; keep renewal for previously purchased accounts. Resume pending orders, refresh on return with bounded polling, and remove the order-history and manual-refresh controls. A scoped pre-account checkout never becomes synchronization authorization; only server-confirmed formal payment can activate an account. Keep one-cent tests separate from plan rights. Validate with synthetic data and dedicated local Obsidian profiles. No release, remote deployment or real charge is performed; the subsequently proposed 14-day trial remains a design discussion.

## Unreleased — CHG-20261021-14 — Community CSS compatibility

Requirement: U300/R310; DEC291. Address the two Community CSS warning categories in the next release. Replace the common-settings flex column gap with logical margins on action rows. Replace pairing-code important declarations with modal-scoped span and input selectors, preserving blue, large, bold digits. Published 0.1.82, its tag and artifacts remain unchanged; this source maintenance does not publish or deploy a version. Keep the existing in-plugin infinity logo. The Community icon picker currently offers built-in icons, without a custom image upload control; no substitute icon is selected.

## CHG-20261021-06 — Approved public Client boundary

Requirement: R304 / DEC282 and the user's approved five-repository plan. Establish this repository as the sole maintained Client source line; keep internal history and operational tools private. Use the new regional distribution repository names without changing plugin IDs, service domains or synchronization source. Login and billing remain design-only. Add Windows/Linux unit, build, isolation and local community-lint checks.

License: Apache-2.0 for new Client candidates; existing releases through 0.1.81 and their MIT assets remain unchanged. No new version, production deployment or Global release is performed by this source publication. Local validation and official review are distinct.

## CHG-20261021-08 — Regional lint artifacts in clean CI

Requirement: R304 public standalone verification. The first public CI exposed a missing root dependency map: regional builds write their own artifact directories. Lint now selects the matching regional manifest and dependency map explicitly. Runtime source, lint rules and coverage are unchanged. Local checks on a reused checkout did not expose the missing-root-file condition; the initial CI failure is retained.

## CHG-20261021-13 — China 0.1.82 production candidate

Requirement: U299/R309; DEC290. The user authorizes delivering all maintained, unpublished work through the complete paired release flow. Bump China Client to 0.1.82; retain existing runtime features, original modification times, plugin identity and approved-account login. Publish generated China source and matching artifacts together. Include Apache-2.0 and regional repository metadata introduced since 0.1.81; existing MIT releases remain unchanged. Global login, billing, complete English and overseas hosting remain unimplemented. Server stays 0.1.26 because its business source and schema are unchanged. Production, exact-pair CI, mail and Community release verification are separate acceptance gates and are not pre-recorded as passed.


## Unreleased - CHG-20261022-01

Requirement U316/R326: add China purchase, renewal and order entry using a short-lived single-use billing ticket. Account-only authorization, pinned payment origin and stale-account guards preserve existing sync and encryption behavior. Global billing remains disabled. No release or service deployment.

## Unreleased — CHG-20261022-02 — Purchase environment isolation

Requirement: U317/R327; DEC308. Pin purchase entry to the matching production or staging payment origin; allow the same loopback origin only for development simulation. Keep account authorization and late-response checks. Synthetic tests cover cross-environment rejection. No plugin release or service deployment is performed.

## Unreleased — CHG-20261022-03 — Purchase subdirectories on shared service host

Requirement: U318/R328; DEC309. Pin China purchase links to /pay-test for staging and /pay for production on the service HTTPS host, while keeping loopback development simulation. Preserve account checks, order navigation and one-time tickets; reject the other environment path and query parameters. Source tests and CN/Global builds are local validation; no deployment or release is performed.


## CHG-20261022-12

Requirements: U327/R337. Purchase and renewal actions open plan selection rather than silently resuming an old checkout. Preserve explicit owned-order entry and existing unpaid orders; do not cancel or duplicate provider charges. Verified with 102 Client tests; local simulation only, no release or production deployment.


## CHG-20261022-15

Requirements: U330/R340. Show an explicit review state for verified conflicting payments rather than claiming another package was activated. No release or production deployment.


## CHG-20261022-16

Requirements: U331/R341. Hide renewal outside the final calendar month; show the prominent purchase-sized action when due or expired. Local preview only; no entitlement dates changed.


## CHG-20261023-01

Requirements: U332/R342. Display the scheduled next package and its effective date separately from the current package when renewing into another tier. No release or production deployment.


## Unreleased — CHG-20261023-06/07 — Renewal periods and returning sessions

Requirements: U337/R347; U338/R348; DEC328/329. Label the current package and show the scheduled package on the next row, including same-tier renewals. Refresh on window return, display the extended purchased expiry, and remove the scheduled row when that period becomes current. Confirm paid renewals without asking an existing purchase session to use login mail again. Keep account and session credentials unchanged. Local tests only; no release or service deployment.


## Unreleased — CHG-20261023-12/13 — Free plan and upgrade entry

Requirements: U343/R353; U344/R354; DEC334/335. Show an activated 100MB free plan with its opening date and a prominent purchase-more action below it. Do not label it a trial or show an expiry or a permanent-free promise. Preserve the existing account and data when purchasing an annual plan, along with the existing paid renewal behavior. This replaces the proposed two-week paid-plan trial; no remote deployment or release is performed.


## Unreleased — CHG-20261023-14 — Remove redundant CN signup button

Requirement: U345/R355; DEC336. Remove the CN account row's New user application button now that free account opening is available from the plan page. Keep existing account login, free and paid plan entry, historical applications and administrator management. Other edition entry points remain unchanged. Local test installation only; no release or service deployment.


## Unreleased — CHG-20261023-15 — Hide persistent successful-order text

Requirement: U346/R356; DEC337. Stop showing a completed normal payment as a permanent extra row on the plan card. Keep the checkout success result and updated package details, along with pending, refund, payment-conflict and isolated test-order feedback. No order, entitlement or payment behavior changes; local test installation only.

## 0.1.83 staging candidate — CHG-20261023-16

Requirements: U347/R357; DEC338. Collect all maintained changes since 0.1.82 for staging-first delivery with full regression. Include CN purchase and renewal, the 100MB free plan and paid upgrades, current/upcoming periods, compact checkout and account cards, and Community CSS corrections. Preserve synchronization, original file modification times and regional isolation. Server 0.1.27 verifies payments and owns entitlement, refund and mail state. Global billing stays disabled. Real payment/refund, inbox receipt and device acceptance are separate gates; no production promotion or public Release is authorized.
