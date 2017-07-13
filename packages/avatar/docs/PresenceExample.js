/* eslint-disable import/no-extraneous-dependencies, react/prop-types */

import React, { PureComponent } from 'react';
import { Presence } from '@atlaskit/avatar';

// Presence components will stretch to fill the entire available space by default
const Wrapper = ({ children }) => (
  <div style={{ marginRight: 10, width: 20, height: 20, float: 'left' }}>
    {children}
  </div>
);

export default class AvatarExample extends PureComponent {
  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <Wrapper><Presence presence="online" /></Wrapper>
        <Wrapper><Presence presence="busy" /></Wrapper>
        <Wrapper><Presence presence="offline" /></Wrapper>
        <Wrapper><Presence /></Wrapper>
      </div>
    );
  }
}
