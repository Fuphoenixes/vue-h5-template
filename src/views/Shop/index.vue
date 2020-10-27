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
  .home {
    bottom: 100px;
    padding-bottom: 20px;
    background: #fff;
    /deep/ .van-swipe__indicators {
      bottom: 12px;
      .van-swipe__indicator {
        width: 16px;
        height: 16px;
        background: transparent;
        border: 1px solid #fff;
        opacity: 1;
        box-sizing: border-box;
      }
    }
  }
  .swipe {
    height: 358px;
  }
  .swipe-wrapper {
    position: relative;
    .swipe-edit {
      position: absolute;
      right: 46px;
      bottom: 16px;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 58px;
      height: 58px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      svg {
        margin-left: 4px;
        font-size: 32px;
        color: #fff;
      }
    }
  }
  .goods {
    margin: 30px 20px 0 !important;
  }
  .good {
    padding: 16px;
    margin-top: 14px;
    background: #FFF;
    border-radius: 12px;
    box-shadow: 0 0 10px 0 rgba(109, 155, 192, 0.36);
    &-img {
      width: 100%;
      height: 228px;
      background: rgba(255, 245, 235, 0.5);
    }
    &-dec {
      font-size: 30px;
      color: #242424;
    }
    &-aside {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      &-price {
        font-size: 22px;
        font-weight: bold;
        color: @red;
        span {
          font-size: 34px;
        }
      }
      &-edit {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 58px;
        height: 58px;
        background-image: linear-gradient(-220deg, #FFCB5B 2%, #FE9C2E 100%);
        border-radius: 50%;
        box-shadow: 0 0 10px 0 rgba(255, 203, 91, 0.66);
        svg {
          margin-left: 3px;
          font-size: 32px;
          color: #fff;
        }
      }
    }
  }
</style>
