<template>
  <div class="im-enterBox-container">
   <div class="im-enter-arrow">
    <el-input
      v-model="value"
      style="width: 590px"
      :rows="2"
      type="textarea"
    />
   </div>
    <el-button class="im-enterBox-send"  type="primary" @click="onEnter(value)">发送</el-button>
  </div>

</template>

<script setup>
import { ref } from 'vue'
// 向上抛出信息
const value = defineModel('value', { default: "" });

const props = defineProps({
  onEnter:{
    type:Function,
    default:()=>{}
  }
});

 
</script>

<style lang='scss' scoped>
.im-enter-arrow{
  height: 52px;
}
.im-enterBox-container{
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  .im-enterBox-send{
   align-self: flex-end;
  }
}
</style>
