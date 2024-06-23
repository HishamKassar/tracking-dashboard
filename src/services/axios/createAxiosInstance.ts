import axios from 'axios'

import { CreateAxiosInstance } from './axios.types.ts'

export const createAxiosInstance: CreateAxiosInstance = (
  axiosController,
  config
) => {
  const instance = axios.create(config)

  instance.defaults.headers.common['Content-Type'] = 'application/json'
  instance.defaults.headers.common['Accept'] = 'application/json'

  return axiosController.withInterceptors(instance)
}
