// plugins/i18n.js
import { loadLocalImg } from "@/utils/tools.js";

export default {
    install: (app, options) => {
      
    // 注入一个全局可用的 $translate() 方法
      app.config.globalProperties.$loadLocalImg = loadLocalImg;
      
    }
  }