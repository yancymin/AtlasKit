import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Rule from '../../../src/nodes/rule';

describe('<Rule/>', () => {
  const rule = shallow(<Rule />);

  it('should create a <hr>-tag', () => {
    expect(rule.is('hr')).to.equal(true);
  });

});
