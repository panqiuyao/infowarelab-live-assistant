<template>
  <div class="userlist" ref="userlist">
  
  <div class="top">
    <span><i class="iconpng icon-aga"></i>禁言</span>
    <span><i class="iconpng icon-del"></i>删除</span>
  </div>

<el-dialog
  :title.sync="dialogTitle"
  :visible.sync="dialogVisible"
  width="30%"
  center
  :before-close="handleClose">
  <span>{{dialogCon}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>



  <div class="table">
      
      <div class="tr">
          <div class="th"><el-checkbox  v-model="checkAll" @change="handleCheckAllChange"></el-checkbox></div>
          <div class="th">姓名</div>
          <div class="th">手机号</div>
          <div class="th">终端类型</div>
          <div class="th">操作</div>
      </div>
      <div class="tr" v-for="(item,index) in list">
          <div class="td"><el-checkbox v-model="item.check"  @change="checkchange(item.id,index)"></el-checkbox></div>
          <div class="td">{{item.name}}</div>
          <div class="td">{{item.phone}}</div>
          <div class="td">{{item.terminal}}</div>
          <div class="td">
              <el-button @click="gag(item)" size="small"><span v-if="item.aga">取消</span><span v-else>禁言</span></el-button>
              <el-button　@click="del(item)" size="small">删除</el-button>
          </div>

      </div>

  </div>

    <div class="mar-top-20">
      <pagesCom :total=total :thispage=thispage :pagessize=pagessize></pagesCom>
    </div>

  </div>
</template>

<script>
  import pagesCom from './public/pages.vue';
  console.log(pagesCom)
export default {
  name: 'user',
  components:{pagesCom},
  data () {
    return {
      total:1001,
      pagessize:1,
      thispage:1,
      checkAll: false,
      listCheck:[],
      list:[{
          id:'1',
          name:'刘明',
          aga:true,
          check:false,
          phone:'18612345678',
          terminal:'windows 网页',
        },
        {
          id:'2',
          name:'刘明1',
          aga:false,
          check:false,
          phone:'18612345678',
          terminal:'windows 网页',
        },
        {
          id:'3',
          name:'刘明1',
          aga:false,
          check:false,
          phone:'18612345678',
          terminal:'windows 网页',
        },
        {
          id:'4',
          name:'刘明1',
          aga:false,
          check:false,
          phone:'18612345678',
          terminal:'windows 网页',
        },
        {
          id:'5',
          name:'刘明1',
          aga:false,
          check:false,
          phone:'18612345678',
          terminal:'windows 网页',
        },
        {
          id:'11',
          name:'刘明6',
          aga:false,
          check:false,
          phone:'18612345678',
          terminal:'windows 网页',
        } ],
      page:100,
      currentPage: 1,
      pagesize: 10,
      dialogVisible: false,
      dialogTitle:'禁言',
      dialogCon:'您是否禁言',
      dialogType:'',
      dialogData:{},

    }
  },
  watch:{
  },
  computed:{
  },
  mounted(){
      this.init()

  },
  methods:{
      init(){

      },
      handleCheckAllChange(val) {
          console.log(val)
          console.log(this.checkAll)
          for(var i=0,len =  this.list.length;i<len;i++){
            this.list[i].check = this.checkAll;
          }
      },
      checkchange(value,index) {
        var lenNum = this.listCheck.indexOf(value);
        if(lenNum>-1){
            this.listCheck.splice(lenNum,1);
            this.checkAll = false;

        }else{
          this.listCheck.push(value);
           if(this.listCheck.length == this.list.length) {this.checkAll = true;}
        }
      //  console.log(e)
       // console.log(value)
        //  console.log(this.listCheck.indexOf(value))
       // this.listCheck.push(value)
       // console.log(this.listCheck)
     //   this.listCheck.push(value)
    //    let checkedCount = value.length;
     //   this.checkAll = checkedCount === this.cities.length;
      //  this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },

    
      gag(val){
        //禁言
        if(val.aga){

          this.dialogTitle = '取消禁言';
          this.dialogCon = '用户'+val.name+'将会被取消禁言';

        }else{
          this.dialogCon = '禁言';
          this.dialogCon = '用户'+val.name+'将会被禁言';

        }
        this.dialogType   = 'aga';
        this.dialogData   = val;
        this.dialogVisible = true;
      },
      del(val){
        //删除
        
          this.dialogCon = '删除用户';
          this.dialogCon = '用户'+val.name+'将会被提出聊天室';
        this.dialogType   = 'del';
        this.dialogData   = val;
        　　this.dialogVisible = true;

      },
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }

  }
}
</script>

<style scoped>
.top { height: 35px; line-height: 35px; color: #fff; background: #00c694; text-align: left; padding-left: 10px; }
.top span { float: left; margin-right: 5px; cursor: pointer; }
.top span .iconpng { margin: 2px 0 2px; position: relative; left:2px;  }
</style>
