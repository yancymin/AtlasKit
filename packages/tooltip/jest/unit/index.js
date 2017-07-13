import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

// Testing the dumb component
import { Tooltip } from '../../src';

describe('Tooltip', () => {
  it('should be possible to create a component', () => {
    const wrapper = shallow(<Tooltip />);
    expect(wrapper).not.toBe(undefined);
  });

  describe('position prop', () => {
    it('should be reflected into Layers position prop when Tooltip is visible', () => {
      const wrapper = shallow(<Tooltip position="bottom" visible><div>Foo</div></Tooltip>);

      expect(wrapper.find('Layer').prop('position')).toBe('bottom center');
    });
  });

  describe('description prop', () => {
    it('should be reflected in the Layer content prop when Tooltip is visible', () => {
      const wrapper = shallow(<Tooltip description="Some words!" visible><div>Foo</div></Tooltip>);

      const layer = wrapper.find('Layer');
      expect(layer.length).toBeGreaterThan(0);

      // have to wrap the prop in shallow so that we can run assertions against it.
      const layerContentProp = shallow(layer.prop('content'));
      expect(layerContentProp).not.toBe(undefined);
      expect(layerContentProp.text()).toBe('Some words!');
    });

    it('should not be reflected in the Layer content prop when Tooltip is not visible', () => {
      const wrapper = shallow(<Tooltip description="Some words!"><div>Foo</div></Tooltip>);

      const layer = wrapper.find('Layer');
      expect(layer.length).toBeGreaterThan(0);
      expect(layer.prop('content')).toBe(null);
    });
  });

  describe('children', () => {
    const wrapper = shallow(<Tooltip><div id="shouldBeRendered">Target</div></Tooltip>);

    it('should be rendered by Tooltip', () => {
      expect(wrapper.find('#shouldBeRendered').length).toBe(1);
    });
  });

  describe('onMouseOver callback', () => {
    it('should be called when a mouse enters', () => {
      const spy = sinon.spy();
      const wrapper = shallow(<Tooltip onMouseOver={spy} />);

      wrapper.simulate('mouseOver');
      expect(spy.callCount).toBe(1);
    });
  });

  describe('onMouseOut callback', () => {
    it('should be called when a mouse leaves', () => {
      const spy = sinon.spy();
      const wrapper = shallow(<Tooltip onMouseOut={spy} />);

      wrapper.simulate('mouseOut');
      expect(spy.callCount).toBe(1);
    });
  });
});
