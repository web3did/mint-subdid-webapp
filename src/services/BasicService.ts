import Axios, { AxiosInstance } from 'axios'
import { servicesApi } from '~~/config'
import { commonRequestInterceptor, commonResponseInterceptor, commonResponseOnRejected } from '~/services/interceptors'

export class BasicService {
  axios: AxiosInstance

  constructor () {
    this.axios = Axios.create({
      baseURL: servicesApi + '/api'
    })
    this.axios.interceptors.request.use(commonRequestInterceptor)
    this.axios.interceptors.response.use(commonResponseInterceptor, commonResponseOnRejected)
  }
}
