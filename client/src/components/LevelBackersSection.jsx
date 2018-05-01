import React from 'react';
import ReactDOM from 'react-dom';

function LevelBackersSection(props) {
	if (props.levelType === 'current') {
		if (props.level.numberOfBackers === 1) {
			return (
				<div className="current-level-backers-section">
					<div className="backers-line">
						{props.level.numberOfBackers} backer
					</div>
				</div>
			)
		} else {
			return (
				<div className="current-level-backers-section">
					<div className="backers-line">
						{props.level.numberOfBackers} backers
					</div>
				</div>
			)
		}
	} else if (props.levelType === 'limited') {
		if (props.level.numberOfBackers === 1) {
			return (
				<div className="current-level-backers-section">
					<div className="limited-backers-line">
						Limited ({props.level.maxBackers - props.level.numberOfBackers} of {props.level.maxBackers})
					</div>
					<div className="backers-line">
						{props.level.numberOfBackers} backer
					</div>
				</div>
			)
		} else {
			return (
				<div className="current-level-backers-section">
					<div className="limited-backers-line">
						Limited ({props.level.maxBackers - props.level.numberOfBackers} of {props.level.maxBackers})
					</div>
					<div className="backers-line">
						{props.level.numberOfBackers} backers
					</div>
				</div>
			)
		}
	} else {
		if (props.level.numberOfBackers === 1) {
			return (
				<div className="full-level-backers-section">
					<div className="full-backers-line">
						Reward no longer available
					</div>
					<div className="backers-line">
						{props.level.numberOfBackers} backer
					</div>
				</div>
			)
		} else {
			return (
				<div className="full-level-backers-section">
					<div className="full-backers-line">
						Reward no longer available
					</div>
					<div className="backers-line">
						{props.level.numberOfBackers} backers
					</div>
				</div>
			)
		}
	}
}

export default LevelBackersSection;