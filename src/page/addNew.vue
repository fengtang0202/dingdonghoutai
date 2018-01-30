<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="导航" prop="classId">
      <el-select v-model="ruleForm.classId" placeholder="请选择">
        <el-option
          v-for="item in nav"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="作者" prop="author">
      <el-select v-model="ruleForm.author" placeholder="请选择作者">
        <el-option v-for="item in options" :key='item.value' :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="资讯标题"  prop="title">
      <el-input v-model="ruleForm.title" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="资讯描述"  prop="description">
      <el-input v-model="ruleForm.description" style="width:217px;"></el-input>
    </el-form-item>
      <el-form-item label="资讯图片" style="margin-bottom: 60px;width:40%;">
        <el-upload
          class="upload-demo"
          drag
          list-type="picture-card"
          :action="upload_img"
          multiple :on-success="handleSuccess"
          :on-remove="handleRemove">
          <i class="el-icon-upload"></i>
        </el-upload>
      </el-form-item>
    <el-form-item>
      <el-checkbox label="是否推荐"  v-model="ruleForm.isCommend" ></el-checkbox>
      <el-checkbox label="是否外部链接" v-model="ruleForm.isOutlink" ></el-checkbox>
      <el-checkbox label="是否热点" v-model="ruleForm.isHot"></el-checkbox>
    </el-form-item>
    <el-form-item style="position: absolute;top:78px;right:10%;">
      <quill-editor v-model="ruleForm.content" ref="myQuillEditor">
      </quill-editor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {add_news,upload_img,del_img} from '../api/url'
  var qs = require('qs');
  export default {
    data() {
      return {
        ruleForm: {
          classId:'',
          title: '',
          author:'',
          description:'',
          content:'',
          imgUrl: '',
          filePath:'',
          htmlFolder:'',
          isOutlink:false,
          outlinkUrl:'',
          isCommend:false,
          isHot:false
        },
        //图片上传的state
        deleteImg:'',
        del_img:del_img,
        imgs:[],
        upload_img:upload_img,
        options: [{
          value: "王霞",
        }, {
          value: "方旖旎",
        }, {
          value: "聂明晶",
        },
          {
            value:"姜汝宽"
          }
        ],
        nav:[
          {
            value: 9,
            label: '创业路'
          }, {
            value: 10,
            label: '前言访谈'
          }
        ],
        value: '',
        rules: {
          classId:[
            { required: true, message: '选择导航分类', trigger: 'change' },
          ],
          title:[
            { required: true, message: '选择输入资讯标题', trigger: 'blur' },
          ],
          author: [
            { required: true, message: '请选择作者', trigger: 'change' },
          ],
          description: [
            { required: true,message: '请填描述信息', trigger: 'blur' }
          ],
          imgUrl: [
            { required: true, message: '选择要上传的图片', trigger: 'change' }
          ],
          content: [
            {  required: true, message: '请填写产品的详细内容', trigger: 'blur' }
          ],
          filePath:[
            { required: true, message: '请输入html路径', trigger: 'blur' }
          ],
          htmlFolder:[
            { required: true, message: '请输入html文件夹', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //调用接口
            this.$http.post(add_news,
              qs.stringify({
                // ...this.ruleForm
                classId:this.ruleForm.classId,
                title:this.ruleForm.title,
                author:this.ruleForm.author,
                description:this.ruleForm.description,
                content:this.ruleForm.content,
                imgUrl:'',
                filePath:this.ruleForm.filePath,
                htmlFolder:this.ruleForm.htmlFolder,
                isOutlink:this.ruleForm.isOutlink?1:0,
                outlinkUrl:this.ruleForm.outlinkUrl,
                isHot:this.ruleForm.isHot?1:0,
                isCommend:this.ruleForm.isCommend?1:0
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
            console.log('error submit!!');
            this.$message.error('添加产品失败!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        console.log(formName)
      },
      handleSuccess(file){
        this.imgs.push(file)
      },
      handleRemove(file,fileList){
        //获取图片的地址
        //通过file.response 来接受服务器返回的数据
        this.deleteImg=file.response.url
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
    width:700px;
    height: 700px;
  }
</style>
