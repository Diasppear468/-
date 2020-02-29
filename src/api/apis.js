// 所有请求封装接口文件(方便项目后期维护，所有请求统一管理)
import axios from 'axios'//引入axios请求

//创建请求对象
let req=axios.create({
    baseURL:'http://192.168.1.2:3000/' ,//初始路径
    timeout:10000   //单位毫秒  请求到时间提示超时
})

// 封装axios

//请求商家信息
export function getSeller(){
    return req.get('/api/seller')
}

//请求商品信息
export function getGoods(){
    return req.get('/api/goods')
}

//请求商品信息
export function getRatings(){
    return req.get('/api/ratings')
}
