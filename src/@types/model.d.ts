import { ReactNode, TdHTMLAttributes } from 'react'

export interface RenderResult { children: ReactNode, props?: TdHTMLAttributes<HTMLTableDataCellElement> }

export interface TableColumn {
  key: string | number
  title: string
  selector: string
  render?: (param: { value: string | number, row?: any, index?: number }) => RenderResult
  style?: any
  sortable?: boolean
}

export interface ChunkedDataParams {
  data: any[]
  pageChunkSize: number
}
