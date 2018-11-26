



 const actions =
    {
      myInfo(self,data){
        self.commit('myInfo',data.data)
       
      } ,
      
      room(self,data){
        self.commit('room',data.data)
       
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
      userNum(self,data){
        self.commit('userNum',data.data)
       
      } ,
      liveStatus(self,data){
        self.commit('liveStatus',data.data)
       
      } ,
      user(self,data){
        $.ajax({
          url: publicModel.data.ajax.user.url,
          type: 'POST',
          dataType: 'json',
          data: {
            site:publicModel.data.site,
            confid:publicModel.data.id,
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
        

      },
      ban(self,data){
        var values = 0;
        if(data.data.data){
           values = 1;
        }
        $.ajax({
          url: publicModel.data.ajax.ban.url,
          type: 'POST',
          dataType: 'json',
          data: {
            site:publicModel.data.site,
            confId:publicModel.data.id,
            values:values,
          },
        })
        .done(function(retust) {
          if(retust.data == 'ok' && retust.code == '1'){


                 self.commit('ban',data.data.data)
  
                  if(data.data.data){

                    data.data.vue.$message({
                      message: '聊天室禁言',
                      type: 'success'
                    });
                   }else{

                    data.data.vue.$message({
                      message: '聊天室取消禁言',
                      type: 'error'
                    });
                   }

          }else{
                    data.data.vue.$message({
                      message: '操作失败',
                      type: 'error'
                    });
          }
        })
        .fail(function() {
          console.log("error");
        })

  


      },
      open(self,data){
        var values = 0;
        if(data.data.data){
           values = 1;
        }
        $.ajax({
          url: publicModel.data.ajax.open.url,
          type: 'POST',
          dataType: 'json',
          data: {
            site:publicModel.data.site,
            confId:publicModel.data.id,
            values:values,
          },
        })
        .done(function(retust) {
          if(retust.data == 'ok' && retust.code == '1'){


                 self.commit('open',data.data.data)
  
                  if(data.data.data){

                    data.data.vue.$message({
                       message: '聊天室已打开',
                      type: 'success'
                    });
                   }else{

                    data.data.vue.$message({
                      message: '聊天室已关闭',
                      type: 'error'
                    });
                   }

          }else{
                    data.data.vue.$message({
                      message: '操作失败',
                      type: 'error'
                    });
          }
        })
        .fail(function() {
          console.log("error");
        })

  


      }

    }


 
  export default actions