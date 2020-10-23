<template>
  <div id="app">
    <transition :name="transitionName"  @after-enter="afterEnter">
      <keep-alive :include="cachedViews.map(item=>item.name)">
        <router-view class="router"/>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import userAgent from '@/utils/userAgent.js'
import { routeTransitionLimit } from '@/config.js'
import { store, setCachedViews } from '@/store/cachedViews.js'

export default {
  data() {
    return {
      transitionName: '',
      to: null
    }
  },
  computed:{
    cachedViews(){
      return store.cachedViews
    }
  },
  watch:{
    $route:{
      handler(to,from){
        if(!to.name || !to.meta)return;
        this.to = to;
        //路由动画
        if (to.meta.level > from.meta.level) {
          this.transitionName = 'slide-left'
        } else if(to.meta.level < from.meta.level) {
          this.transitionName = 'slide-right'
        }else{
          this.transitionName = ''
        }
        //低版本安卓机机不开启路由动画，避免卡顿
        if(userAgent === 'Android' && userAgent < routeTransitionLimit){
           this.transitionName = ''
        }
      },
      immediate:true
    }
  },
  methods: {
    afterEnter() {
      this.$bus.$emit('afterRouteEnter')

      //路由缓存
      if(!this.to)return;
      const routes = this.$router.options.routes;
      const cachedViews = [];
      //路由等级小于当前路由的留下缓存，其余的删除缓存
      this.cachedViews.forEach(item=>{
        const it = routes.filter(route=>route.name === item.name)[0];
        if(it && it.meta.level < this.to.meta.level){
          cachedViews.push(item);
        }
      });
      //缓存当前路由的页面实例
      let instance = null;
      this.$children.forEach(item=>{
        const name = item.$vnode.componentOptions.Ctor.extendOptions.name;
        if(name === this.to.name) instance = item;
      })
      cachedViews.push({
        name: this.to.name,
        instance
      });
      setCachedViews(cachedViews)
    },
  },
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
.router{
  position: absolute;
  left:0;bottom:0;top:0;right:0;
  background: @background-color;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.slide-right-enter-active,.slide-right-leave-active,.slide-left-enter-active{
  transition: transform .3s ;
  will-change: transform;
}
.slide-left-leave-active{
  transition: transform .3s .1s;
  will-change: transform;
}
.slide-left-enter,.slide-right-leave-active{
  z-index: 1000000;
  //box-shadow: rgba(0,0,0,.3) pxToRem(-10) 0 pxToRem(5);
}
.slide-left-enter-to,.slide-left-leave-to{
  z-index: inherit;
}

.slide-right-enter{
  transform: translate(-50%,0);
}
.slide-right-enter-to{
  transform: translate(0,0);
}
.slide-right-leave{
  transform: translate(0,0);
}
.slide-right-leave-to{
  transform: translate(100%,0);
}


.slide-left-enter{
  transform: translate(100%,0);
}
.slide-left-enter-to{
  transform: translate(0,0);
}
.slide-left-leave{
  transform: translate(0,0);
}
.slide-left-leave-to{
  transform: translate(-50%,0);
}

</style>
