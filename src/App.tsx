import React from 'react';
import './App.css';
import { DoorSelector } from './doorSelector';
import { graph } from './demoGraph'

const style = {
    width: 400,
    height: 200
}

const App: React.FC = () => {
  return (
    <div className="App">
          <DoorSelector graph={graph} style={style} onSelectionFinished={console.log}/>
    </div>
  );
}

export default App;
