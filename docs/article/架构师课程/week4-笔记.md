[TOC]

# week4 - 脚手架命令注册和执行过程开发


## 01-本周导学
### 将收获什么

* 如何设计高性能脚手架
* Node多进程开发
* javascript面向对象的实战技巧

### 主要内容

* 图解**高性能**脚手架架构设计方法
* 封装通用的Package和Command类
* 基于**缓存+Node多进程**实现动态命令加载和执行
* 将业务逻辑和脚手架框架彻底解耦

### 附赠内容

- Node多进程开发进阶——child_process源码分析
  - 深入Node源码看清spawn/exec/execFile/fork的本质区别，彻底搞懂Node多进程原理

### 关键词

- **高性能/可扩展**的脚手架 - **利用缓存提升脚手架性能并解耦业务逻辑**
- 面向对象 - 利用Class完成javascript面向对象编程
- **Node多进程** - 深入Node多进程原理

### 学习方法

- 学以致用：将前两周中学到的知识进行实际应用（commander / Lerna 命令执行原理）
- 知识储备：面向对象、ES6新特性Class、shell脚本（macOS）、bat批处理文件等概念需要预先储备
- 充分实践：Node多进程是一门较为复杂的技术，需要同学们充分实践和思考

### 注意事项

- 整体难度处于中上等，如果感觉有难度，一定要多看几遍视频，可以多暂停下来思考，必要的时候可以多画一些流程图、架构图理清思路
- Node多进程高能预警

### 本周作业

- 根据课程讲解内容完成imooc-cli脚手架动态命令执行代码编写
- 进阶：尝试分析Node多进程execSync/execFileSync/spawnSync源码



## 02-imooc-cli脚手架命令注册

- 脚手架初始化 + 全局参数注册
- 脚手架命令注册



## 03-高性能脚手架架构设计和缓存结构设计

### 痛点分析

当前脚手架架构如下图：

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E8%84%9A%E6%89%8B%E6%9E%B6-%E5%BD%93%E5%89%8D%E6%9E%B6%E6%9E%84%E7%97%9B%E7%82%B9%E5%88%86%E6%9E%90.jpeg)

这样的架构设计已经可以满足一般脚手架需求，但是有以下两个问题：

1. **cli 安装速度慢**：所有 package 都集成在 cli 里，因此当命令较多时，会减慢 cli 的安装速度
2. **灵活性差**：init 命令只能使用 @imooc-cli-dev/init 包，对于集团公司而言，每个 bu 的 init 命令可能都各不相同，可能需要实现 init 命令动态化，如：
   - 团队 A 使用 @imooc-cli-dev/init 作为初始化模块
   - 团队 B 使用自己开发的 @imooc-cli-dev/my-init 作为初始化模块
   - 团队 C 使用自己开发的 @imooc-cli-dev/your-init 作为初始化模块

这时对我们的架构设计就提出挑战，要求我们能够动态加载 init 模块，这将增加架构的复杂度，但大大提升脚手架的可扩展性，将脚手架框架和业务逻辑解耦

### 脚手架架构优化

优化结果如下：

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E8%84%9A%E6%89%8B%E6%9E%B6-%E6%9E%B6%E6%9E%84%E4%BC%98%E5%8C%96.jpeg)

### 脚手架命令动态加载功能架构设计

架构设计图如下：

![](https://oss-1252175178.cos.ap-shanghai.myqcloud.com/%E6%85%95%E8%AF%BE%E7%BD%91%E6%9E%B6%E6%9E%84%E5%B8%88%E8%AF%BE%E7%A8%8B/%E8%84%9A%E6%89%8B%E6%9E%B6-%E5%91%BD%E4%BB%A4%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BD%E5%8A%9F%E8%83%BD%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1.jpeg)

### 缓存目录

缓存目录位于用户主目录下的 `.imooc-cli`，如果没有生成该目录时，我们可以手动创建，或者通过如下代码生成：

```js
const userHome = require('user-home');
const fse = require('fs-extra');
const path = require('path');

const cachePath = path.resolve(userHome, '.imooc-cli'); // 生成缓存目录路径

fse.mkdirpSync(cachePath); // 生成缓存目录
```