<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="导航类型" prop="classId">
      <el-select v-model="ruleForm.classId" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="视频标题" prop="title">
      <el-input v-model="ruleForm.title" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="视频描述"  prop="description">
      <el-input v-model="ruleForm.description" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="视频链接"  prop="linkUrl">
      <el-input v-model="ruleForm.linkUrl" style="width:217px;"></el-input>
    </el-form-item>
    <el-form-item label="分享代码"  prop="shareCode">
      <el-input type="textarea"  :autosize="{ minRows: 4, maxRows:16}" v-model="ruleForm.shareCode" style="width:400px;"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {add_video} from '../api/url'
  export default {
    data() {
      return {
        ruleForm: {
          classId:'',
          title: '',
          description:'',
          linkUrl: '',
          shareCode:'',
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
           classId:[{ required: true, message: '选择导航分类', trigger: 'change' },
          ],
          title:[
            { required: true, message: '请输入视频标题', trigger: 'blur' },
          ],
          description: [
            { required: true, message: '请输入视频描述', trigger: 'blur' },
          ],
          linkUrl: [
            { required: true,message: '请输入视频链接', trigger: 'blur' }
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
              url:add_video,
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
