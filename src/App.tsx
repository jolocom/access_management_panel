import React from 'react';
import './App.css';
import { DoorSelector } from './doorSelector';
import { graph } from './demoGraph'

const App: React.FC = () => {
  return (
    <div className="App">
          <DoorSelector graph={graph} onSelectionFinished={console.log}/>
    </div>
  );
}

export default App;
