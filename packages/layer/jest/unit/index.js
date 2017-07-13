import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Layer from '../../src';

/* There is a lot in Layer that can not be tested easily in JSDom. Most of it should already be
   tested in Popper itself, but we should really have some sort of sanity checks for things like
   flipping behaviour.

   This file simply unit tests everything that can be unit tested. Browser and sanity checking will
   be done as a part of AK-1098 */

describe('Layer', () => {
  it('should be possible to create a component', () => {
    const wrapper = shallow(<Layer />);
    expect(wrapper).not.toBe(undefined);
  });

  describe('children', () => {
    const wrapper = shallow(<Layer><div id="target">Target</div></Layer>);

    it('should be rendered by Layer', () => {
      expect(wrapper.find('#target').length).toBe(1);
    });
  });

  describe('content prop', () => {
    const content = (<div id="content">Some Content</div>);

    it('should be rendered by Layer', () => {
      const wrapper = shallow(<Layer content={content} />);
      expect(wrapper.find('#content').length).toBe(1);
    });
  });

  describe('state', () => {
    const content = (<div id="content">Some Content</div>);

    it('cssPosition and transform should be reflected on the popper div', () => {
      const wrapper = shallow(<Layer content={content}>
        <div>Something to align to</div>
      </Layer>);

      wrapper.setState({ cssPosition: 'fixed', transform: 'translate3d(13px, 13px, 0px)' });

      const contentParent = wrapper.find('#content').parent();

      expect(contentParent.prop('style').position).toBe('fixed');
      expect(contentParent.prop('style').transform).toBe('translate3d(13px, 13px, 0px)');
    });

    it('flipped should cause onFlippedChange callback to be called', () => {
      const spy = sinon.spy();
      const wrapper = mount(<Layer onFlippedChange={spy} content={content}><div>Foo</div></Layer>);
      const state = { flipped: true, actualPosition: 'top left', originalPosition: 'bottom left' };

      expect(wrapper.state('flipped')).toBe(false);
      wrapper.setState(state);

      expect(spy.callCount).toBe(1);
      expect(spy.calledWith(state)).toBe(true);
    });
  });
});
