import { createApp } from 'vue'
import App from './App.vue'
import IChat from "./packages/index.js";

createApp(App)
.use(IChat)
.mount('#app')
