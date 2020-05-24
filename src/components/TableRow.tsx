import React, { FC } from 'react'

import { pick, get } from 'lodash'

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
  const dataIndexs = columns.map(c => (pick(c, 'dataIndex')))

  return (
    <tbody className="TableRow">
      {dataSource.map(d => (
        <tr className="TableRow__tr" key={d.id}>
          {dataIndexs.map(({ dataIndex }) => (
            <td className="TableRow__td" key={dataIndex}>
              {get(d, dataIndex)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default TableRow
