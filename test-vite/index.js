import { count } from "./count.js";
import _ from "lodash";
// import lodashES from "lodash-es";
import "./index.css";
import "./variable.css";
import "./index.less";
// import "./src/imageLoader.js";
import("./src/imageLoader.js");//动态导入，会单独打包成一个文件
import {name} from "./src/assets/json/index.json";//还能解构
import { cloneDeep } from "lodash";

console.log("env",import.meta.env.ENV_APP_KEY);
// console.log("lodash",_,lodashES);
console.log(count);

// tree shaking 树摇优化 打包工具会自动删除没有用到的变量或方法
console.log("json",name);//如果用的不是vite，在其他构建工具里 json 文件的导入会作为一个json字符串

fetch("/api/getUser").then((res)=>{
    console.log("res",res);
}).catch((err)=>{
    console.log("err",err);
});
