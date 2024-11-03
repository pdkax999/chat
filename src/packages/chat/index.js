import ChatContent from "./src/index.vue";

ChatContent.install = function (Vue) {
  Vue.component(ChatContent.name, ChatContent);
};


export default ChatContent;