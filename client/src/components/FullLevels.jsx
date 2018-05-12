import React from 'react';
import moment from 'moment';
import LevelBackersSection from './LevelBackersSection.jsx';

const FullLevels = (props) => {
  return (
  <div id="full-levels-container">
    <div id="all-gone">All gone!</div>
    {props.fullLevels.map(level => (
        <div key={level.id} className="full-level support-item">
          <div className="full-level-subcontainer">
            <div className="level-pledge-amount">Pledge ${level.cutoffAmount} or more</div>
            <div className="level-name">{level.name}</div>
            <p className="level-description">{level.description}</p>
            <div className="level-includes-section">
              <div className="level-additional-info-header">INCLUDES:</div>
              <ul className="level-includes-list">
                {level.includes.includes.map(item => <li className="includes-list-item" key={item} >{item}</li>)}
              </ul>
            </div>
            <div className="level-extra-info-section">
              <div className="level-delivery-date-section">
                <span className="level-additional-info-header">ESTIMATED DELIVERY</span>
                <span className="level-additional-info-item">{moment(level.estimatedDelivery).format('MMM YYYY')}</span>
              </div>
              <div className="level-delivery-region-section">
                <span className="level-additional-info-header">SHIPS TO</span>
                <span className="level-additional-info-item">{level.shipsTo}</span>
              </div>
            </div>
            <LevelBackersSection level={level} levelType="full"/>
          </div>
        </div>
      ))}
  </div>
  );
}

export default FullLevels;
