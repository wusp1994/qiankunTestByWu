import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import menus from './menus'
import childApps from './childApps'
let allMenus = routes.concat(menus)
import store from '@/store'
// import iView from 'iview'
import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util'
import config from '@/config'
import routers from "@/router/routers";
const { homeName } = config


Vue.use(Router)
const router = new Router({
    routes:allMenus,
    mode: 'history',
    base: process.env.BASE_URL,
})
const LOGIN_PAGE_NAME = 'login'

//静态权限遗留,可不用
// const turnTo = (to, access, next) => {
//     //permission 该属性为当前用户所能访问的路由配置。
//     //对比iview-admin的内容由固定routes 存储在vuex中的合并后的 路由对象
//   if (canTurnTo(to.name, access, store.state.app.permission)) next(); // 有权限，可访问
//   else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
// }

//路由白名单之：子应用路径
const subApp_ROUTE = ['/sub-app1']


router.beforeEach((to, from, next) => {
  // iView.LoadingBar.start()
  const path = to.path;
  const token = getToken()
  // console.log(to,"=====路由对象")
  // if(subApp_ROUTE){
  //   next();
  // }
  if(token && to.name === undefined){
    //已登录，子页面以及未知页面
    next() // 跳转
  } else if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
  // 已登录 要跳转的 页面不是 登录页面
      if (store.state.user.hasGetInfo) {
        // 已经含有用户信息
        // vuex 中state的user 模块 hasGetInfo 为true
      // turnTo(to, store.state.user.access, next) //静态权限遗留,可不用
          next()
    } else {
      // 不含有 用户信息 ，请求获取用户相关信息
      //dispatch：与commit()作用相同 含有异步操作， 例如向后台提交数据，写法： this.$store.dispatch('mutations方法名',值)
      store.dispatch('getUserInfo').then(user => {
        // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
       // turnTo(to, user.access, next)   //静态权限遗留,可不用
          next();
      }).catch(() => {
        setToken('')
        next({
          name: 'login'
        })
      })
    }
  }
})

router.afterEach(to => {
  //根据当前跳转的路由设置显示在浏览器标签的title
  setTitle(to, router.app)
  // iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
