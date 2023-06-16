import { defineConfig } from "vite";

export default defineConfig({
    build:{
        rollupOptions:{
            output:{
                assetFileNames:"[name].[hash].[ext]",
            },
        },
    },
    plugins:[
        {
            config(options){
                console.log("config",options);
                // Object.assign();
                // return {
                //     mode:"production",
                // }
            },
            configureServer(server){
                server.middlewares.use((req,res,next)=>{
                    console.log("req",req.url);
                    next()
                })
            },
            transformIndexHtml(html,ctx){
                console.log("html",html);
                console.log("ctx",ctx);
                return html;
            },
            configResolved(resolvedConfig){
                // 整个配置文件的解析流程完全完毕以后会走的钩子
                // vite 在内部有一个默认的配置文件
                console.log("resolvedConfig",resolvedConfig);
            },
            configurePreviewServer(server){
                // 配置预览服务器
                console.log("server",server);
            },

            options(rollupOptions){
                // rollupOptions 是 rollup 的配置对象
                console.log("rollupOptions",rollupOptions);
            },
            buildStart(fullRollupOptions){
                // fullRollupOptions 是 rollup 配置解析流程完全完毕后的完整的配置对象
                console.log("fullRollupOptions",fullRollupOptions);
            }
        }
    ],
});