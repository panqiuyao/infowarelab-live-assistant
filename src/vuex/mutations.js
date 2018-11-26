



 const mutations = 
  {

      chatList(state,data){
        
        state.chatList.push(data)
       
      } ,
      myInfo(state,data){
        
        state.myInfo = data;
       
      } ,
      room(state,data){
        
        state.room = data;
       
      } ,


      webSocket(state,data){
        state.webSocket = data;
       
      }  ,
      chatInit(state,data){
        state.chatInit = data;
       
      } ,
      user(state,data){
        state.user = data;
       
      }  ,
      userNum(state,data){
        state.chat.userNum = data.userNum;
       
      }  ,
      liveStatus(state,data){
        
        state.chat.liveStatus = data;
       
      } ,

      userCurrentPage(state,data){
        state.userCurrentPage = data;
       
      } ,
      ban(state,data){
        state.room.ban = data;
       
      },
      open(state,data){
        state.room.open = data;
       
      } 
    }
 
  export default mutations