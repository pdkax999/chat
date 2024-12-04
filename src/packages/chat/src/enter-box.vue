<template>
  <div class="im-enterBox-container">
   <div class="im-enter-arrow">
    <el-input
      v-model="content"
      style="width: 590px"
      :rows="2"
      type="textarea"
      @keydown="onHandleKeydown"
    />
   </div>
    <el-button class="im-enterBox-send"  type="primary" @click="onEnter(value)">发送(S)</el-button>
  </div>

</template>

<script setup>
import { ref } from 'vue'
// 向上抛出信息
const content = defineModel('value', { default: "" });

const props = defineProps({
  onEnter:{
    type:Function,
    default:()=>{}
  }
});

// 检测当键盘按下
const onHandleKeydown = (event)=>{
  
   if (event.keyCode == 13) {
      //其他阻止换行
      if (!event.ctrlKey) {
          // 阻止事件默认行为并向上抛出事件
          props.onEnter(content.value);
          event.preventDefault();
        } else {
          // ctrl + enter 组合键添加换行符号
          content.value += "\n";
        }
      }    
}

 
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
   box-sizing: border-box;
   height: auto;
   transform: translateX(-20px);
  }
  .im-enter-arrow{
    ::v-deep textarea{
      outline: none;
      border: none;
      resize: none;
      box-shadow: none;
      background:#EFEFEF;
      color: #000;
      font-size: 14px;
     
    }
  }
}
</style>
