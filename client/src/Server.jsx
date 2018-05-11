import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import About from './components/About.jsx';
import Support from './components/Support.jsx';

class Campaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.projectId,
      userId: this.props.userId,
    };
  }

  render() {
    return (
    <div id="app-container">
      <About projectId={this.props.projectId} />
      <Support projectId={this.props.projectId} userId={this.props.userId} />
    </div>
    );
  }
}

// can't use window keyword if it's server-side rendering
// window.React = React;
// window.ReactDOM = ReactDOM;
// window.Campaign = Campaign;

export default Campaign;