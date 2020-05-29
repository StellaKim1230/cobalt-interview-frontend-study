import React, { FC } from 'react'

interface Props {
  title: string
  onChange: () => void
}

const Checkbox: FC<Props> = ({ title, onChange }) => {
  return (
    <label>
      <input type="checkbox" onChange={onChange} />
      {title}
    </label>
  )
}

export default Checkbox
