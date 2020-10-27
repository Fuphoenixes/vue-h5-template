<template>
  <div>
    <div class="page-content home">
      <div class="swipe-wrapper">
        <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in 4" :key="index">
            <van-image
              width="100%"
              height="100%"
              fit="contain"
              lazy-load
              :src="banner"
            />
          </van-swipe-item>
        </van-swipe>
        <div class="swipe-edit" @click="editSwiper">
          <svg-icon icon-class="edit" />
        </div>
      </div>
      <div class="section">
        <van-row gutter="7" class="goods">
          <van-col v-for="item in 6" :key="item" span="12">
            <div class="good">
              <van-image
                class="good-img"
                fit="contain"
                lazy-load
                :src="good"
              />
              <div class="good-dec">
                蜜炼川贝枇杷膏
              </div>
              <div class="good-aside">
                <div class="good-aside-price">
                  ￥<span>36.0</span>
                </div>
                <div class="good-aside-edit" @click="editGoods">
                  <svg-icon icon-class="edit" />
                </div>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <Tabbar />
    <toast v-model="$loadingPlugin.getList" />
  </div>
</template>

<script>
  import { Swipe, SwipeItem, Image, Row, Col } from 'vant'
  import Tabbar from '@/components/Tabbar'
  import { timeout } from '@/utils'

  const banner = require('../../assets/banner.png')
  const good = require('../../assets/good.png')

  export default {
    name: 'shop',
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Image.name]: Image,
      [Row.name]: Row,
      [Col.name]: Col,
      Tabbar
    },
    data() {
      return {
        banner,
        good
      }
    },
    async created() {
      await this.getList()
    },
    methods: {
      async getList() {
        await timeout(3000)
      },
      editSwiper() {
        this.$router.push('/swiper')
      },
      editGoods() {
        this.$router.push('/push')
      }
    }
  }
</script>

<style lang="less" scoped>
  .home{
    bottom: 100px;
    background: #fff;
    padding-bottom: 20px;
    /deep/
    .van-swipe__indicators{
      bottom: 12px;
      .van-swipe__indicator{
        width: 16px;
        height: 16px;
        box-sizing: border-box;
        border: 1px solid #fff;
        background: transparent;
        opacity: 1;
      }
    }
  }
  .swipe{
    height: 358px;
  }
  .swipe-wrapper{
    position: relative;
    .swipe-edit{
      position: absolute;
      z-index: 10;
      bottom: 16px;
      right: 46px;
      height: 58px;
      width: 58px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.30);
      border-radius: 50%;
      svg {
        color: #fff;
        font-size: 32px;
        margin-left: 4px;
      }
    }
  }
  .goods{
    margin: 30px 20px 0!important;
  }
  .good{
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(109,155,192,0.36);
    border-radius: 12px;
    margin-top: 14px;
    padding: 16px;
    &-img{
      width: 100%;
      height: 228px;
      background: rgba(255,245,235,0.50);
    }
    &-dec{
      font-size: 30px;
      color: #242424;
    }
    &-aside{
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-price{
        color: @red;
        font-size: 22px;
        font-weight: bold;
        span{
          font-size: 34px;
        }
      }
      &-edit{
        height: 58px;
        width: 58px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: linear-gradient(-220deg, #FFCB5B 2%, #FE9C2E 100%);
        border-radius: 50%;
        box-shadow: 0 0 10px 0 rgba(255,203,91,0.66);
        svg {
          color: #fff;
          font-size: 32px;
          margin-left: 3px;
        }
      }
    }
  }
</style>
