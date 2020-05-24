import React, { FC } from 'react'

import { get } from 'lodash'

import { TableColumn } from '../@types/model'

import './TableRow.scss'

interface Props {
  columns: TableColumn[]
  dataSource: any[]
}

const TableRow: FC<Props> = ({
  columns,
  dataSource,
}) => {
  return (
    <tbody className="TableRow">
      {dataSource.map(d => (
        <tr className="TableRow__tr" key={d.id}>
          {columns.map(({ dataIndex, render, style }) => (
            <td
              className="TableRow__td"
              key={dataIndex}
              style={style}
            >
              {render ? render(get(d, dataIndex)) : get(d, dataIndex)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default TableRow
