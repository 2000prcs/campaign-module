import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import CurrentLevels from '../CurrentLevels.jsx';

describe('CurrentLevels Component', () => {
  it('should render component', () => {
    expect(shallow(<CurrentLevels />).find('#current-levels-container').length).toEqual(1);
  });
});