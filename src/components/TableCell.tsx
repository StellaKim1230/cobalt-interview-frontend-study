import React, { FC, TdHTMLAttributes } from 'react'

import cx from 'classnames'

import { TableColumn } from '../@types/model'

interface Props extends TdHTMLAttributes<HTMLTableDataCellElement> {
  column: TableColumn
  isDense?: boolean
}

const TableCell: FC<Props> = ({ column, colSpan, rowSpan, isDense, children }) => {
  if (colSpan === 0 || rowSpan === 0) return null

  return (
    <td
      className={cx('TableRow__td', { 'TableRow__td--isDense': isDense })}
      style={column.style}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {children}
    </td>
  )
}

export default TableCell
