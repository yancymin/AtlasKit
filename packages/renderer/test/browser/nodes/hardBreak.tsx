import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Hardbreak from '../../../src/nodes/hardBreak';

describe('<HardBreak/>', () => {
  const hardBreak = shallow(<Hardbreak />);

  it('should render a <br>-tag', () => {
    expect(hardBreak.is('br')).to.equal(true);
  });

});
