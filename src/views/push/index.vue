<template>
  <div>
    <van-nav-bar
      title="发布商品"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="push page-content">
      <van-cell-group>
        <van-field v-model="sort" clearable label="排序" placeholder="请输入排序" />
        <van-field v-model="title" clearable label="名称" placeholder="请输入商品名称" />
        <van-field v-model="price" clearable label="价格" placeholder="请输入价格" />
      </van-cell-group>
      <Upload
        title="商品图片："
        :images.sync="images"
        token="M6YfaiMM5rPrvHpDuUvBgV7rTUPSyMz2VvT2svsX:qzbb-eOQtSSNXDR6uA0ia4F4U3s=:eyJzY29wZSI6ImRsaC1pbWFnZXMiLCJkZWFkbGluZSI6MTU2MDg0MTkzM30="
      />
      <ul class="list">
        <li v-for="(item,index) in list" :key="index" class="item">
          <input v-model="item.key" type="text" placeholder="参数名称">
          <input v-model="item.value" type="text" placeholder="参数值">
          <van-button v-if="index===list.length-1" icon="add" type="primary" @click="add" />
          <van-button v-else icon="delete" type="danger" @click="del(index)" />
        </li>
      </ul>
    </div>
    <div class="page-button">
      <van-button>发布</van-button>
    </div>
  </div>
</template>

<script>
  import { NavBar, Button, Field, Cell, CellGroup, SwitchCell } from 'vant'
  import Upload from '@/components/Upload'

  export default {
    name: 'push',
    components: {
      [NavBar.name]: NavBar,
      [Button.name]: Button,
      [Field.name]: Field,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [SwitchCell.name]: SwitchCell,
      Upload
    },
    data() {
      return {
        sort: 8,
        title: '',
        price: '',
        list: [
          { key: '含量', value: '120粒' },
          { key: '', value: '' }
        ],
        images: []
      }
    },
    methods: {
      add() {
        this.list.push({ key: '', value: '' })
      },
      del(index) {
        this.list.splice(index, 1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .push{
    top: 92px;
    background: #fff;
    bottom: 140px;
  }
  .list{
    padding: 50px 30px 0;
    .item{
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      input{
        outline: none;
        border: 1px solid #E6E6E6;
        border-radius: 6px;
        width: 280px;
        height: 92px;
        margin-right: 15px;
        padding: 10px;
        box-sizing: border-box;
      }
      button{
        height: 80px;
        line-height: 76px;
        padding: 0 28px;
      }
    }
  }

</style>
<style lang="less">
  .push{
    .van-cell{
      font-size: 32px;
    }
    .van-cell__title{
      font-weight: bold;
      width: 180px;
      flex: none;
    }
    .van-cell__value{
      text-align: left;
    }
    .upload .title{
      color: #888;
    }
  }
</style>
