<template>
  <div class="goods-box">
    <div class="lbox">
      <ul class="content">
        <div
          v-for="(v,i) in data"
          :key="i"
          :class="{goodsLbox:true, selected:i==curIndex}"
          @click="clickLeftTitle(i)"
        >
          <span>
            <img src="../assets/imgs/zhe.png" v-show="v.type==1" />
            <img src="../assets/imgs/jian.png" v-show="v.type==2" />
            <img src="../assets/imgs/piao.png" v-show="v.type==3" />
            <img src="../assets/imgs/bao.png" v-show="v.type==4" />
          </span>
          {{v.name}}
        </div>
        <div class="h50"></div>
      </ul>
    </div>
    <div class="rbox">
      <ul class="content">
        <div :id="i" v-for="(v,i) in data" :key="v.id" class="goods-box-t">
          {{v.name}}
          <div v-for="va in v.foods" :key="va.id" class="goods-box-b">
            <div class="goods-list">
              <img :src="va.icon" />
              <div class="goods-list-r">
                <h3>{{va.name}}</h3>
                <p class>{{va.description}}</p>
                <p>
                  <span class="span-r">月售{{va.sellCount}}</span>
                  <span>好评率{{va.rating}}%</span>
                </p>
                <p>
                  <span class="red">￥{{va.price}}</span>
                  <span v-show="va.oldPrice!=''" class="del">￥{{va.oldPrice}}</span>
                  <span class="count">
                    <Icon type="md-remove-circle" />0
                    <Icon type="md-add-circle" />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="h50"></div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getGoods } from "../api/apis";
import BScroll from "better-scroll"; //引入better插件

export default {
  data() {
    return {
      data: [],
      curIndex: 0 //当前选中索引
    };
  },
  created() {
    getGoods().then(res => {
      this.data = res.data.data;
    });
  },
  mounted() {
    // new BScroll(DOM节点，滚动配置)

    new BScroll(document.querySelector(".lbox"), {
      click: true //允许容器点击
    }),
      (this.rightDiv = new BScroll(document.querySelector(".rbox")));
  },
  methods: {
    clickLeftTitle(i) {
      this.curIndex = i;
      // 左侧索引index，对应右侧DIV id
      this.rightDiv.scrollToElement(document.getElementById(i), 600); //用实例对象.要调用的函数
    }
  }
};
</script>

<style lang="less" scoped>
.selected {
  //点击选项卡，把新的索引保存起来
  background: #fff;
}
.goods-box {
  display: flex;
  background-color: #dadee2;
  height: 100%;
  .lbox {
    height: 500px;
    background-color: #dadee2;
    overflow: scroll;
    .goodsLbox {
      width: 100px;
      height: 60px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid slateblue;
      img {
        width: 19px;
        vertical-align: middle;
      }
    }
  }
    .h50{
      height: 50px;
    }
  .rbox {
    flex: 1;
    height: 500px;
    overflow: scroll;
    .goods-box-t {
      .goods-box-b {
        height: 160px;
        background: #ffffff;
        border-bottom: 1px solid #000;
        .goods-list {
          width: 290px;
          height: 160px;
          padding: 19px;
          display: flex;
          .count {
            text-align: right;
            font-size: 20px;
            margin-left: 60px;
          }
          img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
          }
          .goods-list-r {
            width: 240px;
            h3 {
              color: #000;
            }
            .span-r {
              margin-right: 10px;
            }
            .red {
              font-size: 20px;
              font-weight: bold;
              color: red;
            }
            .del {
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
}
</style>