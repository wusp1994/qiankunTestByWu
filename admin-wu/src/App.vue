<template>
    <div id="root" class="mainApp">
        <template v-if="!isChildApp">
            <router-view/>
        </template>
        <template v-show="isChildApp" >
            <wu-layoutMain :loading="loading" :isChildApp="isChildApp" :content="content"></wu-layoutMain>
        </template>

    </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import layoutMain from "@/components/main"

  export default {
    name: 'framework',
    props: {
      content: String,
      loading: Boolean,
    },
    components: {
      'wu-layoutMain' : layoutMain,
    },
    computed: {
      isChildApp() {
        if(this.$route.path.match('sub-app')){
          return true;
        }else{
          return false;
        }
      }
    },
    methods: {
      ...mapMutations([
        "setMicroAppHtml",
        "setLoading"
      ]),
      goto(title, href) {
        console.log("title",title,"href",href)
        window.history.pushState({}, title, href);
        // this.$router.push(op.key)
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
