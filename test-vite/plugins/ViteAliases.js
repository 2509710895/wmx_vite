// vite 的插件必须返回给vite一个配置对象
const fs=require('fs');
const path=require('path');

// 返回一个对象，有两个属性，dirs 和 files 表示 src 目录下的文件夹和文件
function diffDirAndFile(dirFilesArr=[],basePath){
    const res={
        dirs:[],
        files:[],
    }

    dirFilesArr.forEach((item)=>{
        // 判断是否是文件夹
        if(fs.statSync(path.resolve(__dirname,`${basePath}/${item}`)).isDirectory()){
            res.dirs.push(item);
        }else{
            res.files.push(item);
        }
    })

    return res;
}


function getTotalDir(){
    const res=fs.readdirSync(path.resolve(__dirname,"../src"))
    const diffRes=diffDirAndFile(res,"../src");
    // console.log("diffRes",diffRes);
    const alias={};
    diffRes.dirs.forEach((item)=>{
        const key=`@${item}`;
        const value=`${path.resolve(__dirname,`../src/${item}`)}`;
        alias[key]=value;
    })

    return alias
}

// 手写 vite-aliases 插件
module.exports = ()=>{
    console.log("wmx","myAliases");
    return {
        // config 函数返回一个对象，这个对象就是部分的vite配置对象（你想修改的部分）
        config:(config,env)=>{
            // 第一个参数 config 是当前的vite配置对象
            // 第二个参数 env:{command: "serve" | "build", mode: "development" | "production", ssrBuild ?? false,}
            // console.log("config",config);
            // console.log("env",env);
            // const res=fs.readdirSync(path.resolve(__dirname,"../src"))
            const alias=getTotalDir();
            // console.log("res",alias);
            return {
                resolve:{
                    alias,
                },
            }
        }
    }
}