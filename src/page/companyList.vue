<template>
  <el-container >
    <el-container style="text-align:center;">
      <el-table :data="tableData" header-align="center" border max-height="700"  size="medium " style="margin:20px auto">
        <el-table-column  header-align="center" type="selection"></el-table-column>
        <el-table-column  header-align="center" prop="id" label="ID" width="70">
        </el-table-column>
        <el-table-column  header-align="center" prop="name" label="企业名称" width="100">
        </el-table-column>
        <el-table-column  header-align="center" prop="linkMan" label="企业联系人" width="100">
        </el-table-column>
        <el-table-column  header-align="center" prop="tel" label="联系电话" width="150">
        </el-table-column>
        <el-table-column header-align="center" prop="mail" label="企业邮箱" width="150">
        </el-table-column>
        <el-table-column header-align="center" prop="address" label="企业地址" >
        </el-table-column>
        <el-table-column header-align="center" prop="companyUrl" label="企业网址" >
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
        <el-form-item label="企业名称" :label-width="formLabelWidth">
          <el-input v-model="selectTable.name"  style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="企业联系人" :label-width="formLabelWidth">
          <el-input v-model="selectTable.linkMan"  style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="selectTable.tel"  style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="企业邮箱" :label-width="formLabelWidth">
          <el-input v-model="selectTable.mail"  style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="企业地址" :label-width="formLabelWidth">
          <el-input v-model="selectTable.address"  style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="企业网址" :label-width="formLabelWidth">
          <el-input v-model="selectTable.companyUrl"   style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="企业描述" label-width="100" >
          <el-input v-model="selectTable.description"  type="textarea" autosize style="width:600px;"></el-input>
        </el-form-item>
      </el-form>
      <div scope="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleUpdate(selectTable)">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import {company_list,del_company,update_company} from '../api/url'
  export default {
    data() {
      return {
        tableData:[],
        selectTable:[],
        pageSize:5,
        pageSizes:[10],
        totalCount:0,
        currentPage:1,
        productId:'',
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '100px',
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
      this.getProductList()
    },
    methods:{
      getProductList(params={pageSize:this.pageSize,currentPage:this.currentPage,isDel:0}){
        this.$http({
            url:company_list,
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
        this.getProductList()
      },
      //修改产品
      handleUpdate(data){
        this.dialogFormVisible = false
        this.$http({
          method:'post',
          url:update_company,
          params:{
            ...data
          }
        }).then(data=>{
          data.data.status==1000?this.$message({type:'success',message:'修改成功'}):this.$message({type:'error',message:'修改失败'})
        })
      },
      //编辑button
      handleEdit(data,index) {
        this.selectTable = data
        this.dialogFormVisible = true
      },
      //isCommend
      handleChange(a){
        a=this.$refs.isCommend.checked
      },
      handleCancel(){
        this.dialogFormVisible = false
        this.getProductList()
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
            url:del_company+pid
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
        this.getProductList(params)
      },
      handleCurrentChange(val) {
        this.currentPage=val
        let params={currentPage:val,pageSize:this.pageSize,isDel:0}
        this.getProductList(params)
      }
    }
  }
</script>
<style>
</style>
