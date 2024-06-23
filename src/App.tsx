import './App.css'
import { routes } from './router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './services'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppToast } from 'components/molecules/AppToast'
import { ConfigProvider, theme } from 'antd'

const App = () => {
  const router = createBrowserRouter(routes)

  return (
    <ConfigProvider
      theme={{
        ...theme,
        token: {
          colorPrimary: '#103561',
          colorInfo: '#103561',
          sizeStep: 4,
          borderRadius: 4
        }
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <AppToast />
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App
