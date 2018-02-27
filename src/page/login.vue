<template>
  <el-container style="text-align: center">
  <el-form class="login"  :model="info" :rules="rules" ref="ruleForm">
    <el-form-item>
      <h1>叮咚后台管理</h1>
    </el-form-item>
     <el-form-item  prop="uname">
     <el-input v-model="info.uname"  placeholder="请输入用户名">
     </el-input>
     </el-form-item>
    <el-form-item prop="pwd">
     <el-input v-model="info.pwd"  placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
     <el-button type="success" @click="submitForm('ruleForm')">登录</el-button>
    </el-form-item>
   </el-form>
  </el-container>
</template>

<script>
  import{user_login} from '../api/url'
  import {requestList} from '../api/request'
  export default {
    data(){
      return{
        info:{
          uname:'',
          pwd:'',
        },
        rules:{
          uname: [
            { required: true,message: '请输入用户名', trigger: 'blur' }
          ],
          pwd:[
            { required: true,message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    created(){
      // console.log(requestList)
      if(localStorage.getItem("info")){
        this.$router.push('/main')
      }
      document.onkeydown=()=>{
        if (window.event.keyCode== 13) {
           this.submitForm("ruleForm")
        }
      }
    },
    methods:{
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http({
              url:`${user_login}/${this.info.uname}/${this.info.pwd}`,
            }).then(data=>{
              console.log()
              if(data.data.admin){
                this.$router.push('/main')
                localStorage.setItem("info",data.data.admin.sname)
              }
            })
          } else {
            return false;
          }
        });
      }
    }
  }
</script>
<style scoped>
    .login{
      width:250px;
      height:400px;
      position: fixed;
      margin: auto;
      top:0;
      left:0;
      right:0;
      bottom:0;
    }
</style>
