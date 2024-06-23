import { getLocalStorageAccessToken } from '../utils'
import { WithAccessInterceptor } from './axios.types.ts'

export const withAccessInterceptor: WithAccessInterceptor = (
  axiosInstance,
  options
) => {
  const { getAccessToken = getLocalStorageAccessToken } = options || {}

  axiosInstance.interceptors.request.use(config => {
    const token = getAccessToken()

    if (config.headers && token) {
      config.headers.Authorization = `${token}`
    }

    return config
  })

  return axiosInstance
}
