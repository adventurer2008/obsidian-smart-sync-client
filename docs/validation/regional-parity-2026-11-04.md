# Regional account and endpoint parity

Change: CHG-20261104-REGIONAL-PARITY. User requests common account deletion across China and Global, independent payment/plan pages, and centralized regional endpoints. China retains existing login without social login or email-code verification.

## Executed verification

- Windows and WSL Ubuntu targeted Client suites: 43/43 each, covering regional endpoint configurations, Global staging transport/sign-in, stale-flow origin changes, CN cloud-first confirmation without email/OAuth, old-service upgrade rejection, readable errors and payment cards/entries. Global cards cover 20 GB and a synthetic future 40 GB tier.
- Both regional builds and dependency-isolation checks passed on Windows. No plugin was installed or published.
- Windows complete Client suite with the explicitly paired Server checkout: 333 passed, one failed, zero skipped. The remaining failure is the existing Chinese-language policy check on `encryption.text16` containing Markdown. This unrelated encryption message was not changed here; full regression is not marked passed.
- Paired Server Windows/WSL suites: 56/56 each. CN closure also verifies revoked/bootstrap proof rejection, active paid time never blocking closure, retained paid ledger and erased active entitlement.

Ignored logs remain in the private Server checkout's local-test-data directory. Synthetic results do not establish hosted/native acceptance.

Both settings views expose Account → Danger zone → Delete account after authentication. Require zero cloud vaults and completed cleanup, explain consequences and require the exact localized confirmation phrase (Chinese account-deletion phrase or English DELETE; wire confirmation DELETE). Global keeps recent same-account identity verification. China re-enters the original account login key; the server checks same owner, unscoped original grant and active status. Device/foreign/bootstrap keys and missing proof are rejected. Paid time never blocks deletion, deletion does not automatically refund, and local notes remain. Global renewal cleanup remains Global-specific. Unsupported services prompt an upgrade without falling back to legacy bulk deletion.

Exact regional configuration binds sync/pay/auth to production or staging. Global staging has separate domains; China retains the existing loopback tunnel and pay-test prefix. Arbitrary URLs are rejected. Pending auth stays bound to its original account/vault/origin. Global plan cards recognize 20 GB and future configured positive integral GB tiers. Payment/plan page sources are independent in the private Server repository while protocol/entitlement/account safety remain shared. This source-only change does not alter production, real accounts, installed plugins or formal vaults.

## Platform and scenario boundaries

| Platform | Support and acceptance |
|---|---|
| Windows | Conditional on compatible online service; synthetic dialog/transport tests, new physical Obsidian acceptance unverified |
| macOS | Shared controls/browser flow; physical acceptance unverified |
| Linux desktop | Shared controls/browser flow; WSL does not establish native acceptance |
| Android | Shared touch controls/browser flow; physical browser return, lock/background and reconnect unverified |
| iPhone/iOS | Shared controls/browser flow; physical browser return, lock/background and reconnect unverified |
| iPad/iPadOS | Shared controls/browser flow; physical touch, split/narrow view and browser return unverified |

Danger controls retain wrapping/44px styles. No platform-specific native capability is added. Restart/background expiration uses existing bounded flows; physical lifecycle checks remain pending. Offline/failed confirmation preserves local state without false success. Changed identity/origin rejects stale dialogs. Mixed old clients must satisfy server-side cloud cleanup even through the legacy endpoint. Sync bodies, encryption, progress and source mtime are not migrated. Rollback must retain account closure/revocation tables and never restore an old database over payment or deletion records.
