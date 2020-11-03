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
          title: '前端基础',
          children: [
            '/article/前端基础/0-前端开发的历史和趋势',
            '/article/前端基础/1-JavaScript基础',
            '/article/前端基础/2-HTML和CSS',
            '/article/前端基础/3-计算机基础',
            '/article/前端基础/4-数据结构与算法',
            '/article/前端基础/5-运行环境',
            '/article/前端基础/6-前端工程',
            '/article/前端基础/7-框架与类库',
            '/article/前端基础/8-项目与业务',
            '/article/前端基础/9-学习之外',
            '/article/前端基础/10-技术之外'
          ]
        },
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
            '/article/JS编程/数组去重.md',
            '/article/JS编程/类型判断.md',
            '/article/JS编程/深拷贝浅拷贝.md',
            '/article/JS编程/extend函数.md',
            '/article/JS编程/数组最大值.md',
            '/article/JS编程/数组的扁平化.md',
            '/article/JS编程/数组中查找指定元素.md',
            '/article/JS编程/jQuery的each方法.md',
            '/article/JS编程/判断两个对象相等.md',
            '/article/JS编程/函数柯里化.md',
            '/article/JS编程/偏函数.md',
            '/article/JS编程/惰性函数.md',
            '/article/JS编程/函数记忆.md',
            '/article/JS编程/递归.md',
            '/article/JS编程/乱序.md',
            '/article/JS编程/解读V8排序源码.md'
          ]
        },
        {
          title: 'underscore',
          children: [
            '/article/underscore/如何写一个自己的underscore.md',
            '/article/underscore/链式调用.md',
            '/article/underscore/内部函数 cb 和 optimizeCb.md',
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
        },
        {
          title:'电脑技术',
          children: [
            '/article/电脑技术/【旧Mac迁移到新Mac】.md'
          ]
        },
      ]
    }
  }
};

