
 const store = new Vuex.Store({
   state: { 
      chat:{
          id:publicModel.data.id,
          name:publicModel.data.name,
          status:publicModel.data.status,
          statusValue:publicModel.data.statusValue,
          userNum:publicModel.data.userNum,
          chatTime:publicModel.data.chatTime,
      },
      chatList:[],
      myInfo:{},
      webSocket:null,
      chatInit:false,
      

    },
    getters:{
      chatTime(state){
        setTimeout(function(){
          if(state.chat.status == 1){
            state.chat.chatTime++ 
          }
        },1000)
        return publicModel.fun.formatSeconds(state.chat.chatTime)

      } 
    },
    mutations:{

      chatList(state,data){
        
        state.chatList.push(data)
       
      } ,
      myInfo(state,data){
        
        state.myInfo = data;
       
      } ,
      webSocket(state,data){
        state.webSocket = data;
       
      }  ,
      chatInit(state,data){
        state.chatInit = data;
       
      } 
    },
    actions:{



      myInfo(self,data){
        self.commit('myInfo',data.data)
       
      } ,

      chatList(self,data){
        self.commit('chatList',data.data)
       
      } ,
      webSocket(self,data){
        self.commit('webSocket',data.data)
       
      } ,
      chatInit(self,data){
        self.commit('chatInit',data.data)
       
      } ,

    }

 })

 
  export default store