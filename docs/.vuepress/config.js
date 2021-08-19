/**
 * 注意事项：
 * 1、和图标/图片等静态资源相关的 其 '/' 默认指向的是 docs/.vuepress/public/
 * 2、和侧边栏/导航栏相关的地址配置 其 '/' 默认指向的是 docs/
 * 3、侧边栏/导航栏指向.md文件的需要先建立相关.md文件，不然会报404或者页面空白
 */

module.exports = {
  title: 'AaronKong的blog', // 页签标题
  description: '系统性学习，打造完善的知识体系', // meta 中的描述文字，意义不大，SEO用
  base: '/',
  head: [
    ['script', {}, `
      <script>
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?e864a64a0fefae1239747c553f0d6579";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      </script>
    `]
  ],
  themeConfig: {
    sidebarDepth: 2, // 将同时提取markdown中h2 和 h3 标题，显示在侧边栏上
    lastUpdated: '上次更新',// 文档更新时间：每个文件git最后提交的时间
    // 顶部导航栏
    nav: [
      { text: '数据结构与算法', link: '/article/算法题/总览' },
      { text: 'JS编程', link: '/article/JS编程/总览' },
      { text: '设计模式', link: '/article/设计模式/总览' },
      { text: 'github', link: 'https://github.com/kongyajie' },
    ],
    sidebar: {
      '/article/': [
        {
          title: '前端基础',
          children: [
            '/article/前端基础/总览',
            '/article/前端基础/CSS/常见问题',
            '/article/前端基础/JS/常见问题',
            '/article/前端基础/JSWeb/常见问题',
            '/article/前端基础/运行环境',
            '/article/前端基础/HTTP/常见问题',
          ]
        },
        {
          title: '前端框架',
          children: [
            '/article/前端框架/总览',
            '/article/前端框架/vue',
          ]
        },
        {
          title: '前端专题',
          children: [
            
          ]
        },
        {
          title: '前端拾遗',
          children: [
            '/article/碎片知识/前端知识点拾遗'
          ]
        },
        {
          title: '源码解析',
          children: [
            
          ]
        }
        // {
        //   title: 'JS进阶',
        //   children: [
        //     '/article/JS进阶/JavaScript代码的执行机制',
        //     '/article/JS进阶/你真的掌握变量和类型了吗（一）数据类型',
        //     '/article/JS进阶/你真的掌握变量和类型了吗（二）类型转换',
        //     '/article/JS进阶/如何写出一个惊艳面试官的深拷贝',
        //     '/article/JS进阶/浮点数精度问题'
        //   ]
        // },
        // {
        //   title: 'underscore',
        //   children: [
        //     '/article/underscore/如何写一个自己的underscore.md',
        //     '/article/underscore/链式调用.md',
        //     '/article/underscore/内部函数 cb 和 optimizeCb.md',
        //   ]
        // },
        // {
        //   title:'编译原理',
        //   children: [
        //     '/article/编译原理/如何创造一门编程语言'
        //   ]
        // },
        // {
        //   title:'面试题集',
        //   children: [
        //     '/article/面试题集/javascript'
        //   ]
        // },
        // {
        //   title: '综合',
        //   children: [
        //     '/article/综合/【自检】前端知识清单',
        //     '/article/综合/【自检】前端知识清单（附解答）',
        //     '/article/综合/深度学习'
        //   ]
        // },
        // {
        //   title:'电脑技术',
        //   children: [
        //     '/article/电脑技术/【旧Mac迁移到新Mac】.md'
        //   ]
        // },
      ]
    }
  },
  markdown: {
    // 显示代码行号
    lineNumbers: true
  },
};

