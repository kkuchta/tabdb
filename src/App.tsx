import React from 'react';
import Explanation from './components/Explanation';
import StatsBar from './components/StatsBar';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Explanation />
      <StatsBar availableChars={3}/>
    </div>
  );
}

export default App;
