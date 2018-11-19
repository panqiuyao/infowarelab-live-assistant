



 const actions =
    {
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
      user(self,data){
        $.ajax({
          url: publicModel.data.ajax.user.url,
          type: 'GET',
          dataType: 'json',
          data: {
            confid:data.data.confid,
            currentPage:data.data.currentPage
          },
        })
        .done(function(retust) {
          data.data.load.close()
          self.commit('user',retust)
          self.commit('userCurrentPage',retust.page.currentPage)
        })
        .fail(function() {
          console.log("error");
        })
        

      }

    }


 
  export default actions