[TOC]

# week3 - 脚手架核心流程开发

## 本周导学

### 将收获什么

* 架构设计和技术方案设计全过程
* 脚手架执行核心流程和commander框架
* 如何让Node项目支持ES Module

### 主要内容

* 脚手架需求分析和架构设计
* 脚手架模块拆分策略和core模块技术方案
* 脚手架执行准备过程实现
* 脚手架命令注册实现（基于commander）

## 01-imooc-cli 脚手架需求分析

### 大厂标准项目流程

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E5%A4%A7%E5%8E%82%E5%81%9A%E9%A1%B9%E7%9B%AE%E7%9A%84%E6%B5%81%E7%A8%8B.jpeg)

### 脚手架需求分析

从这张图看起，分析研发过程的痛点：

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E8%84%9A%E6%89%8B%E6%9E%B6%E8%A6%81%E8%A7%A3%E5%86%B3%E7%9A%84%E7%97%9B%E7%82%B9.png)

#### 痛点分析

- **创建项目/组件时，存在大量重复代码拷贝**：快速复用已有沉淀
- **协同开发时，由于git操作不规范**，导致分支混乱，操作耗时：制定标准的git操作规范并集成到脚手架
- **发布上线耗时，而且容易出现各种错误**：制定标准的上线流程和规范并集成到脚手架

#### 需求分析

>  通用的研发脚手架

- 通用的项目/组件创建能力
  - 模板支持定制，定制后能够快速生效
  - 模板支持快速接入，极低的接入成本
- 通用的项目/组件发布能力
  - 发布过程自动完成标准的git操作
  - 发布成功后自动删除开发分支并创建tag
  - 发布后自动完成云构建、OSS上传、CDN上传、域名绑定
  - 发布过程支持测试/正式两种模式

### 加餐：大厂是如何做 git 操作的？

- Git Flow

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E5%A4%A7%E5%8E%82%E6%98%AF%E5%A6%82%E4%BD%95%E5%81%9A%20git%20%E6%93%8D%E4%BD%9C%E7%9A%84.jpeg)



## 02-imooc-cli 脚手架架构设计

### 绘制架构设计图

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E8%84%9A%E6%89%8B%E6%9E%B6%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%9B%BE.jpeg)

### 核心模块

- 脚手架
  - 脚手架核心框架
  - 初始化体系
  - 标准git操作体系
  - 发布体系
- 服务
  - OPEN API
  - WebSocket
- 支撑体系
  - 本地缓存
  - 模板库
  - 数据体系
  - 代码仓库
  - 资源体系
  - 远程缓存



## 06-Node项目如何支持ESModule

- webpack 配置 `babel-loader`
- node 最新功能 `.mjs`


## 本周作业
- 标准
    - 绘制 imooc-cli 脚手架架构设计图
    - 实现 imooc-cli 脚手架准备过程代码
    - 通过 commander 框架实现一个脚手架，包含自定义 option 和 command 功能
- 进阶
    - 通过 webpack 和 原生两种方式实现 Node 对 ESModule 的支持

