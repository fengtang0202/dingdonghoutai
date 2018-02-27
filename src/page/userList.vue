<template>
  <el-container >
    <el-container style="text-align:center;">
      <el-table :data="tableData"  header-align="center" border  height="400px;"  size="medium " style="width:70%;margin:20px auto">
        <el-table-column  header-align="center" type="selection"></el-table-column>
        <el-table-column  header-align="center" prop="id" label="用户ID" width="70">
        </el-table-column>
        <el-table-column  header-align="center" prop="name" label="用户名" >
        </el-table-column>
        <el-table-column header-align="center" label="操作" width="200">
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
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="selectTable.name"  style="width:300px;"></el-input >
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="selectTable.password"  style="width:300px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleUpdate(selectTable)">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import {user_list,del_user,update_psd,del_img,upload_img} from '../api/url'
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
        imgUrlObj:'',
        del_img:del_img,
        upload_img:upload_img,
        limit:1,
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
      }
    },
    created(){
      this.getProductList('post')
    },
    methods:{
      getProductList(method,params={pageSize:this.pageSize,currentPage:this.currentPage,isDel:0}){
        this.$http({
            url:user_list,
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
        this.$confirm('放弃修改？')
          .then(()=> {
            done()
          })
          .catch(_ => {});
        this.getProductList('post')
      },
      //修改产品
      handleUpdate(data){
        this.dialogFormVisible = false
        let uid=data.id
        let pwd=data.password
        this.$http({
          method:'get',
          url:`${update_psd}/${uid}/${pwd}`,
        }).then(data=>{
          if(data.data.status==1000)
          {
            this.$message({type:'success',message:'修改成功'})
          }else{
            this.$message({type:'err',message:'修改失败'})
          }
        })
      },
      //编辑button
      handleEdit(data,index) {
        this.selectTable = data
        this.dialogFormVisible = true
        this.imgUrlObj=data.imglogoUrl
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
            url:del_user+pid
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
      handleSizeChange(val) {
        this.pageSize=val
        let params={currentPage:this.currentPage,pageSize:this.pageSize,isDel:0}
        this.getProductList('post',params)
      },
      handleCancel(){
        this.dialogFormVisible = false
        this.getProductList('post')
      },
      handleCurrentChange(val) {
        this.currentPage=val
        let params={currentPage:val,pageSize:this.pageSize,isDel:0}
        this.getProductList('post',params)
      }
    }
  }
</script>
<style>
</style>
