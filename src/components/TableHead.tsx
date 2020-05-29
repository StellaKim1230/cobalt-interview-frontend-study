import React, { FC, } from 'react'

import cx from 'classnames'
import { isNil } from 'lodash'

import { SortType } from '../utils/constants'
import { TableColumn } from '../@types/model'

import './TableHead.scss'

interface Props {
  columns: TableColumn[]
  expandableRows?: boolean
  isDisableSelectAll?: boolean
  selectableRows?: boolean
  sortedKey?: string | number | undefined
  sortOption: [string, SortType] | null
  toggleSelectAll?: () => void
  setSortOption: React.Dispatch<React.SetStateAction<Props['sortOption']>>
}

const getSortIcon = (sortType: SortType) => (sortType === SortType.ASC) ? '↑' : '↓'

const TableHead: FC<Props> = ({
  columns,
  expandableRows,
  selectableRows,
  isDisableSelectAll,
  sortOption,
  toggleSelectAll,
  setSortOption,
}) => {
  const onChangeSortData = (e: any) => {
    const selector = e.target.dataset.sortfield
    if (isNil(selector)) {
      return
    }

    const isAlreadySorted = sortOption?.[0] === selector

    if (isNil(sortOption) || !isAlreadySorted) {
      setSortOption([selector, SortType.ASC])
      return
    }

    setSortOption([selector, sortOption[1] === SortType.ASC ? SortType.DESC : SortType.ASC])
  }

  return (
    <thead className="TableHead">
      <tr className="TableHead__tr" onClick={onChangeSortData}>
        {expandableRows ? (
          <th className="TableHead__th"></th>
        ) : null}
        {selectableRows ? (
          <th className={cx("TableHead__th", {
            "TableHead__th--disabled": isDisableSelectAll,
          })}>
            <input
              type="checkbox"
              onChange={toggleSelectAll}
            />
          </th>
        ) : null}
        {columns.map(({ key, title, style, sortable, selector }) => (
          <th
            key={key}
            className="TableHead__th"
            style={style}
            data-sortfield={sortable && !isNil(setSortOption) && selector}
          >
            {title}
            {sortable && !isNil(sortOption) && sortOption[0] === selector
              ? getSortIcon(sortOption[1])
              : null}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHead
