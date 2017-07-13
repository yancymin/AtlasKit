import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import * as sinon from 'sinon';
import { CardActionType } from '@atlaskit/media-core';
import DropdownMenu from '@atlaskit/dropdown-menu';
import { Item } from '@atlaskit/droplist';

import { Menu } from '../../../src/utils/menu/index';
import { MeatBallsWrapper, DeleteBtn } from '../../../src/utils/menu/styled';

describe('Menu', () => {
  const menuActions = [
    {label: 'Open', handler: () => {}},
    {label: 'Close', handler: () => {}},
  ];
  const deleteAction = {type: CardActionType.delete, label: 'Delete', handler: () => {}};
  const animStub = window.cancelAnimationFrame;
  // Stub window.cancelAnimationFrame, so Popper (used in Layer) doesn't error when accessing it.
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  it('should render the meatballs menu when supplied with multiple actions', () => {
    const card = mount(<Menu actions={menuActions}/>);
    expect(card.find(MeatBallsWrapper)).to.have.length(1);
    expect(card.find(DeleteBtn)).to.have.length(0);
  });

  it('should render the meatballs menu when supplied with multiple actions including one with type "delete"', () => {
    const card = mount(<Menu actions={[deleteAction]}/>);
    expect(card.find(MeatBallsWrapper)).to.have.length(0);
    expect(card.find(DeleteBtn)).to.have.length(1);
  });

  it('should render the delete button when supplied with a single action with type "delete"', () => {
    const card = mount(<Menu actions={[deleteAction]}/>);
    expect(card.find(MeatBallsWrapper)).to.have.length(0);
    expect(card.find(DeleteBtn)).to.have.length(1);
  });

  it('should call onToggle callback when meatballs are pressed', () => {
    const onToggle = sinon.spy();
    const card = mount(<Menu actions={menuActions} onToggle={onToggle}/>);

    card.find(DropdownMenu).simulate('click');
    expect(card.find(Item)).to.have.length(2);
    expect(onToggle.called).to.equal(true);
  });

  it('should call action handler when item is pressed', () => {
    const handler = sinon.spy();
    const menuActions = [{label: 'x', handler}];
    const card = mount(<Menu actions={menuActions}/>);

    card.find(DropdownMenu).simulate('click');
    // The event listener is on the `Element` in Item which we cant select with a css selector
    // check /packages/droplist/test/unit/item.js
    card.find(Item).first().childAt(0).simulate('click');
    expect(handler.called).to.equal(true);
  });

  it('should pass supplied trigger color to meatballs wrapper when there are multiple actions', () => {
    const handler = sinon.spy();
    const menuActions = [{label: 'x', handler}, {label: 'y', handler}];

    const triggerColor = 'some-color-string';
    const card = mount(<Menu actions={menuActions} triggerColor={triggerColor}/>);
    expect(card.find(MeatBallsWrapper).prop('style')).to.contain({color: triggerColor});
  });

  it('should pass supplied trigger color to delete button when there is a single action', () => {
    const menuActions = [deleteAction];

    const triggerColor = 'some-color-string';
    const card = mount(<Menu actions={menuActions} triggerColor={triggerColor}/>);
    expect(card.find(DeleteBtn).prop('style')).to.contain({color: triggerColor});
  });
});
