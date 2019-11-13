<template>
    <div class="testChild">
        <childApp :content="microAppHtml"></childApp>
        <el-button @click="getMicroAppHtml">获取html</el-button>
    </div>
</template>

<script>
  import childApp from "@/components/childApp/index"
  import { mapState } from "vuex"

  export default {
    name: "index",
    data(){
      return {
        content:""
      }
    },
    components:{
      childApp
    },
    computed:mapState({
      microAppHtml: state => state.microApps.microAppHtml,
      loading: state => state.microApps.loading,
    }),
    created(){
      // console.log(this.$store.state.microApps.microAppHtml,"child component microAppHtml")
      // console.log(this.microAppHtml,"child component microAppHtml")
      // debugger
    },
    methods:{
      getMicroAppHtml(){
        console.log(this.$store.state.microApps.microAppHtml,"child component microAppHtml")
      }
    }
  }
</script>

<style scoped>

</style>