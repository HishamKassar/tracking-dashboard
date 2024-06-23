import { AddTripModalProps } from './AddTripModal.types'
import { FC, useCallback, useState } from 'react'
import { Form, Input, Modal, Radio, Select } from 'antd'
import { Map } from 'components/organisms/Map'
import { MarkerProps } from 'react-leaflet'
import { Icon } from 'leaflet'

interface Values {
  vendorId: string
  vehicleId: string
  tripCoords: {
    start: [number, number]
    end: [number, number]
  }
}

const startIcon = new Icon({
  iconUrl: '/src/assets/start_location.svg',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 35], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor,
})

const endIcon = new Icon({
  iconUrl: '/src/assets/end_location.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 35],
  popupAnchor: [1, -34]
})

export const AddTripModal: FC<AddTripModalProps> = props => {
  const { isOpen, onAddTrip, onCancel, isLoading, vendors, vehicles } = props
  const [form] = Form.useForm<Values>()
  const [isDisabled, setIsDisabled] = useState(true)
  const [selectedMarker, setSelectedMarker] = useState('start')
  const [markers, setMarkers] = useState<MarkerProps[]>([])

  const onConfirm = useCallback(
    (values: Values) => {
      if (
        !values.vendorId ||
        !values.vehicleId ||
        !values.tripCoords?.start ||
        !values.tripCoords?.end
      ) {
        return
      }

      onAddTrip(
        values.vendorId,
        values.vehicleId,
        values.tripCoords.start,
        values.tripCoords.end
      )
    },
    [onAddTrip]
  )

  const onFormValuesChange = useCallback((_: any, values: Values) => {
    if (
      !values.vendorId ||
      !values.vehicleId ||
      !values.tripCoords?.start ||
      !values.tripCoords?.end
    ) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [])

  const handleAddMarker = useCallback(
    (lat: number, lng: number) => {
      form.setFieldValue(['tripCoords', selectedMarker], [lat, lng])
      const markers: MarkerProps[] = []
      const tripCoords = form.getFieldValue('tripCoords')
      if (tripCoords?.start?.[0] && tripCoords?.start?.[1]) {
        markers.push({
          position: {
            lat: tripCoords.start[0],
            lng: tripCoords.start[1]
          },
          icon: startIcon
        })
      }
      if (tripCoords?.end?.[0] && tripCoords?.end?.[1]) {
        markers.push({
          position: {
            lat: tripCoords.end[0],
            lng: tripCoords.end[1]
          },
          icon: endIcon
        })
      }
      setMarkers(markers)
      onFormValuesChange({}, form.getFieldsValue())
    },
    [form, selectedMarker]
  )

  return (
    <Modal
      open={isOpen}
      title='Add new trip'
      okButtonProps={{
        autoFocus: true,
        htmlType: 'submit',
        disabled: isDisabled,
        loading: isLoading
      }}
      width={800}
      destroyOnClose
      centered={true}
      onCancel={onCancel}
      modalRender={dom => (
        <Form
          layout='vertical'
          form={form}
          name='add-tip-modal-form'
          clearOnDestroy
          onFinish={values => onConfirm(values)}
          onValuesChange={onFormValuesChange}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item name='vendorId' label='Driver' required>
        <Select
          showSearch
          placeholder='Select a person'
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={vendors.map(vendor => ({
            value: vendor.id,
            label: vendor.username
          }))}
        />
      </Form.Item>
      <Form.Item name='vehicleId' label='Vehicle' required>
        <Select
          showSearch
          placeholder='Select a person'
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={vehicles.map(vehicle => ({
            value: vehicle.id,
            label: `${vehicle.type} - ${vehicle.plate}`
          }))}
        />
      </Form.Item>
      <Form.Item
        hidden
        name={['tripCoords', 'start']}
        label='Start Coordinates'
      >
        <Input readOnly />
      </Form.Item>
      <Form.Item hidden name={['tripCoords', 'end']} label='End Coordinates'>
        <Input readOnly />
      </Form.Item>
      <Form.Item label='Trip details' required>
        <Radio.Group
          defaultValue='start'
          buttonStyle='solid'
          onChange={e => {
            setSelectedMarker(e.target.value)
          }}
          style={{
            marginBottom: 24
          }}
        >
          <Radio.Button value='start'>Start Marker</Radio.Button>
          <Radio.Button value='end'>End Marker</Radio.Button>
        </Radio.Group>
        {isOpen && (
          <Map
            height='400px'
            center={[25.205350954551115, 55.27059162262561]}
            onAddMarker={(lat, lng) => {
              handleAddMarker(lat, lng)
            }}
            markers={markers.map(marker => ({
              markerProps: marker
            }))}
          />
        )}
      </Form.Item>
    </Modal>
  )
}
