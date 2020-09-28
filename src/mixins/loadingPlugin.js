/**
 * 添加自动loading插件，$loadingPlugin
 */
export default {
  data(){
    return {
      loadingPlugin__: {}
    }
  },
	beforeCreate(){
    if(!this.$vnode)return;
		const extendOptions = this.$vnode.componentOptions.Ctor.extendOptions;
		const asyncMethods = extendOptions.asyncMethods;
		if(asyncMethods){
			if(extendOptions.methods){
				Object.assign(extendOptions.methods,createLoading(asyncMethods))
			}
      const methods = createLoading(asyncMethods);
      for(let key in methods){
        if(methods.hasOwnProperty(key)){
          this[key] = methods[key];
        }
      }
		}
  },
  watch:{
    loadingPlugin__:{
      handler(val){
        this.$loadingPlugin = val;
        this.$forceUpdate()
      },
      immediate:true,
      deep:true
    }
  },
}

export function createLoading(obj) {
  const newObj = {};
  for (const k in obj){
    newObj[k] =  function(...args){
      return new Promise((resolve, reject) => {
        this.$set(this.loadingPlugin__,k,true);
        const done = ()=>{
          obj[k].apply(this,args)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            this.$set(this.loadingPlugin__,k,false);
          })
        }
        if(typeof this.__afterRouteEnter === 'undefined' || this.__afterRouteEnter || !this.$bus){
          done()
        }else{
          this.$bus.$once('afterRouteEnter',()=>{
            done()
          })
        }
      })
    }
  }
  return newObj
}
