import { FC } from 'react'
import { Modal } from 'antd'
import { TripLocationModalProps } from './TripLocationModal.types.ts'
import { Map } from 'components/organisms/Map'
import { Icon } from 'leaflet'

export const TripLocationModal: FC<TripLocationModalProps> = props => {
  const { isOpen, startLocation, endLocation, onCancel } = props

  return (
    <Modal
      open={isOpen}
      title='Trip details'
      destroyOnClose
      centered={true}
      maskClosable
      onCancel={onCancel}
      footer={<></>}
    >
      <Map
        height='400px'
        center={[25.205350954551115, 55.27059162262561]}
        markers={[startLocation, endLocation].map((location, index) => ({
          markerProps: {
            position: {
              lat: location.latitude,
              lng: location.longitude
            },
            icon: new Icon({
              iconUrl:
                index === 0
                  ? '/src/assets/start_location.svg'
                  : '/src/assets/end_location.svg',
              iconSize: [36, 41], // size of the icon
              iconAnchor: [12, 35], // point of the icon which will correspond to marker's location
              popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor,
            })
          }
        }))}
      />
    </Modal>
  )
}
