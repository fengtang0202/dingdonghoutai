<template>
  <el-container >
    <el-container style="text-align:center">
      <el-table max-height="700"  :data="tableData"  border style="margin-bottom:40px;width:100%">
        <el-table-column  type="selection"></el-table-column>
        <el-table-column prop="title" label="资讯标题" width="100">
        </el-table-column>
        <el-table-column prop="author" label="作者" width="100">
        </el-table-column>
        <el-table-column prop="addTime"  label="添加的时间" width="100">
        </el-table-column>
        <el-table-column prop="clickNum" :formatter="formatSex" label="点击量" width="100">
        </el-table-column>
        <el-table-column  label="是否外链" width="80">
          <template  slot-scope="scope">
            <el-checkbox  @change="handleChange" :checked="scope.row.isCommend==1?true:false"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="outlinkUrl" label="外部链接" width="80">
        </el-table-column>
        <el-table-column prop="isCommend"  label="是否推荐" width="80">
          <template  slot-scope="scope">
            <el-checkbox :checked="scope.row.isCommend==1?true:false"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="isHot" label="是否热点" width="70">
          <template  slot-scope="scope">
            <el-checkbox  :checked="scope.row.isCommend==1?true:false"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column  label="操作">
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
          :total="totalCount">
        </el-pagination>
      </el-footer>
    </el-container>

    <!--编辑-->
    <el-dialog :model="selectTable" :visible.sync="dialogFormVisible"  :before-close="handleClose">
      <el-form>
        <el-form-item label="资讯标题" :label-width="formLabelWidth">
          <el-input v-model="selectTable.title"  style="width:80%;" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资讯配图" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            :action="upload_img"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :file-list="filelist"
            list-type="picture" style="width:80%;">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item  label='点击量' :label-width="formLabelWidth">
          <!--<el-input v-model="" label="点击量" style="width:80px;"></el-input>-->
          <el-input-number v-model="selectTable.clickNum"></el-input-number>
          <el-checkbox  label="推荐"  border @change="handleChange" :checked="selectTable.isCommend==1?true:false" ></el-checkbox>
          <el-checkbox  label="外部链接"  border  :checked="selectTable.isOutlink==1?true:false" ></el-checkbox>
          <el-checkbox  label="热点"  border  :checked="selectTable.isHot==1?true:false" ></el-checkbox>
        </el-form-item>
        <el-form-item label="资讯描述" :label-width="formLabelWidth">
          <el-input v-model="selectTable.description" style="width:80%;" type="textarea" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="资讯内容" :label-width="formLabelWidth">
          <el-input v-model="selectTable.content" style="width:80%;" type="textarea" :rows="4"></el-input>
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
  import {get_news_list,del_news,update_news,upload_img} from '../api/url'
  import {formatDate} from '../api/filters'
  export default {
    data() {
      return {
        tableData:[],
        selectTable:[],
        pageSize:5,
        pageSizes:[5,10],
        totalCount:0,
        currentPage:1,
        productId:'',
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '100px',
        upload_img:upload_img,
        imgUrl:{},
        filelist:[{url:''}],
        isCommend:false,
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
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      getProductList(method,params={pageSize:this.pageSize,currentPage:this.currentPage,isDel:0}){
        this.$http({
            url:get_news_list,
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
      //编辑资讯
      handleUpdate(data){
        this.dialogFormVisible = false
        data.isCommend=this.isCommend
        data.isCommend=data.isCommend?1:0
        data.imgUrl=this.imgUrl
        delete data.addTime
        // delete data.content
        this.$http({
          method:'post',
          url:update_news,
          data:{
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
      handleChange(state){
        this.isCommend=state?1:0
        console.log(this.isCommend)
      },
      //删除news
      handleDelete(data,index) {
        this.$confirm('删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index,1)
          let pid=data.id
          this.$http({
            url:del_news+pid
          }).then(data=>{
            console.log(data.data)
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
      //取消编辑
      handleCancel(){
        this.dialogFormVisible = false
        this.getProductList('post')
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
      handleRemove(file,fileList) {
      // console.log(file.response)
       delete this.imgUrl[file.response.uploadedImageUrl]
        console.log(this.imgUrl)
      },
      handleSuccess(file) {
        this.imgUrl[file.uploadedImageUrl]=file.uploadedImageUrl
        for(item of this.imgUrl){
             this.filelist["url"]=item
        }
        console.log(this.imgUrl)
      }
    }
  }
</script>
<style>
</style>
