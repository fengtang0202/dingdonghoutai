<template>
  <el-container >
    <el-container style="text-align:center;">
      <el-table :data="tableData" header-align="center" border max-height=""  size="medium " style="width:60%;margin:20px auto">
        <el-table-column  header-align="center" type="selection"></el-table-column>
        <el-table-column label="ID" prop="id" header-align="center" width="80"></el-table-column>
        <el-table-column header-align="center" label="视频标题" width="120">
             <template slot-scope="scope">
               <a :href="url+scope.row.id">{{scope.row.title}}</a>
             </template>
        </el-table-column>
        <el-table-column  header-align="center" prop="linkUrl" label="视频链接" width="150">
        </el-table-column>
        <el-table-column  label="添加的时间" header-align="center" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.addTime|formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" prop="clickNum" label="点击量" width="100">
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
        <el-form-item label="视频分类" :label-width="formLabelWidth">
          <el-select v-model="selectTable.classId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频描述" :label-width="formLabelWidth">
          <el-input v-model="selectTable.description"  style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="视频链接" :label-width="formLabelWidth">
          <el-input v-model="selectTable.linkUrl"  style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="分享代码" :label-width="formLabelWidth">
          <el-input v-model="selectTable.shareCode"  style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="点击量" :label-width="formLabelWidth">
          <el-input-number v-model="selectTable.clickNum" label="描述文字"></el-input-number>
        </el-form-item>
      </el-form>
      <div   scope="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleUpdate(selectTable)">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import {video_list,del_video,update_video} from '../api/url'
  import {formatDate} from '../api/filters'
  export default {
    data() {
      return {
        tableData:[],
        selectTable:[],
        pageSize:5,
        pageSizes:[5,10,15,20],
        totalCount:0,
        currentPage:1,
        productId:'',
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '100px',
        url:'/m/videoDetails?id=',
        options: [{
          value: 2,
          label: '评测'
        }],
      }
    },
    created(){
      this.getProductList('post')
    },
  filters:{
    formatDate(time){
      var data = new Date(time);
      return formatDate(data,'yyyy-MM-dd');
    }
  },
    methods:{
      getProductList(method,params={pageSize:this.pageSize,currentPage:this.currentPage,isDel:0}){
        this.$http({
            url:video_list,
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
        delete data.addTime
        this.$http({
          method:'post',
          url:update_video,
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
      //isCommend
      handleChange(a){
        a=this.$refs.isCommend.checked
      },
      handleCancel(){
        this.dialogFormVisible = false
        this.getProductList('post')
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
            url:del_video+pid
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
      handleCurrentChange(val) {
        this.currentPage=val
        let params={currentPage:val,pageSize:this.pageSize,isDel:0}
        this.getProductList('post',params)
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
