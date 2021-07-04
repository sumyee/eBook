module.exports = {
  lang: "zh-CN",
  title: "前端知识",
  description: "一个前端知识库",
  base: "/",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: "https://vuejs.org/images/logo.png",
    lastUpdated: true,
    lastUpdatedText: "最近更新",
    // 侧边栏对象
    // 不同子路径下的页面会使用不同的侧边栏
    sidebar: {
      "/js": [
        {
          text: "Guide",
          children: ["/guide/README.md", "/guide/getting-started.md"]
        }
      ],
      "/reference/": [
        {
          text: "Reference",
          children: ["/reference/cli.md", "/reference/config.md"]
        }
      ]
    }
  }
};
