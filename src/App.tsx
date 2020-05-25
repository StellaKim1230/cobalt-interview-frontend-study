import React, { useState } from 'react';

import DataTable from './components/DataTable'

import './App.scss';

import catDataSource from './dummy/cats.json'

const columns = [{
  key: 'id',
  title: 'ID',
  selector: 'id',
  style: {
    color: 'red',
    backgroundColor: 'rgba(0, 0, 0, .1)',
  },
}, {
  key: 'breeds.name',
  title: '이름',
  selector: 'breeds.name',
  sortable: true,
}, {
  key: 'breeds.origin',
  title: '원산지',
  selector: 'breeds.origin',
  sortable: true,
}, {
  key: 'breeds.imperial',
  title: '몸무게',
  selector: 'breeds.weight.imperial',
  render: (value: string) => `${value} kg`,
}, {
  key: 'breeds.life_span',
  title: '수명',
  selector: 'breeds.life_span',
  render: (value: string) => `${value} 년`,
}]

function App() {
  const [ expandableRows, setExpandableRows ] = useState(false)
  const [ selectableRows, setSelectableRows ] = useState(false)
  const [ isSelectAllDisable, setIsSelectAllDisable ] = useState(false)
  const [ noTableHead, setNoTableHead ] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <h1>코발트 코딩 과제 - 프론트 엔드</h1>
      </header>
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
            <input type="checkbox" onChange={() => setIsSelectAllDisable(!isSelectAllDisable)} />
              Disable Select All Rows
          </label>
          <label>
          <input type="checkbox" onChange={() => setNoTableHead(!noTableHead)} />
              No Table Head
          </label>
        </>
      )}
      <DataTable
        title="Cat List"
        columns={columns}
        data={catDataSource}
        expandableRows={expandableRows}
        expandableKey='breeds.description'
        selectableRows={selectableRows}
        isSelectAllDisable={isSelectAllDisable}
        noTableHead={noTableHead}
        defaultSortKey="breeds.name"
      />
    </div>
  );
}

export default App;
