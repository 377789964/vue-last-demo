import axios from 'axios'
import {getUserToken} from './auth.js'

const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config)
  if (config.url !== '/login') {
    // 注意token数据不能提前获取缓存，避免拿到的是之前的用户token数据
    const token = getUserToken()
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
const httpPlugin = {}
httpPlugin.install = function (Vue) {
  Vue.prototype.$http = http
}

export default httpPlugin
