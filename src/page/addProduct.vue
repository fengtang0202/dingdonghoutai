<template>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="产品类型">
    <el-select v-model="ruleForm.classId" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="品牌名称" prop="brandId">
    <el-select v-model="ruleForm.brandId" placeholder="请选择活动区域">
      <el-option v-for="(value,key) in brandList" :key='key' :label="value" :value="key"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="产品名称"  prop="name">
    <el-input v-model="ruleForm.name" placeholder="请输入产品名称" style="width:217px;"></el-input>
  </el-form-item>
  <el-form-item label="产品价格"  prop="price">
    <el-input v-model="ruleForm.price" placeholder="请输入产品价格" style="width:217px;"></el-input>
  </el-form-item>
  <el-form-item label="是否推荐" prop="isCommend">
     <el-checkbox v-model="ruleForm.isCommend" @change="handleChange(ruleForm.isCommend)"></el-checkbox>
  </el-form-item>
  <el-form-item label="产品图片" style="width:500px;">
    <el-upload
      class="upload-demo"
      drag
      list-type="picture-card"
      :action="upload_img"
      multiple :on-success="handleSuccess"
        :on-remove="handleRemove">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </el-form-item>
  <el-form-item style="position: absolute;top:78px;right:10%;">
    <quill-editor v-model="ruleForm.content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)">
    </quill-editor>
  </el-form-item>
  <el-form-item  label-width="120px"  style="width:100%;margin-top:80px" prop="desc">
    <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
    <el-button @click="resetForm('ruleForm')">取消</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  import {add_product,upload_img,all_brand,del_img} from '../api/url'
  var qs = require('qs');
  export default {
    data() {
      return {
        ruleForm: {
          classId:'',
          brandId:'',
          name: '',
          price: '',
          content: '',
          isCommend:false,
        },
          editorOption:{

         },
        deleteImg:'',
        //多张图片上传
        imgs:[],
          upload_img:upload_img,
          options: [
            {
            value: 6,
            label: '微型车'
            }, {
            value: 7,
            label: '乘用车'
            }, {
            value: 8,
            label: '商务车'
            }
          ],
           brandList:null,
          value: '',
        rules: {
          classId:[
            { required: true, message: '选择产品分类', trigger: 'blur' },
          ],
          brandId:[
            { required: true, message: '选择品牌分类', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入产品名称', trigger: 'blur' },
            { min: 3, max:20, message: '长度在 20 个字符之内', trigger: 'blur' }
          ],
          price: [
            { required: true,message: '请填写数字', trigger: 'change' }
          ],
          imgUrl: [
            {  required: true, message: '选择要上传的图片', trigger: 'change' }
          ],
          content: [
            {  required: true, message: '请填写产品的详细内容', trigger: 'change' }
          ]
        }
      };
    },
    created(){
      this.$http({
        url: all_brand
      }).then(data=>{
        this.brandList=data.data.brandMap
      })
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //调用接口
             this.$http.post(add_product,
              qs.stringify({
                 // ...this.ruleForm
                 classId:this.ruleForm.classId,
                 brandId:Number(this.ruleForm.brandId),
                 name:this.ruleForm.name,
                 price:this.ruleForm.price,
                 imgUrlObj:JSON.stringify(this.imgs),
                 content:this.ruleForm.content,
                 isCommend:this.ruleForm.isCommend?1:0,
               }),{
                 headers: {
                   'Content-Type': 'application/x-www-form-urlencoded',
                 },
               }
             ).then(data=>{
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
        this.imgs.push(file)
      },
      handleRemove(file,fileList){
        //获取图片的地址
        //通过file.response 来接受服务器返回的数据
        this.deleteImg=file.response.url
        // console.log(this.deleteImg)
        this.imgs=[]
        fileList.forEach(value=>{
          this.imgs.push(value.response)
        })
        this.$http({
          url:del_img,
          method:'post',
          params:{
            imgName:this.deleteImg
          }
        }).then(data=>{
          console.log(data)
        })
      },
      handleChange(state){
        this.ruleForm.isCommend=state
      },
      onEditorBlur(quill) {
        // console.log('editor blur!', quill)
        // console.log(this.ruleForm.content)
      }
    }
  }
</script>
<style scoped>
  .quill-editor {
    height: 400px;
    width:700px;
  }
  .ql-container {
    width:500px;
    height: 700px;
  }
  .el-upload-list{
    width:40%;
  }
</style>
