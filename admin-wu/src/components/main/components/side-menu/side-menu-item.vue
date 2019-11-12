<template>
   <Submenu :name="`${parentName}`">
       <template slot="title">
           <common-icon :type="parentItem.icon || ''"/>
           <span>{{ showTitle(parentItem)}}</span>
        </template>
       <template
                v-for="item in childrenItem">
           <!--当菜单只有一个子菜单-->
           <template v-if="item.children && item.children.length === 1">
               <!--//当菜单有子菜单，且父级菜单有showAlways为 true 的时候，为true 才调用 菜单子集组件-->
               <SideMenuItem
                       v-if="showChildren(item)"
                       :key="`menu-${item.name}`"
                       :parent-item="item"
               ></SideMenuItem>
               <!-- 菜单有只有一个子集的时候，只显示子集 -->
               <menu-item
                       v-else
                       :name="getNameOrHref(item, true)"
                       :key="`${item.children[0].name}`"
               >
                   <common-icon :type="item.icon || ''"/>
                   <span>{{ showTitle(item.children[0]) }}</span>
               </menu-item>
           </template>
           <!--当菜单有不止一个子菜单或者没有子菜单-->
           <template v-else>
               <!--1，当菜单有子菜单，且子菜单不止一个；2，菜单没有子菜单，但是 有meta 属性 showAlways 为true-->
               <SideMenuItem
                       v-if="showChildren(item)"
                       :key="`menu-${item.name}`"
                       :parent-item="item"
               >
               </SideMenuItem>
               <!--当菜单没有子菜单，且meta 属性 showAlways 为false 或者 为无-->
               <menu-item
                       v-else
                       :name="getNameOrHref(item)"
                       :key="`${item.name}`"
               >
                   <common-icon :type="item.icon || ''"/>
                   <span>{{ showTitle(item) }}</span>
               </menu-item>
           </template>
       </template>
   </Submenu>
</template>

<script>
    import CommonIcon from '_c/common-icon'
    import sideMenuItem from './side-menu-item'
    import mixin from './mixin'
    export default {
        //当菜单有子菜单，且 子菜单不止一个或者有showAlways为 true 的时候，为true;调用此组件
        name: "SideMenuItem",
        mixins:[mixin],
        components:{
            sideMenuItem,
            CommonIcon
        },
        props: {
            parentItem: {
                type: Object,
                default: () => {}
            },
            theme: String,
            iconSize: Number
        },
        computed: {
            parentName () {
                return this.parentItem.name
            },
            childrenItem () {
                return this.parentItem.children
            },
            textColor () {
                return this.theme === 'dark' ? '#fff' : '#495060'
            }
        },
        mounted(){
            // console.log(this.parentItem,"===========子菜单")
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>