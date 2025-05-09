<template>
  <div id="app">
   <notifications />
  </div>
  <router-view/>
</template>
<script>
import sideBar from '@/components/sideBar.vue';
export default {
  components:{
    sideBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
}
a{
    color: #6e84a3 !important; 
}
</style>
