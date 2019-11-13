import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled,
  localSave,
  localRead
} from '@/libs/util'
import { saveErrorLogger } from '@/api/data'
import router from '@/router'
// routers.js负责系统默认的路由配置
import routers from '@/router/routers'
// menus.js负责菜单相关的路由配置
import menus from '@/router/menus'
import config from '@/config'
const { homeName } = config

const closePage = (state, route) => {
    const nextRoute = getNextRoute(state.tagNavList, route)
    state.tagNavList = state.tagNavList.filter(item => {
        return !routeEqual(item, route)
    })
    router.push(nextRoute)
}

/**
 * 过滤单个路由菜单
 * @param menu
 * @param permission
 */
const filterMenu = (menu,permission) =>{
    // console.log(permission);//['菜单一览','菜单一览1','菜单一览3']
    // debugger
  if(menu.children){
    //菜单存在 children
    for (let i=0;i<menu.children.length;i++) {
      let tag = filterMenu(menu.children[i],permission);
      if(tag === false){
          // 如果 单个菜单删除 一条
          menu.children.splice(i,1);
          i--
      }
    }
    if(menu.children.length===0){
        return false
    }
  }else if ( !permission || permission.indexOf(menu.name) === -1){
     return false;
  }
}

/**
 * 过滤整个路由菜单
 * @param menus
 * @param permission
 */
const filterMenus = (menus,permission) =>{
    for (let i = 0; i < menus.length; i++) {
        let tag = filterMenu(menus[i],permission);
        if(tag === false){
            menus.splice(i,1)
            i--
        }
    }
    return menus;
}


export default {
  state: {
      //面包屑导航 列表
      breadCrumbList: [],
      tagNavList: [],
      homeRoute: {},
      local: localRead('local'),
      errorList: [],
      hasReadErrorPage: false,
      //该属性为 当前用户所能访问的路由配置，并将其初始为系统默认路由配置；
      permission:routers,
  },
  getters: {
      // 做到了菜单树内容和 permission状态 绑定
      // side-menu菜单树内容是由app.js里的menuList这个getter来控制，
      // 所以调整menuList这个getter，使其基于permission生成菜单列表，
    menuList: (state, getters, rootState) => getMenuByRouter(state.permission, rootState.user.access),
    errorCount: state => state.errorList.length
  },
  mutations: {
    setPermission (state, {name , permission}) {
        if(name ==='super_admin'){
            // 最高权限，拥有所有菜单
            state.permission = routers.concat(menus);
        }else{
            let newMenus = Object.assign([],menus)
            let filteredMenus = filterMenus(newMenus,permission)
            state.permission = routers.concat(filteredMenus)
        }
    },
  /**
   * @description 存储面包屑导航列表
   * @param state
   * @param route 为当前路由对象
   */
    setBreadCrumb (state, route) {
        // debugger
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute (state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    setTagNavList (state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
      let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    closeTag (state, route) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      closePage(state, route)
    },
    addTag (state, { route, type = 'unshift' }) {
      let router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal (state, lang) {
      localSave('local', lang)
      state.local = lang
    },
    addError (state, error) {
      state.errorList.push(error)
    },
    setHasReadErrorLoggerStatus (state, status = true) {
      state.hasReadErrorPage = status
    },

  },
  actions: {
    addErrorLog ({ commit, rootState }, info) {
      if (!window.location.href.includes('error_logger_page')) commit('setHasReadErrorLoggerStatus', false)
      const { user: { token, userId, userName } } = rootState
      let data = {
        ...info,
        time: Date.parse(new Date()),
        token,
        userId,
        userName
      }
      saveErrorLogger(info).then(() => {
        commit('addError', data)
      })
    }
  }
}
