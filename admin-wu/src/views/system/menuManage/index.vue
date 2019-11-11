<template>
    <div class="menuManage">
        <el-button v-if="isMenuNode" @click="createInit">
            创建初始菜单
        </el-button>
        <div class="main">
            <div class="list card">
                <el-tree
                        :data="menuList"
                        node-key="id"
                        highlight-current
                        :default-expand-all="true"
                        :expand-on-click-node="false"
                        :current-node-key="1"
                        :check-on-click-node="true"
                        @node-click="handleNodeClick"
                        :props="defaultProps">
                </el-tree>
            </div>
            <!--节点详情-->
            <div class="detail card">
                <div class="tit" v-if="formSate === `add`">添加节点内容</div>
                <div class="tit" v-if="formSate === `edit`">修改节点内容</div>
                <div class="tit" v-if="formSate === `query`">查看节点内容</div>
                <div class="item" v-show="formSate !== `add`">
                    <p>
                        唯一id:
                    </p>
                    <div class="inputBox">
                        <el-input v-model="form.id" :disabled="true" size="small" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item" v-show="formSate === `add`">
                    <p>
                        添加节点:
                    </p>
                    <div class="inputBox">
                        <el-radio v-model="nodeRadio" label="1">当前节点</el-radio>
                        <el-radio v-model="nodeRadio" label="2">子节点</el-radio>
                    </div>
                </div>
                <div class="item">
                    <p>
                        路由name:
                    </p>
                    <div class="inputBox">
                        <el-input v-model="form.routeName" :disabled="formSate === `query`" size="small" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <p>
                        路由title:
                    </p>
                    <div class="inputBox">
                        <el-input v-model="form.title" :disabled="formSate === `query`" size="small" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <p>
                        描述:
                    </p>
                    <div class="inputBox">
                        <el-input v-model="form.description" :disabled="formSate === `query`" size="small" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item btn">
                    <el-button size="small" type="primary" @click="edit()">修改</el-button>
                    <el-button size="small" type="primary" @click="add()">新增</el-button>
                    <template v-if="formSate === `add`||formSate === `edit`">
                        <el-button v-show="formSate === `edit`" size="small" type="success" @click="saveEdit()">保存修改</el-button>
                        <el-button v-show="formSate === `add`" size="small" type="success" @click="saveAdd()">保存新增</el-button>
                    </template>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import { menuNodeAdd,menuNodeDelete,menuNodeEdit,menuNodeQuery,
        menuNodeDetailAdd,menuNodeDetailDelete,menuNodeDetailEdit,
        menuNodeDetailQuery } from './mockApi'
    import {getLocalStorage, removeStorage, setLocalStorage} from '@/libs/tools'

    export default {
        name: "index",//菜单管理
        data() {
            return {
                menuList: [ ],
                defaultProps: {
                    children: 'children',
                    label: 'title',
                },
                form:{
                    id:1,
                    routeName:"",
                    description:"",
                    title:""
                },
                nodeForm:{
                    title:""
                },
                formSate:"query",// "add" 新增;  "edit" 修改; "query"查看
                nodeRadio:"1"
            }
        },
        mounted() {
            let menuNodeList = menuNodeQuery();
            let menuDetail = menuNodeDetailQuery(1);
            if(menuNodeList !== undefined && menuNodeList!==null){
                this.menuList = menuNodeList;
            }
            if(menuDetail!==undefined && menuDetail!==null){
                this.form = menuDetail;
            }
        },
        computed:{
            isMenuNode(){
                console.log(getLocalStorage("menuNode"),"=======本地存储menuNode")
                if(getLocalStorage("menuNode") === undefined || getLocalStorage("menuNode") ===null){
                    return true;
                }else{
                    return false;
                }
            }
        },
        methods: {
            handleNodeClick(data) {
                this.form = {
                    id:data.id,
                    routeName:data.name,
                    description:data.description,
                    title:data.title
                }
                console.log(data);
            },
            add(){
                this.formSate = "add";
                this.initForm();
            },
            saveAdd(){

            },
            edit(){
                this.formSate = "edit";
            },
            initForm(){
                this.form = {
                    id:"",
                    routeName:"",
                    description:"",
                    title:""
                }
            },
            saveEdit(){

            },
            //在第一次浏览器中运行,或者清除本地存储时调用
            createInit(){
                let list =  [
                        {
                            id: 1,
                            title: '系统功能',
                            name:"system",
                            description:"",
                            children: [
                                {
                                    id: 11,
                                    title: '菜单管理',
                                    name:"userManage",
                                    description:"",
                                },
                                {
                                    id: 12,
                                    title: '角色管理',
                                    name:"roleManage",
                                    description:"",
                                },
                                {
                                    id: 13,
                                    title: '用户管理',
                                    name:"userMange",
                                    description:"",
                                }
                            ]
                        },
                    ];
                menuNodeAdd(list);
                window.location.reload();
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "index";

</style>