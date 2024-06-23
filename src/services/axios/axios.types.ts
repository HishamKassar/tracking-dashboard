import { AxiosInstance, CreateAxiosDefaults } from 'axios'
import { Mutex } from 'async-mutex'

export type AxiosInstanceType = AxiosInstance

export type AxiosController = {
  withAccessInterceptor: (axiosInstance: AxiosInstanceType) => AxiosInstanceType
  withInterceptors: (axiosInstance: AxiosInstanceType) => AxiosInstanceType
  withUnauthorizedInterceptor: (
    axiosInstance: AxiosInstanceType
  ) => AxiosInstanceType
}

type GetTokenFunction = () => string | undefined | null

type BaseInterceptorOptions = {
  mutex: Mutex
}

export type InterceptorOptions = BaseInterceptorOptions & {
  authApiUrl: string
  getAccessToken?: GetTokenFunction
}

export type WithInterceptor = (
  axiosInstance: AxiosInstanceType,
  options: InterceptorOptions
) => AxiosInstanceType

export type WithAccessInterceptor = (
  axiosInstance: AxiosInstanceType,
  options?: Pick<InterceptorOptions, 'getAccessToken'>
) => AxiosInstanceType

export type MiddlewareController = {
  controllers: AxiosController
  axiosInstance: (config: CreateAxiosDefaults) => AxiosInstanceType
  accessToken: GetTokenFunction
}

export type CreateMiddlewareController = (
  options: Omit<InterceptorOptions, 'mutex'>
) => MiddlewareController

export type CreateAxiosInstance = (
  axiosController: AxiosController,
  config: CreateAxiosDefaults
) => AxiosInstance
