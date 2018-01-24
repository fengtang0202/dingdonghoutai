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
    <el-form-item label="资讯内容"  prop="context">
      <el-input v-model="ruleForm.context" style="width:217px;"></el-input>
    </el-form-item>
      <el-form-item label="资讯图片">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple :on-preview="handlePreview">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    <el-form-item label="html路径"  prop="filePath">
      <el-input v-model="ruleForm.filePath" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="html文件夹"  prop="htmlFolder	">
      <el-input v-model="ruleForm.htmlFolder" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item>
      <el-checkbox label="是否推荐" v-model="ruleForm.isCommend" @change="handleChange(ruleForm.isCommend)"></el-checkbox>
      <el-checkbox label="是否外部链接" v-model="ruleForm.isOutlink" @change="handleChange(ruleForm.isOutlink)"></el-checkbox>
      <el-checkbox label="是否热点" v-model="ruleForm.isHot" @change="handleChange(ruleForm.isHot)"></el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {add_news} from '../api/url'
  export default {
    data() {
      return {
        ruleForm: {
          classId:'',
          title: '',
          author:'',
          description:'',
          context:'',
          imgUrl: '',
          filePath:'',
          htmlFolder:'',
          isOutlink:false,
          outlinkUrl:'',
          isCommend:false,
          isHot:false
        },
        options: [{
          value: "王霞",
        }, {
          value: "方旖旎",
        }, {
          value: "聂明晶",
        }],
        nav:[
          {
            value:1,
            label:'体育'
          },
          {
            value:2,
            label:'影视',
          },
          {
            value:3,
            label:'娱乐'
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
            this.$http({
              url:add_news,
              method:'post',
              params:{
                // ...this.ruleForm
                classId:this.ruleForm.classId,
                title:this.ruleForm.title,
                author:this.ruleForm.author,
                description:this.ruleForm.description,
                context:this.ruleForm.content,
                imgUrl:'',
                filePath:this.ruleForm.filePath,
                htmlFolder:this.ruleForm.htmlFolder,
                isOutlink:this.ruleForm.isOutlink?1:0,
                outlinkUrl:this.ruleForm.outlinkUrl,
                isHot:this.ruleForm.isHot?1:0,
                isCommend:this.ruleForm.isCommend?1:0
              }
            }).then(data=>{
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
