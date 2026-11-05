# User-reported Global production acceptance

CHG-20261105-GLOBAL-USER-PRODUCTION-ACCEPTANCE — documentation only.

On 2026-11-05 (Asia/Shanghai), the maintainer reported testing production login and the payment page on iOS and Android with no problems. Record these reported native checks as passed; do not continue to describe this exact scope as wholly unverified. This is user-reported evidence, not an agent-executed test.

| Platform | Accepted scope | Remaining boundary |
| --- | --- | --- |
| iOS | Reported production login and payment page passed | Device/model/OS/Obsidian/plugin versions unspecified; iPhone vs iPad not distinguished |
| Android | Reported production login and payment page passed | Model/OS/Obsidian/plugin versions unspecified |
| Windows | No new acceptance in this report | Earlier ordinary login/deletion reports retain their own scope |
| macOS | No new acceptance in this report | Native acceptance remains separately recorded |
| Linux desktop | No new acceptance in this report | WSL/service checks do not establish native acceptance |
| iPad/iPadOS specifically | Not separately established by this report | Do not infer a distinct iPad pass solely from the general iOS label |

The report does not enumerate Google/GitHub/email individually, payment-page navigation steps, actual charge, entitlement activation, renewal/refund, sign-out, account closure, interruption/lock/background/restart or mixed-version scenarios. Those retain their existing evidence and gaps. Do not turn page acceptance into successful real-money payment or all-three-method acceptance. Exact tested builds and distinct iPhone/iPad hardware cannot be reconstructed from the report.

This supersedes earlier blanket native-unverified wording only for the two reported platform/scope entries. No source/runtime/deployment/data change, no native capability or layout change, no content/key/progress/source-mtime change. No software test rerun is required for recording this user evidence.
