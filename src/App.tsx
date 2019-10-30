import React from 'react';
import './App.css';
import { D3Component } from './graph';
import { graph } from './demoGraph'
import { getD3Graph } './graphLib'

const d3Graph = getD3Graph(graph)

const App: React.FC = () => {
  return (
    <div className="App">
          <D3Component data={d3Graph}/>
    </div>
  );
}

export default App;
