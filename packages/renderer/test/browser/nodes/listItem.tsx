import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ListItem from '../../../src/nodes/listItem';

describe('<ListItem/>', () => {
  const listItem = shallow(<ListItem>This is a list item</ListItem>);

  it('should wrap content with <li>-tag', () => {
    expect(listItem.is('li')).to.equal(true);
  });

});
