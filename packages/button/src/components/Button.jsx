import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

import getButtonProps from './getButtonProps';
import CustomComponentProxy from './CustomComponentProxy';
import getButtonStyles from '../styled/getButtonStyles';
import ButtonContent from '../styled/ButtonContent';
import ButtonWrapper from '../styled/ButtonWrapper';
import IconWrapper from '../styled/IconWrapper';

const createStyledComponent = {
  custom: () => {
    // Override pseudo-state specificity.
    // This is necessary because we don't know what DOM element the custom component will render.
    const component = styled(CustomComponentProxy)`&,&:hover,&:active,&:focus{${getButtonStyles}}`;
    component.displayName = 'StyledCustomComponent';
    return component;
  },
  button: () => {
    const component = styled.button`${getButtonStyles}`;
    component.displayName = 'StyledButton';
    return component;
  },
  link: () => {
    // Target the <a> here to override a:hover specificity.
    const component = styled.a`a&{ ${getButtonStyles} }`;
    component.displayName = 'StyledLink';
    return component;
  },
  span: () => {
    const component = styled.span`${getButtonStyles}`;
    component.displayName = 'StyledSpan';
    return component;
  },
};

export default class Button extends Component {
  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    /** The base styling to apply to the button. */
    appearance: PropTypes.oneOf([
      'default',
      'link',
      'primary',
      'subtle',
      'subtle-link',
    ]),
    /** Pass aria-controls to underlying html button. */
    ariaControls: PropTypes.string,
    /** Pass aria-expanded to underlying html button. */
    ariaExpanded: PropTypes.bool,
    /** Pass aria-haspopup to underlying html button. */
    ariaHaspopup: PropTypes.bool,
    /** This button's child nodes. */
    children: PropTypes.node,
    /** Add a classname to the button. */
    className: PropTypes.string,
    /** A custom component to use instead of the default button. */
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    /** Name property of a linked form that the button submits when clicked. */
    form: PropTypes.string,
    /** Provides a url for buttons being used as a link. */
    href: PropTypes.string,
    /** Places an icon within the button, after the button's text. */
    iconAfter: PropTypes.element,
    /** Places an icon within the button, before the button's text. */
    iconBefore: PropTypes.element,
    /** Provide a unique id to the button. */
    id: PropTypes.string,
    /** Set if the button is disabled. */
    isDisabled: PropTypes.bool,
    /** Change the style to indicate the button is selected. */
    isSelected: PropTypes.bool,
    /** Handler to be called on click. */
    onClick: PropTypes.func,
    /** Set the amount of padding in the button. */
    spacing: PropTypes.oneOf(['compact', 'default', 'none']),
    /** Assign specific tabIndex order to the underlying html button. */
    tabIndex: PropTypes.number,
    /** Pass target down to a link within the button component, if a href is provided. */
    target: PropTypes.string,
    /** Change the default styling. */
    theme: PropTypes.oneOf(['dark', 'default']),
    /** Set whether it is a button or a form submission. */
    type: PropTypes.oneOf(['button', 'submit']),
    /** Option to fit button width to its parent width */
    shouldFitContainer: PropTypes.bool,
  }

  static defaultProps = {
    appearance: 'default',
    isDisabled: false,
    isSelected: false,
    spacing: 'default',
    tabIndex: null,
    theme: 'default',
    type: 'button',
    shouldFitContainer: false,
  }

  state = {
    isActive: false,
    isFocus: false,
    isHover: false,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.component !== nextProps.component) {
      delete this.styledComponents.custom;
    }
  }

  onMouseEnter = () => this.setState({ isHover: true })

  onMouseLeave = () => this.setState({ isHover: false, isActive: false })

  onMouseDown = (e) => {
    e.preventDefault();
    this.setState({ isActive: true });
  }

  onMouseUp = () => this.setState({ isActive: false })

  onFocus = () => this.setState({ isFocus: true })

  onBlur = () => this.setState({ isFocus: false })

  getCachedStyledComponent(type) {
    if (!this.styledComponents[type]) {
      this.styledComponents[type] = createStyledComponent[type]();
    }
    return this.styledComponents[type];
  }

  getStyledComponent() {
    if (this.props.component) {
      return this.getCachedStyledComponent('custom');
    }

    if (this.props.href) {
      if (this.props.isDisabled) {
        return this.getCachedStyledComponent('span');
      }

      return this.getCachedStyledComponent('link');
    }

    return this.getCachedStyledComponent('button');
  }

  styledComponents = {};

  render() {
    const {
      children,
      iconBefore,
      iconAfter,
      shouldFitContainer,
    } = this.props;

    const buttonProps = getButtonProps(this);
    const StyledComponent = this.getStyledComponent();

    const iconIsOnlyChild = (iconBefore && !iconAfter && !children)
      || (iconAfter && !iconBefore && !children);

    return (
      <StyledComponent {...buttonProps}>
        <ButtonWrapper fit={shouldFitContainer}>
          {iconBefore ? (
            <IconWrapper spacing={buttonProps.spacing} isOnlyChild={iconIsOnlyChild}>
              {iconBefore}
            </IconWrapper>
          ) : null}
          {children ? (
            <ButtonContent
              followsIcon={Boolean(iconBefore)}
              spacing={buttonProps.spacing}
            >
              {children}
            </ButtonContent>
          ) : null}
          {iconAfter ? (
            <IconWrapper spacing={buttonProps.spacing} isOnlyChild={iconIsOnlyChild}>
              {iconAfter}
            </IconWrapper>
          ) : null}
        </ButtonWrapper>
      </StyledComponent>
    );
  }
}
