export enum SortType {
  ASC = 'asc',
  DESC = 'desc',
}

export enum SearchType {
  EQ = 'equal',
  CONTAIN = 'contain',
}

export const DEFAULT_PAGE_CHUNK_SIZE = 10
export const DEFAULT_CURRENT_PAGE_INDEX = 0

export const PAGE_CHUNK_SIZE_OPTION = [10, 15, 20] as const
export type PageChunkSizeOption = typeof PAGE_CHUNK_SIZE_OPTION[number]

export const SORT_SELECTOR_INDEX = 0
export const SORT_TYPE_INDEX = 1
