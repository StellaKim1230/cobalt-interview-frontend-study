import React, { FC, useEffect, useState, Fragment } from 'react'

import cx from 'classnames'
import { get, find, chunk, isNil, isFunction, merge } from 'lodash'

import TableHead from './TableHead'
import Pagination from './Pagination'
import SearchInput from './SearchInput'
import TableCell from './TableCell'

import { TableColumn } from '../@types/model'
import { SortType, DEFAULT_PAGE_CHUNK_SIZE, DEFAULT_CURRENT_PAGE_INDEX } from '../utils/constants'
import { getSortOption, getSortedData } from '../utils/dataTableUtils'

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
  defaultSearchOption?: string
  isHighlightOnHover?: boolean
  isStripedRows?: boolean
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
  defaultSearchOption,
  isHighlightOnHover,
  isStripedRows,
}) => {
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

  // search
  const [ searchOption, setSearchOption ] = useState(defaultSearchOption || '')
  const [ searchKeyword, setSearchKeyword ] = useState('')

  const [ chunkedData, setChunkedData ] = useState(
    pagination ? chunk(sortedData, pageChunkSize) : sortedData
  )

  // 실제 사용될 데이터
  const [ currentData, setCurrentData ] = useState<any[]>(pagination ? chunkedData[pageIndex] : sortedData)

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

  useEffect(() => {
    setCurrentData(
      pagination ? chunkedData[pageIndex] : sortedData
    )
    //eslint-disable-next-line
  }, [chunkedData, pageIndex, pageChunkSize])

  useEffect(() => {
    setChunkedData(chunk(sortedData, pageChunkSize))
    //eslint-disable-next-line
  }, [pageChunkSize, pagination, sortedData])

  useEffect(() => {
    setSortedData(getSortedData(sortedData, sortOption))
    //eslint-disable-next-line
  }, [sortOption])

  useEffect(() => {
    if (isNil(searchKeyword)) {
      return
    }

    if (!searchKeyword) {
      setSortedData(getSortedData(data, sortOption))
    }

    if (searchKeyword) {
      setSortedData(
        getSortedData(
          data.filter(data => get(data, searchOption) === searchKeyword),
          sortOption
        )
      )
    }
    // eslint-disable-next-line
  }, [searchKeyword])

  return (
    <>
      {isSearch ? (
        <SearchInput
          defaultSearchOption={defaultSearchOption}
          columns={columns}
          setSearchOption={setSearchOption}
          setSearchKeyword={setSearchKeyword}
        />
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
            {currentData?.map((row, index) => (
              <Fragment key={row.id}>
                <tr className={cx('TableRow__tr', {
                  'TableRow__tr--isHighlightHover': isHighlightOnHover,
                  'TableRow__tr--isStripedRows': isStripedRows,
                })}>
                  {expandableRows ? (
                    <td
                      className={cx('TableRow__td', {
                        'TableRow__td--expandable': expandableRows,
                      })}
                      onClick={(e) => handleClickExpand(e, row.id)}
                    >→</td>
                  ) : null}
                  {selectableRows ? (
                    <td className="TableRow__td">
                      <input
                        type="checkbox"
                        value={row.id}
                        onChange={(e) => toggleSelectRow(e)}
                        checked={isSelectAll || selectedData.get(row.id)}
                      />
                    </td>
                  ) : null}
                  {columns.map((column) => {
                    const value = get(row, column.selector)
                    if (!isFunction(column.render)) return <TableCell column={column} key={column.key}>{value}</TableCell>

                    const renderedData = column.render({ value, index, row })
                    const props = merge(renderedData.props, { column })

                    return <TableCell {...props} key={column.key}>{renderedData.children}</TableCell>
                  })}
                </tr>
                {expandableRows && isExpand && expandRow === row.id ? (
                  <tr className="TableRow__tr">
                    <td colSpan={Object.keys(row).length + 1}>{expandableKey ? get(row, expandableKey) : 'no content'}</td>
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
          pageTotalSize={sortedData.length}
          pageChunkSize={pageChunkSize}
          setPageIndex={setPageIndex}
          setPageChunkSize={setPageChunkSize}
        />
      ) : null}
    </>
  )
}

export default DataTable
