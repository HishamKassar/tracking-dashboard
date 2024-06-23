import { useMemo, useState } from 'react'
import { useCreateVehicle, useGetVehicles } from 'services'
import { Button, Flex, Table, TableProps, Typography } from 'antd'
import { FilterFilled, PlusOutlined } from '@ant-design/icons'
import { VehicleColumnDataType } from './Vehicles.types.ts'
import { TextSearchFilterDropdown } from 'components/molecules/TextSearchFilterDropdown'
import { AddVehicleModal } from 'components/pages/Vehicles/components/AddVehicleModal'

type ColumnsType<T extends object> = TableProps<T>['columns']
export const Vehicles = () => {
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] =
    useState<boolean>(false)
  const { data: vehicles, refetch, isLoading, isFetching } = useGetVehicles()
  const { mutateAsync: createVehicle, isPending: isCreatingVehicle } =
    useCreateVehicle()
  const columns: ColumnsType<VehicleColumnDataType> = useMemo(
    () => [
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters
        }) => {
          return (
            <TextSearchFilterDropdown
              dataField='Type'
              defaultSearch={selectedKeys[0]?.toString() ?? ''}
              onSearch={(value: string | null) => {
                setSelectedKeys(value ? [value] : [])
              }}
              clearFilters={clearFilters}
              confirm={confirm}
            />
          )
        },
        onFilter: (value, record) =>
          record.type
            ?.toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()) ?? false,
        filterIcon: filtered => (
          <FilterFilled
            style={{
              color: filtered ? '#1677ff' : undefined
            }}
          />
        )
      },
      {
        title: 'Plate',
        dataIndex: 'plate',
        key: 'plate',
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters
        }) => {
          return (
            <TextSearchFilterDropdown
              dataField='Plate'
              defaultSearch={selectedKeys[0]?.toString() ?? ''}
              onSearch={(value: string | null) => {
                setSelectedKeys(value ? [value] : [])
              }}
              clearFilters={clearFilters}
              confirm={confirm}
            />
          )
        },
        onFilter: (value, record) =>
          record.plate
            ?.toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()) ?? false,
        filterIcon: filtered => (
          <FilterFilled
            style={{
              color: filtered ? '#1677ff' : undefined
            }}
          />
        )
      }
    ],
    []
  )

  const vehicleRows: VehicleColumnDataType[] = useMemo(() => {
    if (!vehicles) {
      return []
    }
    return vehicles.map(vehicle => ({
      key: vehicle.id,
      type: vehicle?.type,
      plate: vehicle?.plate
    }))
  }, [vehicles])

  return (
    <Flex vertical gap={48}>
      <Flex justify='space-between' align='center'>
        <Typography.Title
          level={3}
          style={{
            margin: 0
          }}
        >
          Vehicles
        </Typography.Title>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          size='large'
          onClick={() => {
            setIsAddVehicleModalOpen(true)
          }}
        >
          Add Vehicle
        </Button>
      </Flex>
      <Table
        columns={columns}
        rowKey={record => record.key}
        pagination={{
          position: ['bottomCenter']
        }}
        loading={isLoading || isFetching}
        dataSource={vehicleRows}
      />
      <AddVehicleModal
        onAddVehicle={(type, plate) => {
          createVehicle({ type, plate }).then(() => {
            setIsAddVehicleModalOpen(false)
            refetch()
          })
        }}
        onCancel={() => {
          setIsAddVehicleModalOpen(false)
        }}
        isLoading={isCreatingVehicle}
        isOpen={isAddVehicleModalOpen}
      />
    </Flex>
  )
}
