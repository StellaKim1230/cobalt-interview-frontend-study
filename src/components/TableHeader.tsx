import React, { FC } from 'react'

import cx from 'classnames'

import { TableColumn } from '../@types/model'

import './TableHeader.scss'

interface Props {
  columns: TableColumn[]
  isExpandable?: boolean
}

const TableHeader: FC<Props> = ({ columns, isExpandable }) => {
  return ( 
    <thead className="TableHeader">
      <tr className="TableHeader__tr">
        {isExpandable && (
          <th className="TableHeader__th"></th>
        )}
        {columns.map(({ key, title, className, style }) => (
          <th
            key={key}
            className={cx('TableHeader__th', className)}
            style={style}
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
