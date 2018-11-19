


 const state =  
    { 
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
      userCurrentPage:1,
      user:{
          "content": [
              {
                "os": "Windows 7",
                "status": 1,
                "visitType": 0,
                "creator": 1,
                "ip": "127.0.0.1",
                "id": "75a9963c58f34d689fdcb1a8f99875c4",
                "confId": "0",
                "duration": 0,
                "siteId": 1,
                "joinTime": 1542338540000,
                "name": "admin",
                "browser": "Chrome/68.0.3440.106"
              }
          ],
          "page":{
            "totalRecords": 557,
            "currentPage": 1,
            "everyPage": 8
          }

      } 
    }
 
  export default state