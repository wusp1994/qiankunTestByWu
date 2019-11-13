<template>
    <div id="root" class="mainApp">
        <router-view/>
        <!--<div id="app"></div>-->
    </div>
</template>

<script>

  import { mapMutations } from 'vuex'

  export default {
    name: 'framework',
    props: {
      content: String,
      loading: Boolean,
    },
    methods: {
      ...mapMutations([
        "setMicroAppHtml",
        "setLoading"
      ]),
      goto(title, href) {
        console.log("title",title,"href",href)
        window.history.pushState({}, title, href);
      },
    },
    watch:{
      content(value,oldValue){
        // debugger
        this.setMicroAppHtml(value)
      },
      loading(value,oldValue) {
        this.setLoading(value)
      }
    }
  };
</script>

<style lang="scss">
html,body{
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
}
#root{
    width: 100%;
    height: 100%;
}
</style>
