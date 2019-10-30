import React from 'react';
import './App.css';
import { GraphComponent } from './g2';
import { graph } from './demoGraph'

const App: React.FC = () => {
  return (
    <div className="App">
          <GraphComponent graph={graph}/>
    </div>
  );
}

export default App;
