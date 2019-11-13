import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import {registerMicroApps,runAfterFirstMounted, setDefaultMountApp, start} from 'qiankun';
import fetch from 'isomorphic-fetch';
let app = null;

let count = 0;
let count1 = 0;
function render({ appContent, loading }) {
  if(appContent === undefined){
    count1++
    console.log("为空执行了",count1)
  }else{
    count++
    console.log("不为空执行了",count)
  }
  /*examples for vue*/
  if (!app && appContent !== undefined) {
    app = new Vue({
      el: '#container',
      router,
      store,
      data() {
        return {
          content: appContent,
          loading,
        };
      },
      render(h) {
        return h(App, {
          props: {
            content: this.content,
            loading: this.loading,
          },
        });
      },
    });
  } else if(app == null && appContent !== undefined){
    app.content = appContent;
    app.loading = loading;
  }
}

function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix);
}

render({ loading: true });

// 支持自定义获取请参阅: https://github.com/kuitos/import-html-entry/blob/91d542e936a74408c6c8cd1c9eebc5a9f83a8dc0/src/index.js#L163
const request = url =>
  fetch(url, {
    referrerPolicy: 'origin-when-cross-origin',
  });


//注册子应用
registerMicroApps(
  [
    { name: 'vue sub-app1', entry: '//localhost:7100', render, activeRule: genActiveRule('/sub-app1') },
    { name: 'vue sub-app2', entry: '//localhost:7101', render, activeRule: genActiveRule('/sub-app2') },
    // { name: 'vue admin', entry: '//localhost:9428', render, activeRule: genActiveRule('/admin') },
  ],
  {
    beforeLoad: [
      app => {
        console.log('before load', app);
      },
    ],
    beforeMount: [
      app => {
        console.log('before mount', app);
      },
    ],
    afterUnmount: [
      app => {
        console.log('after unload', app);
      },
    ],
  },
  {
    fetch: request,
  },
);

/**
 * @description 设置哪个子应用程序在主加载后默认处于活动状态
 * @param defaultAppLink: string 跳转链接
 */
setDefaultMountApp('/sub-app1');

/**
 * @description 第一个应用构建完成后执行
 * @param 要执行的函数
 */
runAfterFirstMounted(() => console.info('first app mounted'));

/**
 * @description 启动主应用
 * @param prefetch 是否在第一次安装子应用程序后预取子应用程序的资产,默认为 true
 * @param jsSandbox 是否启用沙盒，当沙盒启用时，我们可以保证子应用程序是相互隔离的,默认为 true
 * @param singular 是否在一个运行时只显示一个子应用程序，这意味着子应用程序将等待挂载，直到卸载之前,默认为 true
 * @param fetch 设置一个fetch function,默认为 window.fetch
 */
start();
// start({ prefetch: true, fetch: request });

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
