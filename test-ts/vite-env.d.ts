/// <reference types="vite/client" />

// 让这个文件下的类型定义 与 ts 默认类型定义合并
interface ImportMetaEnv {
    readonly VITE_PROXY_URL: string;
}