import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Span } from '../styled/Item';

export const supportsVoiceOver = /Mac OS X/.test(navigator.userAgent);

export const ariaRoles = {
  checkbox: supportsVoiceOver ? 'checkbox' : 'menuitemcheckbox',
  link: 'menuitem',
  option: 'option',
  radio: supportsVoiceOver ? 'radio' : 'menuitemradio',
};
export const baseTypes = {
  default: 'link',
  values: ['link', 'radio', 'checkbox', 'option'],
};

/* eslint-disable react/no-unused-prop-types, react/prefer-stateless-function */
export default class Element extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    handleClick: PropTypes.func,
    handleKeyPress: PropTypes.func,
    handleMouseDown: PropTypes.func.isRequired,
    handleMouseOut: PropTypes.func.isRequired,
    handleMouseOver: PropTypes.func.isRequired,
    handleMouseUp: PropTypes.func.isRequired,
    href: PropTypes.string,
    isActive: PropTypes.bool,
    isChecked: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isHidden: PropTypes.bool,
    isPrimary: PropTypes.bool,
    isSelected: PropTypes.bool,
    target: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.oneOf(baseTypes.values),
  }

  // this prevents the focus ring from appearing when the element is clicked.
  // It doesn't interfere with the onClick handler
  handleMouseDown = (e) => {
    e.preventDefault();
    this.props.handleMouseDown();
  }

  render() {
    const { props } = this;
    const { isActive, isChecked, isDisabled, isFocused, isHidden, isSelected, isPrimary } = props;

    const appearanceProps = {
      isActive,
      isChecked,
      isDisabled,
      isFocused,
      isHidden,
      isSelected,
      isPrimary,
    };

    const ariaProps = {
      'aria-checked': !!isChecked,
      'aria-disabled': !!isDisabled,
      'aria-hidden': !!isHidden,
      'aria-selected': !!isSelected,
    };
    const commonProps = {
      'data-role': 'droplistItem',
      onClick: props.handleClick,
      onKeyPress: props.handleKeyPress,
      onMouseDown: this.handleMouseDown,
      onMouseOut: props.handleMouseOut,
      onMouseOver: props.handleMouseOver,
      onMouseUp: props.handleMouseUp,
      role: ariaRoles[props.type],
      title: props.title,
      tabIndex: props.type === 'option' ? null : 0,
    };
    const testingProps = process.env.NODE_ENV === 'test' ? {
      'data-test-active': isActive,
      'data-test-checked': isChecked,
      'data-test-disabled': isDisabled,
      'data-test-hidden': isHidden,
      'data-test-selected': isSelected,
    } : {};
    const consolidatedProps = { ...appearanceProps, ...ariaProps, ...commonProps, ...testingProps };

    if (props.href && !isDisabled) {
      return (
        <Anchor href={props.href} target={props.target} {...consolidatedProps}>
          {props.children}
        </Anchor>
      );
    }

    return (
      <Span {...consolidatedProps}>
        {props.children}
      </Span>
    );
  }
}
