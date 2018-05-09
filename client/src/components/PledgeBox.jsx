import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PledgeInputArea from './PledgeInputArea.jsx';

class PledgeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      continueButtonDisplay: false,
      activeInputArea: false,
      hoverInputArea: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleContinueButtonClick = this.handleContinueButtonClick.bind(this);
    this.handleInputTextClick = this.handleInputTextClick.bind(this);
    this.handleInputTextMouseEnter = this.handleInputTextMouseEnter.bind(this);
    this.handleInputTextMouseLeave = this.handleInputTextMouseLeave.bind(this);
  }

  handleClickOutside() {
    this.setState({ activeInputArea: false });
  }

  handleInputChange(e) {
    this.setState({ amount: e.target.value });
  }

  handleInputTextClick() {
    // display continue button
    this.setState({ continueButtonDisplay: true, activeInputArea: true });
    // highlight input text area and currency div in green
    // when user clicks out of that input text area, have to unhighlight but leave continue button
  }

  handleInputTextMouseEnter() {
    this.setState({ hoverInputArea: true });
  }

  handleInputTextMouseLeave() {
    this.setState({ hoverInputArea: false });
  }

  handleContinueButtonClick(e) {
    const newPledgeForProjectWithoutLevel = {
      userId: this.props.userId,
      amount: this.state.amount,
      projectId: this.props.projectId,
    };

    console.log(newPledgeForProjectWithoutLevel);

    axios.post(`/pledges/${this.props.projectId}`, newPledgeForProjectWithoutLevel)
      .then((response) => {
        // input value empty =>  not working
        document.getElementById('pledge-amount').value = '';
      })
      .catch((err) => {
        console.log('ERROR', err);
      });
  }

  render() {
    return (
    <div id="pledge-component-container" className="support-item">
      <div id="pledge-component-subcontainer">
        <div className="pledge-flex-div">
          <div id="pledge-header" className="pledge-component">Make a pledge without a reward</div>
        </div>
        <div className="pledge-flex-div">
          <PledgeInputArea amount={this.state.amount} handleInputChange={this.handleInputChange} handleInputTextMouseLeave={this.handleInputTextMouseLeave} handleInputTextMouseEnter={this.handleInputTextMouseEnter} handleInputTextClick={this.handleInputTextClick} handleClickOutside={this.handleClickOutside} hoverInputArea={this.state.hoverInputArea} activeInputArea={this.state.activeInputArea}/>
        </div>
        <div className="pledge-flex-div">
          <button type="button" id="continue-button" onClick={this.handleContinueButtonClick} className={this.state.continueButtonDisplay ? 'pledge-component display-button continue-button' : 'pledge-component hide-area continue-button'}>Continue</button>
        </div>
      </div>
    </div>
    );
  }
}

export default PledgeBox;
