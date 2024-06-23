import { VehicleLocation } from '../../types'
import { useQuery } from '@tanstack/react-query'
import { trackingApi } from '../../trackingApi.ts'

export const GET_VEHICLE_LOCATIONS_QUERY_KEY = 'vehicleLocations'
export type GetVehicleLocationsResponse = VehicleLocation[]

export const getVehicleLocations = async (signal?: AbortSignal) => {
  const response = await trackingApi.get<GetVehicleLocationsResponse>(
    `/vehicleLocations`,
    {
      signal
    }
  )
  return response.data
}

export const useGetVehicleLocations = () =>
  useQuery({
    queryKey: [GET_VEHICLE_LOCATIONS_QUERY_KEY],
    queryFn: ({ signal }) => getVehicleLocations(signal)
  })
