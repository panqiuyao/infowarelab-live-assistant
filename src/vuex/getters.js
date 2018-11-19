



 const getters =
    {
      chatTime(state){
        setTimeout(function(){
          if(state.chat.status == 1){
            state.chat.chatTime++ 
          }
        },1000)
        return publicModel.fun.formatSeconds(state.chat.chatTime)
      } 
    }

 
  export default getters