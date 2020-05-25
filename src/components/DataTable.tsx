import React, { FC, useEffect, useState, Fragment } from 'react'

import cx from 'classnames'
import { get, orderBy, find, isNil, chunk } from 'lodash'

import TableHead from './TableHead'
import Pagination from './Pagination'
import SearchInput from './SearchInput'

import { TableColumn, ChunkedDataParams } from '../@types/model'
import { SortType, DEFAULT_PAGE_CHUNK_SIZE, DEFAULT_CURRENT_PAGE_INDEX } from '../utils/constants'

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
  pagination?: boolean
  defaultSortKey?: string
  isSearch?: boolean
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
  pagination,
  defaultSortKey,
  isSearch,
}) => {
  const getSortOption = (defaultSortKey?: string, sortableColum?: string): [string, SortType] | null => {
    const sortField = defaultSortKey ?? sortableColum
    return isNil(sortField) ? null : [sortField, SortType.ASC]
  }

  const getSortedData = (data: any[], sortOption: [string, SortType] | null) => {
    return sortOption ? orderBy(data, sortOption[0], sortOption[1]) : data
  }

  const getChunkedData = ({ data, pageChunkSize }: ChunkedDataParams) => {
    return chunk(data, pageChunkSize)
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

  // pagination
  const [ pageChunkSize, setPageChunkSize ] = useState(DEFAULT_PAGE_CHUNK_SIZE)
  const [ pageIndex, setPageIndex ] = useState(DEFAULT_CURRENT_PAGE_INDEX)

  const [ chunkedData, setChunkedData ] = useState(
    pagination
      ? getChunkedData({
        data: sortedData,
        pageChunkSize,
      })
      : sortedData
  )

  // 실제 사용될 데이터
  const [ currentData, setCurrentData ] = useState<any[]>(pagination ? chunkedData[pageIndex] : sortedData)

  useEffect(() => {
    setCurrentData(
      pagination
        ? getChunkedData({
          data: sortedData,
          pageChunkSize,
        })[pageIndex]
        : sortedData
    )
    //eslint-disable-next-line
  }, [chunkedData, pageIndex, pageChunkSize])

  useEffect(() => {
    setChunkedData(
      getChunkedData({
        data: sortedData,
        pageChunkSize,
      })
    )
    //eslint-disable-next-line
  }, [pageChunkSize, pagination])

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
      {isSearch ? (
        <SearchInput />
      ) : null}
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
            {currentData.map(d => (
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
      {pagination ? (
        <Pagination
          currentPageIndex={pageIndex}
          pageTotalSize={currentData.length}
          pageChunkSize={pageChunkSize}
          setPageIndex={setPageIndex}
          setPageChunkSize={setPageChunkSize}
        />
      ) : null}
    </>
  )
}

export default DataTable
