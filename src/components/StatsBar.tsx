import React from 'react';

const createTab = () => {
  console.log('here')
}

const StatsBar: React.FC<{availableChars: number}> = ({ availableChars }) => {
  return (
    <div className='StatsBar'>
      <div>availableChars = {availableChars}</div>
      <button onClick={createTab}>Add Tab</button>
    </div>
  );
}

export default StatsBar;
