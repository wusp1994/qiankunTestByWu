<template>
    <div class="userManage">
        用户管理
        <el-input  v-model="content"></el-input>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'

    export default {
      name: "index",
      data(){
        return{
          content:''
        }
      },
      methods:{
        ...mapMutations([
          "setMicroAppHtml"
        ]),
      },
      watch:{
        content(value,oldValue){
          debugger
          this.setMicroAppHtml(value)
        },
      }
    }
</script>

<style scoped>

</style>