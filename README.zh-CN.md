# Smart Sync 客户端源码候选

中外版本共用的Client。本目录是待确认的本地候选，尚未上传GitHub；计划仓库名obsidian-smart-sync-client。[English](README.md)。

## 范围与构建

21个运行模块、样式、资源和中外配置按固定提交原样导出；选入12份合成测试及2份测试替身。内部档案、Server、私有运维/集成/现场控制工具与凭据不进入本目录。package仅调整公开脚本和说明。
Node26.11.1下运行 npm ci --ignore-scripts、npm test、npm run build:all、npm run check:editions。仅本机构建，不安装或部署。公开测试子集不替代私有配对回归、社区审核及真实设备验收。

## 产品和许可

国内现有申请、登录及公测流程不变；海外服务和英文资源未齐备。Google、扫码、支付暂不开发。语言不改变服务地区或账号，加密口令由用户保管。
Copyright (c) 2026 lihy。后续Client候选使用Apache-2.0，允许商业复用；已发0.1.81及更早版本保留原MIT授权和资产。依赖按THIRD-PARTY-NOTICES.md保留许可；Server继续私有专有，托管服务另有访问条件。

## 待确认的切换

公开前当前国内开发/发行仍沿用现有私有主线。确认公开后，obsidian-smart-sync-client才成为唯一Client源码主线；现有私有Client保留完整旧历史、内部档案和跨端工具；私有Server保持原职责；公开发行库只保留发行资料和附件。本次不改远端、仓库名、生产或现有安装。
