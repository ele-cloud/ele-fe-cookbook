# CSS 样式规范

一个良好的书写规范，可以给代码一个很好的阅读体验，也有利于团队多人协同开发

## CSS 属性书写顺序

1. 位置相关属性（position、left、z-index、float、display、justify-content、align-items、box-sizing 等）
2. 大小、盒模型相关属性（width、height、padding、margin、overflow 等）
3. 文字系列（font、font-size、line-height、text-align、color 等）
4. 背景相关（background、background-size、border、border-radius 等）
5. 其他（opacity、cursor、transform、 transition、animation 等）

## CSS 书写规范

- 尽量使用 CSS 缩写属性，比如 padding 、margin 、font等
- 简写命名，但要通俗易懂，最后是约定俗称的，比如 nav、btn、logo、txt、msg等
- 不要随意使用 Id，尽量避免使用
- 16进制颜色代码缩写、色值小写，尽量不用命名色值(如 red、lightgreen等)
- 属性值或者颜色参数在 0 ~ 1 之间，省略 小数点前的 0 ，例 color: rgba(255, 255, 255, .5)
- 避免使用 !important，除某些极特殊的情况
- 使用 `SCSS` , `LESS` 等预处理器时，建议嵌套不超过 3 层

## CSS命名格式规范(强制)

css命名格式务必遵循 **BEM 命名规范**。[传送门](http://blog.yangyong.io/2019/02/css/css%E5%91%BD%E5%90%8D%E8%A7%84%E8%8C%83/)

通常来讲，CSS命名约定试图解决3个问题：

1. 想知道选择器的作用，只需查看其名称即可。
2. 想了解选择器的使用位置，只需查看它即可。
3. 想了解类名之间的关系，只需查看它们即可。

For example:

```css
.stick-man__head--small {
}
.stick-man__head--big {
}
.stick-man__arms {
}
.stick-man__feet {
}
```

## CSS命名规范(推荐)

1、页面结构

| **功能** | **命名**      |        |                   |      |                 |
| -------- | ------------- | ------ | ----------------- | ---- | --------------- |
| 容器     | container/con | 页头   | header/head/hd    | 内容 | content/body/bd |
| 页面主体 | main          | 左右中 | left right center | 页尾 | footer/ft       |
| 导航     | nav           | 侧栏   | sidebar           | 栏目 | column          |

2、导航

| **功能** | **命名** |        |             |        |              |
| -------- | -------- | ------ | ----------- | ------ | ------------ |
| 导航     | nav      | 菜单   | menu        | 标题   | title        |
| 主导航   | mainnav  | 子导航 | subnav      | 顶导航 | topnav       |
| 边导航   | sidebar  | 左导航 | leftsidebar | 右导航 | rightsidebar |
| 侧栏     | sidebar  | 栏目   | column      | 子菜单 | submenu      |

3、功能

| **功能** | **命名** |          |          |        |        |
| -------- | -------- | -------- | -------- | ------ | ------ |
| 标志     | logo     | 广告     | banner   | 标题   | title  |
| 登陆     | login    | 注册     | register | 搜索   | search |
| 按钮     | btn      | 滚动     | scroll   | 标签页 | tab    |
| 文章列表 | list     | 提示信息 | msg      | 图标   | icon   |
| 指南     | guild    | 服务     | service  | 新闻   | news   |
| 链接     | link     | 状态     | status   | 加入   | join   |

## CSS样式表文件命名(推荐)

| **功能** | **命名**   |            |            |      |             |
| -------- | ---------- | ---------- | ---------- | ---- | ----------- |
| 基本     | base.css   | 通用       | common.css | 重置 | reset.css   |
| 主题     | themes.css | 布局、版面 | layout.css | 专栏 | columns.css |
| 文字     | font.css   | 表单       | forms.css  | 打印 | print.css   |
| 模块     | module.css |            |            |      |             |
