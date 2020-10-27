<template>
  <div class="upload">
    <div v-if="title" class="title">
      {{ title }}
    </div>
    <div class="image-picker">
      <div v-for="(item,index) in renderImages" :key="index" class="image-item">
        <div
          class="image"
          :style="{backgroundImage: `url(&quot;${item.url}&quot;)`}"
          @click="onImageClick(index)"
        />
        <div v-if="!disable" class="image-close" @click="(e)=>remove(e,index)">
          <img src="./cha.png" alt="">
        </div>
        <div v-show="item.loading" class="image-bg">
          <span>{{ parseInt(item.percent) }}%</span>
        </div>
        <div v-show="item.error" class="image-bg">
          <svg-icon icon-class="shanchucha" class-name="shanchucha" />
        </div>
      </div>
      <div v-show="selectable" class="input-item">
        <svg-icon icon-class="jia" />
        <input :key="JSON.stringify(renderImages)" type="file" :multiple="multi" :accept="accept" @change="uploadEvent">
      </div>
    </div>
  </div>
</template>

<script>
  import { ImagePreview, Toast } from 'vant'
  import * as qiniu from 'qiniu-js'

  Toast.allowMultiple()
  Toast.setDefaultOptions({
    duration: 2000
  })
  export default {
    props: {
      title: String, // 上传的标题 可选
      images: { // 上传成功的图片数组 必传 eg: [{url:''}]
        type: Array,
        required: true
      },
      token: { // 上传地址 必传
        type: String,
        required: true
      },
      domain: { // 七牛的 domain
        type: String,
        default: 'http://image.haoyunqi.com.cn/'
      },
      onlyOne: { // 可选，默认false，传true时，表示只能上传一张图片
        type: Boolean,
        default: false
      },
      fileName: { // 上传文件的字段名，公司上传api要求为fileVal 可选
        type: String,
        default: 'fileVal'
      },
      multiple: { // 是否允许一次多张上传，默认允许  可选
        type: Boolean,
        default: true
      },
      accept: { // 上传文件格式要求 可选
        type: String,
        default: 'image/*'
      },
      fileType: String, // 上传文件请求头相关， 可选，公司api没做要求可以不管
      maxLimit: { // 限制最大上传张数，默认为10张
        type: Number,
        default: 10
      },
      onceLimit: { // 限制一次性上传的张数，默认为10张
        type: Number,
        default: 10
      },
      disable: { // 禁止上传，只能预览
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        renderImages: [],
        resImages: []
      }
    },
    computed: {
      multi() {
        return this.onlyOne ? false : this.multiple
      },
      selectable() {
        const { onlyOne, renderImages, maxLimit, disable } = this
        let rtn = true
        if (onlyOne && renderImages.length === 1) rtn = false
        if (!onlyOne && renderImages.length >= maxLimit) rtn = false
        if (disable) rtn = false
        return rtn
      }
    },
    watch: {
      images: {
        handler(val) {
          if (val !== this.resImages) {
            this.renderImages = JSON.parse(JSON.stringify(val))
            this.resImages = val
          }
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      uploadEvent(e) {
        const { onceLimit, maxLimit, renderImages } = this
        const files = e.target.files
        if (files.length > onceLimit) {
          Toast(`一次最多上传${onceLimit}张图片`)
          return
        }
        if (files.length + renderImages.length > maxLimit) {
          Toast(`最多上传${maxLimit}张图片`)
          return
        }
        for (let i = 0; i < files.length; i++) {
          this._upload(files[i], i + renderImages.length)
        }
      },
      _upload(file, index) {
        const { token, domain, renderImages } = this
        const _this = this
        if (file.size > 10 * 1024 * 1024) {
          Toast('单张图片请不要超过10M')
          return
        }
        if (renderImages[index]) return
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function(e) {
          _this.$set(renderImages, index, {
            url: e.target.result,
            percent: 0,
            loading: true
          })
        }
        const config = {
          useCdnDomain: true,
          region: qiniu.region.z0
        }
        let key = (new Date().getTime() + '' + ((Math.random() * 1000) | 0)).substring(8)
        const arr = file.name.split('.')
        if (arr.length > 1) {
          key = arr[0].substr(0, 4) + key + '.' + arr[arr.length - 1]
        } else {
          key = arr[0].substr(0, 4) + key
        }
        const observable = qiniu.upload(file, key, token, {}, config)
        observable.subscribe({
          next(res) {
            const { renderImages } = _this
            if (!renderImages[index]) return
            _this.$set(renderImages[index], 'percent', res.total.percent)
          },
          error() {
            const { renderImages } = _this
            if (!renderImages[index]) return
            _this.$set(renderImages[index], 'error', true)
            _this.$set(renderImages[index], 'loading', false)
          },
          complete(res) {
            console.log(res.key, 'key')
            const { renderImages, resImages } = _this
            if (!renderImages[index]) return
            _this.$set(renderImages[index], 'error', false)
            _this.$set(renderImages[index], 'loading', false)
            _this.$set(resImages, index, {
              url: domain + res.key
            })
            _this.$emit('update:images', resImages)
          }
        })
      },
      onImageClick(index) {
        ImagePreview({
          images: this.renderImages.map(item => item.url),
          startPosition: index,
          closeOnPopstate: true
        })
      },
      remove(e, index) {
        e.preventDefault()
        e.stopPropagation()
        const { renderImages, resImages } = this
        renderImages.splice(index, 1)
        resImages.splice(index, 1)
        this.$emit('update:images', resImages)
      },
      parseInt(num) {
        return parseInt(num)
      }
    }
  }
</script>

<style lang="less" scoped>
.upload{
  background: #fff;
  padding: 20px 0 10px;
  .title{
    margin-left: 30px;
    white-space: nowrap;
    color: #000;
    font-size: 34px;
  }
}
.close{
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 100000000;
  color: #fff;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  i{
    font-size: 40px;
  }
}
.image-picker{
  padding: 16px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .input-item{
    width: 155px;
    height: 155px;
    margin-right: 10px;
    border-radius: 3px;
    font-size: 0;
    border: 1px solid #ccc;
    position: relative;
    svg {
      font-size: 60px;
      color: #ccc;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    input{
      display: block;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
  .image-item{
    width: 155px;
    height: 155px;
    margin-right: 10px;
    position: relative;
    .image{
      border-radius: 3px;
      width: 100%;
      height: 100%;
      background-size: cover;
    }
    .image-close{
      position: absolute;
      top:-5px ;
      right: -5px ;
      z-index:10;
      img{
        width: 32px;
        height: 32px;
      }
    }
    .image-bg{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,.6);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      border-radius: 3px;
      .svg-icon {
        font-size: 40px;
      }
      .shanchucha{
        color: red;
      }
    }
  }
}
</style>
<style>
  .van-image-preview__overlay{
    background-color:rgba(0,0,0,.7) !important;
  }
</style>
