import { isNil, orderBy } from 'lodash'

import { SortType } from './constants'

export const getSortOption = (defaultSortKey?: string, sortableColum?: string): [string, SortType] | null => {
  const sortField = defaultSortKey ?? sortableColum
  return isNil(sortField) ? null : [sortField, SortType.ASC]
}

export const getSortedData = (data: any[], sortOption: [string, SortType] | null) => {
  return sortOption ? orderBy(data, sortOption[0], sortOption[1]) : data
}
