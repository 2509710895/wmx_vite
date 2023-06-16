import {defineConfig} from 'vite'
import checker from 'vite-plugin-checker'
import path from 'path'

export default defineConfig({
    build:{
        minify:false,
        rollupOptions:{
            input:{
                main:path.resolve(__dirname,'./index.html'),
                product:path.resolve(__dirname,'./product.html')
            },
            output:{
                // manualChunks:{
                //     'lodash':['lodash']
                // }
                manualChunks:(id)=>{
                    // ts 认为你这个当前环境不是ES6以后
                    if(id.includes('lodash')){
                        return 'lodash'
                    }else if(id.includes('node_modules')){
                        return 'vendor'
                    }
                }
            }
        }
    },
    plugins:[
        checker({typescript:true})
    ]
})

// export default defineConfig(({ command, mode }) => {
//     console.log("command", command);
//     console.log("mode", mode);
//     return {
//         plugins: [
//             checker({
//                 typescript: true,
//                 overlay: true
//             })
//         ]
//     }
// })

// export default defineConfig({
//     plugins: [
//         checker({
//             typescript: true,
//             // overlay: true
//         })
//     ]
// })