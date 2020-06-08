import React, { FC, useEffect, useState, Fragment } from 'react'

import cx from 'classnames'
import {
  get,
  find,
  chunk,
  isNil,
  isFunction,
  merge,
  eq,
  includes,
} from 'lodash'

import TableHead from './TableHead'
import TableCell from './TableCell'
import SearchInput from './SearchInput'
import Pagination from './Pagination'

import { TableColumn } from '../@types/model'
import {
  SortType,
  SearchType,
  DEFAULT_PAGE_CHUNK_SIZE,
  DEFAULT_CURRENT_PAGE_INDEX,
  PageChunkSizeOption,
} from '../utils/constants'
import { getSortOption, getSortedData } from '../utils/dataTableUtils'

import './DataTable.scss'

interface Props {
  title: string
  columns: TableColumn[]
  data: any[]
  expandableRowSelector?: string
  defaultSortSelector?: string
  defaultSearchSelector?: string
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
  rowsPerPage?: PageChunkSizeOption
}

const selectedData = new Map()

const DataTable: FC<Props> = ({
  title,
  columns,
  data,
  expandableRowSelector,
  defaultSortSelector,
  defaultSearchSelector,
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
  rowsPerPage,
}) => {
  // datasource
  const [sortOption, setSortOption] = useState<[string, SortType] | null>(
    getSortOption(
      defaultSortSelector,
      find(columns, ['sortable', true])?.selector,
    ),
  )
  const [dataSource, setDataSource] = useState(getSortedData(data, sortOption))

  // expandable rows
  const [isExpand, setIsExpand] = useState(false)
  const [expandRowId, setExpandRowId] = useState<string | null>(null)

  // selected rows
  const [isSelectAll, setIsSelectAll] = useState(false)
  const [selectedItemsCount, setSelectedItemsCount] = useState(0)

  // pagination
  const [pageChunkSize, setPageChunkSize] = useState(
    rowsPerPage ?? DEFAULT_PAGE_CHUNK_SIZE,
  )
  const [pageIndex, setPageIndex] = useState(DEFAULT_CURRENT_PAGE_INDEX)

  // search
  const [searchSelector, setSearchSelector] = useState(
    defaultSearchSelector ?? '',
  )
  const [searchType, setSearchType] = useState(SearchType.EQ)
  const [searchKeyword, setSearchKeyword] = useState<string | null>(null)

  const [chunkedData, setChunkedData] = useState(
    pagination ? chunk(dataSource, pageChunkSize) : dataSource,
  )

  // 실제 사용될 데이터
  const [currentData, setCurrentData] = useState<any[]>(
    pagination ? chunkedData[pageIndex] : dataSource,
  )

  const onExpandRow = (id: string) => {
    if (isNil(expandRowId)) {
      setIsExpand(true)
      setExpandRowId(id)
      return
    }

    if (expandRowId === id) {
      setIsExpand(false)
      setExpandRowId(null)
      return
    }

    setExpandRowId(id)
  }

  const onSelectRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedData.get(e.target.value)) {
      selectedData.delete(e.target.value)
    } else {
      selectedData.set(e.target.value, true)
    }

    setSelectedItemsCount(selectedData.size)
  }

  const onSelectAll = () => {
    setIsSelectAll(!isSelectAll)
    selectedData.clear()
    setSelectedItemsCount(0)
  }

  const getSelectedItemCount = isSelectAll ? data.length : selectedItemsCount

  useEffect(() => {
    setCurrentData(pagination ? chunkedData[pageIndex] : dataSource)
    //eslint-disable-next-line
  }, [chunkedData, pageIndex])

  useEffect(() => {
    setPageIndex(0)
    setChunkedData(chunk(dataSource, pageChunkSize))
    //eslint-disable-next-line
  }, [pageChunkSize, pagination, dataSource])

  useEffect(() => {
    setDataSource(getSortedData(dataSource, sortOption))
    //eslint-disable-next-line
  }, [sortOption])

  useEffect(() => {
    if (isNil(searchKeyword)) {
      return
    }

    if (!searchKeyword) {
      setDataSource(getSortedData(data, sortOption))
    }

    if (searchKeyword) {
      const filterFunction = searchType === SearchType.EQ ? eq : includes

      setDataSource(
        getSortedData(
          data.filter((data) =>
            filterFunction(
              get(data, searchSelector).toLowerCase(),
              searchKeyword.toLowerCase(),
            ),
          ),
          sortOption,
        ),
      )
    }
    // eslint-disable-next-line
  }, [searchKeyword, searchType])

  return (
    <>
      <h2 className="DataTable__title">{title}</h2>
      {isShowingSearchInput ? (
        <SearchInput
          defaultSearchSelector={defaultSearchSelector}
          columns={columns}
          setSearchSelector={setSearchSelector}
          setSearchKeyword={setSearchKeyword}
          setSearchType={setSearchType}
        />
      ) : null}
      {getSelectedItemCount !== 0 ? (
        <p className="DataTable__selectedCount">
          {getSelectedItemCount} items selected
        </p>
      ) : null}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="DataTable__table">
          {!noTableHead ? (
            <TableHead
              columns={columns}
              expandableRows={expandableRows}
              selectableRows={selectableRows}
              isDisableSelectAll={isDisableSelectAll}
              sortOption={sortOption}
              onSelectAll={onSelectAll}
              setSortOption={setSortOption}
            />
          ) : null}
          <tbody className="DataTable__body">
            {currentData?.map((row, index) => (
              <Fragment key={row.id}>
                <tr
                  className={cx('DataTable__row', {
                    'DataTable__row--highlightHover': highlightOnHover,
                    'DataTable__row--stripedRows': stripedRows,
                    'DataTable__row--pointerOnHover': pointerOnHover,
                  })}
                >
                  {expandableRows ? (
                    <TableCell
                      className={cx({
                        'TableCell--expandable': expandableRows,
                      })}
                    >
                      <button onClick={() => onExpandRow(row.id)}>→</button>
                    </TableCell>
                  ) : null}
                  {selectableRows ? (
                    <TableCell>
                      <input
                        type="checkbox"
                        value={row.id}
                        onChange={(e) => onSelectRow(e)}
                        checked={isSelectAll || selectedData.get(row.id)}
                      />
                    </TableCell>
                  ) : null}
                  {columns.map(({ selector, render, style, key }) => {
                    const value = get(row, selector)
                    if (!isFunction(render))
                      return (
                        <TableCell dense={dense} style={style} key={key}>
                          {value}
                        </TableCell>
                      )

                    const renderData = render({ value, index, row })
                    const props = merge(renderData.props, { style })

                    return (
                      <TableCell dense={dense} {...props} key={key}>
                        {renderData.children}
                      </TableCell>
                    )
                  })}
                </tr>
                {expandableRows && isExpand && expandRowId === row.id ? (
                  <tr className="DataTable__row">
                    <TableCell colSpan={Object.keys(row).length + 1}>
                      {expandableRowSelector
                        ? get(row, expandableRowSelector)
                        : 'no content'}
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
          totalDataSize={dataSource.length}
          pageChunkSize={pageChunkSize}
          setPageIndex={setPageIndex}
          setPageChunkSize={setPageChunkSize}
        />
      ) : null}
    </>
  )
}

export default DataTable
