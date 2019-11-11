//模拟数据库+api接口
import {getLocalStorage, removeStorage, setLocalStorage} from '@/libs/tools'

//节点数据格式
let menuNodeData = {
    id: 1,
    title: '系统功能',
    children: [
        {
            id: 11,
            title: '菜单管理',
        },
        {
            id: 12,
            title: '角色管理',
        },
        {
            id: 13,
            title: '用户管理',
        }
    ]
}
//节点详情数据格式
let menuNodeDetailData = {
    id:1,
    routeName:"",
    description:"系统功能",
    title:"系统功能"
}
//查询菜单节点的增
export const menuNodeAdd = (list) => {
    setLocalStorage("menuNode", list)
}

//查询菜单节点的删
export const menuNodeDelete = () => {
    removeStorage("menuNode")
}

//查询菜单节点的改
export const menuNodeEdit = (list) => {
    setLocalStorage("menuNode", list)
}

//查询菜单节点的查
export const menuNodeQuery = () => {
    let list = getLocalStorage("menuNode");
    return list;
}


//根据菜单节点里面的ID,对详情的增
export const menuNodeDetailAdd = (id, detailObj) => {
    setLocalStorage(id, detailObj);
}

//根据菜单节点里面的ID,对详情的删
export const menuNodeDetailDelete = (id) => {
    removeStorage(id);
}

//根据菜单节点里面的ID,对详情的改
export const menuNodeDetailEdit = (id, detailObj) => {
    setLocalStorage(id, detailObj);
}

//根据菜单节点里面的ID,对详情的查
export const menuNodeDetailQuery = (id) => {
    let detail = getLocalStorage(id);
    return detail;
}