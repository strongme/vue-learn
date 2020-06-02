import axios from 'axios'
import Adapter from 'axios-mock-adapter'
import { get } from 'lodash'
import { errorLog, errorCreate } from '@/api/tools'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

/**
 * 创建请求实例
 * @returns {AxiosInstance}
 */
function createService () {
  const service = axios.create()
  // 请求拦截
  service.interceptors.request.use(
    config => {
      Nprogress.start()
      return config
    },
    error => {
      console.error(error)
      return Promise.reject(error)
    }
  )
  // 响应拦截
  service.interceptors.response.use(
    response => {
      Nprogress.done()
      const { data: dataRequest, config: { url } } = response
      const { code, msg } = dataRequest
      if (code === undefined) {
        // 返回数据未定义code，直接由组件使用的地方来处理结果
        return dataRequest
      } else {
        // 有响应编码，可以全局进一步处理
        switch (code) {
          case 0:
            return response
          case 1:
            errorCreate(msg || url, false)
            return response
          default: {
            errorCreate(msg || url)
            break
          }
        }
      }
    },
    error => {
      Nprogress.done()
      if (error && error.response) {
        switch (error.response.status) {
          case 400: error.message = '请求错误'; break
          case 401: error.message = '未授权，请登录'; break
          case 403: error.message = '拒绝访问'; break
          case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
          case 408: error.message = '请求超时'; break
          case 500: error.message = '服务器内部错误'; break
          case 501: error.message = '服务未实现'; break
          case 502: error.message = '网关错误'; break
          case 503: error.message = '服务不可用'; break
          case 504: error.message = '网关超时'; break
          case 505: error.message = 'HTTP版本不受支持'; break
          default: break
        }
      }
      errorLog(error)
      return Promise.reject(error)
    }
  )
  return service
}

function createRequestFunction (service) {
  return function (config) {
    const token = 'token'
    const configDefault = {
      headers: {
        Authorization: token,
        'Content-Type': get(config, 'headers.Content-Type', 'application/json')
      },
      timeout: 5000,
      baseURL: process.env.VUE_APP_API,
      data: {}
    }
    return service(Object.assign(configDefault, config))
  }
}

// 用于真实接口请求的实例和方法
export const service = createService()
export const request = createRequestFunction(service)

// 用于mock请求的实例和方法
export const serviceForMock = createService()
export const requestForMock = createRequestFunction(serviceForMock)

// 网络请求模拟工具
export const mock = new Adapter(serviceForMock)
