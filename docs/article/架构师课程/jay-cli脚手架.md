# jay-cli脚手架

## 前言

- 猎萝⼘平台是公司核⼼项⽬，包含toC端和crm等多个中后台系统，多个系统间有许多可复用的部分，如eslint配置、网络请求模块、埋点模块等，而新系统的开发往往采用代码拷贝的方式，开发效率较低；
- 为了提高团队整体研发效率，本人作为前端负责人，搭建了公司内部的通用脚手架jay-cli。架构上使用commander 实现脚手架，lerna进行多包管理，性能上使用node多进程和本地缓存提高执行效率；
- 通过脚手架结合项目模板，只需简单的命令行即可完成项目的初始化工作，达到项目模板快速复用的目的，团队整体研发效率得到有效提升，同时技术栈更统一，也更易于维护。

## 一、需求

- 使用脚手架进行标准的项目初始化
  - **jay init test-project**
- 需要支持的项目模板：
  - **C端项目模板：project-template-vue**
  - **中后台管理系统项目模板：project-template-hey-admin**
  - **H5项目模板：project-template-h5**
  - **小程序项目模板：project-template-miniapp-remax**
  - Node服务端项目模板：project-template-express / project-template-koa2

## 二、设计

### 架构设计图

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E8%84%9A%E6%89%8B%E6%9E%B6%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%9B%BE-%E8%87%AA%E5%88%B6.jpg)

主要实现：

- 多包拆分，使用Lerna进行管理
- 1、`core` 脚手架核心模块（**执行准备、命令注册、命令执行**）
- 2、`init` 项目初始化模块（**npm/git项目模板下载**、*动态渲染*、*项目模板数据管理*）

## 三、实现流程

- 实现拆包： 

  - core （cli、exec）

  - commands（init）

  - models（command）

  - utils（log、request）

- 脚手架核心开发
  - 执行准备（检查Root、检查脚手架版本、提示脚手架新版本更新）
  - 命令注册（设置帮助提示信息、注册init命令）
  - 命令执行（生成缓存路径、**node多进程**执行本地代码入口文件）
- init初始化开发
  - 准备阶段（获取模板列表、用户选择项目模板）
  - 模板下载（download-git-repo下载项目模板）
  - 模板安装（复制文件、安装依赖）

## 四、难点

脚手架核心模块

- lerna使用和原理
- command使用和原理
- 动态命令调用
- Node多进程命令执行
- 本地缓存

项目初始化模块

- inquiry使用和原理
- 项目模板初始化
- **项目模板下载**（npm vs git）（**download-git-repo**）
- 动态渲染 ejs/glob

## 五、Q&A

### 脚手架的原理

### Lerna的使用和原理

- 多包框架要解决的问题

### 遇到的问题和收获

- 如何支持 `--debug` 打印信息 ： 命令行 => 环境变量 =>  `npmlog` 设置 level

- 许多有用的小工具库
  - npmlog
  - fs-extra
  - semver
  - colors
  - user-home
  - dotenv
  - root-check

## 参考

项目地址：https://gitee.com/AaronKong/jay-cli

