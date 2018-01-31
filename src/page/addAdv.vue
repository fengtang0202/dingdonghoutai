<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="广告类型" prop="type">
      <el-select v-model="ruleForm.type" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="广告标题" prop="title">
      <el-input v-model="ruleForm.title" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="广告链接"  prop="adLink">
      <el-input v-model="ruleForm.adLink" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="广告图片" style="margin-bottom: 60px;">
      <el-upload
        class="upload-demo"
        drag
        :limit="limit"
        list-type="picture-card"
        :action="upload_img"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        multiple>
        <i class="el-icon-upload"></i>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {add_adv,upload_img,del_img} from '../api/url'
  export default {
    data() {
      return {
        ruleForm: {
          type:'',
          title: '',
          imgUrl: '',
          content: '',
          adLink:'',
        },
        upload_img:upload_img,
        limit:1,
        options: [{
          value: 1,
          label: '首页核心大图'
        }, {
          value: 2,
          label: '资讯核心大图'
        }, {
          value: 3,
          label: '人物核心大图'
        }],
        value: '',
        rules: {
          type:[
            { required: true, message: '选择广告分类', trigger: 'change' },
          ],
          title:[
            { required: true, message: '请输入广告标题', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入产品名称', trigger: 'blur' },
            { min: 3, max:20, message: '长度在 20 个字符之内', trigger: 'blur' }
          ],
          adLink: [
            { required: true,message: '请输入广告链接', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //调用接口
            this.$http({
              url:add_adv,
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
      handleSuccess(file){
        //通过file.response 来接受服务器返回的数据
        this.ruleForm.imgUrl=file.url
        console.log(this.ruleForm.imgUrl)
      },
      handleRemove(){
        this.$http({
          url:del_img,
          method:'post',
          params:{
            imgName:this.ruleForm.imgUrl
          }
        }).then(data=>{
          console.log(data)
        })
      },
      handleChange(state){
        this.ruleForm.isCommend=state
      }
    }
  }
</script>
