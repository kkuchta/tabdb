import React from 'react';
import Explanation from './components/Explanation';
import StatsBar from './components/StatsBar';
import SQLControl from './components/SQLControl';
import FAQ from './components/FAQ';
import './App.css';

const App: React.FC = () => {
  // This doesn't change after the page is loaded
  const availableCharacters = window.windowManager.tabManager.availableCharacters();

  return (
    <div className="App">
      <Explanation />
      <StatsBar availableChars={availableCharacters}/>
      { availableCharacters > 0 && <SQLControl /> }
      { availableCharacters > 0 && <FAQ /> }
      { availableCharacters <= 0 && <div>
        Click that button a few times to add storage space to your db!
      </div> }
    </div>
  );
}

export default App;
