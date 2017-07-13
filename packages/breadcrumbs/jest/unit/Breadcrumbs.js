/* eslint-disable  mocha/no-skipped-tests */
import { mount, shallow } from 'enzyme';
import React, { Component } from 'react';
import sinon from 'sinon';
import Button from '@atlaskit/button';

import {
  BreadcrumbsStateless as Breadcrumbs,
  BreadcrumbsItem as Item,
} from '../../src/';

import EllipsisItem from '../../src/components/EllipsisItem';

describe('BreadcrumbsStateless', () => {
  describe('exports', () => {
    it('the React component, and the Item component', () => {
      expect(Breadcrumbs).not.toBe(undefined);
      expect(Item).not.toBe(undefined);
      expect(new Breadcrumbs()).toBeInstanceOf(Component);
      expect(new Item()).toBeInstanceOf(Component);
    });
  });

  describe('construction', () => {
    it('should be able to create a component', () => {
      const wrapper = shallow(<Breadcrumbs
        onExpand={() => {}}
      />);
      expect(wrapper).not.toBe(undefined);
      expect(wrapper.instance()).toBeInstanceOf(Component);
    });

    it('should be able to render a single child', () => {
      const wrapper = shallow(
        <Breadcrumbs
          onExpand={() => {}}
        >
          <Item>item</Item>
        </Breadcrumbs>
      );
      expect(wrapper.find(Item)).toHaveLength(1);
    });

    it('should render multiple children', () => {
      const wrapper = mount(
        <Breadcrumbs
          onExpand={() => {}}
        >
          <Item>item</Item>
          <Item>item</Item>
          <Item>item</Item>
        </Breadcrumbs>
      );
      expect(wrapper.find(Item).length).toBe(3);
    });

    it('should not count empty children', () => {
      const wrapper = mount(
        <Breadcrumbs onExpand={() => {}} maxItems={3}>
          {null}
          <Item>item</Item>
          <Item>item</Item>
          <Item>item</Item>
          {undefined}
          {false}
        </Breadcrumbs>
      );
      expect(wrapper.find(Item).length).toBe(3);
      expect(wrapper.find(Item).last().props().hasSeparator).toBe(false);
    });

    describe('with enough items to collapse', () => {
      const firstItem = <Item hasSeparator>item1</Item>;
      const lastItem = <Item>item2</Item>;
      const expandSpy = sinon.spy();
      let wrapper;

      describe('and not expanded', () => {
        beforeEach(() => {
          wrapper = mount(
            <Breadcrumbs maxItems={4} onExpand={expandSpy}>
              {firstItem}
              <Item>item2</Item>
              <Item>item3</Item>
              <Item>item4</Item>
              {lastItem}
            </Breadcrumbs>
          );
        });

        it('renders only the first and last items, and an ellipsis item', () => {
          expect(wrapper.find(Item).length).toBe(2);
          expect(wrapper.contains(firstItem)).toBe(true);
          expect(wrapper.contains(lastItem)).toBe(true);
          expect(wrapper.find(EllipsisItem).length).toBe(1);
        });

        it('calls the onExpand handler when the ellipsis is clicked', () => {
          const ellipsisItem = wrapper.find(EllipsisItem);
          ellipsisItem.find(Button).simulate('click');
          expect(expandSpy.callCount).toBe(1);
        });
      });

      describe('and expanded', () => {
        beforeEach(() => {
          wrapper = mount(
            <Breadcrumbs onExpand={() => {}} maxItems={4} isExpanded>
              <Item>item1</Item>
              <Item>item2</Item>
              <Item>item3</Item>
              <Item>item4</Item>
            </Breadcrumbs>
          );
        });

        it('renders all the items', () => {
          expect(wrapper.props().isExpanded).toBe(true);
          expect(wrapper.find(Item).length).toBe(4);
          expect(wrapper.find(EllipsisItem).length).toBe(0);
        });
      });
    });
  });
});
