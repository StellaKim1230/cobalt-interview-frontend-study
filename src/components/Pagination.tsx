import React, { FC } from 'react'

import { PAGE_CHUNK_SIZE_OPTION, DEFAULT_PAGE_CHUNK_SIZE } from '../utils/constants'

import './Pagination.scss'

interface Props {
  currentPageIndex: number
  pageTotalSize: number
  pageChunkSize: number
  setPageIndex: React.Dispatch<React.SetStateAction<number>>
  setPageChunkSize: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: FC<Props> = ({
  currentPageIndex,
  pageTotalSize,
  pageChunkSize,
  setPageIndex,
  setPageChunkSize,
}) => {
  const onChangePage = (e: any) => setPageChunkSize(e.target.value)

  return (
    <>
      <select
        className="Pagination__select"
        onChange={(e) => onChangePage(e)}
        defaultValue={DEFAULT_PAGE_CHUNK_SIZE}
      >
        {PAGE_CHUNK_SIZE_OPTION.map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.title}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="Pagination__button"
        onClick={() => setPageIndex(0)}
        disabled={currentPageIndex === 0}
      >
        {'<<'}
      </button>
      <button
        type="button"
        className="Pagination__button"
        onClick={() => setPageIndex(currentPageIndex - 1)}
        disabled={currentPageIndex === 0}
      >
        {'<'}
      </button>
      <button
        type="button"
        className="Pagination__button"
        onClick={() => setPageIndex(currentPageIndex + 1)}
        disabled={currentPageIndex > pageTotalSize}
      >
        {'>'}
      </button>
      <button
        type="button"
        className="Pagination__button"
        onClick={() => setPageIndex(pageTotalSize)}
        disabled={pageTotalSize < pageChunkSize}
      >
        {'>>'}
      </button>
    </>
  )
}

export default Pagination
