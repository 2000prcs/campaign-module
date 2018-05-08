import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import LevelBackersSection from './LevelBackersSection.jsx';
import PledgeInputArea from './PledgeInputArea.jsx';
import ShippingSelect from './ShippingSelect.jsx';

const axios = require('axios');

class SingleCurrentLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightLevel: false,
      amount: '',
      orderInfoDisplay: false,
      activeInputArea: false,
      hoverInputArea: false,
    };
    this.handleLevelMouseEnter = this.handleLevelMouseEnter.bind(this);
    this.handleLevelMouseLeave = this.handleLevelMouseLeave.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleContinueButtonClick = this.handleContinueButtonClick.bind(this);
    this.handleInputTextClick = this.handleInputTextClick.bind(this);
    this.handleInputTextMouseEnter = this.handleInputTextMouseEnter.bind(this);
    this.handleInputTextMouseLeave = this.handleInputTextMouseLeave.bind(this);
    this.handleLevelClick = this.handleLevelClick.bind(this);
  }

  handleClickOutside() {
    this.setState({ activeInputArea: false });
  }

  // Saving pledge amount per pledge level
  handleInputChange(e) {
    this.setState({ amount: e.target.value });
  }

  handleInputTextClick() {
    // display continue button
    this.setState({ activeInputArea: true });
    // highlight input text area and currency div in green
    // when user clicks out of that input text area, have to unhighlight but leave continue button
  }

  handleLevelClick() {
    this.setState({ orderInfoDisplay: true });
  }

  handleInputTextMouseEnter() {
    this.setState({ hoverInputArea: true });
  }

  handleInputTextMouseLeave() {
    this.setState({ hoverInputArea: false });
  }

  handleLevelMouseEnter() {
    this.setState({ highlightLevel: true });
  }

  handleLevelMouseLeave() {
    this.setState({ highlightLevel: false });
  }
  
  // POST request to save each pledge
  handleContinueButtonClick(e) {
    const newPledgeForLevel = {
      userId: this.props.userId,
      amount: this.state.amount,
      projectId: this.props.level.projectid,
      levelId: this.props.level.id,
    };

    console.log(newPledgeForLevel);

    axios.post(`/pledges/${this.props.level.projectId}/${this.props.level.id}`, newPledgeForLevel)
      .then((response) => {
        // input value empty =>  not working
        document.getElementById('pledge-amount').value = '';
        this.props.fetchLevels();
      })
      .catch((err) => {
        console.log('ERROR', err);
      });
  }


  render() {
    return (
    <div id={this.props.level.id} className="single-current-level-master-container support-item" onClick={this.handleLevelClick} onMouseLeave={this.handleLevelMouseLeave} onMouseEnter={this.handleLevelMouseEnter}>
      <div className={this.state.highlightLevel ? 'green-background' : 'green-background invisible'}>
        <span>Select reward</span>
      </div>
      <div className="content-container">
        <div className="single-current-level-subcontainer" onClick={this.handleLevelClick}>
          <div className="level-pledge-amount">Pledge ${this.props.level.cutoffAmount} or more</div>
          <div className="level-name">{this.props.level.name}</div>
          <p className="level-description">{this.props.level.description}</p>
          <div className="level-includes-section">
            <div className="level-additional-info-header">INCLUDES:</div>
            <ul className="level-includes-list">
              {this.props.level.includes.includes.map(item => <li key={item} className="includes-list-item">{item}</li>)}
            </ul>
          </div>
          <div className="level-extra-info-section">
            <div className="level-delivery-date-section">
              <span className="level-additional-info-header">ESTIMATED DELIVERY</span>
              <span className="level-additional-info-item">{moment(this.props.level.estimatedDelivery).format('MMM YYYY')}</span>
            </div>
            <div className="level-delivery-region-section">
              <span className="level-additional-info-header">SHIPS TO</span>
              <span className="level-additional-info-item">{this.props.level.shipsto}</span>
            </div>
          </div>
          <LevelBackersSection level={this.props.level} levelType={this.props.levelType} />
          <div className={this.state.orderInfoDisplay ? 'level-pledge-form' : 'level-pledge-form hide-area'}>
            <ShippingSelect shipsTo={this.props.level.shipsto} />
            <label className="pledge-label">
              Pledge amount
              <div className="label-separation">
                <PledgeInputArea amount={this.state.amount} starting={this.props.level.cutoffAmount} handleInputChange={this.handleInputChange} handleInputTextMouseLeave={this.handleInputTextMouseLeave} handleInputTextMouseEnter={this.handleInputTextMouseEnter} handleInputTextClick={this.handleInputTextClick} handleClickOutside={this.handleClickOutside} hoverInputArea={this.state.hoverInputArea} activeInputArea={this.state.activeInputArea}/>
                <button type="button" onClick={this.handleContinueButtonClick} className={this.state.orderInfoDisplay ? 'pledge-component continue-button extra-info' : 'pledge-component hide-area continue-button extra-info'}>Continue</button>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default SingleCurrentLevel;
