import { User } from '../../types'
import { useQuery } from '@tanstack/react-query'
import { trackingApi } from '../../trackingApi.ts'

export const GET_VENDORS_QUERY_KEY = 'vendors'
export type GetVendorsResponse = User[]

export const getVendors = async (signal?: AbortSignal) => {
  const response = await trackingApi.get<GetVendorsResponse>(`/users/vendors`, {
    signal
  })
  return response.data
}

export const useGetVendors = () =>
  useQuery({
    queryKey: [GET_VENDORS_QUERY_KEY],
    queryFn: ({ signal }) => getVendors(signal)
  })
