import React from 'react';
import './App.css';
import { GraphComponent } from './graph';
import { graph } from './demoGraph'

const App: React.FC = () => {
  return (
    <div className="App">
          <GraphComponent graph={graph} onLinkClicked={d => console.log(d.id)}/>
    </div>
  );
}

export default App;
