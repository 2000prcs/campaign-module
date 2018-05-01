import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import FullLevels from '../FullLevels.jsx';

describe('FullLevels Component', () => {
  it('should render component', () => {
    expect(shallow(<FullLevels />).find('#full-levels-container').length).toEqual(1);
  });
});