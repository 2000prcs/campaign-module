import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import About from '../About.jsx';

describe('About Component', () => {
  it('should render component', () => {
    expect(shallow(<About />).find('#about-master-container').length).toEqual(1);
  });
});