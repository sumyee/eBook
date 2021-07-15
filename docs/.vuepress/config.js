const navbar = require('./navbar');
const sidebar = require('./sidebar');

module.exports = {
  bundler: '@vuepress/vite',
  lang: 'zh-CN',
  title: 'Oops',
  description: '一些前端知识',
  base: '/',
  // markdown: {
  //   code: {
  //     lineNumbers: false,
  //   }
  // },
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    lastUpdated: true,
    lastUpdatedText: '最近更新',
    navbar,
    sidebarDepth: 3,
    sidebar,
  },
  plugins: [
    [
      '@vuepress/plugin-search',
      {
        search: true, //默认false
        searchMaxSuggestions: 10, // 默认是5
      },
    ],
    [
      '@vuepress/last-updated',
      {
        transformer(timestamp) {
          const date = new Date(timestamp)

          console.log(timestamp);

          const digits = [
            date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(),
            date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()
          ].map(num => String(num).padStart(2, '0'))

          return '{0}-{1}-{2},...{3}:{4}:{5} UTC'.replace(/{(\d)}/g, (_, num) => digits[num])
        }
      }
    ],
    // [
    //   'vuepress-plugin-auto-sidebar',
    //   {
    //     title: {
    //       // 更多选项:
    //       // `default`、`lowercase`、`uppercase`、`capitalize`、`camelcase`、`kebabcase`、`titlecase`
    //       mode: 'camelcase',
    //       map: {
    //         '/browser/principle/': '🎉 浏览器工作原理 🎉',
    //       },
    //     },
    //     collapse: {
    //       open: false,
    //     },
    //     sidebarDepth: 3,
    //   },
    // ],
  ],
};
