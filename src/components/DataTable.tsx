import React, { FC, useEffect, useState, Fragment } from 'react'

import cx from 'classnames'
import { get, orderBy } from 'lodash'

import TableHead from './TableHead'

import { TableColumn } from '../@types/model'

import './DataTable.scss'

interface Props {
  title: string
  columns: TableColumn[]
  data: any[]
  expandableRows?: boolean
  expandableKey?: string
  selectableRows?: boolean
  isSelectAllDisable?: boolean
  noTableHead?: boolean
  defaultSortKey?: string
}

const selectRowMap = new Map()

const DataTable: FC<Props> = ({
  title,
  columns,
  data,
  expandableRows,
  expandableKey,
  selectableRows,
  isSelectAllDisable,
  noTableHead,
  defaultSortKey,
}) => {
  // datasource
  const [ sortedData, setSortedData ] = useState<any[]>([])
  const [ sortOption, setSortOption ] = useState<'desc' | 'asc'>('asc')
  const [ sortedKey, setSortedKey ] = useState<string | number | undefined>(defaultSortKey)

  // expandable rows
  const [ isExpand, setIsExpand ] = useState(false)
  const [ expandRow, setExpandRow ] = useState('')

  // selected rows
  const [ isSelectAll, setIsSelectAll ] = useState(false)
  const [ selectedItemsCount, setSelectedItemsCount ] = useState(0)

  useEffect(() => {
    setSortedData(sortedKey ? orderBy(data, [sortedKey], [sortOption]) : data)
    //eslint-disable-next-line
  }, [sortedKey, sortOption])

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

    setSelectedItemsCount(selectRowMap.size)
  }

  const toggleSelectAll = () => {
    setIsSelectAll(!isSelectAll)
    selectRowMap.clear()
    setSelectedItemsCount(0)
  }

  const getSelectedItemCount = () => isSelectAll ? data.length : selectedItemsCount

  return (
    <>
      <h2 className="DataTable__title">{title}</h2>
      {getSelectedItemCount() !== 0 ? (
        <div>{getSelectedItemCount()} items selected</div>
      ) : null}
      <table className="DataTable">
        {!noTableHead ? (
          <TableHead
            columns={columns}
            expandableRows={expandableRows}
            isSelectAllDisable={isSelectAllDisable}
            selectableRows={selectableRows}
            toggleSelectAll={toggleSelectAll}
            sortedKey={sortedKey}
            setSortOption={setSortOption}
            sortOption={sortOption}
            setSortedKey={setSortedKey}
          />
        ) : null }
        <tbody className="TableRow">
          {sortedData.map(d => (
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
                  <td className="TableRow__td">
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

export default DataTable
