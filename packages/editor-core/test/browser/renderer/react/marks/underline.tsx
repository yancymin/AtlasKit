import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Underline from '../../../../../src/renderer/react/marks/underline';

describe('Renderer - React/Marks/Underline', () => {
  const mark = shallow(<Underline>This is underlined</Underline>);

  it('should wrap content with <u>-tag', () => {
    expect(mark.is('u')).to.equal(true);
  });

  it('should output correct html', () => {
    expect(mark.html()).to.equal('<u>This is underlined</u>');
  });
});
