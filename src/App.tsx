import React from 'react';
import Explanation from './components/Explanation';
import StatsBar from './components/StatsBar';
import SQLControl from './components/SQLControl';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Explanation />
      <StatsBar availableChars={window.windowManager.tabManager.availableCharacters()}/>
      <SQLControl />
    </div>
  );
}

export default App;
