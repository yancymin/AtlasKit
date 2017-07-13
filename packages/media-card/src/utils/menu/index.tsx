import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction, CardActionType, CardEventHandler} from '@atlaskit/media-core';
import MoreIcon from '@atlaskit/icon/glyph/more';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import DropdownMenu from '@atlaskit/dropdown-menu';

import {
  Wrapper,
  DeleteBtn,
  MeatBallsWrapper
} from './styled';

export interface MenuProps {
  actions?: Array<CardAction>;
  onToggle?: (attrs: {isOpen: boolean}) => void;
  triggerColor?: string;
}

export class Menu extends Component<MenuProps, {}> {
  static defaultProps = {
    actions: [],
    onToggle: () => null
  };

  render() {
    const actions = this.props.actions || [];

    if (!actions.length) { return null; }

    const content = this.shouldRenderDeleteButton(actions) ? this.renderDeleteButton(actions[0]) : this.renderDropdown(actions);

    return (
      <Wrapper>
        {content}
      </Wrapper>
    );
  }

  private shouldRenderDeleteButton(actions: Array<CardAction>) {
    return actions.length === 1 && actions[0].type === CardActionType.delete;
  }

  private renderDeleteButton(action) {
    const {triggerColor} = this.props;

    return (
      <DeleteBtn onClick={this.deleteBtnClick(action.handler)} style={{color: triggerColor}} >
        <CrossIcon size="small" label="delete" />
      </DeleteBtn>
    );
  }

  private renderDropdown(actions: Array<CardAction>) {
    const items = actions.map(i => ({content: i.label, handler: i.handler}));
    const dropdownItems = [{items}];

    return (
      <span onClick={this.meatballsBtnClick}>
        <DropdownMenu
          items={dropdownItems}
          onOpenChange={this.props.onToggle}
          onItemActivated={this.onItemActivated}
          triggerType="button"
          triggerButtonProps={{
            className: 'meat-balls-button',
            appearance: 'subtle',
            iconBefore: this.renderIconBefore()
          }}
        />
      </span>
    );
  }

  private renderIconBefore = () => {
    const {triggerColor} = this.props;

    return (
      <MeatBallsWrapper style={{color: triggerColor}} >
        <MoreIcon label="more" />
      </MeatBallsWrapper>
    );
  }

  private meatballsBtnClick(e: MouseEvent<HTMLElement>) {
    // we don't want the click to through to the consumers onClick API function
    e.stopPropagation();
    e.preventDefault();
  }

  private deleteBtnClick(handler: CardEventHandler) {
    return (e: MouseEvent<HTMLDivElement>) => {
      // we don't want the click to through to the consumers onClick API function
      e.stopPropagation();
      e.preventDefault();
      handler();
    };
  }

  private onItemActivated = (attrs) => {
    if (attrs.item && attrs.item.handler) { attrs.item.handler(); }
  }
}

export default Menu;
