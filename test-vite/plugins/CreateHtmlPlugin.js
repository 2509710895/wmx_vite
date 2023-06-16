module.exports=(options)=>{
    console.log("wmx");
    return {
        //转换HTML
        transformIndexHtml:{
            enforce:"pre",
            transform:(html,ctx)=> {
                // ctx 表示当前整个请求的一个执行期上下文：api get post headers
                console.log(html,ctx);
                // return html;
                return html.replace(
                    /<%= title %>/g,
                    `${options.inject.data.title}`
                )
            }
        }
    }
}