import { createApp } from 'vue'
import App from './App.vue'
import IChat from "./packages/index.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import plugins from "./plugins/index.js";



let app = createApp(App)
.use(IChat)
.use(ElementPlus)
.use(plugins)   //! 必须要在挂载之前引入组件
.mount('#app')