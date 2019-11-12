<template>
    <div id="root" class="mainApp">
        <router-view/>
        <!--<div id="app"></div>-->
    </div>
</template>

<script>
  export default {
    name: 'framework',
    // props: {
    //   content: String,
    // },
    methods: {
      goto(title, href) {
        console.log("title",title,"href",href)
        window.history.pushState({}, title, href);
      },
    },
    mounted(){
      // console.log(this.content,"props by app.vue")
      // this.$EventBus.$data.content = this.content;
      // console.log(this.$EventBus,"$EventBus by app.vue")
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
