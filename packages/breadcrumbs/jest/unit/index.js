import React, { Component } from 'react';
import { mount } from 'enzyme';
import Button from '@atlaskit/button';

import Breadcrumbs, {
  BreadcrumbsStateless,
  BreadcrumbsItem as Item,
} from '../../src/';
import EllipsisItem from '../../src/components/EllipsisItem';

describe('Breadcrumbs', () => {
  describe('exports', () => {
    it('the smart React component, Breadcrumbs component, and the Item component', () => {
      expect(Breadcrumbs).not.toBe(undefined);
      expect(BreadcrumbsStateless).not.toBe(undefined);
      expect(Item).not.toBe(undefined);
      expect(new Breadcrumbs()).toBeInstanceOf(Component);
      expect(new BreadcrumbsStateless()).toBeInstanceOf(Component);
      expect(new Item()).toBeInstanceOf(Component);
    });
  });

  describe('with more than 8 items', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Breadcrumbs
          onExpand={() => {}}
        >
          <Item>item1</Item>
          <Item>item2</Item>
          <Item>item3</Item>
          <Item>item4</Item>
          <Item>item5</Item>
          <Item>item6</Item>
          <Item>item7</Item>
          <Item>item8</Item>
          <Item>item9</Item>
        </Breadcrumbs>
      );
    });

    it('updates the expanded state when the ellipsis is clicked', () => {
      expect(wrapper.state().isExpanded).toBe(false);
      expect(wrapper.find(BreadcrumbsStateless).props().isExpanded).toBe(false);

      const ellipsisItem = wrapper.find(EllipsisItem);
      ellipsisItem.find(Button).simulate('click');
      expect(wrapper.state().isExpanded).toBe(true);
      expect(wrapper.find(BreadcrumbsStateless).props().isExpanded).toBe(true);
    });
  });
});
