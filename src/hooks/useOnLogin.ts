import { useCallback } from 'react'
import { LoginResponse, setLocalStorageTokens } from '../services'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../router'

export const useOnLogin = () => {
  const navigate = useNavigate()
  return useCallback((loginResponse: LoginResponse) => {
    if (loginResponse.role !== 'admin') {
      localStorage.removeItem('user')
      return false
    }
    localStorage.setItem('user', JSON.stringify(loginResponse))
    setLocalStorageTokens(loginResponse.token)
    navigate(PATHS.tracking)
    return true
  }, [])
}
