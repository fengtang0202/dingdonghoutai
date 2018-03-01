// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from  'axios'
import store from 'vuex'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueLazyload from 'vue-lazyload'
Vue.prototype.$http=axios
Vue.use(VueQuillEditor)
Vue.use(ElementUI)
Vue.use(store)
Vue.use(VueLazyload)
Vue.config.productionTip = false

/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (localStorage.getItem("info")) {  // 通过vuex state获取当前的token是否存在或者
      next();
    }
    else {
      next({
        path: '/',
      })
    }
  }
  else {
    next();
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
