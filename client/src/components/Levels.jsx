import React from 'react';
import ReactDOM from 'react-dom';
import CurrentLevels from './CurrentLevels.jsx';
import FullLevels from './FullLevels.jsx';

function Levels(props) {
  if (props.fullLevels.length) {
    return (
      <div id="all-levels-container">
        <CurrentLevels userId={props.userId} fetchLevels={props.fetchLevels} allCurrentLevels={props.allCurrentLevels} currentLevels={props.currentLevels} limitedLevels={props.limitedLevels} />
        <FullLevels userId={props.userId} fullLevels={props.fullLevels} />
      </div>
    );
  }
  return (
    <div id="all-levels-container">
     <CurrentLevels userId={props.userId} fetchLevels={props.fetchLevels} allCurrentLevels={props.allCurrentLevels} currentLevels={props.currentLevels} limitedLevels={props.limitedLevels} />
    </div>
  );
}

export default Levels;
