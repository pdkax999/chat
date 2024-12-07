<template>
  <div class="im-talk-list">
    <ul>
      <template v-for="item in list" :key="item.id">
        <!-- 我发送的消息,反转消息内容 -->
        <li class="talk-item" :class="item.form.id === mine.id ? 'this' : 'friend'">
          <img :src="item.form.avatar" class="avatar" alt="">
          <div class="talk-item-mine">
            <span class="content">
              {{ item.content }}
            </span>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
/* 
  发送者是相对的，所以只渲染发送者即可
*/
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  mine: {
    type: Object,
    default: () => { }
  }
});
onMounted(() => {

});
</script>

<style lang="scss" scoped>
// 创建一个 mixin 来封装三角形样式
@mixin triangle($triangle-color,$width:5px) {
  width: 0;
  height: 0;
  border-top: $width solid $triangle-color;
  border-right: $width solid transparent;
  border-left: $width solid transparent;
}
.im-talk-list {
  overflow: auto;
  padding: 10px;
  ul {
    display: flex;
    row-gap: 10px;
    flex-direction: column;
  }
  .talk-item {
    display: flex;
    column-gap: 10px;
    &-mine {
      max-width: 80%;
      padding: 10px;
      border-radius: 5px;
      position: relative;
    }
  }

  img {
    width: 35px;
    height: 35px;
  }
}

// 我发送的消息
.this {
  flex-direction: row-reverse;
  .talk-item-mine {
    background-color: #1e6eff;
    color: #fff;
    &::after {
        position: absolute;
        content: "";
        &{
         top: 0;
         right: 0;
         transform: translateX(50%);
         border-top-color:  #1e6eff;
         @include triangle(#1e6eff);
        }
      }
  }
}
// 好友
.friend {
  .talk-item-mine {
    background-color: #fff;
    color: #000;
    &::before {
        position: absolute;
        content: "";
        &{
         top: 0;
         left: 0;
         transform: translateX(-50%);
         border-top-color:  white;
         @include triangle(#fff);
        }
      }
  }
}
</style>
