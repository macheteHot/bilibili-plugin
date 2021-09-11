import axios from 'axios'
import Qs from 'qs'
import { anyObj } from '@/interface'

// 此函数 返回 将会把返回数据放到所有接口中! 适用于对所有请求添加同样参数的情况
const getAllData = (): anyObj => ({

})
// 不走lodash cloneDeep 调用toJSON

function JSONClone<T> (obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

const http = axios.create({
  withCredentials: true
  // 不使用baseUrl 以适应各种部署情况
  // timeout: 5000 不超时
})

http.interceptors.response.use(
  (response) => {
    const res = response.data
    return res.data
  },
  (error) => {
    throw new Error(JSON.stringify(error))
  }
)

export function get <T> (url:string) {
  return (params = {}): Promise<T> => {
    return http.get(url, {
      params: JSONClone({ ...params, ...getAllData() }),
      paramsSerializer: (x) => Qs.stringify(x, { arrayFormat: 'repeat' })
    })
  }
}

// post JSON 默认调用 toJSON
export function post <T> (url: string) {
  return (data = {}): Promise<T> => {
    return http.post(url, { ...data, ...getAllData() })
  }
}
// post 表单 手动 toJSON
export function form <T> (url: string) {
  return (data = {}): Promise<T> => {
    // 达到和直接post json 一样的效果 先调用 toJSON
    return http.post(
      url,
      Qs.stringify(JSONClone({ ...data, ...getAllData() }), {
        arrayFormat: 'repeat'
      })
    )
  }
}
// temp post 但是拼接URL 临时使用

export function temp <T> (url: string) {
  return (params = {}): Promise<T> => {
    return http.post(url, {}, { params: { ...params, ...getAllData() } })
  }
}
