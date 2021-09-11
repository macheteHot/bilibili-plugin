import { anyObj } from '@/interface'
import { IGetSessionInterFace } from '@/interface/getSessionInterFace'
import {
  get,
  post,
  form, // post 表单
  temp // 临时post 拼接URL
} from './require'

const apis = {
  demoGet: get<unknown[]>('/api/isDemo/getApi'),
  demoPost: post<anyObj[]>('/apiisDemo/postApi'),
  demoForm: form<anyObj>('isDemo/formApi'),
  demoTemp: temp<string[]>('isDemo/tempApi'),
  getSession: get<IGetSessionInterFace>('https://api.vc.bilibili.com/session_svr/v1/session_svr/get_sessions')
}

export default apis
