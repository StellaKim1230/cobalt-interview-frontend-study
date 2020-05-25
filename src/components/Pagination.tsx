import React, { FC } from 'react'

import { PAGE_CHUNK_SIZE_OPTION, DEFAULT_PAGE_CHUNK_SIZE } from '../utils/constants'

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
  const onChangePage = (e: any) => {
    setPageChunkSize(e.target.value)
  }

  return (
    <>
      <select onChange={(e) => onChangePage(e)} defaultValue={DEFAULT_PAGE_CHUNK_SIZE}>
        {PAGE_CHUNK_SIZE_OPTION.map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.title}
          </option>
        ))}
      </select>
      <div>
        <button type="button" onClick={() => setPageIndex(0)}>맨 앞으로</button>
      </div>
      <div>
        <button type="button" onClick={() => setPageIndex(currentPageIndex - 1)} disabled={currentPageIndex === 0}>
          한 페이지 앞으로
        </button>
      </div>
      <div>
        <button type="button" onClick={() => setPageIndex(currentPageIndex + 1)} disabled={currentPageIndex > pageTotalSize}>
          한 페이지 뒤로
        </button>
      </div>
      <div>
        <button type="button" onClick={() => setPageIndex(pageTotalSize)} disabled={pageTotalSize < pageChunkSize}>맨 뒤로</button>
      </div>
    </>
  )
}

export default Pagination
