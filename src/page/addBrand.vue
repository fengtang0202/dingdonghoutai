<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="企业名称" prop="companyId">
      <el-select v-model="ruleForm.companyId" placeholder="请选择">
        <el-option
          v-for="(item,key) in options"
          :key="item"
          :label="item"
          :value="key">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="品牌名称" prop="name">
      <el-input v-model="ruleForm.name" placeholder="请输入品牌名称" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="品牌logo" style="margin-bottom: 50px">
      <el-upload
        class="upload-demo"
        drag
        :action="upload_img"
        list-type="picture-card"
        :limit="limit"
        multiple :on-success="handleSuccess"
        :on-remove="handleRemove">
        <i class="el-icon-upload"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="品牌简介"  prop="description">
      <el-input v-model="ruleForm.description" type="textarea"  style="width:350px;"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {add_brand,all_company,upload_img,del_img} from '../api/url'
  export default {
    data() {
      return {
        ruleForm: {
          name:'',
          description:'',
          companyId:'',
          imglogoUrl:''
        },
        limit:1,
        upload_img:upload_img,
        options:null,
        rules: {
          companyId:[
            { required: true, message: '请输入企业名称', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' }
          ]
        }
      };
    },
    created(){
       this.$http({
          url:all_company
       }).then(data=>{
           this.options=data.data.companyMap
       })
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
           this.ruleForm.imglogoUrl=this.imgUrl
          if (valid) {
            //调用接口
            this.$http({
              url:add_brand,
              method:'post',
              params:{
                ...this.ruleForm
              }
            }).then(data=>{
              if(data.data.status==1000){
                this.$message({message:'添加成功',type:'success'});
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
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      handleSuccess(file){
        //通过file.response 来接受服务器返回的数据
          this.imgUrl=file.url
        console.log(this.imgUrl)
      },
      handleRemove(){
        this.$http({
          url:del_img,
          method:'post',
          params:{
            imgName:this.imgUrl
          }
        }).then(data=>{
          console.log(data)
        })
      }
    }
  }
</script>
