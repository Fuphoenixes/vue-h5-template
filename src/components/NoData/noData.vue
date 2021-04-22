<template>
  <van-empty
    class="no-data"
    :image="image"
    :image-size="imageSize"
    :description="description"
  />
</template>

<script>
  const emptyImg = require('./empty@2x.png')

  export default {
    name: 'no-data',
    props: {
      image: {
        type: String,
        default: emptyImg
      },
      imageSize: {
        type: [Number, String],
        default: undefined
      },
      description: {
        type: String,
        default: '暂无数据'
      }
    }
  }
</script>
<style>
.no-data .van-empty__image {
  width: 163px;
  height: 101px;
  margin-top: 140px;
}
</style>
