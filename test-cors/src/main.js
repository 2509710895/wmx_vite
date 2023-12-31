fetch("/api").then((res)=>{
    console.log("res",res);
})

// 浏览器会先帮我们做一步拼接 http://127.0.0.1:5173/api
// 浏览器拼完后去找 Vite 的开发服务器
// Vite 开发服务器发现 /api 这个path有配置过代理策略，然后就会根据策略的描述对象，进行再次请求
// /api => https://www.360.com

// 偷天换日
// 本来我们要请求 360，直接请求肯定会被浏览器拦截
// 但我自己开个服务器 --> 然后先请求自己的服务器 --> 自己的服务器再去请求 360 --> 拿到 360 的数据 --> 把响应结果给浏览器
// 实际上响应体是360的