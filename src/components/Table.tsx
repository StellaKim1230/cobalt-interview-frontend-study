import React, { FC, useState } from 'react'

import TableHeader from './TableHeader'
import TableRow from './TableRow'

import { TableColumn } from '../@types/model'

import './Table.scss'

interface Props {
  title: string
  columns: TableColumn[]
  dataSource: any[]
  expandable?: boolean
  expandableKey?: string
}

const Table: FC<Props> = ({
  title,
  columns,
  dataSource,
  expandable,
  expandableKey,
}) => {
  const [ isExpandable, setIsExpandable ] = useState(false)
  return (
    <>
      <h2 className="Table__title">{title}</h2>
      {expandable && (
        <>
          <input
            type="checkbox"
            id="expandable"
            name="expandable"
            onChange={() => setIsExpandable(!isExpandable)}
          />
          <label htmlFor="expandable">Expandable Rows</label>
        </>
      )}
      <table className="Table">
        <TableHeader
          columns={columns}
          isExpandable={isExpandable}
        />
        <TableRow
          columns={columns}
          dataSource={dataSource}
          isExpandable={isExpandable}
          expandableKey={expandableKey}
        />
      </table>
    </>
  )
}

export default Table
