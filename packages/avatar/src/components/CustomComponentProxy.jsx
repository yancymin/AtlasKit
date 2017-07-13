import React from 'react';

/**
 * Styling a avatar is complicated and there are a number of properties which
 * inform its appearance. We want to be able to style any arbitrary component
 * like a Link, but we don't want to pass all of these appearance-related props
 * through to the component or underlying DOM node. This component acts as a
 * layer which catches the appearance-related properties so that they can be
 * used by styled-components, then passes the rest of the props on to the custom
 * component.
 */

/* eslint-disable react/prop-types, no-unused-vars */
export default function CustomComponentProxy({
  appearance,
  avatar,
  borderColor,
  component: ProxiedComponent,
  enableTooltip,
  groupAppearance,
  innerRef,
  isActive,
  isDisabled,
  isFocus,
  isHover,
  isSelected,
  primaryText,
  secondaryText,
  stackIndex,
  ...props
}) {
  return <ProxiedComponent {...props} />;
}
