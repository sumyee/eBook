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
        text: 'BOM',
        link: '/frontEnd/bom/',
      },
    ],
  },
  // NavbarGroup
  {
    text: '浏览器相关',
    children: [
      {
        text: '浏览器工作原理与实践',
        link: '/browser/principle/',
      },
    ],
  },
  {
    text: '数据结构与算法',
    children: [
      {
        text: 'LeetCode',
        link: '/algorithm/leetCode/',
      },
      {
        text: '排序算法',
        link: '/algorithm/sort/',
      },
      {
        text: '算法练习',
        link: '/algorithm/exercises/',
      },
    ],
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
        text: '关键渲染路径',
        link: '/optimization/performance/',
      },
    ],
  },
  {
    text: '网络与安全',
    children: [
      {
        text: 'HTTP',
        link: '/network/',
      },
    ],
  },
  {
    text: '其他',
    children: [
      {
        text: 'Hand Coding',
        link: '/other/handCoding/',
      },
      {
        text: '正则表达式',
        link: '/other/regex/',
      },
      {
        text: 'Git',
        link: '/other/git/',
      },
    ],
  },
  {
    text: 'Interview',
    children: [
      {
        text: '浏览器',
        link: '/interview/browser/',
      },
    ],
  },
];
