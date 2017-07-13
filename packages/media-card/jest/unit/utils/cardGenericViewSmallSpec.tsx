/* tslint:disable*/ //:no-unused-expressions
import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { CardGenericViewSmall } from '../../../src/utils/cardGenericViewSmall';

describe('CardGenericViewSmall', () => {
  it('should fire onClick when component is clicked', () => {
    const event = 'some-random-event';
    const handler = sinon.spy();
    const card = shallow(<CardGenericViewSmall onClick={handler} />);

    card.simulate('click', event);
    expect(handler.calledOnce).to.be.true;
    expect(handler.firstCall.args[0]).to.deep.equal(event);
  });

  it('should fire onMouseEnter when component is hovered', () => {
    const event = 'some-random-event';
    const handler = sinon.spy();
    const card = shallow(<CardGenericViewSmall onMouseEnter={handler} />);

    card.simulate('mouseEnter', event);
    expect(handler.calledOnce).to.be.true;
    expect(handler.firstCall.args[0]).to.deep.equal(event);
  });
});
