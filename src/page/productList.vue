<template>
  <el-container >
    <el-container style="text-align:center">
      <el-table :data="tableData"  header-align="center" border   size="medium" style="margin:40px auto;width:45%">
      <el-table-column  header-align="center" type="selection"></el-table-column>
      <el-table-column  header-align="center" prop="id" label="产品ID" width="70">
      </el-table-column>
      <el-table-column header-align="center" prop="name" label="产品名称" width="120">
      </el-table-column>
      <el-table-column  header-align="center" prop="price" label="产品价格" width="100">
      </el-table-column>
    <!--<el-table-column header-align="center" label="产品图" width="120">-->
      <!--<template  slot-scope="scope">-->
        <!--<img :src="scope.row.imgUrl" alt="" style="width:80px;height:60px;">-->
      <!--</template>-->
    <!--</el-table-column>-->
    <el-table-column header-align="center" label="是否推荐" width="80">
       <template  slot-scope="scope">
         <el-checkbox  v-model="scope.row.isCommend==1?true:false"></el-checkbox>
       </template>
    </el-table-column>
    <el-table-column header-align="center" label="操作" >
      <template  slot-scope="scope">
        <el-button size="small" @click="handleEdit(scope.row,scope.$index)">编辑</el-button>
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
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="selectTable.name"  style="width:80%;" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品图片" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            :action="upload_img"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            list-type="picture-card"
            :file-list="this.imgUrlObj" style="width:80%;">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品价格" :label-width="formLabelWidth">
            <el-input v-model="selectTable.price"  style="width:100px;"></el-input>
            <el-checkbox  label="是否推荐" @change="handleChange" :checked="selectTable.isCommend==1?true:false" ></el-checkbox>
        </el-form-item>
        <el-form-item>
          <quill-editor v-model="selectTable.content">
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel(selectTable)">取 消</el-button>
        <el-button type="primary" @click="handleUpdate(selectTable)">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import {get_product_list,del_product,update_product,upload_img,del_img} from '../api/url'
  var qs = require('qs');
  export default {
    data() {
      return {
        tableData:[],
        selectTable:{},
        pageSize:5,
        pageSizes:[5,10,15,20],
        totalCount:0,
        currentPage:1,
        productId:'',
        selectIndex:'',
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '100px',
        upload_img:upload_img,
        del_img:del_img,
        imgUrlObj:[],
        isCommend:false
      }
    },
    created(){
      this.getProductList()
    },
    methods:{
      getProductList(params={pageSize:this.pageSize,currentPage:this.currentPage,isDel:0}){
        this.$http({
            url:get_product_list,
            method:'post',
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
        this.$confirm('放弃修改')
          .then(()=> {
           done()
          })
          .catch(_ => {})
        this.getProductList()
      },
      //修改产品
      handleUpdate(data){
        data.isCommend=this.isCommend
        data.isCommend=data.isCommend?1:0
        data.imgUrlObj=JSON.stringify(this.imgUrlObj)
        this.dialogFormVisible = false
        this.$http.post(
          update_product,
          qs.stringify({
            ...data
          }),{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        ).then(data=>{
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
        }).then(()=>{
          this.getProductList()
        })
      },
      //编辑button
      handleEdit(data,index) {
        this.selectTable = data
        this.dialogFormVisible = true
        this.imgUrlObj=this.tableData[index].imgUrlObj
      },
      //isCommend
      handleChange(state){
         this.isCommend=state?1:0
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
            url:del_product+pid
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
      //取消修改
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
      handleRemove(file,fileList) {
        this.imgUrlObj=fileList
      },
      handleSuccess(file,fileList) {
        // this.imgUrl=file.uploadedImageUrl
        // this.imgUrlObj[file.uploadedImageUrl]=file.uploadedImageUrl
        // console.log(this.imgUrlObj)
        // console.log(fileList)
        // console.log(this.imgUrlObj)
        this.imgUrlObj.push(file)
      }
    }
  }
</script>
<style>
</style>
