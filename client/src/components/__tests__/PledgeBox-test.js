import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import PledgeBox from '../PledgeBox.jsx';

describe('PledgeBox Component', () => {
  it('should render component', () => {
    expect(shallow(<PledgeBox />).find('#pledge-component-container').length).toEqual(1);
  });
});