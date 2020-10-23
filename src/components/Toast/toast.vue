<template>
  <van-toast
    v-bind="$attrs"
    v-on="$listeners"
    :type="type"
    :message="message"
    :duration="duration"
  ></van-toast>
</template>

<script>
  export default {
    name: 'toast',
    props: {
      type: {
        type: String,
        default: 'loading'
      },
      message:{
        type: String,
        default: '加载中...'
      },
      duration:{
        type: Number,
        default: 0
      }
    },
  }
</script>
