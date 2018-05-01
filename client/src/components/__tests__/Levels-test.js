import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import Levels from '../Levels.jsx';

describe('Levels Component', () => {
  it('should render component', () => {
    expect(shallow(<Levels />).find('#all-levels-container').length).toEqual(1);
  });
});