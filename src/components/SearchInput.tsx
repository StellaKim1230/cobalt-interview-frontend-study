import React, { FC } from 'react'

import { debounce } from 'lodash'

import { TableColumn } from '../@types/model'

interface Props {
  defaultSearchOption?: string
  columns?: TableColumn[]
  setSearchOption: React.Dispatch<React.SetStateAction<string>>
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>
}

const SearchInput: FC<Props> = ({ defaultSearchOption, columns, setSearchKeyword, setSearchOption }) => {
  const onChangeSearchOption = (e: any) => {
    setSearchOption(e.target.value)
  }

  const debouncedSearchKeyword = debounce((keyword: string) => setSearchKeyword(keyword), 300)

  const onChangeSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearchKeyword(e.target.value)
  }

  return (
    <>
      <select onChange={(e) => onChangeSearchOption(e)} defaultValue={defaultSearchOption}>
        {columns?.map(column => (
          <option key={column.key} value={column.selector}>
            {column.title}
          </option>
        ))}
      </select>
      <input type="text" onChange={onChangeSearchKeyword} placeholder="search text"/>
    </>
  )
}

export default SearchInput
