<template>
    <Layout class="main" style="height: 100%">
        <!--头部-->
        <Header class="header" theme="dark" width="auto" style="height: 54px;background-color: #0052a4;">
            <div class="logoBox">
                <img :src="logoImg" width="44px" alt="">
                <span>SGM智能软件管理平台(ISMS-V1.2)</span>
            </div>
        </Header>
        <Layout>
            <!--hide-trigger 隐藏默认触发器。 collapsible 是否可收起，collapsed-width收缩宽度，设置为 0 会出现特殊 （触发器）trigger-->
            <!--左侧导航-->
            <Sider hide-trigger
                   collapsible
                   :width="168"
                   collapsed-width="64"
                   :style="{'overflow': 'hidden'}"
                   class="left-sider" >
                <SideMenu
                        ref="sideMenu"
                        :active-name="$route.name"
                        :collapsed="collapsed"
                        :accordion="accordion"
                        @on-select="turnToPage"
                        :menu-list="menuList"
                ></SideMenu>
            </Sider>
            <!--内容区域-->
            <Content class="main-content-con">
                <Layout class="main-layout-con">
                    <!--面包屑导航-->
                    <div class="bread-crumb-wrapper">
                        <Breadcrumb :style="{fontSize:'14px'}">
                            <BreadcrumbItem
                                    v-for="item in breadCrumbList"
                                    :to="item.to"
                                    :key="`bread-crumb-${item.name}`"
                            >
                                <common-icon style="margin-right: 4px;" :type="item.icon || ''"/>
                                {{showTitle(item)}}
                            </BreadcrumbItem>
                            <!--<BreadcrumbItem to="/">Home</BreadcrumbItem>-->
                            <!--<BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>-->
                            <!--<BreadcrumbItem>Breadcrumb</BreadcrumbItem>-->
                        </Breadcrumb>
                    </div>
                    <Content class="content-wrapper">
                        <!--<router-view/>-->
                        <template v-if="!isChildApp">
                        <!--//不是子应用就调用路由-->
                            <router-view/>
                        </template>
                        <template v-show="isChildApp">
                            <!--//子应用就加载 content-->
                            <div id="router-view" v-html="content"></div>
                        </template>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </Layout>
</template>

<script>
    import SideMenu from './components/side-menu'
    import commonIcon from '@/components/common-icon'
    import { mapGetters,mapActions,mapMutations }   from 'vuex'
    import logoImg from '@/assets/img/logo.png'
    import { showTitle } from "@/libs/util";
    import routers from '@/router/routers'

    export default {
      data(){
        return {
          collapsed: false, // 默认是否左右 折叠菜单
          accordion: true, //是否开启手风琴模式，开启后，最多只能打开一个子菜单
          logoImg,
        }
    },
    props: {
        show: {
          type:Boolean,
          default(){
            return true;
          }
        },
        isChildApp: {
          type:Boolean,
          default(){
            return false;
          }
        },
        content: String,
    },
    components:{
        SideMenu,
        commonIcon
    },
    computed:{
        ...mapGetters([
          'menuList'
        ]),
        // menuList () {
        //     return this.$store.getters.menuList
        // },
        //计算需要缓存的 路由对象。
        cacheList () {
          const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
          return list
        },
        breadCrumbList () {
            // console.log(this.$store.state.app.breadCrumbList,"=====面包屑路由列表")
            return this.$store.state.app.breadCrumbList
        }
    },
    methods:{
        ...mapMutations([
            //vuex 存储面包屑导航列表
            'setBreadCrumb',
            'setHomeRoute'
        ]),
        //跳转页面
        turnToPage(route){
          console.log(route,"==============菜单选择，返回值")
          let { name, params,query} = {};

          if(typeof route === 'string'){
              name = route;
          }else{
              name = route.name;
              query = route.query;
              params = route.params;
          }
          // 如果名字里 含有 'isTurnByHref_' 字符串，就浏览器打开新窗口，跳转外连接 _ 后的内容
          if(name.indexOf('isTurnByHref_') > -1){
              window.open(name.split('_')[1]);
              return;
          }
          this.$router.push({
              name:name,
              params:params,
              query:query
          })
        },
        showTitle (item) {
          return showTitle(item, this)
        },
    },
    watch:{
        /**
         * @description 路由变化时，面包屑变化和左边导航 展开变化
         */
        // '$route'(newRoute){
        //     this.setBreadCrumb(newRoute);
        //     this.$refs.sideMenu.updateOpenName(newRoute.name)
        // }
    },
    /**
     * 在el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：
     * 用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html页面中。此过程中进行ajax交互。
     */
    mounted(){
        /**
         * @description 初始化设置面包屑导航,要想面包屑导航随动，需要 监测 路由变化做出改变
         */
        //set 首页路由对象
        this.setHomeRoute(routers);
        this.setBreadCrumb(this.$route);
        // console.log(this.show,"====测试有没有app.vue的 实例，show")
    }
  }

</script>

<style lang="scss" scoped>
 @import "main";
</style>