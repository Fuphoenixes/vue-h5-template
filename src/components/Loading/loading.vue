<template>
  <van-toast
    v-if="visible"
    v-bind="$attrs"
    :type="type"
    :message="message"
    :duration="duration"
    :forbid-click="forbidClick"
    :value="true"
    v-on="$listeners"
  />
</template>

<script>

  export default {
    name: 'loading',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      message: {
        type: String,
        default: '加载中...'
      },
      loadingType: {
        default: 'spinner'
      },
      forbidClick: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: 'loading'
      },
      duration: {
        type: Number,
        default: 0
      }
    },
    watch: {
      visible(val) {
        if (!val) {
          document.body.classList.remove('van-toast--unclickable')
        }
      }
    },
    beforeDestroy() {
      document.body.classList.remove('van-toast--unclickable')
    }
  }
</script>
