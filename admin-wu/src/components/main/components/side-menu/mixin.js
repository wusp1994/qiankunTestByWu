import { showTitle } from '@/libs/util'

export default {
    methods:{
        showTitle (item) {
            return showTitle(item, this)
        },
        showChildren (item) {
            //当菜单有子菜单，且 子菜单不止一个或者有showAlways为 trued的时候，为true
            return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways))
        },
        getNameOrHref (item, children0) {
            return item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].name : item.name)
        }
    }
}