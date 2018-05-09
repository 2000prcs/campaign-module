import React from 'react';
import ReactDOM from 'react-dom';

function LevelBackersSection(props) {
  if (props.levelType === 'current') {
    if (props.level.numberofbackers === 1) {
      return (
      <div className="current-level-backers-section">
        <div className="backers-line">
          {props.level.numberofbackers} backer
        </div>
      </div>
      );
    } 
    return (
      <div className="current-level-backers-section">
        <div className="backers-line">
          {props.level.numberofbackers} backers
        </div>
      </div>
    );
    
  } else if (props.levelType === 'limited') {
    if (props.level.numberOfBackers === 1) {
      return (
      <div className="current-level-backers-section">
        <div className="limited-backers-line">
          Limited ({props.level.maxbackers - props.level.numberofbackers} of {props.level.maxbackers})
        </div>
        <div className="backers-line">
          {props.level.numberofbackers} backer
        </div>
      </div>
  );
} 
    return (
      <div className="current-level-backers-section">
        <div className="limited-backers-line">
          Limited ({props.level.maxbackers - props.level.numberofbackers} of {props.level.maxbackers})
        </div>
        <div className="backers-line">
          {props.level.numberofbackers} backers
        </div>
      </div>
    );
    
  } 
  if (props.level.numberOfBackers === 1) {
    return (
				<div className="full-level-backers-section">
					<div className="full-backers-line">
						Reward no longer available
					</div>
					<div className="backers-line">
						{props.level.numberofbackers} backer
					</div>
				</div>
    );
  } 
    return (
				<div className="full-level-backers-section">
					<div className="full-backers-line">
						Reward no longer available
					</div>
					<div className="backers-line">
						{props.level.numberofbackers} backers
					</div>
				</div>
    );
  
	
}

export default LevelBackersSection;
