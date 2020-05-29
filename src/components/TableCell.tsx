import React, { FC, TdHTMLAttributes, CSSProperties } from 'react'

import cx from 'classnames'

import './TableCell.scss'

interface Props extends TdHTMLAttributes<HTMLTableDataCellElement> {
  style?: CSSProperties
  dense?: boolean
  className?: string
}

const TableCell: FC<Props> = ({ style, colSpan, rowSpan, dense, children, className, onClick }) => {
  if (colSpan === 0 || rowSpan === 0) return null

  return (
    <td
      className={cx('TableCell', className, {
        'TableCell--dense': dense
      })}
      style={style}
      colSpan={colSpan}
      rowSpan={rowSpan}
      onClick={onClick}
    >
      {children}
    </td>
  )
}

export default TableCell
