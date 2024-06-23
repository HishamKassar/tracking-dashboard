import { Id, toast, ToastContent, ToastOptions } from 'react-toastify'

export const TOASTIFY_ID = 'tracking-app-toast'

const TOAST_METHODS = [
  'loading',
  'success',
  'info',
  'error',
  'warning',
  'warn'
] as const

type AppToast = {
  // eslint-disable-next-line no-unused-vars
  [key in (typeof TOAST_METHODS)[number]]: (
    content: ToastContent,
    options?: Omit<ToastOptions, 'containerId'>
  ) => Id
}

const initializeCustomToast = (containerId: string) => {
  return TOAST_METHODS.reduce<AppToast>(
    (prev, curr) => ({
      ...prev,
      [curr]: (
        content: ToastContent,
        options?: Omit<ToastOptions, 'containerId'>
      ) => toast[curr](content, { ...options, containerId })
    }),
    {} as AppToast
  )
}

export const appToast = initializeCustomToast(TOASTIFY_ID)
