<script lang="jsx">
import {
    ref,
    getCurrentInstance,
    computed,
    inject,
    h,
    Fragment,
    renderList,
    provide,
    watch,
} from "vue";

export default {
    name: "chat-content",
    //! 这个属性有点意思
    componentName: "ChatContent",
    props: {
        chat: {
            type: Object,
            default: () => { },
        },
    },
    setup(props, ctx) {
        const rootChat = inject("rootChat");

        const updatePaneState = inject("updatePaneStateCallback");

        const index = ref(null);//居然是外部直接赋值
        // 判断是否被 配合父组件一起使用
        const active = computed(() => {
            return rootChat.selected.value === index.value;
        });
        const instance = getCurrentInstance();
        updatePaneState({
            uid: instance.uid,
            chat: props.chat,
            active,
            index,
        });
        return {
            active,
            index,
            rootChat
        };
    },
    render() {
        let { index, active ,chat,rootChat} = this;

        // 确保出现内容会被隐藏 provide
        const hide = !rootChat.chatDisplay.value ? "chat-hide" : ""

        // 聊天窗口主体
        const el_chat_content = h("div", { class: ["im-chat-main", "page",hide] }, [
            h("div", {
                class: ["im-pane-item", active ? "display" : ""],
                style: { height: "440px" },
            },[chat.title,hide]),
        ]);
        return el_chat_content;
    },
}
</script>
<style>
.chat-hide{
 width: 0;
 overflow: hidden;
}
</style>