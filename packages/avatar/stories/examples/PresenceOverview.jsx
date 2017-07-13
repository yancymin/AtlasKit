import React from 'react';
import { Presence } from '@atlaskit/avatar';

const containerStyles = {
  display: 'flex',
  justifyContent: 'space-around',
  backgroundColor: '#f4f5f7',
  padding: '20px',
};

// Presence components will stretch to fill the entire available space by default
const presenceWrapperStyles = {
  height: '20px',
  width: '20px',
};

export default (
  <div>
    <div style={containerStyles}>
      <div style={presenceWrapperStyles}><Presence /></div>
      <div style={presenceWrapperStyles}><Presence presence="online" /></div>
      <div style={presenceWrapperStyles}><Presence presence="busy" /></div>
      <div style={presenceWrapperStyles}><Presence presence="offline" /></div>
    </div>
  </div>
);
