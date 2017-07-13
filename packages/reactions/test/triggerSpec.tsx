import * as chai from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';

import { mount, shallow } from 'enzyme';
import Trigger from '../src/internal/trigger';

const { expect } = chai;

describe('@atlaskit/reactions/trigger', () => {

  it('should render a button', () => {
    const trigger = shallow(<Trigger onClick={() => {}} />);
    expect(trigger.find('button').length).to.equal(1);
  });

  it('should add "miniMode" css-class when miniMode is true', () => {
    const trigger = shallow(<Trigger miniMode={true} onClick={() => {}} />);
    expect(trigger.hasClass('miniMode')).to.equal(true);
  });

  it('should call "onClick" when clicked', () => {
    const onClick = sinon.spy();
    const trigger = mount(<Trigger onClick={onClick} />);
    trigger.simulate('mousedown', { button: 0 });
    expect(onClick.called).to.equal(true);
  });

});
