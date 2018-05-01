import React from 'react';
import ReactDOM from 'react-dom';
import SingleCurrentLevel from './SingleCurrentLevel.jsx';

function CurrentLevels(props) {
	return (
		<div id="current-levels-container">
			{props.allCurrentLevels.map(level => {
				if (props.currentLevels.filter(currentLevel => currentLevel.name === level.name).length > 0) {
					return <div className="single-current-level"><SingleCurrentLevel fetchLevels={props.fetchLevels} level={level} levelType="current" /></div>
				} else {
					return <div className="single-limited-level"><SingleCurrentLevel fetchLevels={props.fetchLevels} level={level} levelType="limited" /></div>
				}
			})}
		</div>
	)
}

export default CurrentLevels;