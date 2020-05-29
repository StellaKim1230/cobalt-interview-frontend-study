import { isNil, orderBy } from 'lodash'

import { SortType, SORT_SELECTOR_INDEX, SORT_TYPE_INDEX } from './constants'

export const getSortOption = (defaultSortSelector?: string, sortableColum?: string): [string, SortType] | null => {
  const sortField = defaultSortSelector ?? sortableColum
  return isNil(sortField) ? null : [sortField, SortType.ASC]
}

export const getSortedData = (data: any[], sortOption: [string, SortType] | null) => {
  return sortOption ? orderBy(data, sortOption[SORT_SELECTOR_INDEX], sortOption[SORT_TYPE_INDEX]) : data
}
