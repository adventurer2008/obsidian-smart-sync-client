# Global mobile storage upgrade Alpha

CHG-20261104-GLOBAL-MOBILE-ALPHA. Requirement: user requests execution now for personal testing, superseding CHG-20261104-MOBILE-BILLING-DEFER. Deliver 1.1.5-alpha.2 after existing 1.1.5-alpha.1, including mobile native billing link, English/Chinese labels and stale-link regressions. This is a Global plugin test delivery, not a service deployment or China release. The separate duplicate-terms Server change is outside this plugin artifact.

Freeze maintained Client source, override manifest/package/lock version metadata only in an isolated snapshot and retain all older Alpha artifacts. No installed vault/data.json/credentials are replaced. Physical iOS and other platform acceptance remain pending; source regression results and scenario boundaries are in cross-platform-feature-matrix.md. Verify the exact snapshot, ZIP contents, published hashes and retained history before reporting delivery.
