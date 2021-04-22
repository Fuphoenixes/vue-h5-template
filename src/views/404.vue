<template>
  <div class="error">
    <svg-icon icon-class="404" />
    <h1>404 Not Found</h1>
    <van-button type="primary" @click="$router.push('/')">返回首页</van-button>
    <ul v-if="nodeEnv !== 'production'" class="routes">
      <li v-for="route in routes" :key="route.path">
        <router-link :to="route.path">{{ route.path }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  const nodeEnv = process.env.NODE_ENV

  export default {
    data() {
      return {
        nodeEnv
      }
    },
    computed: {
      routes() {
        return this.$router.options.routes.filter(item => item.path && item.path !== '*')
      }
    }
  }
</script>

<style lang="less" scoped>
  .error {
    padding-top: 60px;
    text-align: center;

    h1 {
      font-size: 32px;
      color: @orange;
    }
    svg {
      font-size: 180px;
      color: @orange;
    }
    button {
      margin-top: 10px;
    }
  }
</style>
