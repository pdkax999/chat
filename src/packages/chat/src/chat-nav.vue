<script lang="jsx">
import { default_avatar } from "../../static";
// 对话信息-导航栏
export default {
  name: "chat-nav",
  props: {
    // 对话信息
    chat: {
      type: Object,
      default: () => { },
    },
    onChatNavClick: {
      type: Function,
      default: () => { },
    },
  },
  render() {
    let { chat, onChatNavClick } = this;
    let { name, avatar } = chat;
    avatar = avatar || default_avatar;
    let el_chat_title_status,
      offline = false;
    if (chat.type === "group") {
      el_chat_title_status = (
        <p class="im-chat-group">
          <span> 群组 </span>
        </p>
      );
    } else if (chat.type === "friend") {
      if (chat.online) {
        el_chat_title_status = (
          <p class="im-chat-status online">
            <span>在线</span>
          </p>
        );
      } else {
        offline = true;
        el_chat_title_status = (
          <p class="im-chat-status">
            <span>离线</span>
          </p>
        );
      }
    }
    // 标题栏
    const el_chat_nav = (
      <div class=" im-chat-title">
        <div
          class={{
            "im-chat-info": true,
            offline: offline,
          }}
          title="群组信息"
        >
          <img
            class="im-chat-avatar"
            src={avatar}
            on-click={() => onChatNavClick()}
          />
          <span class="im-chat-username">{name}</span>
          {el_chat_title_status}
        </div>
      </div>
    );
    return el_chat_nav;
  },
};
</script>