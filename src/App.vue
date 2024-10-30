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
      chats: [],
    };
  },
};
</script>