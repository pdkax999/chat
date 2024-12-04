<template>
  <div>
    <IChat :chats="chats" ref="IChat" :handleMessage="sendMessageInfo"> </IChat>
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
          title:"你好世界",
          avatar:this.getImg("../src/assets/ava_1.jpg")
        },
        {
          id: 3,
          name: "群组",
          type: "group",
          online: false,
          title:"世界你好",
          avatar:this.getImg("../src/assets/ava_2.jpg")
        },
      ],
    };
  },
  methods:{
    /* 处理发送聊天信息 */
    sendMessageInfo(message){
      const getMessage =  this.$refs.IChat.getMessage;
      // 数据源
      const random = ["革命尚未成功","同志仍需努力","这个世界是怎么样的?","你想成为什么样的人"];
      new  Promise((resolve,reject)=>{
        
        const id =  this.generateUUID()

        getMessage({...message,id,send:true})
        
        resolve(message);
      }).then((message)=>{
        // 处理接受到的消息
        let data =  structuredClone(message)
        
        const index = Date.now()%random.length;
        
        const id =  this.generateUUID()
        // 生成一条新的数据
        let newMessage = {...data,to:data.form,form:data.to,content:random[index],id}

        getMessage(newMessage)
      })
    },
  
    // 生成唯一的ID
    generateUUID() {
      const arr = new Uint8Array(16); // UUID是由16个字节组成的
      window.crypto.getRandomValues(arr); // 使用crypto API生成随机值
      // 对前几个字节进行特定的位操作以符合UUID的版本和变体要求
      arr[6] = (arr[6] & 0b01001111) | 0b01000000;
      arr[8] = (arr[8] & 0b00111111) | 0b10000000;
      // 将Uint8Array转换为十六进制字符串表示的UUID
      const uuid = arr.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
      return uuid;
    },
  }
};
</script>