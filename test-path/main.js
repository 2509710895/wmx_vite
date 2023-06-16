const fs=require("fs")
const path=require("path") // path 本质上就是一个字符串处理模块，他里面有非常多的路径字符串处理的方法

const res=fs.readFileSync(path.resolve(__dirname,"./read.js"))// 我们希望基于main.js的路径去生成一个绝对路径读取read.js

console.log("read",res.toString(),path.resolve(__dirname,"./read.js"));

// node 端在读文件时，如果发现用的是相对路径，则会以process.cwd()为基准，去读取文件
// process.cwd()获取的是当前node命令执行时所在的文件夹目录
// __dirname获取的是当前文件所在的文件夹目录
// commonjs 规范 将一个文件放到一个 立即执行函数 中执行

console.log("argument",arguments);

// exports = module.exports = {}(第0位的对象)

// 第1位参数 require 函数
// 第2位参数 Module 对象
// 第3位参数 __filename 对象
// 第4位参数 __dirname 对象

// exports require()  module  __filename  __dirname
// 1. exports 用来导出模块
// 2. require() 用来加载模块
// 3. module 代表的是当前模块本身
// 4. __filename 当前模块的绝对路径
// 5. __dirname 当前模块所在的文件夹的绝对路径