import React, { FC, TdHTMLAttributes } from 'react'

import cx from 'classnames'

import { TableColumn } from '../@types/model'

interface Props extends TdHTMLAttributes<HTMLTableDataCellElement> {
  column: TableColumn
}

const TableCell: FC<Props> = ({ column, colSpan, rowSpan, children }) => {
  console.log(colSpan, rowSpan)
  return (
    <td
      className={cx('TableRow__td', {
        'TableRow__td--isNotShowing': colSpan === 0 || rowSpan === 0,
      })}
      style={column.style}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {children}
    </td>
  )
}

export default TableCell
