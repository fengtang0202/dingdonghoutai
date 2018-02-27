<template>
  <el-container >
    <el-container style="text-align:center;">
      <el-table :data="tableData" header-align="center" border height="100%"  size="medium " style="width:80%;margin:20px auto">
        <el-table-column  header-align="center" type="selection"></el-table-column>
        <el-table-column  header-align="center" prop="id" label="ID" width="70">
        </el-table-column>
        <el-table-column  header-align="center" prop="title" label="标题" width="100">
        </el-table-column>
        <el-table-column header-align="center" label="广告图" >
          <template  slot-scope="scope">
            <img :src="scope.row.imgUrl" alt="" style="width:80px;height:60px;">
          </template>
        </el-table-column>
        <el-table-column header-align="center" prop="adLink" label="广告链接" width="100">
        </el-table-column>
        <el-table-column header-align="center" label="操作">
          <template  slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-footer>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total='totalCount'>
        </el-pagination>
      </el-footer>
    </el-container>

    <!--编辑-->
    <el-dialog :model="selectTable" :visible.sync="dialogFormVisible"  :before-close="handleClose">
      <el-form>
        <el-form-item label="广告分类" :label-width="formLabelWidth">
          <el-select v-model="selectTable.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告标题" :label-width="formLabelWidth">
          <el-input v-model="selectTable.title"  style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="产品图片" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            :action="upload_img"
            :limit='limit'
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :file-list="[{url:selectTable.imgUrl}]"
            list-type="picture-card" style="width:80%;">
            <el-button size="small" type="primary">点击上传</el-button>
            <div  slot-scope="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="广告链接" :label-width="formLabelWidth">
          <el-input v-model="selectTable.adLink"  style="width:300px;"></el-input>
        </el-form-item>
      </el-form>
      <div  scope="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleUpdate(selectTable)">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import {adv_list,del_adv,update_adv,upload_img,del_img} from '../api/url'
  export default {
    data() {
      return {
        tableData:[],
        selectTable:[],
        pageSize:10,
        pageSizes:[10],
        totalCount:0,
        currentPage:1,
        productId:'',
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '100px',
        limit:1,
        imgUrl:'',
        upload_img:upload_img,
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
      }
    },
    created(){
      this.getProductList()
    },
    methods:{
      getProductList(method,params={pageSize:this.pageSize,currentPage:this.currentPage,isDel:0}){
        this.$http({
            url:adv_list,
            method:"post" ,
            params:{
              ...params
            }
          }
        ).then(data=>{
          this.tableData=data.data.resultList
          this.totalCount=data.data.totalCount
        })
      },
      //close dialog
      handleClose(done) {
        this.$confirm('放弃修改？')
          .then(()=> {
            done()
          })
          .catch(_ => {});
      },
      //修改产品
      handleUpdate(data){
        this.dialogFormVisible = false
        // this.data.imgUrl=this.imgUrl
        this.$http({
          method:'post',
          url:update_adv,
          params:{
            ...data
          }
        }).then(data=>{
          if(data.data.status==1000){
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }else{
            this.$message({
              message:'修改失败',
              type:'error'
            })
          }
        })
      },
      //编辑button
      handleEdit(data,index) {
        this.selectTable = data
        this.dialogFormVisible = true
      },
      handleDelete(data,index) {
        this.$confirm('删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index,1)
          let pid=data.id
          this.$http({
            url:del_adv+pid
          }).then(data=>{
            if(data.data.status==1000){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.totalCount--
              this.getProductList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleCancel(){
        this.dialogFormVisible = false
        this.getProductList()
      },
      handleSizeChange(val) {
        this.pageSize=val
        let params={currentPage:this.currentPage,pageSize:this.pageSize,isDel:0}
        this.getProductList(params)
      },
      handleCurrentChange(val) {
        this.currentPage=val
        let params={currentPage:val,pageSize:this.pageSize,isDel:0}
        this.getProductList(params)
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
<style>
</style>
