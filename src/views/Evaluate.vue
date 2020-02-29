<template>
    <div class="evaluate">
        <template>
            <div class="top">
                <div class="top-left">
                    <span>{{((valueCustomText + valueCustomHalf)/2).toFixed(1)}}</span>
                    <p>综合评分</p>
                    <p class="top-div-p">高于周边商家69%</p>
                </div>
                <div class="top-right">
                    <p>
                        <span>服务态度</span>
                        <Rate show-text allow-half v-model="valueCustomText" class="rate" disabled>
                            <span style="color: #f5a623">{{ valueCustomText }}</span>
                        </Rate>
                    </p>
                    <p>
                        <span>服务态度</span>
                        <Rate show-text allow-half v-model="valueCustomHalf" class="rate" disabled>
                            <span style="color: #f5a623">{{ valueCustomHalf }}</span>
                        </Rate>
                    </p>
                    <p>
                        <span>送达时间</span>
                        <span class="cf2">44分钟</span>
                    </p>
                </div>
            </div>
            <div class="bottom">
                <div class="bottom-top-div">
                    <span class="active">全部 {{all}}</span>
                    <span>满意 {{satisfaction}}</span>
                    <span>不满意 {{dissatisfaction}}</span>
                </div>
                <div class="bottom-bottom-div" v-for="(v,i) in data" :key="i">
                    <img :src="v.avatar" alt="">
                    <div class="bottom-bottom-div-right">
                        <p class="username">{{v.username}}<span>{{date(v.rateTime)}}</span></p>
                        <Rate v-model="v.score" disabled></Rate>
                        <span v-show="v.deliveryTime">{{v.deliveryTime}}分钟送达</span>
                        <div class="text">{{v.text}}</div>
                        <p class="rateType">
                            <Icon type="md-happy" v-show="v.rateType == 0"/>
                            <Icon type="md-sad" v-show="v.rateType == 1" style="color:#ccc"/>
                            <span class="recommend" v-for="(value,index) in v.recommend" :key="index">{{value}}</span>
                        </p>
                    </div>
                </div> 
                <div class="h60"></div>
            </div>
        </template>
    </div>
</template>

<script>
import {getRatings} from '../api/apis'
    export default {
        data(){
            return {
                data:[],
                valueCustomText: 3.5,
                valueCustomHalf: 4.0,
                all:0,
                satisfaction:0,
                dissatisfaction:0,
                ratetime:''
            }
        },
        created(){
            getRatings().then((res) =>{
                // console.log(res.data.data);
                this.data = res.data.data;
                this.start();
            })
        },
        mounted(){
        },
        methods: {
            start(){
                this.all = this.data.length;
                for(let i in this.data){
                    if(this.data[i].rateType == 0){
                        this.satisfaction += 1;
                    }else{
                        this.dissatisfaction += 1;
                    }
                }
            },
            date(time){
                // console.log(time)
                var year=Math.floor(time/1000/60/60/24/30/12%12);
                var month=Math.floor(time/1000/60/60/24/30%30);
                var day=Math.floor(time/1000/60/60/24%24);
                var hours=Math.floor(time/1000/60/60%24);
                var min=Math.floor(time/1000/60%60);
                var str=`20${year}-${month}-${day} ${hours}:${min}`;
                return str;
            }
        },
    }
</script>

<style lang="less" scoped>
.evaluate{
    background-color: #f4f5f7;
    .top{
        height: 125px;
        padding: 20px;
        background-color: #fff;
        border-bottom: 1px solid #eaeaea;
        display: flex;
        margin-bottom: 20px;
        .top-left{
            padding-right: 15px;
            border-right: 1px solid #e2e2e2;
            text-align: center;
            span{
                font-size: 30px;
                color: #f60;
            }
            p{
                font-weight: bold;
            }
            .top-div-p{
                font-size: 12px;
                font-weight: normal;
                color: #ccc;
            }
        }
        .top-right{
            margin-left: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p{ 
                font-weight: bold;
                // margin-bottom: 5px;
                span{
                    margin-right: 10px;
                    font-size: 12px;
                }
                .rate{
                    font-size: 11px;
                }
                .cf2{
                    color: #b2b2b2;
                    font-weight: normal;
                }
            }
        }
    }
    .bottom{
        background-color: #fff;
        border-top: 1px solid #eaeaea;
        padding: 20px;
        height: 500px;
        overflow: scroll;
        .bottom-top-div{
            border-bottom: 1px solid #eaeaea;
            padding-bottom: 20px;
            span{
                display: inline-block;
                height: 35px;
                width: 70px;
                font-size: 12px;
                text-align: center;
                line-height: 35px;
                margin-left: 5px;
                background-color: #efefef;
                border-radius: 5px;
            }
            .active{
                background-color: skyblue;
                color: #fff;
            }
        }
        .bottom-bottom-div{
            display: flex;
            font-size: 12px;
            // height: 140px;
            width: 100%;
            border-bottom: 1px solid #eaeaea;
            padding: 20px 0;
            img{
                width: 30px;
                height: 30px;
                border-radius: 15px;
            }
            .bottom-bottom-div-right{
                margin-left: 10px;
                width: 100%;
                .username{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    span{
                        color: #ccc;
                    }
                }
                .rateType{
                    font-size: 18px;
                    .recommend{
                        font-size: 12px;
                        display: inline-block;
                        height: 20px;
                        line-height: 20px;
                        border: 1px solid #e3e3e3;
                        color: #ccc;
                        margin-left: 5px;
                    }
                }
            }
        }
        .h60{
            height: 60px;
        }
    }
}

</style>