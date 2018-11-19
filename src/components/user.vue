<template>
  <div class="userlist" ref="userlist">

  <div class="table">
      
      <div class="tr">
          <div class="th" width="33.33%">姓名</div>
          <div class="th" width="33.33%">手机号</div>
          <div class="th" width="33.33%">终端类型</div>
      </div>
      <div class="tr" v-for="(item,index) in list">
          <div class="td">{{item.name}}</div>
          <div class="td">{{item.cellPhone}}</div>
          <div class="td">{{item.os}}</div>

      </div>

  </div>

    <div class="mar-top-20">
      <pagesCom :total=total :thispage=thispage :pagessize=pagessize v-on:onchangepage="onchangepage"></pagesCom>
    </div>

  </div>
</template>

<script>
  import pagesCom from './public/pages.vue';


export default {
  name: 'user',
  components:{pagesCom},
  data () {
    return {
      loadPopup:'',   //加载属性
    }
  },
  watch:{
  },
  computed:{
      total(){
        return this.$store.state.user.page.totalRecords
      },
      pagessize(){
        return this.$store.state.user.page.everyPage
      },
      thispage(){
        return this.$store.state.user.page.currentPage
      },
      list(){
        return this.$store.state.user.content
      }

  },
  mounted(){
      this.init()

  },
  methods:{
      init(){
        var self = this;

        self.loadPopup = self.$loading({ background:'rgba(0,0,0,.5)',text:'正在加载中'});

        self.$store.dispatch({type:'user',data:{confid:publicModel.data.id,currentPage:self.$store.state.userCurrentPage,load:self.loadPopup}})
    

      },
      onchangepage:function(e){
        var self = this;

        self.loadPopup = self.$loading({ background:'rgba(0,0,0,.5)',text:'正在加载中'});

        self.$store.dispatch({type:'user',data:{confid:publicModel.data.id,currentPage:e,load:self.loadPopup}})

      }

  }
}
</script>

<style scoped>
</style>
