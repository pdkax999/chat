import IChat from "./src/index.vue";

IChat.install = function (Vue) {
  Vue.component(IChat.name, IChat);
};

export default IChat;