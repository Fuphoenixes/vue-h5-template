<template>
  <div class="error">
    <svg-icon icon-class="404"></svg-icon>
    <h1 @touchstart.prevent="touchStart" @touchend.prevent="touchEnd">404 Not Found</h1>
    <van-button @click="$router.push('/')" type="primary">返回首页</van-button>
    <van-dialog
      v-model="show"
      title="开启调试器"
      overlay
      show-cancel-button
      @confirm="confirm"
    >
      <div class="password">
        <input type="password" v-model="password" placeholder="请输入密码"/>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { Button } from 'vant';

export default {
  components:{
    [Button.name]:Button
  },
  data(){
    return{
      show: false,
      password:''
    }
  },
  watch:{
    show(val){
      if(!val)this.password = "";
    }
  },
  created(){
    this.time = 0;
  },
  methods: {
    touchStart() {
      this.time = new Date().getTime();
    },
    touchEnd() {
      const time = new Date().getTime();
      if(this.time && time - this.time > 2000){
        this.time = 0;
        const showVConsole = localStorage.getItem('showVConsole') === 'true';
        if(showVConsole){
          localStorage.setItem('showVConsole',false);
          this.$toast('调试器已关闭，请刷新页面');
        }else{
          this.show = true;
        }
      }
    },
    confirm(){
      if(this.password === '543210'){
        localStorage.setItem('showVConsole',true);
        let script = document.createElement('script');
        script.src = 'https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js';
        document.getElementsByTagName('html')[0].appendChild(script);
        script.onload = function () {
          new window.VConsole();
        };
      }else{
        this.$toast('密码错误！');
      }
    }
  },
}
</script>

<style lang="less" scoped>
  .error{
    text-align: center;
    padding-top: 120px;
    h1{
      color: @orange;
    }
    svg{
      font-size: 360px;
      color: @orange;
    }
    button{
      margin-top: 20px;
    }
  }
  .password{
    margin: 40px 0;
    padding: 8px 10px;
    border-radius: 8px;
    width: 180px;
    display: inline-block;
    border: 1px solid #ccc;
    input{
      width: 100%;
      border: none;
      outline: none;
    }
  }
</style>
