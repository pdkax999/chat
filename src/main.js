import { createApp } from 'vue'
import App from './App.vue'
import IChat from "./packages/index.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

let app = createApp(App)
.use(IChat)
.use(ElementPlus)
.mount('#app')

app.config.globalProperties.get = function  getImg(src){
    return new URL(src, import.meta.url).href;
}