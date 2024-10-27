import  "./styles/index.scss";


const components = [];
// 安装函数
const install = function (Vue) {
    if(install.installed) return;

    components.forEach((component)=>{
        Vue.component(component.name,component)
    })
    
}

if(typeof window !=="undefined" && window.Vue){
 install(Vue)
}

export default {
    version:"1.0.0",
    install,
    ...components
}