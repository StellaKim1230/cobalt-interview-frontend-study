import React, { FC } from 'react'

import { PAGE_CHUNK_SIZE_OPTION, PageChunkSizeOption } from '../utils/constants'

import './Pagination.scss'

const getPageRange = (currentPageIndex: number, pageChunkSize: number) => ({
  firstPage: currentPageIndex * pageChunkSize + 1,
  lastPage: (currentPageIndex + 1) * pageChunkSize,
})
interface Props {
  currentPageIndex: number
  lastPageIndex: number
  totalDataSize: number
  pageChunkSize: number
  setPageIndex: React.Dispatch<React.SetStateAction<number>>
  setPageChunkSize: React.Dispatch<React.SetStateAction<PageChunkSizeOption>>
}

const Pagination: FC<Props> = ({
  currentPageIndex,
  lastPageIndex,
  totalDataSize,
  pageChunkSize,
  setPageIndex,
  setPageChunkSize,
}) => {
  const { firstPage, lastPage } = getPageRange(currentPageIndex, pageChunkSize)
  const onChangePage = (e: React.ChangeEvent<HTMLSelectElement>) => setPageChunkSize(parseInt(e.target.value, 10) as PageChunkSizeOption)

  return (
    <div className="Pagination">
      <select
        className="Pagination__select"
        onChange={(e) => onChangePage(e)}
        defaultValue={pageChunkSize}
      >
        {PAGE_CHUNK_SIZE_OPTION.map(option => (
          <option
            key={option}
            value={option}
          >
            {option} page
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
            disabled={lastPageIndex <= currentPageIndex}
          >
            {'>'}
          </button>
        </li>
        <li className="Pagination__button">
          <button
            type="button"
            onClick={() => setPageIndex(lastPageIndex)}
            disabled={lastPageIndex <= currentPageIndex}
          >
            {'>>'}
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
