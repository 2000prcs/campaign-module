import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import PledgeInputArea from '../PledgeInputArea.jsx';

describe('PledgeInputArea Component', () => {
  it('should render component', () => {
    expect(shallow(<PledgeInputArea />).find('#pledge-amount-container').length).toEqual(1);
  });
});