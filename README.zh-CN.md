# Smart Sync 客户端

无界同步（国内）和 Smart Sync（海外）共用的客户端源码主线。[English](README.md)。

## 范围

同步核心共用，插件身份和服务地区独立。国内支持登录、免费套餐开通及购买续费入口，付款结果由服务端验证；海外服务及完整英文资源尚未齐备，海外支付仍关闭。语言不改变服务地区或账号，加密口令仍由用户保管。

这里保留22个运行模块、样式、资源、中外配置及合成测试。内部历史、运维发布工具和跨端验收资料保留在私有 obsidian-smart-sync-internal；Server 保留在私有 obsidian-smart-sync-server。公开测试不代表社区审核、预发、生产或真实设备验收通过。

## 构建

使用 Node 26.11.1，具体命令见英文 README。国内产物为 artifacts/cn，海外产物为 artifacts/global；构建不代表海外可发行。公开 CI 覆盖 Windows 和 Linux，不负责部署或发布。国内发行入口为 [obsidian-smart-sync-release-cn](https://github.com/adventurer2008/obsidian-smart-sync-release-cn)。

## 许可和版本

Copyright (c) 2026 lihy。后续 Client 候选采用 Apache-2.0，允许商业复用；已发0.1.81及更早版本保留原MIT许可和附件。依赖许可见 THIRD-PARTY-NOTICES.md。Server 仍私有专有，托管服务按独立访问条件提供。本次公开源码和调整仓库名称，不发新版本，不替换现有安装包。
