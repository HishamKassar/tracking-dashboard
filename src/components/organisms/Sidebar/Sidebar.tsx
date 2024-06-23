/// <reference types="vite-plugin-svgr/client" />

import { Layout, Menu, Tooltip } from 'antd'
import { CarOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import styles from './Sidebar.module.scss'
import { useOnLogout } from 'hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppStore } from 'stores'
import LocationIcon from 'assets/location.svg'
import { PATHS } from 'router'

const { Sider } = Layout

export const Sidebar = () => {
  const onLogout = useOnLogout()
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAppStore(({ user }) => ({ user }))

  return (
    <Sider className={styles.sidebar} trigger={null}>
      <div className={styles.headerLogo}>Tracking App</div>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['statistics']}
        selectedKeys={[location.pathname.split('/')[1]]}
        items={[
          {
            key: 'tracking',
            icon: <LocationIcon />,
            label: 'Tracking',
            onClick: () => {
              navigate(PATHS.tracking)
            }
          },
          {
            key: 'vehicles',
            icon: <CarOutlined />,
            label: 'Vehicles',
            onClick: () => {
              navigate(PATHS.vehicles)
            }
          },
          {
            key: 'vendors',
            icon: <UserOutlined />,
            label: 'Vendors',
            onClick: () => {
              navigate(PATHS.vendors)
            }
          },
          {
            key: 'trips',
            icon: <LocationIcon />,
            label: 'Trips',
            onClick: () => {
              navigate(PATHS.trips)
            }
          }
        ]}
      />
      <div className={styles.logoutButton}>
        <Tooltip placement='top' title='Logout' arrow>
          <LogoutOutlined onClick={onLogout} />
        </Tooltip>
        <span>{user?.username}</span>
      </div>
    </Sider>
  )
}
