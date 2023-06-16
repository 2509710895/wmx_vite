import { defineConfig, loadEnv } from "vite"
import viteBaseConfig from "./vite.base.config"
import viteProdConfig from "./vite.prod.config"
import viteDevConfig from "./vite.dev.config"

// 策略模式
const envResolveConfig =  {
    "build":()=>{
        console.log("生产环境");
        return Object.assign({},viteBaseConfig, viteProdConfig)
    },
    "serve":()=>{
        console.log("开发环境");
        return Object.assign({},viteBaseConfig, viteDevConfig)// 新配置可能会覆盖旧配置中的 envDir
    }
}

export default defineConfig(({command,mode})=>{
    // 是build还是serve，取决于你在命令行中输入的是开发环境还是生产环境
    const env=loadEnv(mode,process.cwd(),"")// 加载环境变量
    console.log("process",env);
    console.log("command",command);
    return envResolveConfig[command]()
})

/** @type import("vite").UserConfig */
// const viteConfig={
//     // 知道这个变量的类型
// }

// export default viteConfig