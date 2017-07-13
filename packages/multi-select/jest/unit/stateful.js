import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import MultiSelect, { MultiSelectStateless } from '../../src';
import { name } from '../../package.json';

describe(`${name} - smart`, () => {
  const animStub = window.cancelAnimationFrame;
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  describe('render', () => {
    it('should render stateless multi select', () => {
      expect(mount(<MultiSelect />).find(MultiSelectStateless).length).toBe(1);
    });

    it('should pass all the relevant props to the stateless component', () => {
      const items = [
        {
          heading: 'test',
          items: [
            { value: 1, content: '1' },
            { value: 2, content: '2' },
          ],
        },
      ];
      const wrapper = mount(<MultiSelect
        appearance="subtle"
        defaultSelected={[items[0].items[0]]}
        id="id"
        isDefaultOpen
        isDisabled
        shouldFocus
        isInvalid
        invalidMessage="invalid message"
        isRequired
        items={items}
        label="label"
        name="name"
        noMatchesFound="no matches"
        position="top left"
        shouldFitContainer
      />);
      const statelessProps = wrapper.find(MultiSelectStateless).props();
      expect(statelessProps.appearance, 'appearance').toBe('subtle');
      expect(statelessProps.id, 'id').toBe('id');
      expect(statelessProps.isDisabled, 'isDisabled').toBe(true);
      expect(statelessProps.isInvalid, 'isInvalid').toBe(true);
      expect(statelessProps.invalidMessage, 'invalidMessage').toBe('invalid message');
      expect(statelessProps.isOpen, 'isOpen').toBe(true);
      expect(statelessProps.isRequired, 'isRequired').toBe(true);
      expect(statelessProps.items, 'items').toBe(items);
      expect(statelessProps.label, 'label').toBe('label');
      expect(statelessProps.name, 'name').toBe('name');
      expect(statelessProps.noMatchesFound, 'noMatchesFound').toBe('no matches');
      expect(statelessProps.position, 'position').toBe('top left');
      expect(statelessProps.selectedItems, 'selectedItems').toEqual([items[0].items[0]]);
      expect(statelessProps.shouldFitContainer, 'shouldFitContainer').toBe(true);
      expect(statelessProps.shouldFocus, 'shouldFocus').toBe(true);
    });
  });

  describe('inner functions', () => {
    let wrapper;
    let instance;
    const onFilterChangeSpy = sinon.spy();
    const onOpenChangeSpy = sinon.spy();
    const onSelectedChange = sinon.spy();
    const items = [
      {
        heading: 'test',
        items: [
          { value: 1, content: '1' },
          { value: 2, content: '2' },
        ],
      },
    ];

    beforeEach(() => {
      wrapper = mount(<MultiSelect
        defaultSelected={[items[0].items[0]]}
        items={items}
        onFilterChange={onFilterChangeSpy}
        onOpenChange={onOpenChangeSpy}
        onSelectedChange={onSelectedChange}
      />);
      instance = wrapper.instance();
    });

    afterEach(() => {
      onFilterChangeSpy.reset();
      onOpenChangeSpy.reset();
      onSelectedChange.reset();
    });

    describe('handleOpenChange', () => {
      const attrs = { isOpen: true };

      it('should call onOpenChange when triggered', () => {
        instance.handleOpenChange(attrs);
        expect(onOpenChangeSpy.callCount).toBe(1);
        expect(onOpenChangeSpy.calledWith(attrs)).toBe(true);
      });

      it('should set isOpen state', () => {
        instance.handleOpenChange(attrs);
        expect(wrapper.state().isOpen).toBe(true);
        instance.handleOpenChange({ isOpen: false });
        expect(wrapper.state().isOpen).toBe(false);
      });
    });

    describe('handleFilterChange', () => {
      const value = 'test';
      it('should call onFilterChange when triggered', () => {
        instance.handleFilterChange(value);
        expect(onFilterChangeSpy.callCount).toBe(1);
        expect(onFilterChangeSpy.calledWith(value)).toBe(true);
      });

      it('should set filterValue state', () => {
        instance.handleFilterChange(value);
        expect(wrapper.state().filterValue).toBe(value);
      });
    });

    describe('selectedChange', () => {
      it('should call removeItem when an item was removed', () => {
        const item = items[0].items[0];
        const spy = sinon.spy(instance, 'removeItem');
        instance.selectedChange(item);
        expect(spy.called).toBe(true);
      });

      it('should call selectItem when an item was added', () => {
        const spy = sinon.spy(instance, 'selectItem');
        instance.selectedChange({ content: 'something new', value: 2 });
        expect(spy.called).toBe(true);
      });
    });

    describe('removeItem', () => {
      it('should remove the item and set the new selectedItems state', () => {
        const item = items[0].items[0];
        instance.removeItem(item);
        expect(wrapper.state().selectedItems).toEqual([]);
      });

      it('should remove the item and call onSelectedChange', () => {
        const item = items[0].items[0];
        instance.removeItem(item);
        expect(onSelectedChange.callCount).toBe(1);
      });

      it('onSelectedChange should be called with the correct params', () => {
        const item = items[0].items[0];
        instance.removeItem(item);
        expect(onSelectedChange.calledWith({ items: [], action: 'remove', changed: item })).toBe(true);
      });
    });

    describe('selectItem', () => {
      it('should add the item and set the new selectedItems state', () => {
        const item = { content: 'new', value: 2 };
        instance.selectItem(item);
        expect(wrapper.state().selectedItems).toEqual([items[0].items[0], item]);
      });

      it('should add the item and call onSelectedChange', () => {
        const item = { content: 'new', value: 2 };
        instance.selectItem(item);
        expect(onSelectedChange.callCount).toBe(1);
      });

      it('onSelectedChange should be called with the correct params', () => {
        const item = { content: 'new', value: 2 };
        instance.selectItem(item);
        expect(onSelectedChange.calledWith({ items: [items[0].items[0], item], action: 'select', changed: item })).toBe(true);
      });
    });

    describe('handleNewItemCreate', () => {
      it('should append new item to the list', () => {
        const newValue = 'new';
        instance.handleNewItemCreate({ value: newValue });
        const { items: itemsList } = wrapper.state().items[0];
        expect(itemsList.length).toBe(3);
        expect(itemsList[2].content).toBe(newValue);
      });

      it('should make new value selected', () => {
        const newValue = 'new';
        instance.handleNewItemCreate({ value: newValue });
        const { selectedItems } = wrapper.state();
        expect(selectedItems.length).toBe(2);
        expect(selectedItems[1].content).toBe(newValue);
      });
    });
  });
});
