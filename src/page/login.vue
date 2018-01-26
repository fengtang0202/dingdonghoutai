<template>
   <div>
     <el-input v-model="uname"  placeholder="请输入用户名"></el-input>
     <el-input v-model="pwd" placeholder="请输入密码"></el-input>
     <el-button type="success" @click="login">登录</el-button>
   </div>
</template>

<script>
  import{user_login,get_product_list} from '../api/url'
  import {requestList} from '../api/request'
  export default {
    data(){
      return{
        uname:'',
        pwd:'',
        id:1,
      }
    },
    methods:{
      login(){
        this.$http({
          url:`${user_login}/${this.uname}/${this.pwd}`,
          method:'get',
        }).then(data=>{
           if(data.data.admin){
             this.$router.push('/main')
           }
        })
      },
      // handleClick(){
      //   requestList(get_product_list)
      // }
    }
  }
</script>
