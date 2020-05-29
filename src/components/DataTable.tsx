import React, { FC, useEffect, useState, Fragment, useCallback } from 'react'

import cx from 'classnames'
import { get, find, chunk, isNil, isFunction, merge, eq, includes } from 'lodash'

import TableHead from './TableHead'
import Pagination from './Pagination'
import SearchInput from './SearchInput'
import TableCell from './TableCell'

import { TableColumn } from '../@types/model'
import { SortType, SearchType, DEFAULT_PAGE_CHUNK_SIZE, DEFAULT_CURRENT_PAGE_INDEX } from '../utils/constants'
import { getSortOption, getSortedData } from '../utils/dataTableUtils'

import './DataTable.scss'

interface Props {
  title: string
  columns: TableColumn[]
  data: any[]
  expandableKey?: string
  defaultSortKey?: string
  defaultSearchKey?: string
  isLoading?: boolean
  expandableRows?: boolean
  selectableRows?: boolean
  isDisableSelectAll?: boolean
  noTableHead?: boolean
  pagination?: boolean
  isShowingSearchInput?: boolean
  highlightOnHover?: boolean
  stripedRows?: boolean
  pointerOnHover?: boolean
  dense?: boolean
}

const selectedData = new Map()

const DataTable: FC<Props> = ({
  title,
  columns,
  data,
  expandableKey,
  defaultSortKey,
  defaultSearchKey,
  isLoading,
  expandableRows,
  selectableRows,
  isDisableSelectAll,
  noTableHead,
  pagination,
  isShowingSearchInput,
  highlightOnHover,
  stripedRows,
  pointerOnHover,
  dense,
}) => {
  // datasource
  const [ sortOption, setSortOption ] = useState<[string, SortType] | null>(
    getSortOption(defaultSortKey, find(columns, ['sortable', true])?.selector)
  )
  const [ sortedData, setSortedData ] = useState(getSortedData(data, sortOption))

  // expandable rows
  const [ isExpand, setIsExpand ] = useState(false)
  const [ expandRow, setExpandRow ] = useState<string | null>(null)

  // selected rows
  const [ isSelectAll, setIsSelectAll ] = useState(false)
  const [ selectedItemsCount, setSelectedItemsCount ] = useState(0)

  // pagination
  const [ pageChunkSize, setPageChunkSize ] = useState(DEFAULT_PAGE_CHUNK_SIZE)
  const [ pageIndex, setPageIndex ] = useState(DEFAULT_CURRENT_PAGE_INDEX)

  // search
  const [ searchColumn, setSearchColumn ] = useState(defaultSearchKey || '')
  const [ searchKeyword, setSearchKeyword ] = useState('')
  const [ searchType, setSearchType ] = useState(SearchType.EQ)

  const [ chunkedData, setChunkedData ] = useState(
    pagination ? chunk(sortedData, pageChunkSize) : sortedData
  )

  // 실제 사용될 데이터
  const [ currentData, setCurrentData ] = useState<any[]>(pagination ? chunkedData[pageIndex] : sortedData)

  const handleClickExpand = (id: string) => {
    if (isNil(expandRow)) {
      setIsExpand(true)
      setExpandRow(id)
      return
    }

    if (expandRow === id) {
      setIsExpand(false)
      setExpandRow(null)
      return
    }

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
  }, [chunkedData, pageIndex])

  useEffect(() => {
    setPageIndex(0)
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
      const filterFunction = searchType === SearchType.EQ ? eq : includes

      setSortedData(
        getSortedData(
          data.filter(data => filterFunction(get(data, searchColumn).toLowerCase(), searchKeyword.toLowerCase())),
          sortOption
        )
      )
    }
    // eslint-disable-next-line
  }, [searchKeyword, searchType])

  return (
    <>
      {isShowingSearchInput ? (
        <SearchInput
          defaultSearchKey={defaultSearchKey}
          columns={columns}
          setSearchColumn={setSearchColumn}
          setSearchKeyword={setSearchKeyword}
          setSearchType={setSearchType}
        />
      ) : null}
      <h2 className="DataTable__title">{title}</h2>
      {getSelectedItemCount() !== 0 ? (<div>{getSelectedItemCount()} items selected</div>) : null}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="DataTable">
          {!noTableHead ? (
            <TableHead
              columns={columns}
              expandableRows={expandableRows}
              selectableRows={selectableRows}
              isDisableSelectAll={isDisableSelectAll}
              sortOption={sortOption}
              toggleSelectAll={toggleSelectAll}
              setSortOption={setSortOption}
            />
          ) : null }
          <tbody className="TableRow">
            {currentData?.map((row, index) => (
              <Fragment key={row.id}>
                <tr className={cx('TableRow__tr', {
                  'TableRow__tr--isHighlightHover': highlightOnHover,
                  'TableRow__tr--stripedRows': stripedRows,
                  'TableRow__tr--pointerOnHover': pointerOnHover,
                })}>
                  {expandableRows ? (
                    <TableCell
                      className={cx({
                        'TableCell--expandable': expandableRows,
                      })}
                      onClick={() => handleClickExpand(row.id)}
                    >
                      →
                    </TableCell>
                  ) : null}
                  {selectableRows ? (
                    <TableCell>
                      <input
                        type="checkbox"
                        value={row.id}
                        onChange={(e) => toggleSelectRow(e)}
                        checked={isSelectAll || selectedData.get(row.id)}
                      />
                    </TableCell>
                  ) : null}
                  {columns.map(({ selector, render, style, key }) => {
                    const value = get(row, selector)
                    if (!isFunction(render)) return <TableCell style={style} key={key}>{value}</TableCell>

                    const renderedData = render({ value, index, row })
                    const props = merge(renderedData.props, { style })

                    return <TableCell dense={dense} {...props} key={key}>{renderedData.children}</TableCell>
                  })}
                </tr>
                {expandableRows && isExpand && expandRow === row.id ? (
                  <tr className="TableRow__tr">
                    <TableCell colSpan={Object.keys(row).length + 1}>
                      {expandableKey ? get(row, expandableKey) : 'no content'}
                    </TableCell>
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
          lastPageIndex={chunkedData.length - 1}
          totalDataSize={sortedData.length}
          pageChunkSize={pageChunkSize}
          setPageIndex={setPageIndex}
          setPageChunkSize={setPageChunkSize}
        />
      ) : null}
    </>
  )
}

export default DataTable
