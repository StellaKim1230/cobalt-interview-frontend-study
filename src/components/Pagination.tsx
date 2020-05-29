import React, { FC } from 'react'

import { PAGE_CHUNK_SIZE_OPTION, DEFAULT_PAGE_CHUNK_SIZE } from '../utils/constants'

import './Pagination.scss'

const getPageRange = (currentPageIndex: number, pageChunkSize: number) => ({
  firstPage: currentPageIndex * pageChunkSize + 1,
  lastPage: (currentPageIndex + 1) * pageChunkSize
})
interface Props {
  currentPageIndex: number
  lastPageIndex: number
  totalDataSize: number
  pageChunkSize: number
  setPageIndex: React.Dispatch<React.SetStateAction<number>>
  setPageChunkSize: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: FC<Props> = ({
  currentPageIndex,
  lastPageIndex,
  totalDataSize,
  pageChunkSize,
  setPageIndex,
  setPageChunkSize,
}) => {
  const onChangePage = (e: any) => setPageChunkSize(e.target.value)

  const { firstPage, lastPage } = getPageRange(currentPageIndex, pageChunkSize)

  return (
    <div className="Pagination">
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
        <span>{firstPage}-{lastPage > totalDataSize ? totalDataSize : lastPage} of {totalDataSize}</span>
      <ul className="Pagination__buttonList">
        <li className="Pagination__button">
          <button
            type="button"
            onClick={() => setPageIndex(0)}
            disabled={currentPageIndex === 0}
          >
            {'<<'}
          </button>
        </li>
        <li className="Pagination__button">
          <button
            type="button"
            onClick={() => setPageIndex(currentPageIndex - 1)}
            disabled={currentPageIndex === 0}
          >
            {'<'}
          </button>
        </li>
        <li className="Pagination__button">
          <button
            type="button"
            onClick={() => setPageIndex(currentPageIndex + 1)}
            disabled={currentPageIndex >= lastPageIndex}
          >
            {'>'}
          </button>
        </li>
        <li className="Pagination__button">
          <button
            type="button"
            onClick={() => setPageIndex(lastPageIndex)}
            disabled={currentPageIndex >= lastPageIndex}
          >
            {'>>'}
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
