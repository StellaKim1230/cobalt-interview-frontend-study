export interface TableColumn {
  className?: string
  key: string | number
  title: string
  dataIndex: string
  render?: (parameter?: any) => any
  align?: StringifyOptions
  style?: any
}
