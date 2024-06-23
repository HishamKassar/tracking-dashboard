import { FC, useState } from 'react'
import { Button, Flex, Input, theme } from 'antd'
import { ClearOutlined } from '@ant-design/icons'
import { TextSearchFilterDropdownProps } from './TextSearchDropdown.types.ts'

export const TextSearchFilterDropdown: FC<
  TextSearchFilterDropdownProps
> = props => {
  const { dataField, defaultSearch, onSearch, clearFilters, confirm } = props
  const [searchValue, setSearchValue] = useState<string>(defaultSearch)

  const {
    token: { borderRadius }
  } = theme.useToken()

  return (
    <div
      style={{ padding: 8, borderRadius }}
      onKeyDown={e => e.stopPropagation()}
    >
      <Flex gap={4}>
        <Input
          placeholder={`Search ${dataField}`}
          value={searchValue}
          onChange={ev => {
            setSearchValue(ev.currentTarget.value)
          }}
          onPressEnter={ev => {
            onSearch(ev.currentTarget.value)
            confirm()
          }}
          style={{ display: 'block' }}
        />
        <Button
          onClick={() => {
            setSearchValue('')
            onSearch(null)
            clearFilters?.()
            confirm()
          }}
          type='dashed'
          shape='circle'
          icon={<ClearOutlined />}
          // style={{ width: 90 }}
        />
      </Flex>
    </div>
  )
}
