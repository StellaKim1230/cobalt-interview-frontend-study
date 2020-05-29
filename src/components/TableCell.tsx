import React, { FC, TdHTMLAttributes, CSSProperties } from 'react'

import cx from 'classnames'

import './TableCell.scss'

interface Props extends TdHTMLAttributes<HTMLTableDataCellElement> {
  className?: string
  style?: CSSProperties
  dense?: boolean
}

const TableCell: FC<Props> = ({ className, style, dense, colSpan, rowSpan, children, onClick }) => {
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
