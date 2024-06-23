import { Alert, Button, Card, Form, Input, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import styles from './Login.module.scss'
import { useLogin } from 'services'
import { useCallback, useEffect, useState } from 'react'
import { FieldType } from 'components/organisms/Login/Login.types.ts'
import { useOnLogin } from 'hooks'
import { useAppStore } from '../../../stores'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../../router'

export const Login = () => {
  const { mutateAsync: loginAsync, isPending, isError } = useLogin()
  const onLogin = useOnLogin()
  const { user } = useAppStore(({ user }) => ({ user }))
  const navigate = useNavigate()
  const [hasRole, setHasRole] = useState<boolean>(true)
  const onSubmitCredentials = useCallback(
    (values: FieldType) => {
      if (!values.username || !values.password) {
        return
      }

      setHasRole(true)
      loginAsync({
        username: values.username,
        password: values.password
      }).then(response => {
        setHasRole(onLogin(response.data))
      })
    },
    [loginAsync, onLogin]
  )

  useEffect(() => {
    if (user) {
      navigate(PATHS.tracking)
    }
  }, [navigate, user])

  return (
    <Card bordered={true} className={styles.loginCard}>
      <Typography.Title level={3} className={styles.title}>
        Log in to your account
      </Typography.Title>
      <Form
        name='login'
        className={styles.loginForm}
        initialValues={{ remember: true }}
        layout='vertical'
        size='large'
        onFinish={onSubmitCredentials}
      >
        <Form.Item
          name='username'
          label='Username'
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className={styles.loginForm_Button}
            loading={isPending}
          >
            Log in
          </Button>
        </Form.Item>
        {(isError || !hasRole) && (
          <Alert
            message={
              !hasRole
                ? "You don't have access to this dashboard"
                : 'Invalid credentials. Please check your information and try again.'
            }
            type='error'
            showIcon
          />
        )}
      </Form>
    </Card>
  )
}
