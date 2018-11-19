<template>
  <div id="app">
    
      <headerCom></headerCom>  
      <leftCom></leftCom> 

    <transition :name="transitionName">
      <router-view class="child-view scrollbar" ></router-view>
    </transition>

  </div>
</template>

<script>

import headerCom from './components/public/header.vue'; 
import leftCom from './components/public/left.vue'; 



export default {
  name: 'App',
  components:{headerCom,leftCom},
  data(){
    return{
      transitionName: 'slide-left',
      currentPath:this.$route.path,
    }
  },
  watch:{
    '$route' (to, from) {
       if(to.meta.index >= from.meta.index){
        //设置动画名称
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.child-view {
  position: absolute;
  left: 205px;
  top: 80px;
  right: 0;
  bottom: 0;
  overflow: hidden;
  overflow-y:auto;
      padding: 20px;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}



.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
