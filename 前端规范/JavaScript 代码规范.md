# JavaScript 代码规范

JavaScript 代码规范遵循 [airbnb](https://github.com/airbnb/javascript) 。

目前公司不支持 gitlab 代码规范检测与评审，所以需要我们前端来自行实现。

其原理为 gitlab commit 代码至本地仓库时，通过 eslint api 检测 staged 文件中是否符合 airbnb 规范，符合则通过并提交至本地仓库，反之，阻止提交并提示编码错误位置与信息。

那么如何在项目中配置 eslint 检测功能呢？请继续阅读。

## eslint 的应用

> 具体配置请结合实际项目。

### 一、 安装依赖

eslint 相关:

```sh
npm install eslint
npm install eslint-config-airbnb
npm install eslint-config-jest-enzyme
npm install eslint-import-resolver-webpack
npm install eslint-plugin-babel
npm install eslint-plugin-import
npm install eslint-plugin-jest
npm install eslint-plugin-jsx-a11y
npm install eslint-plugin-prettier
npm install eslint-plugin-react
```

git 相关：

```sh
npm install husky
```

其他：

```sh
npm install path
npm install fs
npm install shell-promise
```

### 二、配置 eslintrc.js

在 项目根目录 或者 eslint 配置目录，创建 `.eslintrc.js` 文件，示例如下：

```javascript
var npath = require('path');
const root = npath.resolve(`${__dirname}/../../../`);

module.exports = {
  extends: ['airbnb', 'plugin:jest/recommended', 'jest-enzyme'],
  plugins: [
    'babel',
    'import',
    'jsx-a11y',
    'react',
    'prettier',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: npath.resolve(root + '/src/backend/node_modules/webpack-config/webpack.config.base.js'),
      },
    },
  },
  rules: {
    'linebreak-style': 'off', // Don't play nicely with Windows.

    'arrow-parens': 'off', // Incompatible with prettier
    'object-curly-newline': 'off', // Incompatible with prettier
    'no-mixed-operators': 'off', // Incompatible with prettier
    'arrow-body-style': 'off', // Not our taste?
    'function-paren-newline': 'off', // Incompatible with prettier
    'no-plusplus': 'off',
    'space-before-function-paren': 0, // Incompatible with prettier

    'max-len': ['error', 100, 2, {ignoreUrls: true,}], // airbnb is allowing some edge cases
    'no-console': 'error', // airbnb is using warn
    'no-alert': 'error', // airbnb is using warn

    'no-param-reassign': 'off', // Not our taste?
    "radix": "off", // parseInt, parseFloat radix turned off. Not my taste.

    'react/require-default-props': 'off', // airbnb use error
    'react/forbid-prop-types': 'off', // airbnb use error
    'react/jsx-filename-extension': ['error', {extensions: ['.js']}], // airbnb is using .jsx

    'prefer-destructuring': 'off',

    'react/no-find-dom-node': 'off', // I don't know
    'react/no-did-mount-set-state': 'off',
    'react/no-unused-prop-types': 'off', // Is still buggy
    'react/jsx-one-expression-per-line': 'off',

    "jsx-a11y/anchor-is-valid": ["error", {"components": ["Link"], "specialLink": ["to"]}],
    "jsx-a11y/label-has-for": [2, {
      "required": {
        "every": ["id"]
      }
    }], // for nested label htmlFor error

    "import/no-extraneous-dependencies": 'off', // import off because @fe hmm...
    'class-methods-use-this': 'off',
    "no-unused-vars": 'warn',
    'no-undef': 'warn',
    'no-restricted-syntax': 0,
    'no-unused-expressions': ['error', {'allowShortCircuit': true, 'allowTernary': true}],
  },
}
```

接下来，在编辑器中配置好 `.eslintrc.js` 文件路径。这样编辑器会提示编码有误的地方，并且可一键修复大部分问题。

### 三、创建 eslint-config

在 `.eslintrc.js` 同级目录下，创建 `eslint-config.js` ，示例如下：

```javascript
/* eslint-disable */
/**
 * @file 用于提供给 eslint check 的配置
 * @author Angus Yang
 */

const npath = require('path');
const fs = require('fs');

const root = npath.resolve(`${__dirname}/../../../`);
const eslintrc = require('./.eslintrc');

const filePath = [
  // npath.resolve(`${root}/src`),
  root,
  npath.resolve(`${root}/src/backend/node_modules`),
  npath.resolve(`${root}/src/frontend/node_modules`),
];

const ignorePath = [
  npath.resolve(`${root}/dest/*.js`),
  npath.resolve(`${root}/node_modules/*.js`),
];

const config = {
  envs: ['es6', 'browser', 'node'],
  // fix: true,
  // ignore: ignorePath,
  // ignorePattern: npath.resolve(`${root}/dest`),
  useEslintrc: false,
  baseConfig: { ...eslintrc },
};

module.exports = {
  filePath,
  config,
};
```

### 四、创建 command-check

在同级目录下，创建 `command-check.js` ，其为命令执行文件，示例如下：

```javascript
/* eslint-disable */
/**
 * @file eslint 检测脚本
 * @author Angus Yang
 */
const CLIEngine = require('eslint').CLIEngine;
const utils = require('common/utils');
const config = require('common/config');
var sp = require('shell-promise');
const npath = require('path');

const root = npath.resolve(`${__dirname}/../../../`);

const eslintConfigExample = utils.p(`${config.path.backend}/eslint/eslint-config.js`);
utils.ensureLocalFileFromExample(eslintConfigExample);

const eslintConfig = require(eslintConfigExample);

console.log('check 运行中... 请耐心等待...');

const cli = new CLIEngine(eslintConfig.config);

function check(fileArr) {
  const report = cli.executeOnFiles(fileArr);

  // only get the error messages
  const errorReport = CLIEngine.getErrorResults(report.results);

  if (errorReport && errorReport.length > 0) {
    utils.log('error: 有问题, 赶紧改了吧');
    utils.log(`warn: 文件位置: ${errorReport[0].filePath}\n`);
    console.log(errorReport[0].messages[0]);
    process.exit(1);
  } else {
    utils.log('info: 恭喜恭喜, 你的代码没有问题... eslint会认你的');
  }
}

/**
 *
 * @ exec
 */
sp('git diff --name-only --cached', {
      cwd: config.root,
      verbose: false,
    })
      .then(function (stagedFiles) {
        var fileArr = stagedFiles.split('\n');
        fileArr.pop();

        var filterFile = fileArr.filter(file => new RegExp(/\.jsx?$/)
          .test(file.substr(file.lastIndexOf('.'))),
        );
        check(filterFile.map(file => npath.resolve(`${root}/${file}`))
          || eslintConfig.filePath);
      });
```

### 五、配置 git hook

在 `package.json` 中加入 git hook 运行脚本，检测代码规范：

```json
"husky": {
    "hooks": {
      "pre-commit": "node command-check.js"
    }
  }
```

ok, 至此 eslint 检测机制已经搭建完成，赶快试一试吧！

效果如下：

![Alt text](http://10.1.1.216/yangyong/cookbook/raw/master/assets/svg/2019-08-27_15-46-06.svg)

