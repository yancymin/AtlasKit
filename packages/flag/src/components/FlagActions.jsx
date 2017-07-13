import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Container, { Action } from '../styled/Actions';
import { APPEARANCE_ENUM, getAppearance } from '../shared-variables';
import CustomFocusButton from '../styled/CustomFocusButton';

export default class FlagActions extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(APPEARANCE_ENUM.values),
    actions: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      onClick: PropTypes.func,
    })),
  };

  static defaultProps = {
    appearance: APPEARANCE_ENUM.defaultValue,
    actions: [],
  }

  getButtonFocusRingColor = () => (
    getAppearance(this.props.appearance).focusRingColor
  )

  getButtonTheme = () => (
    this.isBold()
      ? getAppearance(this.props.appearance).actionTheme
      : undefined
  );

  getButtonSpacing = () => (
    this.isBold() ? 'compact' : 'none'
  );

  getButtonAppearance = () => (
    this.isBold() ? 'default' : 'subtle-link'
  );

  isBold = () => this.props.appearance !== APPEARANCE_ENUM.defaultValue

  render() {
    if (!this.props.actions.length) return null;

    const items = this.props.actions.map((action, index) => (
      <Action
        useMidDot={!this.isBold()}
        key={index}
        hasDivider={!!index}
      >
        <CustomFocusButton
          appearance={this.getButtonAppearance()}
          focusRingColor={this.getButtonFocusRingColor()}
          onClick={action.onClick}
          spacing={this.getButtonSpacing()}
          theme={this.getButtonTheme()}
        >
          {action.content}
        </CustomFocusButton>
      </Action>
    ));

    return <Container>{items}</Container>;
  }
}
