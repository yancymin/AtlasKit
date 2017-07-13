import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import OrderedList from '../../../../../src/renderer/react/nodes/orderedList';

describe('Renderer - React/Nodes/OrderedList', () => {
  it('should wrap content with <ol>-tag with no start prop', () => {
    const orderedList = shallow(<OrderedList>This is a ordered list</OrderedList>);
    expect(orderedList.is('ol')).to.equal(true);
    expect(orderedList.prop('start')).to.equal(undefined);
  });

  it('should wrap content with <ol>-tag with start prop', () => {
    const orderedList = shallow(<OrderedList start={3}>This is a ordered list</OrderedList>);
    expect(orderedList.is('ol')).to.equal(true);
    expect(orderedList.prop('start')).to.equal(3);
  });
});
