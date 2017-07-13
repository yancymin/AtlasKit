import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import ReactUnsupportedBlockNode from '../../src/nodeviews/ui/unsupportedBlock';

describe('unsupportedBlock - React component', () => {
  it('should return a node of type div', () => {
    const wrapper = mount(<ReactUnsupportedBlockNode/>);
    expect(wrapper.getDOMNode().tagName).to.equal('DIV');
  });

  it('should have text content as string "Unsupported content"', () => {
    const wrapper = mount(<ReactUnsupportedBlockNode/>);
    expect(wrapper.text()).to.equal('Unsupported content');
  });
});
