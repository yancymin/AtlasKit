import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Doc from '../../../../../src/renderer/react/nodes/doc';

describe('Renderer - React/Nodes/Doc', () => {
  const paragraph = shallow(<Doc>This is an empty document</Doc>);

  it('should wrap content with <div>-tag', () => {
    expect(paragraph.is('div')).to.equal(true);
  });

  it('should output correct html', () => {
    expect(paragraph.text()).to.equal('This is an empty document');
  });
});
