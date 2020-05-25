export interface TableColumn {
  key: string | number
  title: string
  selector: string
  render?: (parameter?: any) => any
  style?: any
  sortable?: boolean
}

export interface ChunkedDataParams {
  data: any[]
  pageChunkSize: number
}
