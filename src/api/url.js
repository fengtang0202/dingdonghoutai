//admin 用户管理
const api="http://47.104.150.166:8090/admin/"
// const api="/admin/"
const user_login=`${api}sys`
const update_psd=`${api}manager/updatePsd`
const add_user=`${api}manager/add`
const del_user=`${api}manager/delete/`
const get_user=`${api}manager/get`
const user_list=`${api}manager/list`
//product 产品模块
const get_product_list=`${api}product/list`
const del_product=`${api}product/delete/`
const update_product=`${api}product/update`
const add_product=`${api}product/add`
const get_product=`${api}product/get/`
//资讯
const get_news_list=`${api}info/list`
const del_news=`${api}info/delete/`
const add_news=`${api}info/add`
const update_news=`${api}info/update`
const get_news=`${api}info/get/`
//广告
const adv_list=`${api}ad/list`
const del_adv=`${api}ad/delete/`
const add_adv=`${api}ad/add`
const update_adv=`${api}ad/update`
//视频
const video_list=`${api}video/list`
const del_video=`${api}video/delete/`
const update_video=`${api}video/update`
const add_video=`${api}video/add`
//企业
const company_list=`${api}company/list`
const del_company=`${api}company/delete/`
const update_company=`${api}company/update`
const add_company=`${api}company/add`
const all_company=`${api}company/allCompany`
//品牌
const brand_list=`${api}brand/list`
const del_brand=`${api}brand/delete/`
const update_brand=`${api}brand/update`
const add_brand=`${api}brand/add`
const all_brand=`${api}brand/allBrand`
//图片上传
const upload_img=`${api}img/upload`
const update_img=`${api}img/update`
const del_img=`${api}img/delete`
//导航
const all_class=`${api}class/allPclass/`
const add_class=`${api}class/add/`
const del_class=`${api}class/delete/`
const update_class=`${api}class/update/`
//公共变量
let params={pageSize:this.pageSize,currentPage:this.currentPage,isDel:0}
module.exports={
  user_login,
  update_psd,
  add_user,
  del_user,
  get_user,
  user_list,
  get_product_list,
  del_product,
  get_product,
  update_product,
  add_product,
  get_news_list,
  del_news,
  add_news,
  update_news,
  get_news,
  adv_list,
  del_adv,
  add_adv,
  update_adv,
  video_list,
  del_video,
  update_video,
  add_video,
  company_list,
  del_company,
  update_company,
  add_company,
  all_company,
  brand_list,
  del_brand,
  update_brand,
  add_brand,
  all_brand,
  upload_img,
  update_img,
  del_img,
  all_class,
  add_class,
  del_class,
  update_class,
  params
}
