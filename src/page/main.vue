<template>
     <el-container>
       <el-header>
         <div class="logo">
            叮咚车评后台
         </div>
         <div class="info">
            <span>欢迎,{{userName}}</span>
         </div>
       </el-header>
       <el-container>
         <el-aside width="200px">
           <navComponent></navComponent>
         </el-aside>
         <el-container>
           <el-main>
             <router-view>
             </router-view>
           </el-main>
         </el-container>
       </el-container>
     </el-container>
</template>
<script>
  import navComponent from '@/components/navComponent'
    export default {
         components:{
           navComponent
         },
      data(){
           return{
             userName:''
           }
       },
      created(){
           this.userName=localStorage.getItem("info")
      }
    }
</script>

<style scoped>
   .logo{
     font-size: 30px;
     line-height: 60px;
     font-family: "Microsoft YaHei";
   }
   .info{
     line-height: 60px;
     margin-left:80%;
   }
   .el-container{
     height:100%;
   }
  .el-header,.el-footer {
    background-color: #242f42;
    display: flex;
    color:#fff;
    flex-direction: row;
  }
  .el-aside {
    background-color:#324157;
    height:100%;
  }
  .el-main {
    height:100%;
  }
</style>
