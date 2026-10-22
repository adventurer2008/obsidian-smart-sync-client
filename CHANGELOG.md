# Source change record

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
