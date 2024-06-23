import { Trip } from '../../types'
import { useQuery } from '@tanstack/react-query'
import { trackingApi } from '../../trackingApi.ts'

export const GET_TRIPS_QUERY_KEY = 'trips'
export type GetTripsResponse = Trip[]

export const getTrips = async (signal?: AbortSignal) => {
  const response = await trackingApi.get<GetTripsResponse>(`/trips`, {
    signal
  })
  return response.data
}

export const useGetTrips = () =>
  useQuery({
    queryKey: [GET_TRIPS_QUERY_KEY],
    queryFn: ({ signal }) => getTrips(signal)
  })
