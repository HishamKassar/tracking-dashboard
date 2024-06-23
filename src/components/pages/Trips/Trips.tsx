import { useMemo, useState } from 'react'
import { Location, useGetTrips, useGetVehicles, useGetVendors } from 'services'
import {
  Button,
  Flex,
  Space,
  Table,
  TableProps,
  Tag,
  Tooltip,
  Typography
} from 'antd'
import { TripColumnDataType, TripStatus } from './Trips.types.ts'
import LocationIcon from 'assets/location.svg'
import { TripLocationModal } from 'components/pages/Trips/components/TripLocationModal'

const tripStatusColors: Record<TripStatus, string> = {
  [TripStatus.IDLE]: 'gold',
  [TripStatus.STARTED]: 'blue',
  [TripStatus.FINISHED]: 'darkgreen'
}

const tripStatusNames: Record<TripStatus, string> = {
  [TripStatus.IDLE]: 'Idle',
  [TripStatus.STARTED]: 'Started',
  [TripStatus.FINISHED]: 'Finished'
}

type ColumnsType<T extends object> = TableProps<T>['columns']
export const Trips = () => {
  const [tripDetailsToShow, setTripDetailsToShow] = useState<
    | {
        startLocation: Location
        endLocation: Location
      }
    | undefined
  >(undefined)
  const {
    data: trips,
    isLoading: isLoadingTrips,
    isFetching: isFetchingTrips
  } = useGetTrips()
  const {
    data: vehicles,
    isLoading: isLoadingVehicles,
    isFetching: isFetchingVehicles
  } = useGetVehicles()
  const {
    data: vendors,
    isLoading: isLoadingVendors,
    isFetching: isFetchingVendors
  } = useGetVendors()

  const columns: ColumnsType<TripColumnDataType> = useMemo(
    () => [
      {
        title: 'Vehicle',
        dataIndex: 'vehicleId',
        key: 'vehicleId',
        render: (_, record) => {
          const vehicle = vehicles?.find(v => v.id === record.vehicleId)
          return (
            <>
              {vehicle?.type} - {vehicle?.plate}
            </>
          )
        }
      },
      {
        title: 'Vendor',
        dataIndex: 'vendorId',
        key: 'vendorId',
        render: (_, record) => {
          const vendor = vendors?.find(v => v.id === record.vendorId)
          return <>{vendor?.username}</>
        }
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (tripStatus: TripStatus) => (
          <Tag color={tripStatusColors[tripStatus]}>
            {tripStatusNames[tripStatus]}
          </Tag>
        )
      },
      {
        title: 'Trip Coordinates',
        key: 'tripCoordinates',
        render: (_, record) => (
          <Space size='middle'>
            <Tooltip placement='top' title='View trip locations' arrow>
              <Button
                type='primary'
                shape='circle'
                size='small'
                icon={<LocationIcon />}
                onClick={() => {
                  setTripDetailsToShow({
                    startLocation: record.pickUpLocation,
                    endLocation: record.dropOffLocation
                  })
                }}
              ></Button>
            </Tooltip>
          </Space>
        )
      }
    ],
    [vehicles, vendors]
  )

  const tripRows: TripColumnDataType[] = useMemo(() => {
    if (!trips) {
      return []
    }
    return trips.map(trip => ({
      key: trip.id,
      vendorId: trip.vendorId,
      vehicleId: trip.vehicleId,
      pickUpLocation: trip.pickUpLocation,
      dropOffLocation: trip.dropOffLocation,
      status: trip.status
    }))
  }, [trips])

  return (
    <Flex vertical gap={48}>
      <Typography.Title
        level={3}
        style={{
          margin: 0
        }}
      >
        Trips
      </Typography.Title>
      <Table
        columns={columns}
        rowKey={record => record.key}
        pagination={{
          position: ['bottomCenter']
        }}
        loading={
          isLoadingTrips ||
          isFetchingTrips ||
          isLoadingVehicles ||
          isFetchingVehicles ||
          isLoadingVendors ||
          isFetchingVendors
        }
        dataSource={tripRows}
      />
      {!!tripDetailsToShow && (
        <TripLocationModal
          isOpen={!!tripDetailsToShow}
          startLocation={tripDetailsToShow?.startLocation}
          endLocation={tripDetailsToShow?.endLocation}
          onCancel={() => {
            setTripDetailsToShow(undefined)
          }}
        />
      )}
    </Flex>
  )
}
