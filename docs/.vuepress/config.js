module.exports = {
  title: 'AaronKong的blog',
  description: '系统性学习，打造完善的知识体系',
  base: '/',
  themeConfig: {
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'github', link: 'https://github.com/kongyajie' },
    ],
    sidebar: {
      '/article/': [
        {
          title: '前端知识体系',
          children: [
            '/article/前端知识体系/总览',
            '/article/前端知识体系/CSS面试题',
            '/article/前端知识体系/JS基础',
            '/article/前端知识体系/JS-Web-Api',
            '/article/前端知识体系/运行环境',
            '/article/前端知识体系/HTTP协议',
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
          title: '算法题',
          children: [
            '/article/算法题/总览'
          ]
        },
        {
          title: '前端知识点拾遗',
          children: [
            '/article/碎片知识/前端知识点拾遗'
          ]
        },
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
        {
          title: 'JS编程',
          children: [
            '/article/JS编程/总览.md'
          ]
        },
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
        {
          title: '综合',
          children: [
            '/article/综合/【自检】前端知识清单',
            '/article/综合/【自检】前端知识清单（附解答）',
          ]
        },
        // {
        //   title:'电脑技术',
        //   children: [
        //     '/article/电脑技术/【旧Mac迁移到新Mac】.md'
        //   ]
        // },
      ]
    }
  }
};

