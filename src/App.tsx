import React, { useState } from 'react';

import DataTable from './components/DataTable'

import catDataSource from './dummy/cats.json'

import { TableColumn } from './@types/model'

import './App.scss';

const columns: TableColumn[] = [{
  key: 'id',
  title: 'ID',
  selector: 'id',
  style: {
    color: 'red',
    backgroundColor: 'rgba(0, 0, 0, .1)',
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
  const [ isSearch, setIsSearch ] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <h1>코발트 코딩 과제 - 프론트 엔드</h1>
      </header>
      <div>
        <label>
          <input type="checkbox" onChange={() => setIsLoading(!isLoading)} />
          Simulate Loading State
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" onChange={() => setExpandableRows(!expandableRows)} />
          Expandable Rows
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" onChange={() => setSelectableRows(!selectableRows)} />
          Selectable Rows
        </label>
      </div>
      {selectableRows && (
        <>
          <label>
            <input type="checkbox" onChange={() => setIsDisableSelectAll(!isDisableSelectAll)} />
              Disable Select All Rows
          </label>
          <label>
          <input type="checkbox" onChange={() => setNoTableHead(!noTableHead)} />
              No Table Head
          </label>
        </>
      )}
      <div>
        <label>
          <input type="checkbox" onChange={() => setPagination(!pagination)} />
          Pagination
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" onChange={() => setIsSearch(!isSearch)} />
          Search
        </label>
      </div>
      <DataTable
        title="Cat List"
        columns={columns}
        data={catDataSource}
        isLoading={isLoading}
        expandableRows={expandableRows}
        expandableKey='breeds.description'
        selectableRows={selectableRows}
        isDisableSelectAll={isDisableSelectAll}
        noTableHead={noTableHead}
        pagination={pagination}
        defaultSortKey="breeds.name"
        isSearch={isSearch}
        defaultSearchOption="breeds.name"
      />
    </div>
  );
}

export default App;
