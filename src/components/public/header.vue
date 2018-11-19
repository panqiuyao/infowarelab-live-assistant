<template>
  <div class="header">
      <div class="top">
       
            <div class="info f-left">
                <div class="item name f-left fc-fff">{{ this.$store.state.chat.name}}</div>
                <div class="item status f-left fc-000">{{ this.$store.state.chat.statusValue}}</div>
            </div>
            <div class="timeInfo f-right  fc-fff">
                <div class="item time f-left">直播时长:{{ this.$store.getters.chatTime}}</div>
                <div class="item num f-left">当前参与人数 {{ this.$store.state.chat.userNum}}</div>
            </div>
       
    
      </div>
      <div class="bottom">
          <label class="label">开放功能：</label>
          <el-checkbox v-model="chatChecked" >聊天室</el-checkbox>
          <el-checkbox v-model="chatSpeakChecked">禁言</el-checkbox>
         <!-- <el-checkbox v-model="checked">问答</el-checkbox>
          <el-checkbox v-model="checked">问卷</el-checkbox>
          <el-checkbox v-model="checked">资料下载</el-checkbox>-->
      </div>
  </div>
</template>

<script>
export default {
  name: 'headerCom',
  data () {
    return {
        chatChecked:true,
        chatSpeakChecked:true,
    }
  },
  watch:{
      chatChecked(){
         if(this.chatChecked){

          this.$message({
            message: '聊天室已打开',
            type: 'success'
          });
         }else{

          this.$message({
            message: '聊天室关闭成功',
            type: 'error'
          });
         }


      },
      chatSpeakChecked(){
         if(this.chatSpeakChecked){

          this.$message({
            message: '聊天室全部禁言',
            type: 'success'
          });
         }else{

          this.$message({
            message: '聊天室取消禁言',
            type: 'error'
          });
         }
      }
  },
  computed:{

  },
  mounted(){
      this.init()

  },
  methods:{
      init(){

      },

  }

}
</script>


<style scoped>
.header { width: 100%; height: 79px; position: absolute; left: 0; top:0; background: #fafafa; border-bottom: 1px solid #eaeaea;  }
.header .top { width: 100%; height: 40px; line-height: 40px; background: #00c694;  }
.header .top .info .item {  margin-left: 20px; }
.header .top .timeInfo .item {  margin-right: 20px; }
.header .bottom { line-height: 39px; text-align: left; }
.label { margin-left: 20px; }
</style>
