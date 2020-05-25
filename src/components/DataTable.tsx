import React, { FC, useEffect, useState, Fragment } from 'react'

import cx from 'classnames'
import { get, orderBy, find, isNil } from 'lodash'

import TableHead from './TableHead'

import { TableColumn } from '../@types/model'
import { SortType } from '../utils/constants'

import './DataTable.scss'

interface Props {
  title: string
  columns: TableColumn[]
  data: any[]
  isLoading?: boolean
  expandableRows?: boolean
  expandableKey?: string
  selectableRows?: boolean
  isDisableSelectAll?: boolean
  noTableHead?: boolean
  defaultSortKey?: string
}

const selectedData = new Map()

const DataTable: FC<Props> = ({
  title,
  columns,
  data,
  isLoading,
  expandableRows,
  expandableKey,
  selectableRows,
  isDisableSelectAll,
  noTableHead,
  defaultSortKey,
}) => {
  const getSortOption = (defaultSortKey?: string, sortableColum?: string): [string, SortType] | null => {
    const sortField = defaultSortKey ?? sortableColum
    return isNil(sortField) ? null : [sortField, SortType.ASC]
  }

  const getSortedData = (data: any[], sortOption: [string, SortType] | null) => {
    return sortOption ? orderBy(data, sortOption[0], sortOption[1]) : data
  }

  // datasource
  const [ sortOption, setSortOption ] = useState<[string, SortType] | null>(
    getSortOption(defaultSortKey, find(columns, ['sortable', true])?.selector)
  )
  const [ sortedData, setSortedData ] = useState(getSortedData(data, sortOption))

  // expandable rows
  const [ isExpand, setIsExpand ] = useState(false)
  const [ expandRow, setExpandRow ] = useState('')

  // selected rows
  const [ isSelectAll, setIsSelectAll ] = useState(false)
  const [ selectedItemsCount, setSelectedItemsCount ] = useState(0)

  useEffect(() => {
    setSortedData(getSortedData(sortedData, sortOption))
    //eslint-disable-next-line
  }, [sortOption])

  const handleClickExpand = (e: React.MouseEvent, id: string) => {
    setIsExpand(!isExpand)
    setExpandRow(id)
  }

  const toggleSelectRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedData.get(e.target.value)) {
      selectedData.delete(e.target.value)
    } else {
      selectedData.set(e.target.value, true)
    }

    setSelectedItemsCount(selectedData.size)
  }

  const toggleSelectAll = () => {
    setIsSelectAll(!isSelectAll)
    selectedData.clear()
    setSelectedItemsCount(0)
  }

  const getSelectedItemCount = () => isSelectAll ? data.length : selectedItemsCount

  return (
    <>
      <h2 className="DataTable__title">{title}</h2>
      {getSelectedItemCount() !== 0 ? (
        <div>{getSelectedItemCount()} items selected</div>
      ) : null}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="DataTable">
          {!noTableHead ? (
            <TableHead
              columns={columns}
              expandableRows={expandableRows}
              isDisableSelectAll={isDisableSelectAll}
              selectableRows={selectableRows}
              toggleSelectAll={toggleSelectAll}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          ) : null }
          <tbody className="TableRow">
            {sortedData.map(d => (
              <Fragment key={d.id}>
                <tr className="TableRow__tr" key={d.id}>
                  {expandableRows ? (
                    <td
                      className={cx('TableRow__td', {
                        'TableRow__td--expandable': expandableRows,
                      })}
                      onClick={(e) => handleClickExpand(e, d.id)}
                    >→</td>
                  ) : null}
                  {selectableRows ? (
                    <td className="TableRow__td">
                      <input
                        type="checkbox"
                        value={d.id}
                        onChange={(e) => toggleSelectRow(e)}
                        checked={isSelectAll || selectedData.get(d.id)}
                      />
                    </td>
                  ) : null}
                  {columns.map(({ selector, render, style }) => (
                    <td
                      key={selector}
                      className="TableRow__td"
                      style={style}
                    >
                      {render ? render(get(d, selector)) : get(d, selector)}
                    </td>
                  ))}
                </tr>
                {expandableRows && isExpand && expandRow === d.id ? (
                  <tr className="TableRow__tr">
                    <td colSpan={Object.keys(d).length + 1}>{expandableKey ? get(d, expandableKey) : 'no content'}</td>
                  </tr>
                ) : null}
              </Fragment>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default DataTable
