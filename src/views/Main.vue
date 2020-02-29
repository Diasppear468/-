<template>
  <div>
    <div
      class="mengban"
      :style="{background:'url('+data.avatar +')',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',backgroundSize: '100%'}"
    ></div>
    <div class="main-head">
      <div class="main-head-box">
        <div class="main-head-lbox">
          <img :src="data.avatar" />
        </div>
        <div class="main-head-rbox">
          <p class="top-box">
            <i>
              <img src="../assets/imgs/pinpai.png" />
            </i>
            {{data.name}}
          </p>
          <p class="middle-box">{{data.description}} / {{data.deliveryTime}}分钟送达</p>
          <p class="botton-box">
            <i>
              <img src="../assets/imgs/jian.png" />
            </i>
            {{data.supports[0].description}}
          </p>
        </div>
      </div>
      <p class="botton-strip">
        <i>
          <img src="../assets/imgs/gonggao.png" />
        </i>
        {{data.bulletin}}
      </p>
    </div>
    <div class="router-link-box">
      <router-link to="/goods">商品</router-link>
      <router-link to="/evaluate">评价</router-link>
      <router-link to="/merchant">商家</router-link>
    </div>
    <router-view></router-view>
    <div class="shopcart-box">
      <div class="shopcart-box-l">
        <div class="shopcart-img-box">
          <img src="../assets/imgs/shopcar.png" alt />
        </div>
        <p>
          ￥
          <span>0</span> | 另需配送费￥
          <span>4</span>元
        </p>
      </div>
      <div class="shopcart-box-r">￥20起送</div>
    </div>
  </div>
</template>

<script>
import { getSeller } from "../api/apis";
export default {
  data() {
    return {
      data: { supports: [{ description: "" }] } //商家信息对象
    };
  },
  created() {
    // 获取请求
    getSeller().then(res => {
      this.data = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.mengban {
  width: 100%;
  height: 210px;
  filter: blur(5px);
  position: absolute;
  z-index: -1;
  // top: 0;
}
.main-head {
  width: 100%;
  height: 170px;
  
  .main-head-box {
    display: flex;
    .main-head-lbox {
      width: 140px;

      img {
        width: 100px;
        margin: 20px 20px 10px 20px;
      }
    }
    .main-head-rbox {
      margin-top: 20px;
      color: #ffffff;
      .top-box {
        font-size: 18px;
        font-weight: bold;
        line-height: 16px;
        img {
          vertical-align: middle;
          width: 40px;
          margin-right: 10px;
        }
      }
      .middle-box {
        font-size: 18px;
        margin-top: 10px;
      }
      .botton-box {
        font-size: 16px;
        margin-top: 10px;
        img {
          vertical-align: middle;
        }
      }
    }
  }

  .botton-strip {
    width: 90%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #ffffff;
    img {
      width: 38px;
      vertical-align: middle;
      margin-left: 10px;
    }
  }
}
.router-link-box {
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
}
.shopcart-box {
  position: fixed;
  display: flex;
  width: 100%;
  height: 60px;
  bottom: 0;
  background-color: yellowgreen;
  .shopcart-box-l {
    flex: 1;
    p {
      display: inline-block;
      position: fixed;
      font-size: 18px;
      line-height: 60px;
    }
    .shopcart-img-box {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: yellow;
      text-align: center;
      margin: -10px 0 0 10px;
      display: inline-block;

      img {
        width: 50px;
        margin: 5px auto;
      }
    }
  }
  .shopcart-box-r {
    width: 120px;
    height: 100%;
    background-color: yellow;
    line-height: 60px;
    font-weight: bold;
    text-align: center;
    font-size: 20px;
  }
}
.router-link-exact-active {
  color: #ff6600;
  font-weight: bold;
  border-bottom: 3px solid pink;
}
</style>