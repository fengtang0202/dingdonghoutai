<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="企业名称" prop="name">
      <el-input v-model="ruleForm.name" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="企业联系人"  prop="linkMan">
      <el-input v-model="ruleForm.linkMan" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="联系电话"  prop="tel">
      <el-input v-model="ruleForm.tel" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="企业邮箱"  prop="mail">
      <el-input v-model="ruleForm.mail" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="企业地址"  prop="address">
      <el-input v-model="ruleForm.address" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="企业网址"  prop="companyUrl">
      <el-input v-model="ruleForm.companyUrl" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="企业描述" prop="description">
      <el-input v-model="ruleForm.description" type="textarea"  autosize style="width:600px;"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {add_company} from '../api/url'
  export default {
    data() {
      return {
        ruleForm: {
          name:'',
          description:'',
          linkMan:'',
          tel:'',
          mail:'',
          address:'',
          companyUrl:''
        },
        rules: {
          name:[
            { required: true, message: '请输入企业名称', trigger: 'blur' }
          ],
          description:[
            { required: true, message: '请输入企业描述', trigger: 'blur' }
          ],
          linkMan: [
            { required: true, message: '请输入企业联系人', trigger: 'blur' }
          ],
          tel: [
            { required: true, type:'',message: '请输入联系电话', trigger: 'blur' }
          ],
          mail: [
            { required: true,type:'email', message: '请输入正确的企业邮箱', trigger: 'blur' }
          ],
           address: [
            { required: true,message: '请输入企业地址', trigger: 'blur' }
          ],
          companyUrl: [
            { required: true,message: '请输入企业网址', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //调用接口
            this.$http({
              url:add_company,
              method:'post',
              params:{
                ...this.ruleForm
              }
            }).then(data=>{
              if(data.data.status==1000){
                this.$message({message:'添加产品成功',type:'success'});
              }else{
                this.$message({message:'添加失败',type:'warning'})
              }
            })
          } else {
            this.$message.error('添加产品失败!');
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
