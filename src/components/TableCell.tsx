import React, { FC, TdHTMLAttributes } from 'react'

import { TableColumn } from '../@types/model'

interface Props extends TdHTMLAttributes<HTMLTableDataCellElement> {
  column: TableColumn
}

const TableCell: FC<Props> = ({ column, colSpan, rowSpan, children }) => {
  if (colSpan === 0 || rowSpan === 0) return null

  return (
    <td
      className="TableRow__td"
      style={column.style}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {children}
    </td>
  )
}

export default TableCell
