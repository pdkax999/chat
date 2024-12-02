import { createApp } from 'vue'
import App from './App.vue'
import IChat from "./packages/index.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App)
.use(IChat)
.use(ElementPlus)
.mount('#app')
