import { getSortOption, getSortedData } from '../dataTableUtils'
import { SortType } from '../constants'

test('should return [sortField, SortType.ASC] when received one of valid parameter', () => {
  expect(getSortOption('defaultSortField')).toEqual(['defaultSortField', SortType.ASC])
  expect(getSortOption('defaultSortField', 'selector')).toEqual(['defaultSortField', SortType.ASC])
  expect(getSortOption(undefined, 'selector')).toEqual(['selector', SortType.ASC])
})

test('should return sorted data array when received sort option', () => {
  expect(getSortedData([{ name: 'a' }, { name: 'b' }, { name: 'c' }], ['name', SortType.ASC])).toEqual([
    { name: 'a' },
    { name: 'b' },
    { name: 'c' },
  ])
  expect(getSortedData([{ name: 'a' }, { name: 'b' }, { name: 'c' }], ['name', SortType.DESC])).toEqual([
    { name: 'c' },
    { name: 'b' },
    { name: 'a' },
  ])
})

test('should return sorted data array when does not sort option', () => {
  expect(getSortedData([{ name: 'a' }, { name: 'b' }, { name: 'c' }], null)).toEqual([
    { name: 'a' },
    { name: 'b' },
    { name: 'c' },
  ])
  expect(getSortedData([{ name: 'b' }, { name: 'a' }, { name: 'c' }], null)).toEqual([
    { name: 'b' },
    { name: 'a' },
    { name: 'c' },
  ])
})
