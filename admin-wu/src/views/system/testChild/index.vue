<template>
    <div class="testChild">
        <childApp :content="content"></childApp>
    </div>
</template>

<script>
  import childApp from "@/components/childApp/index"

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
    created(){
      this.content = this.$EventBus.$data.content;
      console.log(this.$EventBus,"=======视图组件应用的 $EventBus")
    }
  }
</script>

<style scoped>

</style>