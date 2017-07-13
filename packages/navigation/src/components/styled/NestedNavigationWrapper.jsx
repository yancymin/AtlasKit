// @flow
import React from 'react';
import styled from 'styled-components';
import TransitionGroup from 'react-transition-group/TransitionGroup';

const NestedNavigationWrapper = styled(
  // Don't pass the traversalDirection prop to the TransitionGroup
  // eslint-disable-next-line no-unused-vars
  ({ traversalDirection, children, ...props }) => (
    <TransitionGroup {...props}>{children}</TransitionGroup>
  )
)`
  display: flex;
  flex-direction: ${({ traversalDirection }) => (traversalDirection === 'up' ? 'row' : 'row-reverse')};
  flex-wrap: nowrap;
  width: 100%;
`;

NestedNavigationWrapper.displayName = 'NestedNavigationWrapper';

export default NestedNavigationWrapper;
