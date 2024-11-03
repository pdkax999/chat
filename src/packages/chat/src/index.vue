<script lang="jsx">
import {
    ref,
    getCurrentInstance,
    computed,
    inject,
    h,
} from "vue";
import ChatNav from "./chat-nav.vue";
import TalkList from "./talk-list.vue";
import EnterBox from "./enter-box.vue";
import ToolsIndex from "./tools.vue";

export default {
    name: "chat-content",
    //! 这个属性有点意思
    componentName: "ChatContent",
    components: {
        ChatNav,
        TalkList,
        EnterBox,
        ToolsIndex,
    },
    props: {
        // 会话信息
        chat: {
            type: Object,
            default: () => { },
        },
        //  语音发送事件
        onEnter: {
            type: Function,
            default: () => { },
        },
    },
    setup(props, ctx) {
        // 对话记录列表
        const talkList = ref([]);

        const rootChat = inject("rootChat");

        // 未读
        const unread = ref(0);
        const updatePaneState = inject("updatePaneStateCallback");

        const index = ref(null);//居然是外部直接赋值
        // 判断是否被 配合父组件一起使用
        const active = computed(() => {
            return rootChat.selected.value === index.value;
        });

        const instance = getCurrentInstance();
        // 处理收到的消息
        const getMessage = (message) => {
            talkList.value.push(message)
        }
        updatePaneState({
            uid: instance.uid,
            chat: props.chat,
            active,
            index,
            unread,
            getMessage
        });
        return {   //暴露一次同步更新
            active,
            index,
            rootChat,
            unread,
            talkList
        };
    },
    data() {
        return {
            //! 输入框内容 抽取到父组件确实很棒
            content: ""
        }
    },
    methods: {
        // 对消息发送做额外处理
        bindEnter(message) {
            this.onEnter(message);
            this.content = "";
            this.$nextTick(() => {
                // this.$refs.chatList.scrollBottom();
            });
        },
        // 添加表情
        bindEmoji(emoji) {
            this.content += emoji
        },
        // 
        bindUpload(type, file) {
            console.log(type);
        },
        // 处理未读数是否显示
        handleUnread(count) {
            // 当 current Chat 激活时清空 未读信息
            if (this.active) {
                this.unread = 0;
            } else {
                this.unread = count;
            }
        },
    },
    render() {
        let { index, active, chat, rootChat, talkList,
            content, handleUnread, bindEnter, bindEmoji,
            bindUpload
        } = this;

        // 会话 nav
        const el_head = h(ChatNav, {
            chat,
        });
        // 聊天内容
        const el_content = h(TalkList, {
            current: active,
            list: talkList,
            onUnread: handleUnread,
        });

        // 输入框
        const el_enter_box = h(EnterBox, {
            value: content,
            onEnter: bindEnter,
        });
        // 工具栏
        const el_tools = h(ToolsIndex, {
            bindEmoji,
            bindUpload,
        });

        const el_footer = h(
            "div",
            {
                class: ["im-chat-footer"],
            },
            [el_tools, el_enter_box]
        );
        //!我还在想这个问题都帮我解决了
        const mainDisplay = active && rootChat.chatDisplay.value ? "display" : "";

        const el_main = h("div", { class: ["im-chat-main", "page"] }, [
            h(
                "div",
                {
                    class: ["im-pane-item", mainDisplay],
                },
                [el_head, el_content, el_footer]
            ),
        ]);

        return el_main;
    },
}
</script>
<style>
.chat-hide {
    width: 0;
    overflow: hidden;
}
</style>