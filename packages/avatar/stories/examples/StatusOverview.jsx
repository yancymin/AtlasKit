import React from 'react';
import { Status } from '@atlaskit/avatar';

const containerStyles = {
  display: 'flex',
  justifyContent: 'space-around',
  backgroundColor: '#f4f5f7',
  padding: '20px',
};

// Status components will stretch to fill the entire available space by default
const statusWrapperStyles = {
  height: '20px',
  width: '20px',
};

export default (
  <div>
    <div style={containerStyles}>
      <div style={statusWrapperStyles}><Status /></div>
      <div style={statusWrapperStyles}><Status status="approved" /></div>
      <div style={statusWrapperStyles}><Status status="declined" /></div>
      <div style={statusWrapperStyles}><Status status="locked" /></div>
    </div>
  </div>
);
