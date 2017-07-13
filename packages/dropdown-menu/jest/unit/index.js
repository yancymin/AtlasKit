import React from 'react';
import { shallow, mount } from 'enzyme';
import Droplist, { Group } from '@atlaskit/droplist';
import Button from '@atlaskit/button';
import MoreIcon from '@atlaskit/icon/glyph/more';
import ExpandIcon from '@atlaskit/icon/glyph/expand';
import Tooltip from '@atlaskit/tooltip';
import sinon from 'sinon';

import { name } from '../../package.json';

import Menu, { DropdownMenuStateless as StatelessMenu } from '../../src';

const itemsList = [
  {
    heading: 'test1',
    elemAfter: <span>test element after</span>,
    items: [
      {
        content: 'Some text',
        tooltipDescription: 'Hello world!',
      },
    ],
  },
  {
    heading: 'test2',
    items: [],
  },
];

describe(name, () => {
  const animStub = window.cancelAnimationFrame;
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  it('should be possible to create a component', () => {
    expect(shallow(<Menu>test</Menu>)).not.toBe(undefined);
  });

  describe('render', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Menu items={itemsList}>text</Menu>);
    });

    it('should render Droplist component', () => {
      expect(wrapper.find(Droplist).length).toBe(1);
    });

    it('should pass required properties to Droplist', () => {
      const droplist = wrapper.find(Droplist);
      expect(droplist.prop('position')).toBe(wrapper.props().position);
      expect(droplist.prop('appearance')).toBe(wrapper.props().appearance);
      expect(droplist.prop('shouldFlip')).toBe(wrapper.props().shouldFlip);
      expect(droplist.prop('isOpen')).toBe(wrapper.state().isOpen);
      expect(droplist.prop('trigger')).toBe('text');
      expect(droplist.prop('isLoading')).toBe(wrapper.props().isLoading);
    });

    it('should pass required properties to the button trigger', () => {
      [
        <Menu items={itemsList} triggerType="button">text</Menu>,
        <Menu items={itemsList} triggerType="button" defaultOpen>text</Menu>,
      ].forEach((val) => {
        const menu = mount(val);
        const button = menu.find(Button);
        expect(button.prop('isSelected')).toBe(menu.props().defaultOpen);
        expect(button.prop('ariaHaspopup')).toBe(true);
        expect(button.prop('ariaExpanded')).toBe(menu.props().defaultOpen);
        expect(button.prop('ariaControls')).not.toBe(undefined);
      });
    });

    it('should pass elemAfter to Group', () => {
      const menu = mount(<Menu items={itemsList} defaultOpen>text</Menu>);
      const group = menu.find(Group).at(0);
      expect(group.prop('elemAfter')).toBe(itemsList[0].elemAfter);
    });

    it('should default to button with expand icon for triggerType=button with no overrides', () => {
      const text = 'text';
      const menu = mount(<Menu items={itemsList} triggerType="button">{ text }</Menu>);
      const trigger = menu.find(Button);
      expect(trigger.prop('iconBefore')).toBe(undefined);
      expect(trigger.prop('iconAfter')).not.toBe(undefined);
      expect(trigger.prop('children')).toBe(text);
      expect(menu.find(ExpandIcon).length).toBe(1);
    });

    it('should pass through triggerButtonProps to the trigger for triggerType=button', () => {
      const triggerProps = {
        appearance: 'subtle',
        id: 'button-123',
        theme: 'dark',
      };
      const menu = mount(<Menu items={itemsList} triggerType="button" triggerButtonProps={triggerProps} />);
      const trigger = menu.find(Button);
      expect(trigger.prop('appearance')).toBe(triggerProps.appearance);
      expect(trigger.prop('id')).toBe(triggerProps.id);
      expect(trigger.prop('theme')).toBe(triggerProps.theme);
    });

    it('should render provided iconAfter in trigger instead of default expand icon if provided', () => {
      const triggerProps = {
        iconAfter: <MoreIcon label="more" />,
      };
      const menu = mount(<Menu items={itemsList} triggerType="button" triggerButtonProps={triggerProps} />);
      const trigger = menu.find(Button);
      expect(trigger.prop('iconBefore')).toBe(undefined);
      expect(trigger.prop('iconAfter')).toBe(triggerProps.iconAfter);
      expect(menu.find(MoreIcon).length).toBe(1);
    });

    it('should render provided iconBefore in trigger instead of default expand icon if provided', () => {
      const triggerProps = {
        iconBefore: <MoreIcon label="more" />,
      };
      const menu = mount(<Menu items={itemsList} triggerType="button" triggerButtonProps={triggerProps} />);
      const trigger = menu.find(Button);
      expect(trigger.prop('iconBefore')).toBe(triggerProps.iconBefore);
      expect(trigger.prop('iconAfter')).toBe(undefined);
      expect(menu.find(MoreIcon).length).toBe(1);
    });

    // eslint-disable-next-line
    it.skip('should render tooltips if provided, skipping to use same version to avoid object comparison issues', () => {
      const menu = mount(<Menu items={itemsList} triggerType="button" defaultOpen />);
      expect(menu.find(Tooltip).length).toBe(1);
    });
  });

  describe('show/hide logic', () => {
    it('should be open when the defaultOpen property set to true', () => {
      expect(shallow(<Menu defaultOpen>text</Menu>).state().isOpen).toBe(true);
    });

    it('interacting with trigger should open the dropdown', () => {
      const wrapper = mount(<Menu items={itemsList}><div id="trigger">test</div></Menu>);
      const trigger = wrapper.find('#trigger');
      expect(wrapper.state().isOpen).toBe(false);
      trigger.simulate('click');
      expect(wrapper.state().isOpen).toBe(true);
    });

    it('interacting with link item should close the dropdown', () => {
      const items = [{
        heading: 'group',
        items: [
          { content: 'item 1', href: '#' },
        ],
      }];
      const wrapper = mount(<Menu items={items} defaultOpen>test</Menu>);
      const item = wrapper.find('[role="menuitem"]');
      expect(wrapper.state().isOpen).toBe(true);
      item.simulate('click');
      expect(wrapper.state().isOpen).toBe(false);
    });

    it('interacting with checkbox item should not close the menu', () => {
      const items = [{
        heading: 'group',
        items: [
          { content: 'item 1', type: 'checkbox' },
        ],
      }];
      const wrapper = mount(<Menu items={items} defaultOpen>test</Menu>);
      const item = wrapper.find('[role="menuitemcheckbox"]');
      expect(wrapper.state().isOpen).toBe(true);
      item.simulate('click');
      expect(wrapper.state().isOpen).toBe(true);
    });

    it('interacting with radio item should not close the menu', () => {
      const items = [{
        heading: 'group',
        items: [
          { content: 'item 1', type: 'radio' },
        ],
      }];
      const wrapper = mount(<Menu items={items} defaultOpen>test</Menu>);
      const item = wrapper.find('[role="menuitemradio"]');
      expect(wrapper.state().isOpen).toBe(true);
      item.simulate('click');
      expect(wrapper.state().isOpen).toBe(true);
    });
  });

  describe('onItemActivated', () => {
    it('should be called when an item was activated', () => {
      const items = [{
        heading: 'group',
        items: [
          { content: 'item 1', type: 'checkbox' },
        ],
      }];
      const spy = sinon.spy();
      const wrapper = mount(
        <Menu items={items} defaultOpen onItemActivated={spy}>
          Test
        </Menu>
      );
      const item = wrapper.find('[role="menuitemcheckbox"]');
      item.simulate('click');
      expect(spy.calledOnce).toBe(true);
      expect(spy.calledWith(sinon.match({
        item: sinon.match({ content: 'item 1', type: 'checkbox' }),
      }))).toBe(true);
    });

    it('should pass the item when activated', () => {
      const items = [{
        heading: 'group',
        items: [
          { content: 'item 1', type: 'checkbox' },
        ],
      }];
      let attrs;
      const wrapper = mount(<Menu items={items} defaultOpen onItemActivated={a => (attrs = a)}>
        test</Menu>);
      const item = wrapper.find('[role="menuitemcheckbox"]');
      item.simulate('click');
      expect(attrs).not.toBe(undefined);
      expect(attrs.item).not.toBe(undefined);
      expect(attrs.item).toBe(items[0].items[0]);
      expect(attrs.item).toEqual({ content: 'item 1', type: 'checkbox', isChecked: true });
    });
  });

  describe('handleItemActivation', () => {
    describe('radio', () => {
      const item1 = { content: 'item 1', type: 'radio' };
      const item2 = { content: 'item 2', type: 'radio' };
      const group = {
        heading: 'group',
        items: [item1, item2],
      };
      const items = [group];
      let wrapper;
      let handler;

      beforeEach(() => {
        wrapper = mount(<Menu items={items} defaultOpen>test</Menu>);
        handler = wrapper.instance().handleItemActivation;
      });

      it('should set `checked` to true when the radio item is activated', () => {
        handler({ item: item1 });
        const stateItems = wrapper.state('items');
        expect(stateItems[0].items[0].isChecked).toBe(true);
      });

      it('should stay `checked` if the item is activated more then once', () => {
        handler({ item: item1 });
        handler({ item: item1 });
        const stateItems = wrapper.state('items');
        expect(stateItems[0].items[0].isChecked).toBe(true);
      });

      it('should switch `checked` item to the new one, only one item can be checked', () => {
        handler({ item: item1 });
        const stateItems = wrapper.state('items');
        expect(stateItems[0].items[0].isChecked).toBe(true);
        expect(stateItems[0].items[1].isChecked).toBe(false);
        handler({ item: item2 });
        expect(stateItems[0].items[0].isChecked).toBe(false);
        expect(stateItems[0].items[1].isChecked).toBe(true);
      });
    });

    describe('checkbox', () => {
      let item1;
      let item2;
      let group = {
        heading: 'group',
        items: [item1, item2],
      };
      let items = [group];
      let wrapper;
      let handler;

      beforeEach(() => {
        item1 = { content: 'item 1', type: 'checkbox' };
        item2 = { content: 'item 2', type: 'checkbox' };
        group = {
          heading: 'group',
          items: [item1, item2],
        };
        items = [group];
        wrapper = shallow(<Menu items={items} defaultOpen>test</Menu>);
        handler = wrapper.instance().handleItemActivation;
      });

      it('should set `checked` to true when the checkbox item is activated', () => {
        handler({ item: item1 });
        const stateItems = wrapper.state('items');
        expect(stateItems[0].items[0].isChecked).toBe(true);
      });

      it('should toggle `checked` if the item is activated more then once', () => {
        const stateItems = wrapper.state('items');
        handler({ item: item1 });
        handler({ item: item1 });
        expect(stateItems[0].items[0].isChecked).toBe(false);
      });

      it('should not affect neighbours', () => {
        const stateItems = wrapper.state('items');
        handler({ item: item1 });
        expect(stateItems[0].items[0].isChecked).toBe(true);
        expect(stateItems[0].items[1].isChecked).toBe(undefined);
        handler({ item: item2 });
        expect(stateItems[0].items[0].isChecked).toBe(true);
        expect(stateItems[0].items[1].isChecked).toBe(true);
      });
    });
  });

  describe('focus', () => {
    describe('getPrevFocusable', () => {
      it('should return previous item when passed an item', () => {
        const Items = [{
          heading: 'group',
          items: [
            { content: 0 }, { content: 1 }, { content: 2 },
          ],
        }];

        const wrapper = mount(<StatelessMenu items={Items} isOpen>test</StatelessMenu>);

        expect(wrapper.instance().getPrevFocusable(1)).toBe(0);
      });

      it('should skip hidden items', () => {
        const Items = [{
          heading: 'group',
          items: [
            { content: 0 }, { content: 1 }, { content: 2, isHidden: true },
            { content: 3, isHidden: true }, { content: 4 },
          ],
        }];

        const wrapper = mount(<StatelessMenu items={Items} isOpen>test</StatelessMenu>);

        expect(wrapper.instance().getPrevFocusable(4)).toBe(1);
      });

      it('should return the first item if there is nothing before', () => {
        const Items = [{
          heading: 'group',
          items: [
            { content: 0 }, { content: 1 }, { content: 2 },
          ],
        }];

        const wrapper = mount(<StatelessMenu items={Items} isOpen>test</StatelessMenu>);

        expect(wrapper.instance().getPrevFocusable(0)).toBe(0);
      });

      it('should return the first non-hidden item if the first item is hidden', () => {
        const Items = [{
          heading: 'group',
          items: [
            { content: 0, isHidden: true }, { content: 1, isHidden: true }, { content: 2 },
          ],
        }];

        const wrapper = mount(<StatelessMenu items={Items} isOpen>test</StatelessMenu>);

        expect(wrapper.instance().getPrevFocusable(2)).toBe(2);
      });
    });

    describe('getNextFocusable', () => {
      it('should return the first item when called without an argument', () => {
        const Items = [{
          heading: 'group',
          items: [
            { content: 0 }, { content: 1 },
          ],
        }];

        const wrapper = mount(<StatelessMenu items={Items} isOpen>test</StatelessMenu>);

        expect(wrapper.instance().getNextFocusable()).toBe(0);
      });

      it('if the first item is hidden it should return next available item', () => {
        const Items = [{
          heading: 'group',
          items: [
            { content: 0, isHidden: true }, { content: 1, isHidden: true }, { content: 2 },
          ],
        }];

        const wrapper = mount(<StatelessMenu items={Items} isOpen>test</StatelessMenu>);

        expect(wrapper.instance().getNextFocusable()).toBe(2);
      });

      it('should return next item when passed an item', () => {
        const Items = [{
          heading: 'group',
          items: [
            { content: 0 }, { content: 1 }, { content: 2 },
          ],
        }];

        const wrapper = mount(<StatelessMenu items={Items} isOpen>test</StatelessMenu>);

        expect(wrapper.instance().getNextFocusable(1)).toBe(2);
      });

      it('should skip hidden items', () => {
        const Items = [{
          heading: 'group',
          items: [
            { content: 0 }, { content: 1, isHidden: true }, { content: 2, isHidden: true },
            { content: 3, isHidden: true }, { content: 4 },
          ],
        }];

        const wrapper = mount(<StatelessMenu items={Items} isOpen>test</StatelessMenu>);

        expect(wrapper.instance().getNextFocusable(1)).toBe(4);
      });

      it('should return the latest item if there is nothing beyond', () => {
        const Items = [{
          heading: 'group',
          items: [
            { content: 0 }, { content: 1 }, { content: 2 },
          ],
        }];

        const wrapper = mount(<StatelessMenu items={Items} isOpen>test</StatelessMenu>);

        expect(wrapper.instance().getNextFocusable(2)).toBe(2);
      });

      it('should return the latest non-hidden item if the latest item is hidden', () => {
        const Items = [{
          heading: 'group',
          items: [
            { content: 0 }, { content: 1 }, { content: 2 }, { content: 3, isHidden: true },
            { content: 4, isHidden: true },
          ],
        }];

        const wrapper = mount(<StatelessMenu items={Items} isOpen>test</StatelessMenu>);

        expect(wrapper.instance().getNextFocusable(2)).toBe(2);
      });
    });
  });
});
