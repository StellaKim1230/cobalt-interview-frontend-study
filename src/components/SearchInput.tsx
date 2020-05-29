import React, { FC } from 'react'

import { debounce } from 'lodash'

import { TableColumn } from '../@types/model'
import { SearchType } from '../utils/constants'

import './SearchInput.scss'

interface Props {
  defaultSearchKey?: string
  columns?: TableColumn[]
  setSearchColumn: React.Dispatch<React.SetStateAction<string>>
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>
  setSearchType: React.Dispatch<React.SetStateAction<SearchType>>
}

const SearchInput: FC<Props> = ({ defaultSearchKey, columns, setSearchKeyword, setSearchColumn, setSearchType }) => {
  const onChangeSearchColumn = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchColumn(e.target.value)
  }

  const onChangeSearchType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value as SearchType)
  }

  const debouncedSearchKeyword = debounce((keyword: string) => setSearchKeyword(keyword), 300)

  const onChangeSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearchKeyword(e.target.value)
  }

  return (
    <>
      <select className="SearchInput__select" onChange={onChangeSearchColumn} defaultValue={defaultSearchKey}>
        {columns?.map(column => (
          <option key={column.key} value={column.selector}>
            {column.title}
          </option>
        ))}
      </select>
      <select className="SearchInput__select" onChange={onChangeSearchType}>
        <option value={SearchType.EQ}>equal</option>
        <option value={SearchType.CONTAIN}>contain</option>
      </select>
      <input type="text" onChange={onChangeSearchKeyword} placeholder="search text"/>
    </>
  )
}

export default SearchInput
