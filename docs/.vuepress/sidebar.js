module.exports = {
  '/前端指南/': [
    '前端基础知识',
    '全税前端常用网址',
    '原生 DOM 操作',
    '常用 meta 标签',
    '常见正则表达式汇总',
  ],
  '/Cli 工具/': [
    'dxhy-cli 脚手架',
    '常用谷歌浏览器插件',
    'VsCode 常用插件推荐',
    'WebStorm 常用插件推荐',
  ],
  '/前端规范/': [
    {
      title: 'Git 相关规范',   // 必要的
      collapasble: true,
      children: [
        './Git 相关规范/git分支命名规范与工作流程',
        './Git 相关规范/git commit 工作流的标准姿势以及 release note 自动生成'
      ]
    },
    'JavaScript 代码规范',
    'CSS 样式规范'
  ],
  '/前端分享/': [
  ],
  '/其他资源/': [
    'Shell - 编程基础',
    'NPM - 包管理工具',
  ],
}
