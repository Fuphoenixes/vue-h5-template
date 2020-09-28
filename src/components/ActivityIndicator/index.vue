<template>
  <div></div>
</template>

<script>
  import { Toast } from 'vant';

  export default {
    props: {
      visible:{
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'loading'
      },
      position:{
        type: String,
        default: 'middle'
      },
      message:{
        type: String,
        default: '加载中...'
      },
      icon:{
        type: String,
        default: ''
      },
      loadingType:{
        type: String,
        default: 'circular'
      },
      duration:{
        type: Number,
        default: 0
      },
    },
    watch:{
      visible:{
        handler(val){
          if(val && !this.toast){
            const options = {
              ...this._props,
              mask:true,
              forbidClick: false,
              getContainer:()=>{
                return this.$parent.$el
              }
            }
            if(this.icon){
              delete options.type
              delete options.loadingType
              delete options.visible
            }
            this.toast = Toast.loading(options);
          }else if(this.toast){
            this.toast.clear();
            this.toast = null;
          }
        },
        immediate:true
      }
    },
    destroyed(){
      this.toast && this.toast.clear();
    }
  }
</script>

<style>
  .van-overlay{
    background: transparent;
  }
</style>