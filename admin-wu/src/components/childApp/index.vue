<template>
    <div class="childApp">
        <!--<router-view/>-->
        <div id="router-view" v-html="content"></div>
    </div>
</template>

<script>
  export default {
    name: "index",
    props: {
      content: String,
    },
    methods: {
      goto(title, href) {
        console.log("title", title, "href", href)
        window.history.pushState({}, title, href);
      },
    }
  }
</script>

<style scoped>

</style>