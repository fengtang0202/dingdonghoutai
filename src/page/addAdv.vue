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
    <el-form-item label="广告图片">
      <el-upload
        class="upload-demo"
        drag
        action="1720334v9d.iask.in/admin/upload?uploaderId=1"
        multiple :on-preview="handlePreview">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {add_adv} from '../api/url'
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
        options: [{
          value: 1,
          label: '娱乐'
        }, {
          value: 2,
          label: '体育'
        }, {
          value: 3,
          label: '影视'
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
