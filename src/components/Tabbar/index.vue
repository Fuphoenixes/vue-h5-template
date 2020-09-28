<template>
  <van-tabbar
    class="tabbar" 
    route
    active-color="#FE552E"
    inactive-color="#888"
  >
    <van-tabbar-item to="/">
      <span>店铺</span>
      <i slot="icon" slot-scope="{active}" class="iconfont" :class="active ? 'icondianpu' : 'icondianpu-xianxing'"/>
    </van-tabbar-item>
    <van-tabbar-item to="/statistics">
      <span>统计</span>
      <i slot="icon" slot-scope="{active}" class="iconfont" :class="active ? 'icontiaoxingtu' : 'icontiaoxingtu-xianxing'"/>
    </van-tabbar-item>
    <van-tabbar-item>
      <div class="push-img" slot="icon" slot-scope="{active}" @click="push">
        <img src="../../assets/push.png" alt="">
        <span class="push-text">发布</span>
      </div>
    </van-tabbar-item>
    <van-tabbar-item to="/order">
      <span>订单</span>
      <i slot="icon" slot-scope="{active}" class="iconfont" :class="active ? 'icondanju' : 'icondanju-xianxing'"/>
    </van-tabbar-item>
    <van-tabbar-item to="/me">
      <span>我的</span>
      <i slot="icon" slot-scope="{active}" class="iconfont" :class="active ? 'iconyonghu' : 'iconyonghu-xianxing'"/>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
  import { Tabbar, TabbarItem, Icon  } from 'vant';

  export default {
    components:{
      [Tabbar.name]:Tabbar,
      [TabbarItem.name]:TabbarItem,
      [Icon.name]:Icon
    },
    data() {
      return {
        active: 0
      }
    },
    methods: {
      push() {
        this.$emit('push');
      },
    },
  }
</script>

<style lang="less" scoped>
  .tabbar{
    height: 100px;
  }
  .iconfont{
    font-size: 44px;
  }
  .push-text{
    position: absolute;
    bottom: -24px;
    font-size: 24px;
  }
  .push-img{
    width: 84px;
    height: 84px;
    position: absolute;
    top: -66px;
    left: -40px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius:50%;
    border-top: 1px solid gold; 
    background: #fff;
    img{
      width: 78px;
      height: 78px;
    }
  }
</style>