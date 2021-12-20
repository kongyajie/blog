/**
 * 注意事项：
 * 1、和图标/图片等静态资源相关的 其 '/' 默认指向的是 docs/.vuepress/public/
 * 2、和侧边栏/导航栏相关的地址配置 其 '/' 默认指向的是 docs/
 * 3、侧边栏/导航栏指向.md文件的需要先建立相关.md文件，不然会报404或者页面空白
 */

module.exports = {
  title: '前端AK君', // 页签标题
  description: '系统性学习，打造完善的知识体系', // meta 中的描述文字，意义不大，SEO用
  base: '/',
  head: [
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?e864a64a0fefae1239747c553f0d6579";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `],
    ['script', { src: 'https://cdn-go.cn/aegis/aegis-sdk/latest/aegis.min.js' }, ``],
    ['script', {}, `
      var aegis = new Aegis({
        id: 'yaoVL8AlJ1zqMDq4dG', // 上报 id
        uin: 'xxx', // 用户唯一 ID（可选）
        reportApiSpeed: true, // 接口测速
        reportAssetSpeed: true, // 静态资源测速
        spa: true // spa 应用页面跳转的时候开启 pv 计算
      });
    `]
  ],
  themeConfig: {
    sidebarDepth: 2, // 将同时提取markdown中h2 和 h3 标题，显示在侧边栏上
    lastUpdated: '上次更新',// 文档更新时间：每个文件git最后提交的时间
    // 顶部导航栏
    nav: [
      { text: 'github', link: 'https://github.com/kongyajie' },
    ],
    sidebar: {
      '/article/': [
        {
          title: 'JS进阶',
          children: [
            '/article/前端基础/JS进阶/JS进阶系列',
            '/article/前端基础/JS进阶/JS概览',
            '/article/前端基础/JS进阶/JS类型',
            '/article/前端基础/JS进阶/JS原型原型链',
            '/article/前端基础/JS进阶/JS执行机制',
            '/article/前端基础/JS进阶/JS异步编程',
            '/article/前端基础/JS进阶/JS异步进阶',
            '/article/前端基础/JS进阶/JS异常处理',
            '/article/前端基础/JS进阶/JS精选题集',
            '/article/前端基础/JS编程/总览',
            // '/article/前端基础/JS进阶/【译】一网打尽JavaScript的Number类型',
            // '/article/前端基础/JS进阶/你真的掌握变量和类型了吗（一）数据类型',
            // '/article/前端基础/JS进阶/你真的掌握变量和类型了吗（二）类型转换',
            // '/article/前端基础/JS进阶/如何写出一个惊艳面试官的深拷贝',
            // '/article/前端基础/JS进阶/浮点数精度问题'
          ]
        },
        {
          title: '前端基础',
          children: [
            '/article/前端基础/CSS/CSS-float的工作原理和流的破坏与保护',
            '/article/前端基础/浏览器/浏览器工作原理系列介绍',
            '/article/前端基础/浏览器/浏览器工作原理系列之1-发展历史',
            '/article/前端基础/浏览器/浏览器工作原理系列之2-页面循环系统',
            '/article/前端基础/浏览器/浏览器工作原理系列之3-如何从URL到页面显示的？',
            '/article/前端基础/浏览器/浏览器工作原理系列之4-如何进行性能优化？',
            '/article/前端基础/浏览器/浏览器工作原理系列之5-如何与服务器通讯？',
            '/article/前端基础/浏览器/浏览器工作原理系列之6-如何保证浏览器安全？',
            '/article/前端基础/浏览器/浏览器工作原理系列之7-未来发展方向？',
          ]
        },
        {
          title: '前端框架',
          children: [
            '/article/前端框架/vue/Vue系列之1-概览',
            '/article/前端框架/vue/Vue系列之2-使用',
            '/article/前端框架/vue/Vue系列之3-周边工具',
            '/article/前端框架/vue/Vue系列之4-原理',
            '/article/前端框架/vue/Vue系列之5-常见问题',
            '/article/前端框架/vue/Vue系列之6-Vue3',
            '/article/前端框架/react/React系列之1-概览',
            '/article/前端框架/react/React系列之2-使用',
            '/article/前端框架/react/React系列之3-周边工具',
            '/article/前端框架/react/React系列之4-原理',
            '/article/前端框架/react/React系列之5-常见问题',
            '/article/前端框架/react/React系列之6-hooks',
            '/article/前端框架/webpack/webpack',
          ]
        },
        {
          title: '前端面试',
          children: [
            '/article/前端面试/总览'
          ]
        },
        {
          title: '前端拾遗',
          children: [
            '/article/碎片知识/前端知识点拾遗'
          ]
        },
        {
          title: '数据结构与算法',
          children: [
            '/article/数据结构与算法/总览'
          ]
        },
        {
          title: '设计模式',
          children: [
            '/article/设计模式/总览'
          ]
        },
        // {
        //   title: '开源项目',
        //   children: [
        //     '/article/开源项目/总览',
        //     '/article/开源项目/如何写自己的undercore'
        //   ]
        // }
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
  plugins: [
    [
      'vuepress-plugin-comment',
      {
        choosen: 'valine', 
        // options选项中的所有参数，会传给Valine的配置
        options: {
          el: '#valine-vuepress-comment',
          appId: 'YuQM59IXohGB2oQVnkedKOMH-gzGzoHsz',
          appKey: 'YUIvIzLbKPuneLoqKGdaNxBT',
          notify: false, //邮箱通知，可关闭
          verify: false, //反人类的算术验证码，建议关闭
          avatar: 'mm', //头像，默认即可
          visitor: true,//访问计数
          placeholder: '欢迎留言讨论~',
          path: '<%- frontmatter.to.path %>' // 加上这行，会根据当前页面路由加载评论，评论保存在 LeanCloud 上
        }
      }
    ]
  ]
};

