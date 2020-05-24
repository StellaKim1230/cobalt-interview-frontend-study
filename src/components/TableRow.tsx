import React, { FC, useState } from 'react'

import cx from 'classnames'

import { get } from 'lodash'

import { TableColumn } from '../@types/model'

import './TableRow.scss'

interface Props {
  columns: TableColumn[]
  dataSource: any[]
  isExpandable?: boolean
  expandableKey?: string
}

const TableRow: FC<Props> = ({
  columns,
  dataSource,
  isExpandable,
  expandableKey,
}) => {
  const [ isShowingExpandableContent, setIsShowingExpandableContent ] = useState(false)
  const [ expandTdId, setExpandTdId ] = useState('')

  const handleClickExpandTd = (e: React.MouseEvent, id: string) => {
    setIsShowingExpandableContent(!isShowingExpandableContent)
    setExpandTdId(id)
  }

  return (
    <tbody className="TableRow">
      {dataSource.map(d => (
        <>
          <tr className="TableRow__tr" key={d.id}>
            {isExpandable && (
              <td
                className={cx('TableRow__td', {
                  'TableRow__td--expandable': isExpandable,
                })}
                onClick={(e) => handleClickExpandTd(e, d.id)}
              >
                <img
                  src="/icons/arrow.png"
                  alt="arrow icon"
                />
              </td>
            )}
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
          {isShowingExpandableContent && expandTdId === d.id && (
            <tr className="TableRow__tr">
              <td colSpan={Object.keys(d).length + 1}>{expandableKey ? get(d, expandableKey) : 'no content'}</td>
            </tr>
          )}
        </>
      ))}
    </tbody>
  )
}

export default TableRow
