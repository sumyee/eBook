module.exports = {
  '/frontEnd': [
    {
      text: '前端知识体系',
      // link: '/frontEnd/',🎉
    },
    {
      text: '👉 JavaScript',
      children: ['/frontEnd/javaScript/'],
    },
    {
      text: '✍️ Hand Coding',
      children: ['/frontEnd/handCoding/'],
    },
    {
      text: '🎨 CSS',
      children: ['/frontEnd/css/'],
    },
  ],
  '/browser/': [
    {
      text: '浏览器相关',
      children: [
        '/browser/principle/',
      ],
    },
    // {
    //   text: '💻 浏览器工作原理与实践',
    //   // link: '/browser/principle',
    //   children: [
    //     '/browser/principle/01.md',
    //     '/browser/principle/02.md',
    //     '/browser/principle/03.md',
    //     '/browser/principle/04.md',
    //   ],
    // },
  ],
  '/algorithm': [
    {
      text: '数据结构与算法',
    },
    {
      text: '排序算法',
      // link: '/algorithm/sort',
      children: ['/algorithm/sort/'],
    },
  ],
};
