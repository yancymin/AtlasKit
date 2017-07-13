import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Rule from '../../../../../src/renderer/react/nodes/rule';

describe('Renderer - React/Nodes/Rule', () => {
  const rule = shallow(<Rule />);

  it('should create a <hr>-tag', () => {
    expect(rule.name()).to.equal('styled.hr');
  });

});
