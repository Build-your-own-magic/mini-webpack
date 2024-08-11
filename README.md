# webpack 核心 Compiler 实现


Compiler 类是 webpack的运行入口，每次打包时，会生成一个实例，里面挂载了许多打包的数据，在这里简化了结构，力求了解关键性打包流程

## 1. Compiler类初始化

1. 解析 import 语句
2. 保存依赖图
3. 生成入口代码

```js
/**
 * 1. 定义 Compiler 类
 */

class Compiler {
    constructor(options) {
        const { entry, output } = options;

        this.entry = entry;
        this.output = output;
        this.modules = [];
    }
    // 构建启动
    run(){}
    // 重写 require 函数，输出 Bundle
    generate() {}
}
```

## 2. Compiler 中的import导入解析

webpack.config.js

```js
const path = require('path')

module.exports = {
    // entry: path.resolve(__dirname, './src/index.js'),
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    }
}
```


compiler.js

```js
/**
 * 2. 解析入口文件，获取 AST
 */
const fs = require('fs');
const parser = require('@babel/parser');
const options = require('../webpack.config');

const Parser = {
    getAst: path => {
        // 读取入口文件
        const content = fs.readFileSync(path, 'utf-8');
        // 将文件内容转为AST抽象语法树
        return parser.parse(content, {
            sourceType: 'module'
        })
    }
}

class Compiler {
    constructor(options) {
        const { entry, output } = options;

        this.entry = entry;
        this.output = output;
        this.modules = [];
    }
    // 构建启动
    run() {
        const ast = Parser.getAst(this.entry);
        console.log(Object.keys(ast));
        console.log(ast);
    }
    // 重写 require函数，输出 bundle
    generate() {

    }
}

new Compiler(options).run();
```

[原文](https://xinchou16.github.io/webpack/01-compiler.html)

# webpack 学习资源

- [webpack深入浅出](https://webpack.wuhaolin.cn/)
- [解析html](https://github.com/inikulin/parse5/tree/master/packages/parse5)
- [webpack原理解析](https://www.youtube.com/playlist?list=PL5d0qARooeQhgUt06niPUQR3-smIdpSAJ)
- [编写loader](https://zhuanlan.zhihu.com/p/375626250)
- [loader解析](https://zhuanlan.zhihu.com/p/360421184)
- [重学webpack](https://blog.51cto.com/u_14115828/3733978)

# loaders

- [vue-loader](https://github.com/vuejs/vue-loader/blob/0.7.0/lib/parser.js)
- [raw-loader](https://github.com/webpack-contrib/raw-loader/blob/master/src/index.js)
