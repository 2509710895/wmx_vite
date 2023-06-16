import {defineConfig} from 'vite'
import viteCDNPlugin from 'vite-plugin-cdn-import'

export default defineConfig({
    build:{
        minify: false,
        rollupOptions:{
            output:{
                // manualChunks:{
                //     'lodash':['lodash']
                // }
                manualChunks:(id)=>{
                    // ts 认为你这个当前环境不是ES6以后
                    console.log("id",id);
                    if(id.includes('lodash')){
                        return 'lodash'
                    }else if(id.includes('node_modules')){
                        return 'vendor'
                    }
                }
            }
        }
    },
    plugins: [
        viteCDNPlugin({
            modules: [
                {
                    name: 'lodash',
                    var: '_',
                    path: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js'
                }
            ]
        })
    ]
})