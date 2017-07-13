import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { MultiSelectStateless } from '../../src';
import { name } from '../../package.json';

describe(`${name} - stateless`, () => {
  const animStub = window.cancelAnimationFrame;
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  describe('private functions', () => {
    const onFilterChangeSpy = sinon.spy();
    const onOpenChangeSpy = sinon.spy();
    const onSelectedSpy = sinon.spy();
    const onRemovedSpy = sinon.spy();
    let wrapper;
    let instance;
    const selectItems = [
      {
        heading: 'test',
        items: [
          { value: 1, content: 'Test1' },
          { value: 2, content: 'Test 2' },
          { value: 3, content: 'Third test' },
        ],
      },
    ];
    const selectedItems = [selectItems[0].items[1]];

    beforeEach(() => {
      wrapper = mount(<MultiSelectStateless
        isOpen
        items={selectItems}
        onFilterChange={onFilterChangeSpy}
        onOpenChange={onOpenChangeSpy}
        onRemoved={onRemovedSpy}
        onSelected={onSelectedSpy}
        selectedItems={selectedItems}
      />);
      instance = wrapper.instance();
    });

    afterEach(() => {
      onFilterChangeSpy.reset();
      onOpenChangeSpy.reset();
      onSelectedSpy.reset();
      onRemovedSpy.reset();
      wrapper.setProps({ filterValue: '' });
      wrapper.setProps({ selectedItems });
    });

    describe('handleTriggerClick', () => {
      it('default behavior', () => {
        const args = { event: {}, isOpen: true };
        instance.handleTriggerClick({});
        expect(onOpenChangeSpy.calledOnce).toBe(true);
        expect(onOpenChangeSpy.calledWith(args)).toBe(true);
      });

      it('disabled select', () => {
        wrapper.setProps({ isDisabled: true });
        instance.handleTriggerClick({});
        expect(onOpenChangeSpy.called).toBe(false);
        wrapper.setProps({ isDisabled: false });
      });
    });

    it('handleItemRemove', () => {
      const args = {};
      instance.handleItemRemove(args);
      expect(onRemovedSpy.calledOnce).toBe(true);
      expect(onRemovedSpy.calledWith(args)).toBe(true);
    });

    it('removeLatestItem', () => {
      const spy = sinon.spy(instance, 'handleItemRemove');
      instance.removeLatestItem();
      expect(spy.calledOnce).toBe(true);
      expect(onRemovedSpy.calledWith(selectedItems[0])).toBe(true);
    });

    describe('handleKeyboardInteractions', () => {
      it('should call onOpenChange when there was no value and Backspace was pressed', () => {
        const event = { key: 'Backspace', target: { value: '' } };
        instance.handleKeyboardInteractions(event);
        expect(onOpenChangeSpy.calledOnce).toBe(true);
        expect(onOpenChangeSpy.calledWith({ event, isOpen: true })).toBe(true);
      });

      it('should call removeLatestItem when there was no value and Backspace was pressed', () => {
        const spy = sinon.spy(instance, 'removeLatestItem');
        const event = { key: 'Backspace', target: { value: '' } };
        instance.handleKeyboardInteractions(event);
        expect(spy.calledOnce).toBe(true);
      });

      it('should call focusNextItem when ArrowDown is pressed and Select is open', () => {
        const spy = sinon.spy(instance, 'focusNextItem');
        const preventDefaultSpy = sinon.spy();
        const event = { key: 'ArrowDown', preventDefault: preventDefaultSpy };
        instance.handleKeyboardInteractions(event);
        expect(spy.calledOnce).toBe(true);
        expect(preventDefaultSpy.calledOnce).toBe(true);
      });

      it('should call focusNextItem when ArrowDown is pressed and Select is closed', () => {
        wrapper.setProps({ isOpen: false });
        const spy = sinon.spy(instance, 'focusNextItem');
        const preventDefaultSpy = sinon.spy();
        const event = { key: 'ArrowDown', preventDefault: preventDefaultSpy };
        instance.handleKeyboardInteractions(event);
        expect(spy.calledOnce).toBe(true);
        expect(preventDefaultSpy.calledOnce).toBe(true);
      });

      it('should call onOpenChange when ArrowDown is pressed and Select is closed', () => {
        wrapper.setProps({ isOpen: false });
        const spy = sinon.spy(instance, 'onOpenChange');
        const preventDefaultSpy = sinon.spy();
        const event = { key: 'ArrowDown', preventDefault: preventDefaultSpy };
        instance.handleKeyboardInteractions(event);
        expect(spy.calledOnce).toBe(true);
        expect(preventDefaultSpy.calledOnce).toBe(true);
      });

      it('should call focusPreviousItem when ArrowUp is pressed and Select is open', () => {
        const spy = sinon.spy(instance, 'focusPreviousItem');
        const preventDefaultSpy = sinon.spy();
        const event = { key: 'ArrowUp', preventDefault: preventDefaultSpy };
        instance.handleKeyboardInteractions(event);
        expect(spy.calledOnce).toBe(true);
        expect(preventDefaultSpy.calledOnce).toBe(true);
      });

      it('should NOT call focusPreviousItem when ArrowUp is pressed and Select is closed', () => {
        wrapper.setProps({ isOpen: false });
        const spy = sinon.spy(instance, 'focusPreviousItem');
        const preventDefaultSpy = sinon.spy();
        const event = { key: 'ArrowUp', preventDefault: preventDefaultSpy };
        instance.handleKeyboardInteractions(event);
        expect(spy.called).toBe(false);
        expect(preventDefaultSpy.calledOnce).toBe(true);
      });

      it('should call handleItemSelect when Enter is pressed and an item is focused and Select is open', () => {
        wrapper.setState({ focusedItemIndex: 0 });
        const spy = sinon.spy(instance, 'handleItemSelect');
        const preventDefaultSpy = sinon.spy();
        const event = { key: 'Enter', preventDefault: preventDefaultSpy };
        instance.handleKeyboardInteractions(event);
        expect(spy.calledOnce).toBe(true);
        expect(preventDefaultSpy.calledOnce).toBe(true);
      });

      it('should NOT call handleItemSelect when Enter is pressed and no item is focused and Select is open', () => {
        const spy = sinon.spy(instance, 'handleItemSelect');
        const preventDefaultSpy = sinon.spy();
        const event = { key: 'Enter', preventDefault: preventDefaultSpy };
        instance.handleKeyboardInteractions(event);
        expect(spy.called).toBe(false);
        expect(preventDefaultSpy.calledOnce).toBe(true);
      });

      it('should NOT call handleItemSelect when Enter is pressed and Select is closed', () => {
        wrapper.setProps({ isOpen: false });
        wrapper.setState({ focusedItemIndex: 0 });
        const spy = sinon.spy(instance, 'handleItemSelect');
        const preventDefaultSpy = sinon.spy();
        const event = { key: 'Enter', preventDefault: preventDefaultSpy };
        instance.handleKeyboardInteractions(event);
        expect(spy.called).toBe(false);
        expect(preventDefaultSpy.calledOnce).toBe(false);
      });

      it('should call handleItemCreate when Enter is pressed and shouldAllowCreateItem is true', () => {
        wrapper.setState({ focusedItemIndex: null });
        const spy = sinon.spy(instance, 'handleItemCreate');
        const preventDefaultSpy = sinon.spy();
        const event = { key: 'Enter', preventDefault: preventDefaultSpy };

        wrapper.setProps({ shouldAllowCreateItem: false });
        instance.handleKeyboardInteractions(event);
        expect(spy.called).toBe(false);

        wrapper.setProps({ shouldAllowCreateItem: true });
        instance.handleKeyboardInteractions(event);
        expect(spy.calledOnce).toBe(true);

        expect(preventDefaultSpy.calledTwice).toBe(true);
      });
    });

    describe('handleOnChange', () => {
      it('should call onFilterChange every time the value is changed', () => {
        const value1 = '1';
        const value2 = '2';
        let event = { key: '', target: { value: value1 } };
        instance.handleOnChange(event);
        expect(onFilterChangeSpy.calledOnce).toBe(true);
        expect(onFilterChangeSpy.calledWith(value1)).toBe(true);
        onFilterChangeSpy.reset();

        wrapper.setProps({ filterValue: value1 });
        event = { key: '', target: { value: value2 } };
        instance.handleOnChange(event);
        expect(onFilterChangeSpy.calledOnce).toBe(true);
        expect(onFilterChangeSpy.calledWith(value2)).toBe(true);
      });

      it('should not call onFilterChange when value is the same', () => {
        const value = '1';
        const event = { key: '', target: { value } };
        wrapper.setProps({ filterValue: value });
        instance.handleOnChange(event);
        expect(onFilterChangeSpy.called).toBe(false);
      });

      it('should reset focus if shouldAllowCreateItem is set to true', () => {
        const event = { key: '', target: { value: '1' } };
        wrapper.setProps({ shouldAllowCreateItem: true });
        wrapper.setState({ focusedItemIndex: 1 });
        instance.handleOnChange(event);
        expect(wrapper.state().focusedItemIndex).toBe(null);
      });
    });

    describe('onFocus', () => {
      it('default behavior', () => {
        wrapper.setState({ isFocused: false });
        instance.onFocus();
        expect(wrapper.state().isFocused).toBe(true);
      });

      it('disabled select', () => {
        wrapper.setState({ isFocused: false });
        wrapper.setProps({ isDisabled: true });
        instance.onFocus();
        expect(wrapper.state().isFocused).toBe(false);
      });
    });

    describe('onBlur', () => {
      it('default behavior', () => {
        wrapper.setState({ isFocused: true });
        instance.onBlur();
        expect(wrapper.state().isFocused).toBe(false);
      });

      it('disabled select', () => {
        wrapper.setState({ isFocused: true });
        wrapper.setProps({ isDisabled: true });
        instance.onBlur();
        expect(wrapper.state().isFocused).toBe(true);
      });
    });

    describe('getPlaceholder', () => {
      const items = [
        { value: 1, content: 'Test1' },
        { value: 2, content: 'Test 2' },
        { value: 3, content: 'Third test' },
      ];
      const placeholder = 'Test!';

      it('should return "placeholder" text for the empty select', () => {
        wrapper.setProps({ isOpen: false });
        wrapper.setProps({ selectedItems: [] });
        wrapper.setProps({ placeholder });
        expect(instance.getPlaceholder()).toBe(placeholder);
      });

      it('should return null if some items are selected', () => {
        wrapper.setProps({ isOpen: false });
        wrapper.setProps({ selectedItems: [items[0]] });
        wrapper.setProps({ placeholder });
        expect(instance.getPlaceholder()).toBe(null);
      });

      it('should return null if the select is opened', () => {
        wrapper.setProps({ isOpen: true });
        wrapper.setProps({ selectedItems: [] });
        wrapper.setProps({ placeholder });
        expect(instance.getPlaceholder()).toBe(null);
      });
    });

    describe('handleItemSelect', () => {
      const item = selectItems[0].items[0];
      const attrs = { event: {} };

      it('should call onSelected when called', () => {
        instance.handleItemSelect(item, attrs);
        expect(onSelectedSpy.callCount).toBe(1);
      });

      it('should call onOpenChange when called', () => {
        instance.handleItemSelect(item, attrs);
        expect(onOpenChangeSpy.callCount).toBe(1);
        expect(onOpenChangeSpy.calledWith({ isOpen: false, event: attrs.event })).toBe(true);
      });

      it('should call onFilterChange with empty string when called', () => {
        instance.handleItemSelect(item, attrs);
        expect(onFilterChangeSpy.callCount).toBe(1);
        expect(onFilterChangeSpy.calledWith('')).toBe(true);
      });
    });

    describe('handleItemCreate', () => {
      beforeEach(() => {
        wrapper.setProps({ shouldAllowCreateItem: true });
      });

      it('should call onNewItemCreated prop when there is a new value', () => {
        const spy = sinon.spy();
        const testValue = 'test';
        wrapper.setProps({ onNewItemCreated: spy, filterValue: testValue });
        instance.handleItemCreate({});
        expect(spy.calledOnce).toBe(true);
        expect(spy.calledWith({ value: testValue })).toBe(true);
      });

      it('should call handleItemSelect when the value match the existing value', () => {
        const spyCreate = sinon.spy();
        const spySelect = sinon.spy(instance, 'handleItemSelect');
        const testValue = 'Test1';

        wrapper.setProps({ onNewItemCreated: spyCreate, filterValue: testValue });
        instance.handleItemCreate({});
        expect(spyCreate.called).toBe(false);
        expect(spySelect.calledOnce).toBe(true);
        expect(spySelect.calledWith({ value: 1, content: 'Test1' }, { event: {} })).toBe(true);
      });
    });

    describe('getAllVisibleItems', () => {
      it('should return all visible items', () => {
        const items = [
          { value: 1, content: 'Test1' },
          { value: 2, content: 'Test 2' },
          { value: 3, content: 'Third test' },
          { value: 4, content: 'Something different' },
        ];

        wrapper.setProps({ items: [{ heading: '', items }], filterValue: 'test', selectedItems: [items[0]] });
        expect(instance.getAllVisibleItems(wrapper.prop('items'))).toEqual([items[1], items[2]]);
      });
    });
  });
});
