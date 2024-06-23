import { useMutation } from '@tanstack/react-query'
import { appToast, getRequestError } from 'utils'
import { trackingApi } from '../../trackingApi.ts'
import { AxiosError } from 'axios'

export const CREATE_VEHICLE_KEY = 'createVehicle'

export interface CreateVehicle {
  type: string
  plate: string
}

const createVehicle = async (params: CreateVehicle) => {
  return await trackingApi.post(`/vehicles`, params)
}

export const useCreateVehicle = (onSuccess?: Function) =>
  useMutation({
    mutationFn: (data: CreateVehicle) => createVehicle(data),
    mutationKey: [CREATE_VEHICLE_KEY],
    onSuccess: data => onSuccess?.(data?.data),
    onError: error => {
      const responseError =
        typeof error === 'string'
          ? error
          : (error as AxiosError<any>).response?.data?.error
      appToast.error(getRequestError(responseError))
    }
  })
