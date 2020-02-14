const autobar_options = {
  // rootDir: 'xxx',
  // stripNumbers = true,
  // maxLevel = 2,
  // navPrefix = "nav",
  // skipEmptySidebar = true,
  // skipEmptyNavbar = true,
  // multipleSideBar = true,
  // setHomepage = 'hide' | 'toGroup' | 'top'
};

module.exports = {
  title: '全税前端',
  description: '大象慧云全税研发部FE开发手册',
  head: [
    ['link', {rel: 'icon', href: '/favicon.ico'}],
    ['link', {rel: 'manifest', href: '/manifest.json'}],
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: require('./nav'),
    // sidebar: require('./sidebar'),
    sidebarDepth: 3,
    lastUpdated: '上次更新',
    smoothScroll: true,
    repo: 'https://github.com/ele-cloud',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页 ！'
  },
  plugins: ['@vuepress/nprogress', 'autobar'],
}
