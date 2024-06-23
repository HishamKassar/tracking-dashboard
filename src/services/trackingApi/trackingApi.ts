import { middlewareController } from './middlewareController.ts'

const BASE_URL = `${import.meta.env.VITE_BASE_API_ENDPOINT}`
export const trackingApi = middlewareController.axiosInstance({
  baseURL: BASE_URL,
  headers: {},
  validateStatus: status => {
    return status >= 200 && status < 300 // default
  }
})
