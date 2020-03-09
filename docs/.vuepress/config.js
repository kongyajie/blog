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
        '/article/',
        {
          title: 'JS进阶',
          children: [
            '/article/JS进阶/JavaScript代码的执行机制',
            '/article/JS进阶/你真的掌握变量和类型了吗（一）数据类型',
            '/article/JS进阶/你真的掌握变量和类型了吗（二）类型转换',
            '/article/JS进阶/如何写出一个惊艳面试官的深拷贝',
            '/article/JS进阶/浮点数精度问题'
          ]
        },
        {
          title: 'JS编程',
          children: [
            '/article/JS编程/防抖和节流.md',
            '/article/JS编程/数组去重.md'
          ]
        },
        {
          title: '剑指offer',
          children: [
            '/article/剑指offer/01-二维数组中的查找',
            '/article/剑指offer/02-替换空格',
            '/article/剑指offer/03-从尾到头打印链表',
            '/article/剑指offer/04-重建二叉树'
          ]
        },
        {
          title:'编译原理',
          children: [
            '/article/编译原理/如何创造一门编程语言'
          ]
        },
        {
          title:'面试题集',
          children: [
            '/article/面试题集/javascript'
          ]
        },
        {
          title: '综合',
          children: [
            '/article/综合/【自检】前端知识清单',
            '/article/综合/【自检】前端知识清单（附解答）',
          ]
        }
      ]
    }
  }
};

