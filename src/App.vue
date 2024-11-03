<template>
  <div>
    <IChat :chats="chats"> </IChat>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      config: {
        //简约模式
        brief: true,
        // 标签是否可以删除
        tabRemove: true,
        // 窗口是否可以越界
        moveOut: true,
      },
      chats: [
        {
          id: 2,
          name: "好友1",
          type: "friend",
          online: true,
          title:"你好世界"
        },
        {
          id: 3,
          name: "群组",
          type: "group",
          online: false,
          title:"世界你好"
        },
      ],
    };
  },
};
</script>