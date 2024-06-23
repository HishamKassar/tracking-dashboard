import { WithInterceptor } from './axios.types.ts'

export const withUnauthorizedInterceptor: WithInterceptor = axiosInstance => {
  axiosInstance.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error?.response?.status === 401) {
        localStorage.removeItem('user')
      }
      return Promise.reject(error)
    }
  )

  return axiosInstance
}
