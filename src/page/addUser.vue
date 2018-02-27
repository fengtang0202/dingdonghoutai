<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="登录名" prop="name">
      <el-input v-model="ruleForm.name" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="昵称"  prop="linkMan">
      <el-input v-model="ruleForm.sname" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="密码"  prop="tel">
      <el-input type="password" v-model="ruleForm.password" auto-complete="off" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {add_user} from '../api/url'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          name:'',
          sname:'',
          password:'',
          checkPass:''
        },
        rules: {
          name:[
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          sname:[
            { required: true, message: '请输入昵称', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, message: '请输入密码', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //调用接口
            delete this.ruleForm.checkPass
            this.$http({
              url:add_user,
              method:'post',
              params:{
                ...this.ruleForm
              }
            }).then(data=>{
              if(data.data.status==1000){
                this.$message({message:'添加用户成功',type:'success'});
              }else{
                this.$message({message:'添加失败',type:'warning'})
              }
            })
          } else {
            this.$message.error('添加用户失败!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handlePreview(file){
        //通过file.response 来接受服务器返回的数据
        console.log(file.response)
      },
      handleChange(state){
        this.ruleForm.isCommend=state
      }
    }
  }
</script>
