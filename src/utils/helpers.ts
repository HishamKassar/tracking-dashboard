import { GENERIC_ERROR } from 'constants/globals'

export const getRequestError = (error: any) => {
  if (typeof error === 'object') {
    const errorValues: any = Object.values(error)
    return (
      errorValues.map((e: string[] | string) => {
        if (e.length) {
          return e as string[]
        }
        return e
      })[0] ?? undefined
    )
  } else if (typeof error === 'string') {
    return error
  }

  return GENERIC_ERROR
}
