import React, { FC } from 'react'

import { PAGE_CHUNK_SIZE_OPTION, DEFAULT_PAGE_CHUNK_SIZE } from '../utils/constants'

interface Props {
  setPageIndex: React.Dispatch<React.SetStateAction<number>>
  setPageChunkSize: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: FC<Props> = ({ setPageChunkSize }) => {
  const onChangePage = (e: any) => {
    setPageChunkSize(e.target.value)
  }

  return (
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
  )
}

export default Pagination
