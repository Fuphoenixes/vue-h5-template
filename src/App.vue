<script>
  import userAgent from '@/utils/userAgent.js'
  import { routeTransitionLimit } from '@/config.js'

  export default {
    data() {
      return {
        transitionName: '',
        cachedViews: []
      }
    },
    watch: {
      $route: {
        handler(to, from) {
          this._setTransition(to, from)
          this._changeCachedViews(to)
        },
        immediate: true
      }
    },
    methods: {
      // 设置路由动画
      _setTransition(to, from) {
        if (
          // 低版本安卓机机不开启路由动画，避免卡顿
          (userAgent === 'Android' && userAgent < routeTransitionLimit) ||
          // 首次进入app
          !from ||
          // 未设置路由等级
          !to.meta || !from.meta || typeof to.meta.level === 'undefined' || typeof from.meta.level === 'undefined' ||
          // 路由等级相同
          to.meta.level === from.meta.level
        ) {
          this.transitionName = ''
        } else if (to.meta.level > from.meta.level) {
          this.transitionName = 'slide-left'
        } else if (to.meta.level < from.meta.level) {
          this.transitionName = 'slide-right'
        }
      },
      // 设置缓存页面， 前进加载后退缓存
      _changeCachedViews(to) {
        if (!to.meta || !to.meta.level) return
        const routes = this.$router.options.routes;
        this.cachedViews = this.cachedViews.filter(item => {
          const itRoute = routes.find(route => route.name === item)
          return itRoute && itRoute.meta && itRoute.meta.level < to.meta.level
        })
      },
      afterEnter() {
        this.$bus.$emit('afterRouteEnter')
      },
    },
    render(h) {
      const { cachedViews, transitionName, afterEnter } = this
      const keepAlive = (
        <keep-alive include={cachedViews}>
          <router-view class="router"/>
        </keep-alive>
      )
      window.__KEEP_ALIVE__ = keepAlive
      return (
        <div id="app">
          <transition name={transitionName} onAfterEnter={afterEnter}>
            {keepAlive}
          </transition>
        </div>
      )
    }
  }
</script>
<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: @text-color;
    font-size: 30px;
  }

  .router {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    background: @background-color;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active {
    transition: transform .3s;
    will-change: transform;
  }

  .slide-left-leave-active {
    transition: transform .3s .1s;
    will-change: transform;
  }

  .slide-left-enter, .slide-right-leave-active {
    z-index: 1000000;
    //box-shadow: rgba(0,0,0,.3) pxToRem(-10) 0 pxToRem(5);
  }

  .slide-left-enter-to, .slide-left-leave-to {
    z-index: inherit;
  }

  .slide-right-enter {
    transform: translate(-50%, 0);
  }

  .slide-right-enter-to {
    transform: translate(0, 0);
  }

  .slide-right-leave {
    transform: translate(0, 0);
  }

  .slide-right-leave-to {
    transform: translate(100%, 0);
  }


  .slide-left-enter {
    transform: translate(100%, 0);
  }

  .slide-left-enter-to {
    transform: translate(0, 0);
  }

  .slide-left-leave {
    transform: translate(0, 0);
  }

  .slide-left-leave-to {
    transform: translate(-50%, 0);
  }

</style>
