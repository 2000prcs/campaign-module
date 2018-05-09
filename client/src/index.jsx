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

window.React = React;
window.ReactDOM = ReactDOM;
window.Campaign = Campaign;

// for now use project 3 and user Saige99
// $(document).ready(function() {
// 	ReactDOM.render(<App projectId="3" username="Saige99"/>, document.getElementById('Campaign'));
// });

export default Campaign;
