# NPM - 包管理工具

## npm 基础知识

- npm 是什么：

> npm（全称 Node Package Manager，即node包管理器）Node.js默认的、JavaScript编写的软件包管理系统。

- npm 使用场景：

  - 允许用户从 npm服务器 下载别人编写的第三方包到本地开发项目中使用;
  - 允许用户从 npm服务器 下载并安装别人编写的命令行程序到本地全局使用;
  - 允许用户将 自己编写的包或命令行程序 上传到npm服务器供别人使用。

- npm 工作原理：

  npm依赖解析的主要思想：尽可能地减少间接依赖安装目录的深度，最理想的情况是与直接依赖安装在同一目录下，通过这种方式来减少依赖目录的嵌套，缓解整个依赖目录层次过深的问题。（因为 Windows 中文件路径的长度不能大于 260 个字符。）

- npm 安装(随同 Node.js 一起安装)：

  ```sh
  1. 进入Node.js 官方网站，找到 Downloads 栏目，选择适合自己系统的安装包进行安装。
  2. 在MacOS系统上建议先安装Homebrew，然后使用homebrew来安装NPM。
  brew install nodejs
  ```

## npm 基本使用

- 常用参数：
  - `-g, --global`：安装全局依赖，如果没有指定依赖包名，则将当前目录中的包安装至全局
  - `-S, --save`：安装依赖的同时将该依赖写入 dependencies
  - `-D, –-save-dev`：安装依赖的同时将该依赖写入 devDependencies
  - `-O, --save-optional`：安装依赖的同时将该依赖写入 optionalDependencies
  - `-E, --save-exact`：写入 package.json 时带有确切版本号
  - `–no-optional`：不安装 optional dependencies，可继承
- 常用命令：

```bash
# 项目开发相关
npm init  						# 在项目根目录下，创建一个 package.json 文件,需要填写一些内容
npm init -y   					# 在 package.json 文件中全部使用默认选项

npm install <packageName> 		# 安装 项目内部局部包，项目开发依赖包
npm install -g  <packageName> 	# 安装 本地全局环境包，多为 命令行程序

npm update <packageName> 		# 对项目内单个依赖包升级
npm update -g <packageName>     # 更新全局的软件包
npm -g outdated 				# 使用此命令可以查看那些包有更新

npm uninstall <packageName>  	# 卸载本地(local)软件包
npm uninstall -g <packageName>  # 卸载全局(global)软件包

npm list 						# 查看本地(local)软件包列表
npm list -g 					# 查看系统中全局安装过的软件包

# npm 发包相关
npm adduser  					# 创建一个 npm 账号(Username，Password，Email)
npm login						# 登录 npm 仓库账号(Username，Password)
npm publish  					# 发布自己的包到 npm，或者 更新已有的 npm 包
npm link						# 将本地开发包挂载到全局环境，可作为全局命令使用
npm unpublish  <packageName>    # 利用npm撤销已发布包  报权限方面的错，加上--force

# 镜像源相关
npm config get registry  		# 查看 npm 源地址
npm --registry https://registry.npm.taobao.org install express  # 临时使用淘宝镜像源
npm config set registry https://registry.npm.taobao.org  # 持久变更为淘宝镜像源
npm install -g cnpm --registry=https://registry.npm.taobao.org # 通过 cnpm 使用淘宝源
npm config set registry https://registry.npmjs.org/  # 还原回官方镜像源

# npm全局配置相关
npm config  					# 配置相关
npm config get userconfig 		# 查看用户配置文件
npm config get globalconfig 	# 查看全局配置文件
npm config ls -l 				# 查看npm 所有配置属性
```

## npm 发包流程

- 全局环境（node、npm）

```bash
node -v  # node > 8.0.0
npm -v
```

- npm 账号、检测包名是否存在
- 本地创建项目文件，执行 `npm init -y`，对 `package.json` 做简单调整

```json
{
  "name": "star-cli",
  "version": "0.0.1",
  "description": "",
  "preferGlobal": true,
  "bin": {
    "star": "bin/star.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

- 使用 `npm login`，登录自己的 npm 账号
- 使用 `npm publish`，发布自己的包到 npm

**注意**：

1. 发布自己包之前，应先去 npm 官网搜索自己要发布的包名是否已经存在，已存在的包名会提交失败；

2. 自己发布的包更新时，每次都要到package.json, 将 version 修改，例如：从1.0.0改为1.0.1。然后再执行 `npm publish`更新；整体步骤示例图片如下：

   ![npm_publish.8def4aa5.jpg](https://i.loli.net/2019/08/22/xnADsS9pg4G2Xka.jpg)