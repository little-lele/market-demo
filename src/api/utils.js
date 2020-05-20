import axios from 'axios'
// 进度条

import store from '../store/index.js'

const instance = axios.create({
    // baseURL: 'http://127.0.0.1:8888/api/private/v1/'
    baseURL: 'http://47.106.196.122:8888/api/private/v1/'

})

// 请求拦截
instance.interceptors.request.use(
    (config) => {
        //在请求头提供token
        const token = store.getters.token || window.sessionStorage.getItem('token')

        if (token) {
            config.headers.Authorization = token
        }

        return config
    },
    (err) => Promise.reject(err)
)
// 响应拦截
instance.interceptors.response.use(
    (result) => {

        return result.data
    },
    (err) => Promise.reject(err)
)

export default instance
