const navbar = require('./navbar');
const sidebar = require('./sidebar');

module.exports = {
  bundler: '@vuepress/vite',
  lang: 'zh-CN',
  title: 'Oops的笔记',
  description: '一些前端知识笔记',
  base: '/',
  head: [
    [
      'meta',
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover',
      },
    ],
  ],
  // markdown: {
  //   code: {
  //     lineNumbers: false,
  //   }
  // },
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    // lastUpdated: true,
    lastUpdatedText: '上次更新',
    navbar,
    sidebar,
    sidebarDepth: 4,
  },
  // themePlugins: {
  //   mediumZoom: false,
  // },
  plugins: [
    [
      '@vuepress/plugin-search',
      {
        search: true, //默认false
        searchMaxSuggestions: 10, // 默认是5
      },
    ],
    ['@vuepress/plugin-shiki', {
      theme: 'monokai',
      // theme: 'github-dark',
      // theme: 'dark-plus',
    }],
  ],
};
