<template>
  <van-toast
    v-bind="$attrs"
    :type="type"
    :message="message"
    :duration="duration"
    :forbid-click="forbidClick"
    v-on="$listeners"
  />
</template>

<script>
  export default {
    name: 'toast',
    props: {
      type: {
        type: String,
        default: 'loading'
      },
      message: {
        type: String,
        default: '加载中...'
      },
      duration: {
        type: Number,
        default: 0
      },
      forbidClick: {
        type: Boolean,
        default: true
      }
    }
  }
</script>
