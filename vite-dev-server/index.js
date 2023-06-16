const koa=require('koa');
const fs=require('fs');
const path=require('path');
// 不同的宿主环境会给 js 赋予一些不同的能力

const app=new koa();

// 读取 vite.config.js 文件
const viteConfig=require(path.resolve(__dirname,'./vite.config.js'));
console.log("viteConfig",viteConfig);
// config 调用时机
viteConfig.plugins.forEach((plugin)=>{
    plugin.config && plugin.config(viteConfig);
})

const mergeOptions=Object.assign({},defaultConfig,viteConfig);
// configResolved 调用时机
viteConfig.plugins.forEach((plugin)=>{
    plugin.configResolved && plugin.configResolved(mergeOptions);
})

const aliasResolve=require('./utils/aliasResolve.js');

// node 最频繁做的事就是处理请求和操作文件

// 当请求来临后，会进入执行app.use注册的中间件函数
app.use(async (ctx)=>{
    // context 上下文 
    console.log("ctx",ctx.request,ctx.response);
    if(ctx.request.url==='/'){
        // 这意味着需要根目录下的文件
        // ctx.response.type='html';
        // ctx.response.body=fs.createReadStream('./index.html')
        const indexContent=await fs.promises.readFile(path.resolve(__dirname,'./index.html'));
        console.log("indexContent",indexContent.toString());
        // transformIndexHtml 调用时机
        let cacheContent=indexContent.toString();
        viteConfig.plugins.forEach((plugin)=>{
            plugin.transformIndexHtml && (cacheContent=plugin.transformIndexHtml(cacheContent,ctx));
        })
        
        ctx.response.set('Content-Type','text/html;charset=utf-8');
        ctx.response.body=indexContent;// 响应体
    }
    if(ctx.request.url.endsWith(".js")){
        console.log(path.resolve(__dirname,'.'+ctx.request.url));
        const mainJSContent=await fs.promises.readFile(path.resolve(__dirname,'.'+ctx.request.url));
        const lastContent=aliasResolve(viteConfig.resolve.alias,mainJSContent.toString());
        ctx.response.set('Content-Type','text/javascript');
        ctx.response.body=lastContent;// 响应体
    }

    // if(ctx.request.url==='/main.js'){
    //     const mainJSContent=await fs.promises.readFile(path.resolve(__dirname,'./main.js'));
    //     console.log("mainJSContent",mainJSContent.toString());
    //     ctx.response.set('Content-Type','text/javascript');
    //     ctx.response.body=mainJSContent;// 响应体
    // }
    // if(ctx.request.url==='/App.vue'){
    //     const mainVueContent=await fs.promises.readFile(path.resolve(__dirname,'./App.vue'));
    //     console.log("mainVueContent",mainVueContent.toString());
    //     // 即使看到了 vue 格式文件，也要按照 js 的格式去处理
    //     // 在浏览器和服务器眼里，文件都是字符串
    //     ctx.response.set('Content-Type','text/javascript');
    //     ctx.response.body=mainVueContent;// 响应体
    // }
    if(ctx.request.url==='/api'){
        // 请求接口，找数据返回给前端
        const target=proxy.target
        const rewrite=proxy.rewrite||(str=>str);
        const res=await fetch(target+rewrite(ctx.request.url));
        ctx.response.body=res
    }
})

app.listen(5173,()=>{
    console.log('server is running at 5173')
})