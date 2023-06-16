const mockjs = require("mockjs");

const userList = mockjs.mock({
    "data|100":[{
        name:"@cname",//随机生成中文名字
        ename:"@name",//随机生成英文名字
        "id|+1":1,//id从1开始，每次加1
        time:"@datetime",//随机生成时间
    }]
})

module.exports=[
    {
        methods: "get",
        url:"/api/getUser",
        response:({body})=>{
            // body 是请求体
            return {
                code:200,
                msg:"success",
                data:userList.data,
            }
        }
    }
]