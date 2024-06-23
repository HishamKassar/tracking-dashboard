import { Flex, Layout, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import landingImage from 'assets/landing.jpg'
import styles from './LandingTemplate.module.scss'

const { Content } = Layout

export const LandingTemplate = () => {
  const {
    token: { colorPrimary }
  } = theme.useToken()

  return (
    <Flex className={styles.container}>
      <div
        className={styles.container_LeftSide}
        style={{
          backgroundImage: `linear-gradient(#103561, #103561), url(${landingImage})`
        }}
      >
        <div className={styles.container_LeftSide_Overlay} />
        <h3 className={styles.container_LeftSide_Text}>
          Tracking Management System
        </h3>
      </div>
      <Content
        className={styles.container_RightSide}
        style={{
          background: colorPrimary
        }}
      >
        <Outlet />
      </Content>
    </Flex>
  )
}
