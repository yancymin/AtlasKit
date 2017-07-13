import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Strike from '../../../../../src/renderer/react/marks/strike';

describe('Renderer - React/Marks/Strike', () => {
  const mark = shallow(<Strike>Strike this</Strike>);

  it('should wrap content with <span>-tag', () => {
    expect(mark.is('span')).to.equal(true);
  });

  it('should output correct html', () => {
    expect(mark.html()).to.equal('<span style="text-decoration:line-through;">Strike this</span>');
  });
});
