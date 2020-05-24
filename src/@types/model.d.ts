export interface TableColumn {
  className?: string
  key: string | number
  title: string
  dataIndex: string
  render?: (parameter: string | number) => void
  align?: StringifyOptions
}
