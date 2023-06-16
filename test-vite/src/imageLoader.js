// 主要帮助我们学习怎么加载静态图片资源
import pic from "@assets/images/pic.png"

// 服务端会读取这个图片的文件的内容，---> Buffer 二进制

const img=document.createElement('img')
img.src=pic
document.body.appendChild(img)
console.log("png",pic);