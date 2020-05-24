import React, { FC } from 'react'

import TableHeader from './TableHeader'
import TableRow from './TableRow'

import { TableColumn } from '../@types/model'

import './Table.scss'

interface Props {
  title: string
  columns: TableColumn[]
  dataSource: any[]
}

const Table: FC<Props> = ({
  title,
  columns,
  dataSource,
}) => {
  return (
    <>
      <h2 className="Table__title">{title}</h2>
      <table className="Table">
        <TableHeader
          columns={columns}
        />
        <TableRow
          columns={columns}
          dataSource={dataSource}
        />
      </table>
    </>
  )
}

export default Table
