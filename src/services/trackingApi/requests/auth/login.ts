import { useMutation } from '@tanstack/react-query'
import { appToast, getRequestError } from 'utils'
import { trackingApi } from '../../trackingApi.ts'
import { UserWithAccess } from '../../../../stores'

export const LOGIN_MUTATION_KEY = 'login'

export interface LoginRequest {
  username: string
  password: string
}

export type LoginResponse = UserWithAccess

const login = async (params: LoginRequest) => {
  return await trackingApi.post<LoginResponse>('/auth/login', params)
}

export const useLogin = (onSuccess?: Function) =>
  useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    mutationKey: [LOGIN_MUTATION_KEY],
    onSuccess: data => onSuccess?.(data?.data),
    onError: error => {
      if (typeof error === 'string') {
        appToast.error(getRequestError(error))
      }
    }
  })
