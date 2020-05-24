import React from 'react';

import Table from './components/Table'

import './App.scss';

import catDataSource from './dummy/cats.json'

const columns = [{
  key: 'id',
  title: 'ID',
  dataIndex: 'id',
  style: {
    color: 'red',
    backgroundColor: 'rgba(0, 0, 0, .1)',
  },
}, {
  key: 'name',
  title: '이름',
  dataIndex: 'breeds.name',
}, {
  key: 'origin',
  title: '원산지',
  dataIndex: 'breeds.origin',
}, {
  key: 'imperial',
  title: '몸무게',
  dataIndex: 'breeds.weight.imperial',
  render: (value: string) => `${value} kg`,
}, {
  key: 'life_span',
  title: '수명',
  dataIndex: 'breeds.life_span',
  render: (value: string) => `${value} 년`,
}]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>코발트 코딩 과제 - 프론트 엔드</h1>
      </header>
      <main>
        <Table
          title="Cat List"
          columns={columns}
          dataSource={catDataSource}
          expandable={true}
          expandableKey='breeds.description'
        />
      </main>
    </div>
  );
}

export default App;
