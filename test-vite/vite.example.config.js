import { defineConfig } from "vite";
const postcssPresetEnv = require('postcss-preset-env')
const path = require("path");

export default defineConfig({
    resolve:{
        alias:{//配置别名,原理：字符串替换
            "@":path.resolve(__dirname,"./src"),
            "@assets":path.resolve(__dirname,"./src/assets"),
        },
    },
    optimizeDeps: {
        exclude: ['lodash-es'],//当遇到lodash-es时，不进行优化,不进行依赖预构建，后果：浏览器发现lodash-es时，会使用http请求lodash-es中引入的模块代码
    },
    envPrefix: "ENV_",// 配置 vite 注入客户端环境变量校验的 env 前缀
    css:{//对css的行为进行配置
        // module 配置最终会丢给 postcss modules
        modules:{//是对css模块化的默认行为进行覆盖
            localsConvention: "camelCaseOnly",//修改生成的配置对象的key的展示形式（驼峰还是中划线形式）
            scopeBehaviour: "local",//配置当前的模块化行为是模块化还是全局化（有hash就是开启了模块化的一个标志，因为他可以保证产生不同的hash值使样式不被覆盖
            generateScopedName: "[name]__[local]___[hash:base64:5]",//配置生成的类名的格式
            // generateScopedName: (name,filename,css)=>{//配置生成的hash值的形式
            //     // name 代表当前的类名
            //     // filename 代表当前的文件的路径
            //     // css 代表当前的css代码
            //     return "hash";
            // },
            hashPrefix: "hash",//如果想要hash更加独特，可以配置 hashPrefix ，配置的字符串会参与到最终的 hash 生成
            globalModulePaths: [/node_modules/],//配置哪些模块的css不进行模块化
        },
        preprocessorOptions: {//对css预处理器的配置
            less: {//对less的配置
                math: "always",//配置less中的数学运算
                globalVars: {//配置less中的全局变量
                    mainColor:"red",
                },
            },
        },
        devSourcemap: true,//配置是否开启css的sourceMap
        // 如果不在这里写，我们可以使用postcss.config.js来配置
        postcss:{//对postcss的配置
            plugins:[//对postcss插件的配置
                postcssPresetEnv(),//这个插件是postcss的一个插件，可以让我们使用一些新的css特性，
            ],
        },
    },
    // 构建生产包时的配置策略
    build:{
        rollupOptions:{//对rollup进行配置构建策略
            output:{//对rollup的输出进行配置
                // hash是根据文件内容计算出来的，如果文件内容没有变化，那么hash就不会变化
                assetFileNames:"[name].[hash].[ext]",//配置输出的静态资源的文件名
            },
        },
        assetsInlineLimit: 4096,//配置文件的大小，如果文件的大小小于这个值，那么就会被转换成base64
        outDir: "build",//配置输出的目录
        assetsDir: "static",//配置静态资源的输出目录
    },
})