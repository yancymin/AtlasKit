import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import BulletList from '../../../../../src/renderer/react/nodes/bulletList';

describe('Renderer - React/Nodes/BulletList', () => {
  const bulletList = shallow(<BulletList>This is a bullet list</BulletList>);

  it('should wrap content with <ul>-tag', () => {
    expect(bulletList.is('ul')).to.equal(true);
  });

});
