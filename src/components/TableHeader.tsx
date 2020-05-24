import React, { FC } from 'react'

import cx from 'classnames'

import { TableColumn } from '../@types/model'

import './TableHeader.scss'

interface Props {
  columns: TableColumn[]
}

const TableHeader: FC<Props> = ({ columns }) => {
  return ( 
    <thead className="TableHeader">
      <tr className="TableHeader__tr">
        {columns.map(({ key, title, className}) => (
          <th
            key={key}
            className={cx('TableHeader__th', className)}
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
