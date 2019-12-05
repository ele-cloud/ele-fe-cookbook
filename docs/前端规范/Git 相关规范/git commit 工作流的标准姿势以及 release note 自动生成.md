# git commit 工作流的标准姿势以及 release note 自动生成

一个项目除了前期的开发任务以外，还有后期的功能迭代维护，面对较为频繁的功能上线和一些繁杂的事情，于是有条不紊地管理我们的 release notes 是一门学问。

之前项目功能迭代上线，版本通过时间戳，更新内容更是通过人力去维护，时间跨度一大这种人力维护 release notes 变得混乱。

于是考虑通过规范的 commit message 来自动生成 release notes。

## 规范标准(commit)

主流的 commit message 规范为：

```
<type>(<scope>): <subject>

<body>

<footer>
```

1. **标准类别(type):**
用于声明此次commit的主要目的类别：

```
feat：feature、发布新功能
fix：修复bug 
docs：更新文档
style： 代码格式 
refactor：代码重构 
test：增加测试 
chore：构建过程或辅助工具的变动
```

2. **范围(scope):**
用于说明commit影响的范围；如数据层(model)，视图层(view)，控制层（controller）等。

3. **描述(subject):**
commit的主题描述，少于50个字。

4. **body/footer:**
用于详细描述和关闭issue的补充。(skipped)

## Commitizen
  
  [Commitizen](https://github.com/commitizen/cz-cli)是一个撰写合格 Commit message 的工具。

安装命令如下:
  
  ```
npm install -g commitizen
```

然后，在项目目录里，运行下面的命令，使其支持 Angular 的 Commit message 格式:
  
  ```
commitizen init cz-conventional-changelog --save --save-exact
```

以后，凡是用到git commit命令，一律改为使用git cz。这时，就会出现选项，用来生成符合格式的 Commit message。

![gitcz](https://github.com/AngusYang9/image/blob/master/blog/git%20commit%20%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%9A%84%E6%A0%87%E5%87%86%E5%A7%BF%E5%8A%BF%E4%BB%A5%E5%8F%8A%20release%20note%20%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90/githubImage%20%5B~:Documents:angus:githubImage%5D%20-%20...:package.json%20%5BgithubImage%5D%202019-01-29%2014-37-08.png?raw=true)

## validate-commit-msg
  
  [validate-commit-msg](https://github.com/conventional-changelog-archived-repos/validate-commit-msg) 用于检查 Node 项目的 Commit message 是否符合格式。

安装命令如下：

```sh
npm install --save-dev validate-commit-msg
```

在项目根目录下添加 `.vcmrc` 文件，默认配置如下：

```json
{
  "types": ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"],
  "scope": {
    "required": false,
    "allowed": ["*"],
    "validate": false,
    "multiple": false
  },
  "warnOnFail": false,
  "maxSubjectLength": 100,
  "subjectPattern": ".+",
  "subjectPatternErrorMsg": "subject does not match subject pattern!",
  "helpMessage": "",
  "autoFix": false
}
```

另一种方式，可以在 `package.json` 中配置 ( `.vcmrc` 优先级高)：

```json
{
  "config": {
    "validate-commit-msg": {
      /* your config here */
    }
  }
}
```

接下来配置 git hooks。

安装 husky：

```sh
npm install husky --save-dev
```

在 `package.json` 中配置：

```json
{
  "husky": {
    "hooks": {
      "commit-msg": "validate-commit-msg"
    }
  }
}
```

然后，每次 `git commit` 的时候，这个脚本就会自动检查 Commit message 是否合格。如果不合格，就会报错。

```sh
husky > commit-msg (node v9.2.1)
INVALID COMMIT MSG: does not match "<type>(<scope>): <subject>" !
change
husky > commit-msg hook failed (add --no-verify to bypass)
```

## 生成 Change log

如果你的所有 Commit 都符合 Angular 格式，那么发布新版本时， Change log 就可以用脚本自动生成。

生成的文档包括以下三个部分:
  
  - New features
- Bug fixes
- Breaking changes

每个部分都会罗列相关的 `commit` ，并且有指向这些 `commit` 的链接。当然，生成的文档允许手动修改，所以发布前，你还可以添加其他内容。

[conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) 就是生成 Change log 的工具。

安装如下：

```
npm install -g conventional-changelog
```

生成 CHANDELOG：

```sh
# 不会覆盖以前的 Change log，只会在 CHANGELOG.md 的头部加上自从上次发布以来的变动
$ conventional-changelog -p angular -i CHANGELOG.md -s 

# 生成所有发布的 Change log
$ conventional-changelog -p angular -i CHANGELOG.md -w -r 0
```

为了方便使用，可以将其写入 `package.json` 的 scripts 字段
  
  ```json
{
  "scripts": {
    ... ...
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -w -s -r"
  }
}

```

以后，直接运行下面的命令即可
  
  ```sh
npm run changelog
```

样例:
  ![image.png](https://i.loli.net/2019/12/05/kctlMqvuF1bIEKD.png)

## 参考

- [validate-commit-msg](https://github.com/conventional-changelog-archived-repos/validate-commit-msg) from github
- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)  from github
- [husky](https://github.com/typicode/husky)  from github
