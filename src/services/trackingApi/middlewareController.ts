import { createMiddlewareController } from '../axios'

export const middlewareController = createMiddlewareController({
  authApiUrl: `${import.meta.env.VITE_BASE_API_ENDPOINT as string}/Users`
})
