import Vue from 'vue'
import Router from 'vue-router'
import login from  '@/page/login'
import main from  '@/page/main'
import newsList from '@/page/newsList'
import videoList from '@/page/videoList'
import productList from '@/page/productList'
import advList from '@/page/advList'
import addProduct from '@/page/addProduct'
import userList from '@/page/userList'
import addVideo from '@/page/addVideo'
import addNew from '@/page/addNew'
import addAdv from '@/page/addAdv'
import companyList from '@/page/companyList'
import addCompany from '@/page/addCompany'
import brandList from '@/page/brandList'
import addBrand from '@/page/addBrand'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component:login
    },
    {
      path:'/main',
      component:main,
      children:[
        {
          path:'/',
          component:productList
        },
        {
          path:'/videoList',
          component:videoList
        },
        {
          path:'/newsList',
          component:newsList
        },
        {
          path:'/productList',
          component:productList
        },
        {
          path:'/advList',
          component:advList
        },
        {
          path:'/addProduct',
          component:addProduct
        },
        {
          path:'/userList',
          component:userList
        },
        {
          path:'/addVideo',
          component:addVideo
        },
        {
          path:'/addNew',
          component:addNew
        },{
          path:'/addAdv',
          component:addAdv
        },{
          path:'/companyList',
          component:companyList
        },{
          path:'/addCompany',
          component:addCompany
        },
        {
          path:'/brandList',
          component:brandList
        },{
          path:'/addBrand',
          component:addBrand
        }
      ]
    }
  ]
})
