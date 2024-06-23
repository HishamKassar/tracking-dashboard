import { QueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { getRequestError } from 'utils'
import { appToast } from '../utils'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      retry: false,
      throwOnError: error => {
        const responseError =
          typeof error === 'string'
            ? error
            : (error as AxiosError<any>).response?.data?.error
        appToast.error(getRequestError(responseError))
        return false
      }
    },
    mutations: {
      onError: error => {
        const responseError = (error as AxiosError<any>).response?.data?.error

        const errorMessage = 'Unexpected error. Try later'

        if (typeof responseError === 'object') {
          const errorValues: any = Object.values(responseError)
          return errorValues.forEach((e: string[] | string) => {
            if (e.length) {
              return (e as string[]).forEach(m => appToast.error(m))
            }
            return appToast.error(e as string)
          })
        } else if (typeof responseError === 'string') {
          return appToast.error(responseError)
        }

        return appToast.error(errorMessage)
      }
    }
  }
})
