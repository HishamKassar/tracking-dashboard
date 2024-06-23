import { Vehicle } from '../../types'
import { useQuery } from '@tanstack/react-query'
import { trackingApi } from '../../trackingApi.ts'

export const GET_VEHICLE_QUERY_KEY = 'vehicles'
export type GetVehicleResponse = Vehicle[]

export const getVehicles = async (signal?: AbortSignal) => {
  const response = await trackingApi.get<GetVehicleResponse>(`/vehicles`, {
    signal
  })
  return response.data
}

export const useGetVehicles = () =>
  useQuery({
    queryKey: [GET_VEHICLE_QUERY_KEY],
    queryFn: ({ signal }) => getVehicles(signal)
  })
