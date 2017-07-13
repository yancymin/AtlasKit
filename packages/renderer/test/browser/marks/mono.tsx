import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Mono from '../../../src/marks/mono';

describe('<Mono />', () => {
  const mark = shallow(<Mono>This is monospace</Mono>);

  it('should wrap content with <span>-tag', () => {
    expect(mark.is('span')).to.equal(true);
  });

  it('should output correct html', () => {
    expect(mark.html()).to.equal('<span style="font-family:monospace;white-space:pre-wrap;">This is monospace</span>');
  });
});
