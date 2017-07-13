import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import BulletList from '../../../src/nodes/bulletList';

describe('<BulletList/>', () => {
  const bulletList = shallow(<BulletList>This is a bullet list</BulletList>);

  it('should wrap content with <ul>-tag', () => {
    expect(bulletList.is('ul')).to.equal(true);
  });

});
