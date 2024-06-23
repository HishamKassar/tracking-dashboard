import { Map } from 'components/organisms/Map/Map.tsx'
import { Button, Flex, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from 'react'
import { AddTripModal } from 'components/organisms/AddTripModal'
import {
  useCreateTrip,
  useGetVehicleLocations,
  useGetVehicles,
  useGetVendors,
  VehicleLocationTripStatus
} from 'services'
import { Icon } from 'leaflet'
import { useAppStore } from '../../../stores'
import { appToast } from '../../../utils'
import { MapProps } from 'components/organisms/Map/Map.types.ts'

export const Tracking = () => {
  const { vehicleLocations, setVehicleLocations } = useAppStore()
  const [isAddTripModalOpen, setIsAddTripModalOpen] = useState(false)
  const { data: fetchedVehicleLocations } = useGetVehicleLocations()
  const { data: vendors } = useGetVendors()
  const { data: vehicles } = useGetVehicles()
  const { mutateAsync: createTrip, isPending } = useCreateTrip()

  useEffect(() => {
    if (!vehicleLocations && fetchedVehicleLocations) {
      setVehicleLocations(fetchedVehicleLocations)
    }
  }, [fetchedVehicleLocations, vehicleLocations])

  const vehicleMarkers: MapProps['markers'] = useMemo(() => {
    return vehicleLocations?.map(location => {
      const vehicle = vehicles?.find(
        vehicle => vehicle.id === location.vehicleId
      )
      const vendor = vendors?.find(vendor => vendor.id === location.vendorId)
      const popup =
        vehicle || vendor ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <span>{vendor?.username}</span>
            <span>
              {vehicle?.type} - {vehicle?.plate}
            </span>
          </div>
        ) : undefined
      return {
        markerProps: {
          position: {
            lat: location.currentLocation.latitude,
            lng: location.currentLocation.longitude
          },
          icon: new Icon({
            iconUrl:
              location.status === VehicleLocationTripStatus.ONLINE
                ? '/src/assets/online_vehicle.svg'
                : '/src/assets/offline_vehicle.svg',
            iconSize: [36, 41], // size of the icon
            iconAnchor: [12, 35], // point of the icon which will correspond to marker's location
            popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor,
          })
        },
        popup
      }
    })
  }, [vehicleLocations, vehicles, vendors])

  return (
    <Flex vertical gap={48}>
      <Flex justify='space-between' align='center'>
        <Typography.Title
          level={3}
          style={{
            margin: 0
          }}
        >
          Tracking
        </Typography.Title>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          size='large'
          onClick={() => {
            setIsAddTripModalOpen(true)
          }}
        >
          Add Trip
        </Button>
      </Flex>
      <Map
        height={'calc(100vh - 300px)'}
        center={[25.205350954551115, 55.27059162262561]}
        markers={vehicleMarkers}
      />
      {isAddTripModalOpen && (
        <AddTripModal
          isOpen={isAddTripModalOpen}
          vendors={vendors ?? []}
          vehicles={vehicles ?? []}
          onAddTrip={(driverId, vehicleId, startCoords, endCoords) => {
            createTrip({
              vendorId: driverId,
              vehicleId,
              pickUpLocation: {
                latitude: startCoords[0],
                longitude: startCoords[1]
              },
              dropOffLocation: {
                latitude: endCoords[0],
                longitude: endCoords[1]
              }
            }).then(() => {
              appToast.success('Trip created!')
              setIsAddTripModalOpen(false)
            })
          }}
          onCancel={() => {
            setIsAddTripModalOpen(false)
          }}
          isLoading={isPending}
        />
      )}
    </Flex>
  )
}
