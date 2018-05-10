import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class PledgeInputArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // componentWillMount() {
  //   document.addEventListener('mousedown', this.handleClick, false);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('mousedown', this.handleClick, false);
  // }

  handleClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    this.props.handleClickOutside();
  }


  render() {
    return (
    <div ref={(node) => { this.node = node;}}>
      <div className="pledge-amount-container">
          <span className={this.props.activeInputArea || this.props.hoverInputArea ? 'pledge-amount-currency-symbol pledge-component highlight' : 'pledge-amount-currency-symbol pledge-component no-highlight'}>$</span>
          <input id="pledge-amount" type="text" className={this.props.activeInputArea || this.props.hoverInputArea ? ' pledge-amount-chosen pledge-component highlight' : 'pledge-amount-chosen pledge-component no-highlight'} value={this.props.amount ? this.props.amount : (this.props.starting ? this.props.starting : '')} placeholder="Pledge any amount" onMouseEnter={this.props.handleInputTextMouseEnter} onMouseLeave={this.props.handleInputTextMouseLeave} onChange={this.props.handleInputChange} onClick={this.props.handleInputTextClick}/>
      </div>
    </div>
    );
  }
}

export default PledgeInputArea;
