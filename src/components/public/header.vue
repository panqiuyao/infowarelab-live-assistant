<template>
  <div class="header">
      <div class="top">
       
            <div class="info f-left">
                <div class="item name f-left fc-fff">{{this.$store.state.chat.name}}</div>
                <div class="item status f-left fc-000">{{ this.$store.state.chat.statusValue[this.$store.state.chat.liveStatus]}}</div>
            </div>
            <div class="timeInfo f-right  fc-fff">
                <div class="item time f-left">直播时长:{{ this.$store.getters.chatTime}}</div>
                <div class="item num f-left">当前参与人数 {{ this.$store.state.chat.userNum}}</div>
            </div>
       
    
      </div>
      <div class="bottom">
          <label class="label">开放功能：</label>
          <el-checkbox v-model="open"　 @change="openFun" >聊天室</el-checkbox>
          <el-checkbox v-model="ban" 　 @change="banFun">禁言</el-checkbox>
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
    }
  },
  watch:{
  },
  computed:{
      open(){
        if(this.$store.state.room.open == 1){

          return true
        }else{

          return false
        }
        
      },
      ban(){

        if(this.$store.state.room.ban == 1){

          return true
        }else{

          return false
        }
      }
  },
  mounted(){
      this.init()

  },
  methods:{
      init(){

      },
      openFun(val){
        var self  =this;

       self.$store.dispatch({type:'open',data:{data:val,vue:this}})
      },
      banFun(val){

        var self  =this;

       self.$store.dispatch({type:'ban',data:{data:val,vue:this}})

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
