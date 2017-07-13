import React from 'react';
import { shallow, mount } from 'enzyme';
import Layer from '@atlaskit/layer';
import Spinner from '@atlaskit/spinner';

import { name } from '../../package.json';

import Droplist, { Item, Group } from '../../src';
import { Trigger } from '../../src/styled/Droplist';

const itemsList = (<Group heading="test1">
  <Item>Some text</Item>
</Group>);

describe(`${name} - core`, () => {
  it('should be possible to create a component', () => {
    expect(shallow(<Droplist>test</Droplist>)).not.toBe(undefined);
  });

  describe('render', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Droplist trigger="text" isOpen>{itemsList}</Droplist>);
    });

    it('should render Layer component', () => {
      const layer = wrapper.find(Layer);
      const layerNode = layer.node;
      expect(layerNode instanceof Layer).toBe(true);
      // Check that layer received our content
      expect(layer.find(Group).length).toBe(1);
      expect(layer.find(Trigger).length).toBe(1);
    });

    it('should pass required properties to Layer', () => {
      const layer = wrapper.find(Layer);
      expect(layer.prop('offset')).toBe('0 8px');
      expect(layer.prop('position')).toBe('bottom left');
      expect(layer.prop('autoFlip')).toBe(wrapper.props().shouldFlip);
      expect(layer.prop('content')).not.toBe(undefined);
    });

    it('should render droplist content', () => {
      // We passed a group as content so we should be able to find one
      expect(wrapper.find(Group).length).toBe(1);
    });

    it('should render trigger', () => {
      const triggerWrapper = wrapper.find(Trigger);
      expect(triggerWrapper.text()).toBe('text');
    });
  });

  describe('onOpenChange', () => {
    it('should be open when the isOpen property set to true', () => {
      expect(mount(<Droplist trigger="text">{itemsList}</Droplist>).find(Group).length).toBe(0);
      expect(mount(<Droplist trigger="text" isOpen>{itemsList}</Droplist>).find(Group).length).toBe(1);
    });
  });

  describe('loading', () => {
    it('should show a Spinner (and no Groups) when it is loading and open', () => {
      const mounted = mount(<Droplist isLoading isOpen>{itemsList}</Droplist>);
      expect(mounted.find(Spinner).length).toBe(1);
      expect(mounted.find(Group).length).toBe(0);
    });

    it('should not show a Spinner when it is loading but not open', () => {
      expect(mount(<Droplist isLoading>{itemsList}</Droplist>).find(Spinner).length).toBe(0);
    });
  });
});
