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
        mine: {
            type: Object,
            default: () => { }
        }
    },
    setup(props, ctx) {
        // 对话记录列表,放在这里确实很合适，但是外界的历史聊天信息怎么传递过来
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
            content: "你好世界"
        }
    },
    methods: {
        // 对消息发送做额外处理
        bindEnter(content) {
            // 除message以外接收所有信息
            const {message,...to} = this.chat

            let messageInfo = {
                timestamp: Date.now(),
                form: this.mine,
                content,
                to,
                type: 0 //消息类型
            }
            this.onEnter(messageInfo);
            this.content = "";
            this.$nextTick(() => {
                // this.$refs.chatList.scrollBottom();
            });
        },
        // 添加表情
        bindEmoji(emoji) {
            this.content += emoji
        },
        // 发送文件
        bindUpload(type, file) {
            console.log(type);
        },
        // 处理enterBox的文本输入
        bindText(text){
            this.content = text;
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
            content, handleUnread, bindEnter, bindEmoji,bindText,
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
            class:["im-chat-talks"]
        });

        // 输入框
        const el_enter_box = h(EnterBox, {
            value: content,
           'onUpdate:value':bindText, //同步文本数据
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

.im-chat-footer{
 height: 170px;
}

.im-chat-talks{
height: calc(440px - 170px);
}
</style>