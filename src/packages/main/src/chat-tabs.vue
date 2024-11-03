<script lang="jsx">
import { h, ref, inject, renderList } from 'vue'
import { default_avatar } from '../static/index.js'

function noop() {

}

export default {
    name: "chat-tabs",
    //注入祖先属性
    inject: ["rootChat"],
    props: {
        //  经过计算的标签页
        panes: {
            type: Array,
            default: () => [],
        },
        // 会话标签单击
        onTabClick: {
            type: Function,
            default: noop,
        },
        //标签删除事件
        onTabRemove: {
            type: Function,
            default: noop,
        },
        // 会话窗口显示控制
        onChatDisplay: {
            type: Function,
            default: noop,
        },
        // 处理标签页拖拽
        onDragWindow: {
            type: Function,
            default: noop,
        }
    },
    emits: ["TabRemove", "TabClick", "ChatDisplay"],
    data() {
        return {
            // setting 置顶 参数
            stickyTop: 0,
        }
    },
    methods: {
        // 处理标签删除事件
        bindTabRemove(ev, pane) {
            ev.stopPropagation();
            this.onTabRemove(pane)
        },
        // 会话标签单击
        bindTabClick(ev, pane) {
            ev.stopPropagation();
            this.onTabClick(pane)
        },
        handleScroll(event) {
            this.stickyTop = event.target.scrollTop;
        }
    },
    render() {
        let { rootChat, panes, onDragWindow, onChatDisplay, stickyTop, bindTabClick, bindTabRemove, handleScroll } = this;

        const { config, chatDisplay, } = rootChat;

        // 标签
        const el_tabs = renderList(panes, (pane, index) => {
            const { active, chat, } = pane;
            let { name, id, avatar, online } = chat;
            const tabName = id + name + index;
            pane.index = `${index}`;
            //  在线状态
            let offline = false;
            if (chat.type === "friend") {
                offline = !online;
            }
            // 是否有头像
            avatar = avatar || default_avatar;
            let el_tab_remove = undefined;
            if (config.tabRemove) {
                // 标签删除按钮
                el_tab_remove = h("i", { class: "im-icon i-icon-error", onClick: (ev) => bindTabRemove(ev, pane) })
            }
            //  tab 标签
            const el_tab_label = h('span', { class: "im-label" }, [name]);
            // 头像
            const el_tab_avatar = h("img", {
                src: avatar,
                onClick: (ev) => bindTabClick(ev, pane),
            });
            return h('li', {
                class: ["im-chat-tab", offline ? "offline" : "", active ? "im-this" : ""],
                id: `tab-${tabName}`,
                key: `tab-${tabName}`,
                onClick: (ev) => bindTabClick(ev, pane),
            }, [el_tab_avatar, el_tab_label, el_tab_remove]);
        });

        let el_tabs_setting;

        // 简约模式
        if (config.brief) {
            // 会话窗口隐藏事件
            const el_right_icon = h("i", {
                class: ["im-icon", "btn-pane-show", chatDisplay ? "i-icon-arrow-right" : "i-icon-arrow-left"],
                onClick: () => onChatDisplay()
            });
            el_tabs_setting = h('li', {
                class: ["im-chat-tab", "im-tabs-title", "active"],
                style: { "top": stickyTop + "px" }
            }, [
                h("span", {
                    class: ["im-label", "im-box-setwin"]
                }, [
                    h("a", {
                        class: "im-btn-min",
                        href: "javascript:;",
                    }, [h('cite')])
                ]),
                el_right_icon,
            ]);
        }

        return h("ul", {
            class: ["im-chat-tabs", chatDisplay.value ? "" : "tabs-shadow"],
            onMousedown: (ev) => onDragWindow(ev),
            onScroll: (ev) => handleScroll(ev)
        }, [
            el_tabs_setting,
            el_tabs,
        ])
    }
}

</script>