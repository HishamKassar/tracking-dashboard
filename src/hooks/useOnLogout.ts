import { useCallback } from 'react'
import { useAppStore } from '../stores'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../router'

export const useOnLogout = () => {
  const { setUser } = useAppStore(({ setUser }) => ({ setUser }))
  const navigate = useNavigate()

  return useCallback(() => {
    setUser(null)
    localStorage.removeItem('user')
    navigate(PATHS.login)
  }, [navigate, setUser])
}
