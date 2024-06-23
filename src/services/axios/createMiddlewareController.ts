import { Mutex } from 'async-mutex'

import { getLocalStorageAccessToken } from '../utils'
import { AxiosController, CreateMiddlewareController } from './axios.types.ts'
import { createAxiosInstance } from './createAxiosInstance.ts'
import { withAccessInterceptor } from './withAccessInterceptor.ts'
import { withUnauthorizedInterceptor } from './withUnauthorizedInterceptor.ts'

export const createMiddlewareController: CreateMiddlewareController =
  options => {
    const mutex = new Mutex()

    const { getAccessToken = getLocalStorageAccessToken } = options || {}

    const controllers: AxiosController = {
      withAccessInterceptor: axiosInstance =>
        withAccessInterceptor(axiosInstance, {
          getAccessToken: options.getAccessToken
        }),
      withInterceptors: axiosInstance => {
        const instance = withAccessInterceptor(axiosInstance, {
          getAccessToken: options.getAccessToken
        })
        return withUnauthorizedInterceptor(instance, {
          ...options,
          mutex
        })
      },
      withUnauthorizedInterceptor: axiosInstance =>
        withUnauthorizedInterceptor(axiosInstance, {
          ...options,
          mutex
        })
    }

    return {
      controllers,
      axiosInstance: config => createAxiosInstance(controllers, config),
      accessToken: getAccessToken
    }
  }
