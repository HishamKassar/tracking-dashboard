import { useMutation } from '@tanstack/react-query'
import { appToast, getRequestError } from 'utils'
import { trackingApi } from '../../trackingApi.ts'
import { AxiosError } from 'axios'
import { Location } from '../../types'

export const CREATE_TRIP_KEY = 'createTrip'

export interface CreateTrip {
  vendorId: string
  vehicleId: string
  pickUpLocation: Location
  dropOffLocation: Location
}

const createTrip = async (params: CreateTrip) => {
  return await trackingApi.post(`/trips`, params)
}

export const useCreateTrip = (onSuccess?: Function) =>
  useMutation({
    mutationFn: (data: CreateTrip) => createTrip(data),
    mutationKey: [CREATE_TRIP_KEY],
    onSuccess: data => onSuccess?.(data?.data),
    onError: error => {
      const responseError =
        typeof error === 'string'
          ? error
          : (error as AxiosError<any>).response?.data?.error
      appToast.error(getRequestError(responseError))
    }
  })
