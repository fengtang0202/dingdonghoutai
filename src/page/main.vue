<template>
     <el-container>
       <el-header>

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
         }
    }
</script>

<style scoped>
   .el-container{
     height:100%;
   }
  .el-header,.el-footer {
    background-color: #242f42;
  }
  .el-aside {
    background-color:#324157;
    height:100%;
  }
  .el-main {
    height:100%;
  }
</style>
