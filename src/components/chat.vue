<template>


  <div class="chat anm" :class="{show : putdata.visibility  , open : putdata.open}">
                    <div class="chat_con">
                        <div class="chat_main">
                            <div class="chat_page scrollbar" ref="chatPage" :class="{active : tab == 'chat'}"  id="chat_page">
                                <div class="chatPageHeight" ref="chatPageHeight" >
                                    <div class="itms clearfix flex" v-for="item in chatList" :class="{myself :item.id == myInfo.id}"><div class="name" >{{item.nickname}}</div><div class="msg" v-html="HtmlDeCode(item.msg)"></div></div>
                                </div>
                            </div>
                            <div class="user_list scrollbar" :class="{active : tab == 'user'}" >
                                <div class="itms chaochu" v-for="item in userList"><span>{{getUserName(item.nickname)}}</span>{{item.nickname}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="chat_text">
                        <textarea id="chatInput" class="chatInput"></textarea>

                          <div id="chatBtn" class="chatBtn" @click="send_msg">发送</div>
                         </div>
               </div>
</template>



<script>
    import RemoteJs from '@/components/public/loadJs'// 导入组件
export default {
  name: 'chat',
  components: {
    RemoteJs
  },
  data () {
    return {
                uid         : publicModel.data.chat.uid,         //用户id
                roomId      : publicModel.data.chat.roomId,         //房间ID
                nickname    : publicModel.data.chat.nickname,   //昵称
                appId       : publicModel.data.chat.appId,           //APPId
                appSceret   : publicModel.data.chat.appSceret,  //APP秘钥
                timestamp   : publicModel.data.chat.timestamp,     //timestamp
                ip          : publicModel.data.chat.ip,     //ip
                chatInput   : '',                       //消息框
                myInfo      : {},                             //用户信息
                userList    : [],                         //用户列表
                userNum     : 0,                            //用户量
                tab         : 'chat',                         //当前tab
                loadData    : publicModel.data.chatStaticJs,    //需要加载的ＪＳ

            putdata:{
                appId       :  publicModel.data.chat.appId,
                appSceret   :  publicModel.data.chat.appSceret,
                timestamp   :  publicModel.data.chat.timestamp,     //timestamp
                roomId      :  publicModel.data.chat.roomId,
                path        :  publicModel.data.chat.path,
                nickname    :  publicModel.data.chat.nickname,
                visibility  :  publicModel.data.chat.visibility,
                open        :  publicModel.data.chat.open,
            },
    }
  },
  computed:{
    webSocket(){ 
       return this.$store.state.webSocket
    },
    chatList(){ 
       return  this.$store.state.chatList
    }
  },
   mounted(){
      this.init()

  },
    watch: {
        chatList: function (val, oldVal) {

            this.$refs.chatPage.scrollTop = 100000000000
            setTimeout(function(){
                $('.chat_page').scrollTop(100000000000000000000)
            },500)

        }
    },
  methods:{
    init(){
        const self = this;
       
          
            self.initWebSocket();  //调用 websocket


            


            setTimeout(function(){

               $('#chatInput').wangEditor({
                        //注意，menuConfig必须是一个二维数组
                        'menuConfig': [
                            ['bold', 'underline', 'italic', 'foreColor','fontFamily', 'fontSize',],
                            [ 'insertExpression'],
                        ]
                });
                // $('.chat_page').scrollTop(100000000000000000000)
            },500)
            self.bind()
       
    },
    loadRongJs:function(){

        this.loadDataNum++;
    },
    bind:function(){
            var self = this;
            $(document).on('keyup','.wangEditor-textarea',function(e) {
                if (event.ctrlKey && event.keyCode == 13) {

                    self.send_msg();
                }
            });
        },
         encryptByDES:function(message,key) {
        // DES加密
            //把私钥转换成16进制的字符串
            var keyHex = CryptoJS.enc.Utf8.parse(key);
            //模式为ECB padding为Pkcs7
            var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            //加密出来是一个16进制的字符串
            return encrypted.toString();
        },
        //转义HTML
        HtmlEnCode:function (str) {
            var s = "";
            if (str.length == 0) return "";
            s = str.replace(/<img src="\/chatroom\/static\/source\/img\/face\//g, "[emo");
            s = s.replace(/.gif" wangeditor_img_max_width_mark="1" style="max-width: 100%;">/g, "emo]");
            s = s.replace(/&/g, "&amp;");
            s = s.replace(/</g, "&lt;");
            s = s.replace(/>/g, "&gt;");
            s = s.replace(/ /g, "&nbsp;");
            s = s.replace(/\'/g, "&#39;");
            s = s.replace(/\"/g, "&quot;");
            s = s.replace(/\n/g, "<br/>");
            return s;
        },
        //反转义HTML
        HtmlDeCode:function (str) {
            var s = "";
            if (str.length == 0) return "";
            s = str.replace(/\[emo/g, '<img src="/chatroom/static/source/img/face/');
            s = s.replace(/emo\]/g, '.gif" style="max-width: 100%;">');
            s = s.replace(/&amp;/g, "&");
            s = s.replace(/&lt;/g, "<");
            s = s.replace(/&gt;/g, ">");
            s = s.replace(/&nbsp;/g, " ");
            s = s.replace(/&#39;/g, "\'");
            s = s.replace(/&quot;/g, "\"");
            s = s.replace(/<br\/>/g, "\n");
            return s;
        },
        getUserName:function(name){
                 if (/^[\u0391-\uFFE5]+$/.test(name)){
                     return  name.substr(name.length-1,name.length);
                 } else{

                     return name.substr(0,1);
                 }
        },
        //获取在线人数
        getOnline:function () {
            var self = this;
            if (self.webSocket != null) {

                var method = "getOnLineUsers"

                var json1 = {"token":self.appId,"method":method}
                var msgStr = JSON.stringify(json1);

                msgStr = encodeURI(msgStr);
                var enmsgStr = self.encryptByDES(msgStr,self.appSceret);

                var timestamp =  self.timestamp;
                var signature = CryptoJS.MD5(self.appSceret + enmsgStr).toString();

                var requestJson = {"appId":self.appId,"timestamp":timestamp,"signature":signature,"encryptmsg":enmsgStr}
                var requestStr = JSON.stringify(requestJson);



                self.webSocket.send(requestStr);

            } else {
                alert("您已掉线，请重新进入聊天室...");
            }
        },
        upChatScrool:function(){
            //切换滚动条
            $('#chat_page')[0].scrollTop  = $('#chat_page').height();
        },
        //WebSocket初始化
        initWebSocket:function() {
            var self = this;

            // 房间名不能为空
            if (self.roomId == null || self.roomId == "") {
                alert("请输入房间名");
                return;
            }

            // 昵称不能为空
            if (self.nickname == null || self.nickname == "") {
                alert("昵称不能为空");
                return;
            }


            // 房间名不能为空
            if (self.appId == null || self.appId == "") {
                alert("请联系管理员获取appId");
                return;
            }


            // 房间名不能为空
            if (self.appSceret == null || self.appSceret == "") {
                alert("请联系管理员获取secret");
                return;
            }
            self.nickname = encodeURI(encodeURI(self.nickname));



            if ("WebSocket" in window) {
                if (self.webSocket == null) {

                    var msgJson = {"ip":self.ip};    
                    var msgStr = JSON.stringify(msgJson);

                    var enmsgStr = self.encryptByDES(msgStr,self.appSceret);    
                    var timestamp =  self.timestamp;
                    var signature = CryptoJS.MD5(self.appSceret + enmsgStr).toString();                    
                    enmsgStr = encodeURIComponent(enmsgStr);


                    var url = publicModel.data.chat.liveUrl+publicModel.data.chat.path+"/chat/" + self.roomId+"/"+self.nickname+"?timestamp="+timestamp+"&encryptmsg="+enmsgStr+"&signature="+signature+"&appId="+self.appId+"&visitUid="+self.uid;

                    // 打开一个 web socket
                        var  webSocket = new WebSocket(url);


                        self.$store.dispatch({type:'webSocket',data:webSocket,})


                } else {

                }

                self.webSocket.onopen = function () {
                    // alert("已进入聊天室，畅聊吧...");
                };


                //webSocket设了消息传送
                self.webSocket.onmessage = function (evt) {

                    var retDate = jQuery.parseJSON(evt.data);

                    if( retDate.code <= 0  ) {
                        alert(retDate.code+"==="+retDate.data);
                        if   (retDate.code=="-203")
                            self.webSocket.close();
                        return;
                    }

                    //正常流程
                    if(retDate.type =="getOnLineUsers"){

                        //获取在线人数
                        self.$store.dispatch({type:'userNum',data:{userNum:retDate.data.onlineCount}})

                    }
                    if(retDate.type =="updateRoom"){

                        //更新房间信息
                        $("#room_base").text(retDate.data);




                    }

                    if("joinRoom" == retDate.type ) {
                        //自己加入房间
                        self.$store.dispatch({type:'myInfo',data:retDate.data.user})
                        self.$store.dispatch({type:'room',data:retDate.data.room})



                        if(self.uid ==  retDate.data.user.id){
                                self.myInfo = retDate.data.user;
                        }


                        self.getOnline()

                    }
                    if( "boardcast" == retDate.type) {
                        //收到信信息
                        self.$store.dispatch({type:'chatList',data:retDate.data})
                        self.upChatScrool()

                    }

                    if( "disConnect" == retDate.type) {
                        //别人加入
                           self.getOnline()

                    }


                    if( "roomBanStatus" == retDate.type) {

                        //禁言
                        if(retDate.code == 1){


                            var msg = '聊提示已被管理员取消禁言'
                            if(retDate.data == 1 ){
                                msg = '聊提示已被管理员禁言'
                            }
                            var obJson ={
                                id:'123333333333333333',
                                msg:msg,
                                nickname:'系统消息',
                            }
                             self.$store.dispatch({type:'chatList',data:obJson})
                        }
                    }
                    if( "roomOpenStatus" == retDate.type) {
                        //聊天室状态
                        if(retDate.code == 1){

                            var msg = '聊提示已被管理员关闭'
                            if(retDate.data == 1 ){
                                msg = '聊提示已被管理员打开'
                            }
                            var obJson ={
                                id:'123333333333333333',
                                msg:msg,
                                nickname:'系统消息',
                            }

                             self.$store.dispatch({type:'chatList',data:obJson})



                        }

                    }


                    if('liveStatus' == retDate.type){

                        //直播状态
                        var data = JSON.parse(retDate.data.replace(/'/g,'"'))


                        self.$store.dispatch({type:'liveStatus',data:data.status})

                        var obJson ={
                            id:'123333333333333333',
                            msg: '直播'+self.$store.state.chat.statusValue[self.$store.state.chat.liveStatus],
                            nickname:'系统消息',
                        }
                        self.$store.dispatch({type:'chatList',data:obJson})
                        self.upChatScrool()
                    }
                };

                self.webSocket.onclose = function () {
                    // 关闭 websocket，清空信息板
                    alert("连接已关闭...");
                    self.webSocket = null;
                };

            }
            else {
                // 浏览器不支持 WebSocket
                alert("您的浏览器不支持 WebSocket!");
            }

        },
        //发消息
        send_msg:function(){

            var self = this;
            if (self.webSocket != null) {

                self.chatInput = $('.wangEditor-textarea').html().trim();

                if (self.chatInput.replace(/&nbsp;|<div>|<\/div>|<br>|<\/br>| | |　/g, "").length ==0) {
                    $('#chatInput').val('')
                    $('.wangEditor-textarea').html('')
                    self.chatInput  = ""
                    alert('不能发送空消息')
                    return;
                }

                var method="boardcast"
                var msgJson = {"uid":self.uid,"method":method,"data":self.HtmlEnCode(self.chatInput)}
                var msgStr = JSON.stringify(msgJson);


                msgStr = encodeURI(msgStr);
                var enmsgStr = self.encryptByDES(msgStr,self.appSceret);

                var timestamp =  self.timestamp;
                var signature = CryptoJS.MD5(self.appSceret + enmsgStr).toString();

                var requestJson = {"appId":self.appId,"timestamp":timestamp,"signature":signature,"encryptmsg":enmsgStr}
                var requestStr = JSON.stringify(requestJson);

                self.webSocket.send(requestStr);

                $('#chatInput').val('')
                $('.wangEditor-textarea').html('')
                self.chatInput  = ""


            } else {
                alert("您已掉线，请重新进入聊天室...");
            }
        }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
