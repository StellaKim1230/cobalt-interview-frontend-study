import React, { FC, useState, Fragment } from 'react'

import cx from 'classnames'

import { get } from 'lodash'

import { TableColumn } from '../@types/model'

import './Table.scss'

interface Props {
  title: string
  columns: TableColumn[]
  data: any[]
  expandableRows?: boolean
  expandableKey?: string
  selectableRows?: boolean
  isSelectAllDisable?: boolean
}

const selectRowMap = new Map()

const Table: FC<Props> = ({
  title,
  columns,
  data,
  expandableRows,
  expandableKey,
  selectableRows,
  isSelectAllDisable,
}) => {
  // expandable rows
  const [ isExpand, setIsExpand ] = useState(false)
  const [ expandRow, setExpandRow ] = useState('')

  // selected rows
  const [ isSelectAll, setIsSelectAll ] = useState(false)

  const handleClickExpand = (e: React.MouseEvent, id: string) => {
    setIsExpand(!isExpand)
    setExpandRow(id)
  }

  const toggleSelectRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectRowMap.get(e.target.value)) {
      selectRowMap.delete(e.target.value)
    } else {
      selectRowMap.set(e.target.value, true)
    }
  }

  const getSelectedItemCount = () => isSelectAll ? data.length : selectRowMap.size

  return (
    <>
      <h2 className="Table__title">{title}</h2>
      {getSelectedItemCount() !== 0 ? (
        <div>{getSelectedItemCount()} items selected</div>
      ) : null}
      <table className="Table">
        <thead className="TableHeader">
          <tr className="TableHeader__tr">
            {expandableRows && (
              <th className="TableHeader__th"></th>
            )}
            {selectableRows && (
              <th className={cx("TableHeader__th", {
                "TableHeader__th--disabled": isSelectAllDisable,
              })}>
                <input
                  type="checkbox"
                  onChange={() => setIsSelectAll(!isSelectAll)}
                />
              </th>
            )}
            {columns.map(({ key, title, className, style }) => (
              <th
                key={key}
                className={cx('TableHeader__th', className)}
                style={style}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="TableRow">
          {data.map(d => (
            <Fragment key={d.id}>
              <tr className="TableRow__tr" key={d.id}>
                {expandableRows && (
                  <td
                    className={cx('TableRow__td', {
                      'TableRow__td--expandable': expandableRows,
                    })}
                    onClick={(e) => handleClickExpand(e, d.id)}
                  >→</td>
                )}
                {selectableRows && (
                  <td className="TableHeader__td">
                    <input
                      type="checkbox"
                      value={d.id}
                      onChange={(e) => toggleSelectRow(e)}
                      checked={isSelectAll || selectRowMap.get(d.id)}
                    />
                  </td>
                )}
                {columns.map(({ dataIndex, render, style }) => (
                  <td
                    key={dataIndex}
                    className="TableRow__td"
                    style={style}
                  >
                    {render ? render(get(d, dataIndex)) : get(d, dataIndex)}
                  </td>
                ))}
              </tr>
              {expandableRows && isExpand && expandRow === d.id && (
                <tr className="TableRow__tr">
                  <td colSpan={Object.keys(d).length + 1}>{expandableKey ? get(d, expandableKey) : 'no content'}</td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Table
