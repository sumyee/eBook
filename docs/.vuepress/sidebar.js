module.exports = {
  '/browser/principle': [
    {
      text: '浏览器工作原理与实践',
      collapsable: true,
      children: [
        {
          text: '01 | Chrome架构：仅仅打开了1个页面，为什么有4个进程？',
          link: '/browser/principle/01.md',
        },
        {
          text: '02 | TCP协议：如何保证页面文件能被完整送达浏览器？',
          link: '/browser/principle/02.md',
        },
        {
          text: '03 | HTTP请求流程：为什么很多站点第二次打开速度会很快？',
          link: '/browser/principle/03.md',
        },
        {
          text: '04 | 导航流程：从输入URL到页面展示，这中间发生了什么？',
          link: '/browser/principle/04.md',
        },
      ],
    },
  ],
  '/reference/': [
    {
      text: 'Reference',
      children: ['/reference/cli.md', '/reference/config.md'],
    },
  ],
};
