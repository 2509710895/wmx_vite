const fs=require("fs")
const path=require("path")

module.exports=()=>{
    // 做的最主要的事情就是 拦截http请求
    // 当我们使用 fetch或者axios去请求的
    // axios baseUrl 请求地址

    return {
        configureServer(server){
            // 服务器的相关配置

            const mockStat = fs.statSync("mock")
            const isDirectory = mockStat.isDirectory()
            let result = []
            if (isDirectory) {
                result = require(path.resolve(process.cwd(), "mock/index.js"))
                console.log("result", result);
            }

            // req 请求对象  --> 用户发过来的请求，请求头请求体 url cookie
            // res 响应对象  --> 服务器返回给用户的响应，响应头 响应体
            // next 函数  --> 调用next函数，才会执行下一个中间件
            server.middlewares.use((req,res,next)=>{
                console.log("req",req.url);

                const matchItem=result.find(item=>item.url===req.url&&item.methods===req.method.toLowerCase())
                if(matchItem){
                    const responseData=matchItem.response(req)
                    console.log("responseData",responseData);
                    res.setHeader("Content-Type","application/json;charset=utf-8");
                    res.end(JSON.stringify(responseData))
                }else{
                    next()
                }
                // next()
            })
        }
    }
}