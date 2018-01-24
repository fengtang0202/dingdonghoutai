//admin 用户管理
const api="http://1720334v9d.iask.in/admin/"
const user_login=`${api}sys`
const update_psd=`${api}manager/updatePsd`
const add_user=`${api}manager/add`
const del_user=`${api}manager/delete`
const get_user=`${api}manager/get`
//product 产品模块
const get_product_list=`${api}product/list`
const del_product=`${api}product/delete/`
const update_product=`${api}product/update`
const add_product=`${api}product/add`
//资讯
const get_news_list=`${api}info/list`
const del_news=`${api}module/delete/`
const add_news=`${api}info/add`
const update_news=`${api}info/update`
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
//品牌
const brand_list=`${api}brand/list`
const del_brand=`${api}brand/delete/`
const update_brand=`${api}brand/update`
const add_brand=`${api}brand/add`
//公共变量
let params={pageSize:this.pageSize,currentPage:this.currentPage,isDel:0}
module.exports={
  user_login,
  update_psd,
  add_user,
  del_user,
  get_user,
  get_product_list,
  del_product,
  update_product,
  add_product,
  get_news_list,
  del_news,
  add_news,
  update_news,
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
  brand_list,
  del_brand,
  update_brand,
  add_brand,
  params
}
