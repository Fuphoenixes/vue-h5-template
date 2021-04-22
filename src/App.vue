<template>
  <div id="app">
    <vue-navigation>
      <router-view />
    </vue-navigation>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @text-color;
}
</style>
