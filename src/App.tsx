import React from 'react';
import './App.css';
import { D3Component } from './graph';

const App: React.FC = () => {
  return (
    <div className="App">
        <D3Component data={[1, 2, 3]}/>
    </div>
  );
}

export default App;
