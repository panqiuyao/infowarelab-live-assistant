<template>
  <div class="left" > 
      <div v-for="item in nav" class="item" >
       
        <router-link :to=item.to > <i class="iconpng"  :class=item.className  ></i>{{item.name}}</router-link>
      </div>

  </div>
</template>

<script>
export default {
  name: 'left',
  data () {
    return {
      nav:[
        {
          name:'聊天室',
          to:'/chat',
          className:'icon-chat',
        },
        {
          name:'参加者',
          to:'/user',
          className:'icon-user',
        }
      ],
    }
  }
}
</script>


<style scoped>
.left { width: 205px; position: absolute; left:0; bottom: 0; top:80px; background: #f5f5f7; border-right: 1px solid  #eaeaea;  }
.left .item { display: block; width: 100%; height: 40px; line-height: 40px; border-bottom: 1px solid  #eaeaea; text-align: left; color:#696969; }
.left .item a { color: #696969; display: block; width: 100%; height: 40px; }
.left .item a.router-link-active { background: #00c694; color: #fff; }
.left .item  .iconpng { margin:5px; }
.left .item:hover {  background: #f0f0f2;}
</style>
