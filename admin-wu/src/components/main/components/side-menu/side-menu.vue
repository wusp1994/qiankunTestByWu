<template>
    <div class="side-menu-box">
        <slot></slot>
        <!--当左右不折叠的时候-->
        <!--accordion 是否开启手风琴模式，开启后每次至多展开一个子菜单-->
        <!--主题，可选值为 light、dark、primary，其中 primary 只适用于 mode="horizontal"    -->
        <!--mode	菜单类型，可选值为 horizontal（水平） 和 vertical（垂直） 默认垂直-->
        <Menu
             ref="menu"
             v-show="!collapsed"
             :active-name="activeName"
             :open-names="openedNames"
             :accordion="accordion"
             :theme="theme"
             width="auto"
             @on-select="handleSelect"
            >
            <template v-for="item in menuList">
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
                            :key="`menu-${item.name}`"
                    >
                        <common-icon :type="item.icon || ''"/>
                        <span>{{ showTitle(item) }}</span>
                    </menu-item>
                </template>
            </template>
        </Menu>
    </div>
</template>

<script>
    import CommonIcon from '_c/common-icon'
    import SideMenuItem from './side-menu-item'
    import { getUnion } from '@/libs/tools'
    import mixin from './mixin'

    export default {
        name: "SideMenu",
        mixins:[ mixin ],
        components:{
            SideMenuItem,
            CommonIcon
        },
        props:{
            //菜单列表
            menuList:{
                type:Array,
                default (){
                    return [];
                }
            },
            //是否折叠
            collapsed:{
                type:Boolean
            },
            //主题 ，可选值为 light、dark、primary，其中 primary 只适用于 mode="horizontal"
            theme:{
                type:String,
                default(){
                    return 'dark'
                }
            },
            //是否开启手风琴模式，开启后每次至多展开一个子菜单
            accordion: Boolean,
            rootIconSize:{
                type:Number,
                default () {
                    return 20;
                }
            },
            iconSize:{
                type:Number,
                default () {
                    return 16;
                }
            },
            //激活菜单的 name 值
            activeName: {
                type: String,
                default: ''
            },
            //展开的 Submenu 的 name 集合， ["components", "tree_select_page"]
            openNames: {
                type: Array,
                default: () => []
            }
        },
        data(){
            return {
                //避免直接改变属性 openNames，因为每当父组件重新呈现时，该值都将被覆盖。
                //所以定义了 openedNames 替代
                openedNames: []
            }
        },
        mounted(){
            // console.log(this.menuList,"=========菜单列表")
            // console.log(this.openedNames,"=========openedNames")

            this.openedNames =  getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
        },
        watch:{
            activeName (name) {
                if (this.accordion) {
                    //手风琴模式下
                    this.openedNames = this.getOpenedNamesByActiveName(name)
                } else {
                    //非手风琴模式
                    this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
                }
            },
            openNames (newNames) {
                this.openedNames = newNames
            },
            openedNames () {
                this.$nextTick(() => {
                    this.$refs.menu.updateOpened()
                })
            }
        },
        methods:{
            //选择菜单（MenuItem）时触发 父级组件 on-select	返回值 name
            handleSelect (name) {
                this.$emit('on-select', name)
            },
            /**
             * 取路由记录 中的name值，并过滤. filter() 取的是符合条件的
             * @param name 要过滤的name
             * @returns {string[]}
             */
            getOpenedNamesByActiveName(name){
                // console.log(this.$route.matched.map(item => item.name),"路由记录")//["system", "userManage"]
                //matched:一个数组，包含当前路由的所有嵌套路径片段的路由记录 。
                return this.$route.matched.map(item => item.name).filter(item=>item !== name);
            },
            /**
             * 更新 展开的 Submenu 的 name 集合，
             * @param name 当前url 中的路由name
             */
            updateOpenName(name){
                if(name === this.$config.homeName){
                    this.openedNames = [];
                }else{
                    this.openedNames = this.getOpenedNamesByActiveName(name);
                }
            }
        }
    }
</script>

<style scoped>

</style>