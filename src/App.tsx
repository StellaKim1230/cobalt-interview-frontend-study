import React, { useState } from 'react'

import DataTable from './components/DataTable'
import Checkbox from './components/Checkbox'

import catDataSource from './dummy/cats.json'

import { TableColumn } from './@types/model'

import './App.scss'

const columns: TableColumn[] = [{
  key: 'id',
  title: 'ID',
  selector: 'id',
  style: {
    color: 'red',
  },
  render: ({ value, index }) => {
    if (index && index === 6) {
      return {
        children: value,
        props: {
          rowSpan: 2,
        }
      }
    }
    if (index && index === 7) {
      return {
        children: value,
        props: {
          rowSpan: 0,
        }
      }
    }
    return { children: value }
  }
}, {
  key: 'breeds.name',
  title: '이름',
  selector: 'breeds.name',
  sortable: true,
  render: ({ value, index }) => {
    if (index && index === 4) {
      return {
        children: value,
        props: {
          colSpan: 4,
        }
      }
    }
    return { children: value }
  }
}, {
  key: 'breeds.origin',
  title: '원산지',
  selector: 'breeds.origin',
  sortable: true,
  render: ({ value, index }) => {
    if (index && index === 4) {
      return {
        children: value,
        props: {
          colSpan: 0,
        }
      }
    }
    return { children: value }
  }
}, {
  key: 'breeds.imperial',
  title: '몸무게',
  selector: 'breeds.weight.imperial',
  render: ({ value, index }) => {
    if (index && index === 4) {
      return {
        children: `${value} kg`,
        props: {
          colSpan: 0,
        }
      }
    }
    return { children: `${value} kg` }
  }
}, {
  key: 'breeds.life_span',
  title: '수명',
  selector: 'breeds.life_span',
  render: ({ value, index }) => {
    if (index && index === 4) {
      return {
        children: `${value} 년`,
        props: {
          colSpan: 0,
        }
      }
    }
    return { children: `${value} 년` }
  }
}]

function App() {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ expandableRows, setExpandableRows ] = useState(false)
  const [ selectableRows, setSelectableRows ] = useState(false)
  const [ isDisableSelectAll, setIsDisableSelectAll ] = useState(false)
  const [ noTableHead, setNoTableHead ] = useState(false)
  const [ pagination, setPagination ] = useState(false)
  const [ isShowingSearchInput, setIsShowingSearchInput ] = useState(false)
  const [ highlightOnHover, setHighlightOnHover ] = useState(false)
  const [ stripedRows, setStripedRows ] = useState(false)
  const [ pointerOnHover, setPointerOnHover ] = useState(false)
  const [ dense, setDense ] = useState(false)

  const menus = [{
    title: 'Simulate Loading State',
    onChange: () => setIsLoading(!isLoading),
  }, {
    title: 'Expandable Rows',
    onChange: () => setExpandableRows(!expandableRows),
  }, {
    title: 'Pagination',
    onChange: () => setPagination(!pagination),
  }, {
    title: 'Search',
    onChange: () => setIsShowingSearchInput(!isShowingSearchInput),
  }, {
    title: 'Highlighit on Hover',
    onChange: () => setHighlightOnHover(!highlightOnHover),
  }, {
    title: 'Striped Rows',
    onChange: () => setStripedRows(!stripedRows),
  }, {
    title: 'Pointer on Hover',
    onChange: () => setPointerOnHover(!pointerOnHover),
  }, {
    title: 'Dense',
    onChange: () => setDense(!dense),
  }, {
    title: 'Selectable Rows',
    onChange: () => setSelectableRows(!selectableRows),
  }]

  return (
    <div className="App">
      <header className="App-header">
        <h1>코발트 코딩 과제 - 프론트 엔드</h1>
      </header>
      <ul className="MenuList">
        {menus.map(({ title, onChange }) => (
          <li key={title} className="MenuList__li">
            <Checkbox title={title} onChange={onChange} />
          </li>
        ))}
        {selectableRows && (
          <>
            <li className="MenuList__li">
              <label>
                <input type="checkbox" onChange={() => setIsDisableSelectAll(!isDisableSelectAll)} />
                  Disable Select All Rows
              </label>
            </li>
            <li className="MenuList__li">
              <label>
              <input type="checkbox" onChange={() => setNoTableHead(!noTableHead)} />
                  No Table Head
              </label>
            </li>
          </>
        )}
      </ul>
      <DataTable
        title="Cat List"
        columns={columns}
        data={catDataSource}
        expandableKey='breeds.description'
        defaultSortKey="breeds.name"
        defaultSearchKey="breeds.name"
        isLoading={isLoading}
        expandableRows={expandableRows}
        selectableRows={selectableRows}
        isDisableSelectAll={isDisableSelectAll}
        noTableHead={noTableHead}
        pagination={pagination}
        isShowingSearchInput={isShowingSearchInput}
        highlightOnHover={highlightOnHover}
        stripedRows={stripedRows}
        pointerOnHover={pointerOnHover}
        dense={dense}
      />
    </div>
  )
}

export default App
