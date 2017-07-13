import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { AkCode } from '@atlaskit/code';
import Code from '../../../src/marks/code';

describe('<Code />', () => {
  const mark = mount(<Code text="This is code"/>);

  it('should render an AkCode component', () => {
    expect(mark.find(AkCode).length).to.equal(1);
  });

  it('should output correct html', () => {
    expect(mark.find('span').text()).to.equal('This is code');
  });
});
