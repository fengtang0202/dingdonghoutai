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
      meta: {
        requireAuth: true,
      },
      children:[
        {
          path:'/',
          component:productList,
          meta: {
            requireAuth: true,
          },
        },
        {
          path:'/videoList',
          component:videoList,
          meta: {
            requireAuth: true,
          },
        },
        {
          path:'/newsList',
          component:newsList,
          meta: {
            requireAuth: true,
          },
        },
        {
          path:'/productList',
          component:productList,
          meta: {
            requireAuth: true,
          },
        },
        {
          path:'/advList',
          component:advList,
          meta: {
            requireAuth: true,
          },
        },
        {
          path:'/addProduct',
          component:addProduct,
          meta: {
            requireAuth: true,
          },
        },
        {
          path:'/userList',
          component:userList,
          meta: {
            requireAuth: true,
          },
        },
        {
          path:'/addVideo',
          component:addVideo,
          meta: {
            requireAuth: true,
          },
        },
        {
          path:'/addNew',
          component:addNew,
          meta: {
            requireAuth: true,
          },
        },{
          path:'/addAdv',
          component:addAdv,
          meta: {
            requireAuth: true,
          },
        },{
          path:'/companyList',
          component:companyList,
          meta: {
            requireAuth: true,
          },
        },{
          path:'/addCompany',
          component:addCompany,
          meta: {
            requireAuth: true,
          },
        },
        {
          path:'/brandList',
          component:brandList,
          meta: {
            requireAuth: true,
          },
        },{
          path:'/addBrand',
          component:addBrand,
          meta: {
            requireAuth: true,
          }
        }
      ]
    }
  ]
})
