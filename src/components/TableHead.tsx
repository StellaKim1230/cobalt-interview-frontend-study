import React, { FC, } from 'react'

import cx from 'classnames'
import { isNil } from 'lodash'

import { TableColumn } from '../@types/model'
import { SortType, SORT_SELECTOR_INDEX, SORT_TYPE_INDEX } from '../utils/constants'

import './TableHead.scss'

interface Props {
  columns: TableColumn[]
  expandableRows?: boolean
  selectableRows?: boolean
  isDisableSelectAll?: boolean
  sortOption: [string, SortType] | null
  onSelectAll?: () => void
  setSortOption: React.Dispatch<React.SetStateAction<Props['sortOption']>>
}

const getSortIcon = (sortType: SortType) => (sortType === SortType.ASC) ? '↑' : '↓'

const TableHead: FC<Props> = ({
  columns,
  expandableRows,
  selectableRows,
  isDisableSelectAll,
  sortOption,
  onSelectAll,
  setSortOption,
}) => {
  const onChangeSortData = (e: any) => {
    const selector = e.target.dataset.sortfield
    if (isNil(selector)) {
      return
    }

    const isAlreadySorted = sortOption?.[SORT_SELECTOR_INDEX] === selector

    if (isNil(sortOption) || !isAlreadySorted) {
      setSortOption([selector, SortType.ASC])
      return
    }

    setSortOption([selector, sortOption[SORT_TYPE_INDEX] === SortType.ASC ? SortType.DESC : SortType.ASC])
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
              onChange={onSelectAll}
            />
          </th>
        ) : null}
        {columns.map(({ key, title, style, sortable, selector }) => (
          <th
            key={key}
            className={cx('TableHead__th', {
              'TableHead__th--sortable': sortable,
            })}
            style={style}
            data-sortfield={sortable && !isNil(setSortOption) && selector}
          >
            {title}
            {sortable && !isNil(sortOption) && sortOption[SORT_SELECTOR_INDEX] === selector
              ? getSortIcon(sortOption[SORT_TYPE_INDEX])
              : null}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHead
