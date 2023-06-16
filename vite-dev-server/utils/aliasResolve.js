module.exports=function(aliasConfig,jsContent){
    const extires=Object.entries(aliasConfig)
    let lastContent=jsContent
    extires.forEach(([key,value])=>{
        console.log(key,value);
        lastContent=lastContent.replace(key,value)
    })
    return lastContent
}