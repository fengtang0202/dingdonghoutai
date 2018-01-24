<template>
  <el-row>
  <el-col>
    <el-menu default-active="1" background-color="#324157"
             text-color="#bfcbd9"
             active-text-color="#20a0ff">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>产品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="jumpToProductList">产品列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="1-2" @click="jumpToAddProduct">产品添加</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>资讯管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" @click="jumpToNewsList">资讯列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="2-2" @click="jumpToAddNew">资讯添加</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" @click="jumpToAdvList">广告列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="3-2" @click="jumpToAddAdv">广告添加</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>视频管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1" @click="jumpToVideoList">视频列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="4-2" @click="jumpToAddVideo">视频添加</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>企业管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1" @click="jumpToCompanyList">企业列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="5-2" @click="jumpToAddCompany">企业添加</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>品牌管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="6-1" @click="jumpToBrandList">品牌列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="6-2" @click="jumpToAddBrand">品牌添加</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="10">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="10-1" @click="jumpToUserList">用户列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
  </el-row>
</template>

<script>
    export default {
      methods:{
        jump(url){
           this.$router.push(url)
        },
        jumpToProductList(){
          this.jump('/productList')
        },
        jumpToNewsList(){
          this.jump('/newsList')
        },
        jumpToAddProduct(){
          this.jump('/addProduct')
        },
        jumpToAdvList(){
          this.jump('/advList')
        },
        jumpToVideoList(){
          this.jump('/videoList')
        },
        jumpToUserList(){
          this.jump('/userList')
        },
        jumpToAddVideo(){
          this.jump('/addVideo')
        },
        jumpToAddNew(){
          this.jump('/addNew')
        },
        jumpToAddAdv(){
          this.jump('/addAdv')
        },
        jumpToCompanyList(){
          this.jump('/companyList')
        },
        jumpToAddCompany(){
          this.jump('/addCompany')
        },
        jumpToBrandList(){
          this.jump('/brandList')
        },
        jumpToAddBrand(){
          this.jump('/addBrand')
        }
      }
    }
</script>

<style scoped>

</style>
