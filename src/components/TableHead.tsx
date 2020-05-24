import React, { FC } from 'react'

import cx from 'classnames'

import { TableColumn } from '../@types/model'
import { SortType } from '../utils/constants'

import './TableHead.scss'

interface Props {
  columns: TableColumn[]
  expandableRows?: boolean
  isSelectAllDisable?: boolean
  selectableRows?: boolean
  toggleSelectAll?: () => void
  sortedKey?: string | number | undefined
  setSortOption?: React.Dispatch<React.SetStateAction<'desc' | 'asc'>>
  sortOption?: 'desc' | 'asc'
  setSortedKey?: React.Dispatch<React.SetStateAction<string | number | undefined>>
}

const TableHead: FC<Props> = ({
  columns,
  expandableRows,
  selectableRows,
  isSelectAllDisable,
  toggleSelectAll,
  sortedKey,
  setSortOption,
  sortOption,
  setSortedKey,
}) => {
  const handleClickSortOption = ({
    sortable,
    key,
    sortOption,
  }: {
    sortable: boolean | undefined,
    key: string | number,
    sortOption: 'desc' | 'asc' | undefined
  }) => {
    if (!sortable) return
    if (setSortedKey) setSortedKey(key)
    if (setSortOption && sortOption === SortType.ASC) setSortOption('desc')
    if (setSortOption && sortOption === SortType.DESC) setSortOption('asc')
  }

  return (
    <thead className="TableHead">
      <tr className="TableHead__tr">
        {expandableRows && (
          <th className="TableHead__th"></th>
        )}
        {selectableRows && (
          <th className={cx("TableHead__th", {
            "TableHead__th--disabled": isSelectAllDisable,
          })}>
            <input
              type="checkbox"
              onChange={toggleSelectAll}
            />
          </th>
        )}
        {columns.map(({ key, title, className, style, sortable }) => (
          <th
            key={key}
            className={cx('TableHead__th', className)}
            style={style}
            onClick={() => handleClickSortOption({ sortable, key: key.toString(), sortOption })}
          >
            {title}
            {(sortedKey === key && sortable !== undefined && sortOption === SortType.ASC) && '↑'}
            {(sortedKey === key && sortable !== undefined && sortOption === SortType.DESC) && '↓'}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHead
