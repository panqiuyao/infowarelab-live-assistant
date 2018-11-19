<template>
	<div v-if="pages>1" class="pages">

		<span @click="gopages(1)" v-if="thispage != 1">首页</span><span @click="gopages(thispage-1)"  v-if="thispage != 1"><</span>
	
		<template  v-if="pages<10" class="page">
				<span v-for="(item,index) in pages"  @click="gopages(item)" :class='{ active : thispage == item}' >{{item}}</span>
		</template>
		
		<template  v-else>

			<template  v-if="thispage<5">
				<span v-for="(item,index) in 10"  @click="gopages(item)" :class='{ active : thispage == item}' >{{item}}</span>
			</template>
			<template  v-else-if="thispage < pages -5">
				<span v-for="(item,index) in thispage+5"  @click="gopages(item)" v-if="item+5 >= thispage" :class='{ active : thispage == item}' >{{item}}</span>
			</template>

			<template  v-else>
				<span v-for="(item,index) in pages"  @click="gopages(item)" v-if="item+10 >= pages" :class='{ active : thispage == item}' >{{item}}</span>
			</template>

		</template>
		


<!--
		<span v-for="(item,index) in pages"  @click="gopages(item)" :class='{ active : thispage == item}' v-if="item >=thispage && item <=thispage+10" >
			{{item}}
		</span>
-->
		<span @click="gopages(thispage+1)"  v-if="thispage != pages">></span><span @click="gopages(pages)"  v-if="thispage != pages">尾页</span>



		
	</div>

</template>

<script>
	
export default {
	name:'pagesCom',
    props: ['total','pagessize','thispage',],
    data(){
    	return {
    		
    	}
    },
    computed:{
    		pages(){
    			return Math.ceil(this.total/this.pagessize)
    		}
    },
     mounted(){
      this.init()

  },
  methods:{
      init(){

      },
      gopages(e){
      	this.thispage = e;
      }
  }

}
</script>

<style scoped>
.pages { text-align: center; }	
.pages span { display: inline-block; width: 30px; height: 30px; line-height: 30px; border: 1px solid #dcdcdc; text-align: center;  margin: 0 1px; border-radius: 2px; cursor: pointer; font-size:12px; color: #7b7b7b;}
.pages .page {display: inline-block;}
.pages span:hover { color: #00c694; border-color: #00c694; }
.pages span.active{ background: #00c694; color: #fff; border-color: #00c694;}
</style>>