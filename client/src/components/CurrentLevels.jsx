import React from 'react';
import ReactDOM from 'react-dom';
import SingleCurrentLevel from './SingleCurrentLevel.jsx';

const CurrentLevels = (props) => {
  return (
  <div id="current-levels-container">
    {props.allCurrentLevels.map((level) => {
      if (props.currentLevels.filter(currentLevel => currentLevel.name === level.name).length > 0) {
        return <div key={level.id} className="single-current-level"><SingleCurrentLevel userId={props.userId} fetchLevels={props.fetchLevels} level={level} levelType="current" /></div>;
      }
        return <div key={level.id} className="single-limited-level"><SingleCurrentLevel userId={props.userId} fetchLevels={props.fetchLevels} level={level} levelType="limited" /></div>;
    })}
  </div>
  );
};

export default CurrentLevels;
