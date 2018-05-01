import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PledgeInputArea from './PledgeInputArea.jsx';

class PledgeBox extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			amount: '',
			continueButtonDisplay: false,
			activeInputArea: false,
			hoverInputArea: false
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleContinueButtonClick = this.handleContinueButtonClick.bind(this);
		this.handleInputTextClick = this.handleInputTextClick.bind(this);
		this.handleInputTextMouseEnter = this.handleInputTextMouseEnter.bind(this);
		this.handleInputTextMouseLeave = this.handleInputTextMouseLeave.bind(this);
	}

	handleClickOutside() {
		this.setState({activeInputArea: false});
	}

	handleInputChange(e) {
		this.setState({amount: e.target.value});
	}

	handleInputTextClick(e) {
		// display continue button
		this.setState({continueButtonDisplay: true, activeInputArea: true});
		// highlight input text area and currency div in green
		// when user clicks out of that input text area, have to unhighlight but leave continue button
	}

	handleInputTextMouseEnter(e) {
		this.setState({hoverInputArea: true});
	}

	handleInputTextMouseLeave(e) {
		this.setState({hoverInputArea: false});
	}

	handleContinueButtonClick(e) {
		let userNewBackedProject = {};
		userNewBackedProject.username = this.props.username;
		userNewBackedProject.projectId = this.props.projectId;
		let pledgeAmount = e.target.closest('#pledge-component-container').find('.pledge-amount-chosen').value;
		userNewBackedProject.amount = pledgeAmount;
		axios.post('/users', userNewBackedProject)
		.then(response => {
			// what actually happens, is there a thank you message?
			axios.post(`/${this.props.projectId}/${pledgeAmount}`)
		})
		.then(response => {
			e.target.closest('.single-current-level-master-container').find('.pledge-amount-chosen').value = '';
		})
		.catch(err => {
			console.log('ERROR', err);
		})
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
		)
	}
}

export default PledgeBox;