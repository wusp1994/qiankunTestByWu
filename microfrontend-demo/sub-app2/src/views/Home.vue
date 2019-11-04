<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App222222222222222222222222222222"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
