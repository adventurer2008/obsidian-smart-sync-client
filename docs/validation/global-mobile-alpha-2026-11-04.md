# Global mobile storage upgrade Alpha

CHG-20261104-GLOBAL-MOBILE-ALPHA. Requirement: user requests execution now for personal testing, superseding CHG-20261104-MOBILE-BILLING-DEFER. Deliver 1.1.5-alpha.2 after existing 1.1.5-alpha.1, including mobile native billing link, English/Chinese labels and stale-link regressions. This is a Global plugin test delivery, not a service deployment or China release. The separate duplicate-terms Server change is outside this plugin artifact.

Freeze maintained Client source, override manifest/package/lock version metadata only in an isolated snapshot and retain all older Alpha artifacts. No installed vault/data.json/credentials are replaced. Physical iOS and other platform acceptance remain pending; source regression results and scenario boundaries are in cross-platform-feature-matrix.md. Verify the exact snapshot, ZIP contents, published hashes and retained history before reporting delivery.

## Execution result

Frozen source: 39fd733. Snapshot-only version overrides: manifest.json, package.json and package-lock.json root/package version. Windows Node 26.12.1: 346 passed / 1 optional paired-Server skip / 0 failed. WSL Node 26.12.1: 345 passed / 2 skips / 0 failed. Both regional builds and 26-module isolation checks passed in the Windows snapshot. Earlier maintained-source lint: zero errors, seven existing warnings; not rerun for metadata-only snapshot overrides.

Created and inspected ZIP with exactly main.js, manifest.json and styles.css at its root; all embedded bytes match the built Global resources. ZIP SHA-256: a78b04c6694b7ddc49f5ee2c6dd02292f0b02cf7efb6cdabdcaad58b65a5d52b. Local deliverable: ../output/smart-sync-global-1.1.5-alpha.2/smart-sync-global-1.1.5-alpha.2.zip (relative to workspace parent). Source commit pushed normally to the designated public Client mainline.

Download-site publication is incomplete: after initial successful read-only inspection, repeated primary-host SSH attempts closed during banner/key exchange or timed out; an existing standby-host access attempt also timed out. No upload, remote file mutation, service restart or new Alpha index entry occurred. Do not advertise an online alpha.2 URL as available. Existing alpha.1 remains untouched. Physical iOS testing awaits manual installation of the local package or later successful download-site publication.
