import { useMemo } from 'react'
import { useGetVendors } from 'services'
import { Flex, Table, TableProps, Typography } from 'antd'
import { FilterFilled } from '@ant-design/icons'
import { VendorColumnDataType } from './Vendors.types.ts'
import { TextSearchFilterDropdown } from 'components/molecules/TextSearchFilterDropdown'

type ColumnsType<T extends object> = TableProps<T>['columns']
export const Vendors = () => {
  const { data: vendors, isLoading, isFetching } = useGetVendors()

  const columns: ColumnsType<VendorColumnDataType> = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters
        }) => {
          return (
            <TextSearchFilterDropdown
              dataField='Name'
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
          record.name
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

  const vendorRows: VendorColumnDataType[] = useMemo(() => {
    if (!vendors) {
      return []
    }
    return vendors.map(vendor => ({
      key: vendor.id,
      name: vendor?.username
    }))
  }, [vendors])

  return (
    <Flex vertical gap={48}>
      <Typography.Title
        level={3}
        style={{
          margin: 0
        }}
      >
        Vendors
      </Typography.Title>
      <Table
        columns={columns}
        rowKey={record => record.key}
        pagination={{
          position: ['bottomCenter']
        }}
        loading={isLoading || isFetching}
        dataSource={vendorRows}
      />
    </Flex>
  )
}
