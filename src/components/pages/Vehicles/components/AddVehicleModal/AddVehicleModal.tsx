import { FC, useCallback } from 'react'
import { Form, Input, Modal } from 'antd'
import { AddVehicleModalProps } from './AddVehicleModal.types.ts'

interface Values {
  type: string
  plate: string
}

export const AddVehicleModal: FC<AddVehicleModalProps> = props => {
  const { isOpen, isLoading, onAddVehicle, onCancel } = props
  const [form] = Form.useForm<Values>()

  const onConfirm = useCallback(
    (values: Values) => {
      onAddVehicle(values.type, values.plate)
    },
    [onAddVehicle]
  )

  return (
    <Modal
      open={isOpen}
      title='Add new vehicle'
      okButtonProps={{
        autoFocus: true,
        htmlType: 'submit',
        loading: isLoading
      }}
      destroyOnClose
      centered={true}
      onCancel={onCancel}
      modalRender={dom => (
        <Form
          layout='vertical'
          form={form}
          name='add-vehicle-form'
          clearOnDestroy
          onFinish={values => onConfirm(values)}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item name='type' label='Vehicle Type' required>
        <Input required />
      </Form.Item>
      <Form.Item name='plate' label='Vehicle Plate No.' required>
        <Input required />
      </Form.Item>
    </Modal>
  )
}
