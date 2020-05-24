import React, { FC, useState } from 'react'

import cx from 'classnames'

import { get } from 'lodash'

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
  const [ isShowingExpandableContent, setIsShowingExpandableContent ] = useState(false)
  const [ expandTdId, setExpandTdId ] = useState('')

  const handleClickExpandTd = (e: React.MouseEvent, id: string) => {
    setIsShowingExpandableContent(!isShowingExpandableContent)
    setExpandTdId(id)
  }

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
        <thead className="TableHeader">
          <tr className="TableHeader__tr">
            {isExpandable && (
              <th className="TableHeader__th"></th>
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
      </table>
    </>
  )
}

export default Table
