



 const mutations = 
  {

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
       
      } ,
      user(state,data){
        state.user = data;
       
      }  ,
      userCurrentPage(state,data){
        state.userCurrentPage = data;
       
      } 
    }
 
  export default mutations