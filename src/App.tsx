import React from 'react';

import Table from './components/Table'

import './App.scss';

import catDataSource from './dummy/cats.json'

const columns = [{
  key: 'id',
  title: 'ID',
  dataIndex: 'id',
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
}, {
  key: 'life_span',
  title: '수명',
  dataIndex: 'breeds.life_span',
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
        />
      </main>
    </div>
  );
}

export default App;
