<template>
  <div ref="scroll" class="scroll">
    <component
      :is="pullDownRefresh ? 'van-pull-refresh' : 'div'"
      ref="refresh"
      v-model="refreshing"
      :success-text="successText"
      class="scroll-ctx"
      v-bind="$attrs"
      @refresh="refresh"
    >
      <component
        :is="pullUpLoad ? 'van-list' : 'div'"
        ref="list"
        v-model="loading"
        class="scroll-ctx-in"
        v-bind="$attrs"
        :finished="pullUpFinished"
        :error.sync="pullUpError"
        :error-text="pullUpErrorText"
        :finished-text="showFinishedText ? finishedText : ''"
        :immediate-check="immediateCheck"
        v-on="$listeners"
        @load="load"
      >
        <slot />
      </component>
    </component>
  </div>
</template>

<script>
  import { List, PullRefresh } from 'vant'

  export default {
    name: 'scroll',
    components: {
      [List.name]: List,
      [PullRefresh.name]: PullRefresh
    },
    props: {
      // 请求数据方法，需返回Promise
      fetch: {
        type: Function,
        default: null
      },
      // 上拉加载, 其他配置参考 van-list 文档---------------
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      startPageNo: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 10
      },
      finishedText: {
        type: String,
        default: '没有更多了'
      },
      showFinishedText: {
        type: Boolean,
        default: false
      },
      pullUpErrorText: {
        type: String,
        default: '请求失败，点击重新加载'
      },
      immediateCheck: {
        type: Boolean,
        default: true
      },
      // 下拉刷新, 其他配置参考 van-pull-refresh 文档 -----------------
      pullDownRefresh: {
        type: Boolean,
        default: false
      },
      // 是否保存滚动位置,离开页面后再返回滚动位置还在
      saveScrollPosition: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        pageNo: this.startPageNo,
        loading: false,
        pullUpFinished: false,
        pullUpError: false,
        refreshing: false,
        scrollTop: 0,
        successText: ''
      }
    },
    created() {
      if (
        (this.pullUpLoad || this.pullDownRefresh) &&
        !this.fetch
      ) {
        console.error('scroll组件，pull-up-load或pull-down-refresh值为true时，fetch属性必须设置')
      }
    },
    mounted() {
      this.$refs.scroll.onscroll = this.onScroll
    },
    activated() {
      if (this.saveScrollPosition) {
        this.$refs.scroll.scrollTop = this.scrollTop
      }
    },
    methods: {
      load() {
        if (this._refreshing) {
          this.loading = false
          return Promise.resolve()
        }
        return new Promise((resolve, reject) => {
          this.loading = true
          this.fetch({ pageNo: this.pageNo, pageSize: this.pageSize, finished: this.finished, fetchType: 'load' })
            .then((res) => {
              this.loading = false
              this.pageNo++
              resolve(res)
            })
            .catch((err) => {
              this.pullUpError = true
              this.loading = false
              reject(err)
            })
        })
      },
      refresh() {
        return new Promise((resolve, reject) => {
          this.pullUpFinished = false
          this.pullUpError = false
          this.pageNo = this.startPageNo
          this._refreshing = true
          this.fetch({ pageNo: this.pageNo, pageSize: this.pageSize, finished: this.finished, fetchType: 'refresh' })
            .then((res) => {
              this.refreshing = false
              this._refreshing = false
              this.successText = '刷新成功'
              this.pageNo++
              this.check()
              resolve(res)
            })
            .catch((err) => {
              this.refreshing = false
              this._refreshing = false
              this.successText = '刷新失败'
              reject(err)
            })
        })
      },
      async reload() {
        this.pullUpFinished = false
        this.loading = true
        this.pullUpError = false
        this.pageNo = this.startPageNo
        await this.load()
      },
      check() {
        this.$refs.list.check && this.$refs.list.check()
      },
      finished() {
        this.pullUpFinished = true
      },
      onScroll(e) {
        this.scrollTop = e.target.scrollTop
        this.$emit('scroll', e.target.scrollTop)
      },
      resetScrollPosition() {
        this.$refs.scroll.scrollTop = this.scrollTop = 0
      }
    }
  }
</script>

<style lang="less" scoped>
.scroll {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .scroll-ctx {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    min-height: 100%;
    box-sizing: border-box;
    & /deep/ .van-pull-refresh__track {
      width: 100%;
      flex: 1;
    }
    .scroll-ctx-in {
      overflow: hidden;
    }
  }
}
</style>
