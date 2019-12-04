# Git 提交规范

## Git 分支命名规范

- **master** : 主分支，默认创建，用于线上的正式代码发布

- **release** : 预发布(测试环境)分支，用于开发代码提交到测试环境

- **dev_hotfix** : 紧急问题修复分支，用于线上bug紧急修复

- **dev_feature** : 功能开发分支，用于日常的项目功能开发 

- dev_ 分支需补充分支的其他信息，格式为 `dev_$type_$personname_$createtime_$description`

  - `type`：feature/hotfix, 分支类别
  - `personname`：使用者
  - `createtime`：创建时间，年月日，例：180306
  - `description`：描述，创建分支的目的，可用项目名

  示例：`dev_feature_libo_181127_logupdate`

## Git 代码发布流程

![git.46d0fefc.png](https://i.loli.net/2019/08/22/A18SlQ9G7CEmNTo.png)

## 提交分支commit规范

- 提交信息的格式

  ```html
  <type>(<scope>): <subject>
  <BLANK LINE>
  <body>
  <BLANK LINE>
  <footer>
  ```

- 具体参数说明

  - type(必填)：用于说明 commit 的类别，只允许使用下面7个标识。
    - feat：新功能（feature）
    - fix：修补bug
    - docs：文档（documentation）
    - style：格式（不影响代码运行的变动）
    - refactor：重构（即不是新增功能，也不是修改bug的代码变动）
    - test：增加测试
    - chore：构建过程或辅助工具的变动
  - Scope(可选)：用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

  > 例如react,可以是model,view,styles等。如果你的修改影响了不止一个scope，你可以使用*代替。

  - Subject(必填)：是 commit 目的的简短描述，不超过50个字符。

    ```text
    * 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
    * 第一个字母小写  
    * 结尾不加句号（.）
    ```

  - Body(可选)：对本次 commit 的详细描述，可以分成多行。

  - Footer(可选)：

    - 不兼容变动：如果当前代码与上一个版本不兼容，则 Footer 部分以BREAKING CHANGE开头，后面是对变动的描述、以及变动理由和迁移方法。
    - 关闭 Issue：如果当前 commit 针对某个issue，那么可以在 Footer 部分关闭这个 issue

  - 示例：

  ```text
  feat(*): Add a function of searching specific keys from log to LogDumper (task #123)
  
  Before the change, LogDumper had to convert binary log file to text format. Then, the user could use grep command to find target keys. With the new function, one can find target keys and print related information on screen directly by using
  
  --keys [key1,key2] option.
  
  binary log format: www.example.com
  ```

## Tag(版本号) 规范

- 版本号的构成规范
  - 版本号一般由数字 1-9 和 . 组成，不应包含多余的信息，如前端不要加字母 v
  - 版本号默认分为三个段位，如 1.2.3 。如果是 fork 的项目，版本号应在上游版本的基础上在后面增加一个子段位
  - 版本号的长度应前后保持一致，必要时做补零处理，如应使用 1.0.0 而不是 1.0
  - 如有必要，可以在版本号后面加破折号 - 添加更多描述信息，如 2.3.0-loongson
- 版本号变更规则
  - 大版本号一般不做变化，除非整个项目系统架构或实现方式做重大调整，或者应项目经理的要求对版号提升
  - 中版本号的提升意味着将要发布一个新的稳定版本，一般会对功能接口或界面做大量调整。对于受项目经理监管的项目，版本号的提升要经过项目经理的许可
  - 小版本号的变更相对灵活，由开发者自主控制。但如果有重要 bug 被修复，版本号一定要跟进
  - 版本过渡时，若代码变更较大，包括增加新特性和对接口进行调整，一般会预先发布 alpha ，beta ，rc等测试版，此时应先在低段位添加一个大的版本号进行过渡，如 0.2.0 -> 0.90.0 -> 1.0.0，1.0.0 ->1.90.0 -> 2.0.0

## Merge Request规范

- title
  - 言简意赅的描述此次merge请求的所有修改内容
  - 若此次合并需要在工作流(需要进行codeReview等)完成之后才要合并，则需要在最前部加上'WIP:'(例: 'WIP: Add uuid areas to header when send ajax.')，待工作流完成后删除title中的此字段
- description
  - 详细描述此次提交的所有修改内容，例如一次bug的详细描述，一次功能的详细描述等，也可以添加一些描述模板到自己项目的默认分支中。