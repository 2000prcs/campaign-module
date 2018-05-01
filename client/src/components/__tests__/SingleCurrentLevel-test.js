import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import SingleCurrentLevel from '../SingleCurrentLevel.jsx';

describe('SingleCurrentLevel Component', () => {
  it('should render component', () => {
    expect(shallow(<SingleCurrentLevel />).find('#single-current-level-container').length).toEqual(1);
  });
});