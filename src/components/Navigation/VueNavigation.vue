<script>
  import userAgent from '@/utils/userAgent'

  const useRouteTransition = process.env.VUE_APP_USE_ROUTE_TRANSITION
  const routeTransitionLimit = process.env.VUE_APP_ROUTE_TRANSITION_LIMIT

  export default {
    name: 'vue-navigation',
    data() {
      return {
        transitionName: '',
        cachedViews: []
      }
    },
    watch: {
      $route: {
        handler(to, from) {
          this._setRouterTransition(to, from)
          this._changeCachedViews(to)
        },
        immediate: true
      }
    },
    methods: {
      // 设置路由动画
      _setRouterTransition(to, from) {
        if (
          // 未开启路由过渡动画
          useRouteTransition !== 'true' ||
          // 低版本安卓机机不开启路由动画，避免卡顿
          (userAgent === 'Android' && userAgent < routeTransitionLimit)
        ) return
        // 手动设置路由方向
        if (typeof window.__ROUTER_TRANSITION_NAME__ !== 'undefined') {
          this.transitionName = window.__ROUTER_TRANSITION_NAME__
          window.__ROUTER_TRANSITION_NAME__ = undefined
          return
        }
        if (
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
        if (!to.meta || !to.meta.level || !to.name) return
        const routes = this.$router.options.routes
        this.cachedViews = this.cachedViews.filter(item => {
          const itRoute = routes.find(route => route.name === item)
          return itRoute && itRoute.meta && itRoute.meta.level < to.meta.level
        })
        this.cachedViews.push(to.name)
      },
      afterEnter() {
        this.$navigationBus.$emit('after-route-enter')
      }
    },
    render(h) {
      const { cachedViews, transitionName, afterEnter } = this
      if (this.$slots.default) {
        const staticClass = this.$slots.default[0].data.staticClass
        this.$slots.default[0].data.staticClass = staticClass ? staticClass + ' router' : 'router'
      }
      const keepAlive = (
        <keep-alive include={cachedViews}>
          {this.$slots.default}
        </keep-alive>
      )
      window.__KEEP_ALIVE__ = keepAlive
      return (
        <transition name={transitionName} onAfterEnter={afterEnter}>
          {keepAlive}
        </transition>
      )
    }
  }
</script>

<style lang="less">
  .router {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    background: @background-color;

    /* -webkit-backface-visibility: hidden; */
    backface-visibility: hidden;
  }

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active {
    transition: transform 0.3s;
    will-change: transform;
  }

  .slide-left-leave-active {
    transition: transform 0.3s 0.1s;
    will-change: transform;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    z-index: 1000000;
    //box-shadow: rgba(0,0,0,.3) pxToRem(-10) 0 pxToRem(5);
  }

  .slide-left-enter-to,
  .slide-left-leave-to {
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
