import React, { FC } from 'react'

import cx from 'classnames'

import { TableColumn } from '../@types/model'

import './TableHead.scss'

interface Props {
  columns: TableColumn[]
  expandableRows?: boolean
  isSelectAllDisable?: boolean
  selectableRows?: boolean
  toggleSelectAll?: () => void
}

const TableHead: FC<Props> = ({
  columns,
  expandableRows,
  selectableRows,
  isSelectAllDisable,
  toggleSelectAll,
}) => {
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
        {columns.map(({ key, title, className, style }) => (
          <th
            key={key}
            className={cx('TableHead__th', className)}
            style={style}
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHead
