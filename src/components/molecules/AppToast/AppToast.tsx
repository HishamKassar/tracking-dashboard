import cn from 'classnames'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { TOASTIFY_ID } from 'utils/toast'
import { AppToastProps } from './AppToast.types'
import { FC } from 'react'

export const AppToast: FC<AppToastProps> = ({
  toastContainerProps,
  className
}) => {
  return (
    <ToastContainer
      containerId={TOASTIFY_ID}
      className={cn(className)}
      position='bottom-right'
      autoClose={4000}
      limit={5}
      newestOnTop
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme='light'
      {...toastContainerProps}
    />
  )
}
