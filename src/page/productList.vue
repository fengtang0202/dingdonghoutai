<template>
  <el-container >
    <el-container style="text-align:center">
      <el-table :data="tableData"  header-align="center" border max-height=""  size="medium " style="margin-bottom:40px;width:100%">
      <el-table-column  header-align="center" type="selection"></el-table-column>
      <el-table-column  header-align="center" prop="id" label="产品ID" width="70">
      </el-table-column>
      <el-table-column header-align="center" prop="name" label="品牌名称" width="120">
      </el-table-column>
      <el-table-column  header-align="center" prop="price" label="产品价格" width="100">
      </el-table-column>
    <el-table-column header-align="center" label="产品图" width="120">
      <template scope="scope">
        <img :src="scope.row.imgUrl" alt="" style="width:80px;height:60px;">
      </template>
    </el-table-column>
    <el-table-column header-align="center" prop="content" label="产品内容">
    </el-table-column>
    <el-table-column header-align="center" label="是否推荐" width="50">
       <template scope="scope">
         <el-checkbox  :checked="scope.row.isCommend==1?true:false"></el-checkbox>
       </template>
    </el-table-column>
    <el-table-column header-align="center" label="操作" width="200">
      <template scope="scope">
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
      <el-form >
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="selectTable.name"  style="width:80%;" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品图片" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="[{name:'',url:selectTable.imgUrl}]"
            list-type="picture" style="width:80%;">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品价格" :label-width="formLabelWidth">
            <el-input v-model="selectTable.price"  style="width:100px;"></el-input>
            <el-checkbox  label="是否推荐"  border  :checked="selectTable.isCommend==1?true:false" ></el-checkbox>
        </el-form-item>
        <el-form-item label="产品内容" :label-width="formLabelWidth">
          <el-input v-model="selectTable.content" style="width:80%;" type="textarea" :rows="4"></el-input>
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
  import {get_product_list,del_product,update_product} from '../api/url'
  let params={pageSize:this.pageSize,currentPage:this.currentPage,isDel:0}
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
      }
    },
    created(){
       this.getProductList(params,'post')
    },
    methods:{
      getProductList(params=null,method){
        this.$http({
            url:get_product_list,
            method:method ,
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
      },
      //修改产品
      handleUpdate(data){
        this.dialogFormVisible = false
        this.$http({
          method:'post',
          url:update_product,
          params:{
            ...data
          }
        }).then(data=>{
          console.log(data)
        })
      },
      //编辑button
      handleEdit(data,index) {
        this.selectTable = data
        this.dialogFormVisible = true
        this.selectedIndex=index
        // sessionStorage.setItem("selectDetail",JSON.stringify(data))
      },
      //isCommend
      handleChange(a){
        a=this.$refs.isCommend.checked
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
        // this.tableData.splice(this.selectedIndex,1,JSON.parse(sessionStorage.getItem('selectDetail')))
        this.getProductList(params,'post')
      },
      handleSizeChange(val) {
        this.pageSize=val
        let params={currentPage:this.currentPage,pageSize:this.pageSize,isDel:0}
        this.getProductList(params,'post')
      },
      handleCurrentChange(val) {
        this.currentPage=val
        let params={currentPage:val,pageSize:this.pageSize,isDel:0}
        this.getProductList(params,'post')
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>
<style>
</style>
