import { Card, Layout, theme } from 'antd'
import { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from 'components/organisms/Sidebar'
import styles from './AppTemplate.module.scss'
import { useAppStore } from 'stores'
import { PATHS } from '../../../router'
import { LoginResponse } from '../../../services'
import { useSocket } from '../../../hooks'

const { Content } = Layout

export const AppTemplate: FC = () => {
  const { setUser } = useAppStore(({ setUser }) => ({ setUser }))
  useSocket()

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const navigate = useNavigate()

  useEffect(() => {
    const onStorageChange = () => {
      const user = localStorage.getItem('user')
      if (user && user.length) {
        try {
          const parsedUser: LoginResponse = JSON.parse(user)
          if (parsedUser) {
            setUser(parsedUser)
          } else {
            setUser(null)
            localStorage.removeItem('user')
            navigate(PATHS.login)
          }
        } catch (err) {
          setUser(null)
          localStorage.removeItem('user')
          navigate(PATHS.login)
        }
      } else {
        setUser(null)
        localStorage.removeItem('user')
        navigate(PATHS.login)
      }
    }

    onStorageChange()
    window.addEventListener('storage', onStorageChange)

    return () => {
      window.removeEventListener('storage', onStorageChange)
    }
  }, [])

  return (
    <Layout className={styles.app}>
      <Layout>
        <Sidebar />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          <Card bordered={false}>
            <Outlet />
          </Card>
        </Content>
      </Layout>
    </Layout>
  )
}
