/**
 * 添加路由进入完成钩子 afterRouteEnter
 *  */
export default {
  created(){
    if(!this.$vnode)return;
    const afterRouteEnter = this.$vnode.componentOptions.Ctor.extendOptions.afterRouteEnter;
    this.__afterRouteEnter = false;
    this.$bus && this.$bus.$once('afterRouteEnter',()=>{
      if(afterRouteEnter)afterRouteEnter.apply(this);
      this.__afterRouteEnter = true;
    })
  }
}

