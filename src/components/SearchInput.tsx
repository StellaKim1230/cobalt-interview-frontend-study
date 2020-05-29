import React, { FC } from 'react'

import { debounce } from 'lodash'

import { TableColumn } from '../@types/model'
import { SearchType } from '../utils/constants'

import './SearchInput.scss'

interface Props {
  defaultSearchSelector?: string
  columns?: TableColumn[]
  setSearchSelector: React.Dispatch<React.SetStateAction<string>>
  setSearchKeyword: React.Dispatch<React.SetStateAction<string | null>>
  setSearchType: React.Dispatch<React.SetStateAction<SearchType>>
}

const SearchInput: FC<Props> = ({ defaultSearchSelector, columns, setSearchKeyword, setSearchSelector, setSearchType }) => {
  const onChangeSearchColumn = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchSelector(e.target.value)
  }

  const onChangeSearchType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value as SearchType)
  }

  const debouncedSearchKeyword = debounce((keyword: string) => setSearchKeyword(keyword), 300)

  const onChangeSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearchKeyword(e.target.value)
  }

  return (
    <div className="SearchInput">
      <select className="SearchInput__select" onChange={onChangeSearchColumn} defaultValue={defaultSearchSelector}>
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
    </div>
  )
}

export default SearchInput
