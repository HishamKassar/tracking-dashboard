import { ToastContainerProps } from 'react-toastify'

export type AppToastProps = {
  toastContainerProps?: Omit<ToastContainerProps, 'className'>
  className?: string
}
