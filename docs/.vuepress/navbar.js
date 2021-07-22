module.exports = [
  {
    text: '前端知识体系',
    // link: '/frontEnd',
    children: [
      {
        text: 'JavaScript',
        link: '/frontEnd/javaScript/',
      },
      {
        text: 'CSS',
        link: '/frontEnd/css/',
      },
      {
        text: 'Hand Coding',
        link: '/frontEnd/handCoding/',
      },
    ],
  },
  // NavbarGroup
  {
    text: '浏览器相关',
    children: [
      {
        text: '浏览器工作原理与实践',
        link: '/browser/principle/01.md',
      },
    ],
  },
  {
    text: '数据结构与算法',
    link: '/algorithm',
  },
  {
    text: '工程化',
    children: [
      {
        text: 'webpack',
        children: [
          {
            text: 'webpack 概念',
            link: '/engineering/webpack/',
            activeMatch: '/webpack/$',
          },
          {
            text: 'webpack 4',
            link: '/engineering/webpack/webpack4/',
          },
        ]
      },
    ],
  },
  {
    text: '性能优化',
    children: [
      {
        text: '全链路性能优化',
        link: '/optimization/performance/',
      },
    ],
  },
  {
    text: '其他',
    children: [
      {
        text: '正则表达式',
        link: '/other/regex/',
      },
    ],
  },
];
