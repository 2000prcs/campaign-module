import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import Support from '../Support.jsx';

describe('Support Component', () => {
  it('should render component', () => {
    expect(shallow(<Support />).find('#support-master-container').length).toEqual(1);
  });
});