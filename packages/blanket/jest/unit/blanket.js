import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import Blanket from '../../src';
import { getOpacity } from '../../src/styled/Container';

describe('ak-blanket', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      expect(Blanket).toBeInstanceOf(Object);
    });
  });

  it('should be possible to create a component', () => {
    expect(mount(<Blanket />)).not.toBe(undefined);
  });

  describe('props', () => {
    describe('isTinted', () => {
      it('should be false by default', () => {
        expect(mount(<Blanket />).prop('isTinted')).toBe(false);
      });

      it('should get tint styling when prop set', () => {
        const props = { isTinted: true };
        expect(getOpacity(props)).toBe(0.5);
      });

      it('should not get tint styling when prop set to false', () => {
        const props = { isTinted: false };
        expect(getOpacity(props)).toBe(0);
      });
    });

    describe('canClickThrough', () => {
      it('should be false by default', () => {
        expect(mount(<Blanket />).prop('canClickThrough')).toBe(false);
      });
      it('when canClickThrough is true, onBlanketClicked should not be triggered', () => {
        const spy = sinon.spy();
        const wrapper = mount(<Blanket canClickThrough onBlanketClicked={spy} />);
        wrapper.simulate('click');
        expect(spy.callCount).toBe(0);
      });
    });

    describe('onBlanketClicked', () => {
      it('should trigger when blanket clicked', () => {
        const spy = sinon.spy();
        const wrapper = mount(<Blanket onBlanketClicked={spy} />);
        wrapper.simulate('click');
        expect(spy.callCount).toBe(1);
      });
    });
  });
});
