import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Underline from '../../../src/marks/underline';

describe('<Underline />', () => {
  const mark = shallow(<Underline>This is underlined</Underline>);

  it('should wrap content with <u>-tag', () => {
    expect(mark.is('u')).to.equal(true);
  });

  it('should output correct html', () => {
    expect(mark.html()).to.equal('<u>This is underlined</u>');
  });
});
