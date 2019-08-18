import React from 'react';
import './StatsBar.css';

const createTab = () => {
  window.windowManager.createNewTab({sqlTextArea: 'dfsfdsa'});
  console.log('here')
}

const StatsBar: React.FC<{availableChars: number}> = ({ availableChars }) => {
  return (
    <div className='StatsBar'>
      <span className='availableCharacters'>Available Characters: {availableChars}</span>
      <button onClick={createTab} className='addTab'>Click here to add a tab to increase characters</button>
    </div>
  );
}

export default StatsBar;
