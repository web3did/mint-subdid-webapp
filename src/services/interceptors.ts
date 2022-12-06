import { AxiosResponse, AxiosError } from 'axios'
import errno from '~/constant/errno'

// 公共请求拦截器
export const commonRequestInterceptor = function (config: any) {
  // config.headers.Timestamp = Math.floor(Date.now() / 1000)
  return config
}

// 公共返回拦截器
export const commonResponseInterceptor = function (res: AxiosResponse) {
  return res.data
}

export const commonResponseOnRejected = function (err: AxiosError) {
  err.code = err?.response?.data?.code || err?.response?.status || errno.networkError
  // @ts-ignore
  err.message = err?.response?.data?.message || err?.response?.statusText || err.message
  throw err
}
