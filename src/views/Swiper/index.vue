<template>
  <div>
    <van-nav-bar
      title="编辑轮播图"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="swiper page-content">
      <div class="pagination">
        <van-button>上一张</van-button>
        <span><span class="orange">2</span>/5</span>
        <van-button>下一张</van-button>
      </div>
      <van-cell-group>
        <van-field v-model="sort" clearable label="排序" placeholder="请输入排序"/>
        <van-field v-model="title" clearable label="标题" placeholder="请输入标题名称"/>
        <van-cell title="链接" is-link value="请选择链接" />
        <van-switch-cell v-model="checked" title="是否显示" />
      </van-cell-group>
      <Upload
        onlyOne
        title="幻灯片图片："
        :images.sync="images"
        token="M6YfaiMM5rPrvHpDuUvBgV7rTUPSyMz2VvT2svsX:qzbb-eOQtSSNXDR6uA0ia4F4U3s=:eyJzY29wZSI6ImRsaC1pbWFnZXMiLCJkZWFkbGluZSI6MTU2MDg0MTkzM30="
      />
      <div class="tip">建议尺寸：750*358，请将所有幻灯片尺寸保持一致</div>
    </div>
    <div class="page-button">
      <van-button @click="submit">提 交</van-button>
    </div>
    <toast v-model="$loadingPlugin.getList"/>
  </div>
</template>

<script>
import { NavBar, Button, Field, Cell, CellGroup, SwitchCell } from 'vant';
import Upload from '@/components/Upload'
import { timeout } from '@/utils'
import getCachedViewByName from '@/utils/getCachedViewByName'

export default {
  name:'swiper',
  components: {
    [NavBar.name]:NavBar,
    [Button.name]:Button,
    [Field.name]:Field,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
    [SwitchCell.name]:SwitchCell,
    Upload
  },
  data() {
    return {
      sort:2,
      title:'',
      checked:true,
      images:[]
    }
  },
  async created(){
    await this.getList()
  },
  methods:{
    async getList(){
      await timeout(3000)
      this.sort = 5
    },
    submit(){
      const instance = getCachedViewByName('shop');
      instance && instance.getList();
    }
  }
}
</script>

<style lang="less" scoped>
  .swiper{
    top: 92px;
    background: #fff;
    bottom: 140px;
  }
  .pagination{
    height: 124px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    color: #000;
    button{
      width: 168px;
      height: 94px;
      border-radius: 10px;
    }
    span{
      font-size: 30px;
    }
  }
  .tip{
    color: #888;
    font-size: 24px;
    padding-left: 30px;
  }
</style>
<style lang="less">
  .swiper{
    .van-cell__title{
      font-weight: bold;
      font-size: 32px;
      width: 180px;
      flex: none;
    }
    .van-cell__value{
      text-align: left;
      font-size: 32px;
    }
    .input-item,.image-item{
      width: 675px !important;
      height: 322px !important;
      svg {
        font-size: 80px !important;
      }
    }
    .upload .title{
      color: #888;
    }
  }
</style>
