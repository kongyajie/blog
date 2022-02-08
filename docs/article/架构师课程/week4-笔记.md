[TOC]

# week4 - 脚手架命令注册和执行过程开发


## 01-本周导学
### 将收获什么

* 如何设计高性能脚手架
* Node多进程开发
* javascript面向对象的实战技巧

### 主要内容

* 图解高性能脚手架架构设计方法
* 封装通用的Package和Command类
* 基于缓存+Node多进程实现动态命令加载和执行
* 将业务逻辑和脚手架框架彻底解耦


## 本周作业
- 根据课程讲解内容完成 imooc-cli 脚手架动态命令执行代码编写
- 进阶：尝试分析Node多进程execSync/execFileSync/spawnSync源码