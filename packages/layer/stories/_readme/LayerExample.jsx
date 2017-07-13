import React from 'react';
import Layer from '@atlaskit/layer';

export default (
  <Layer content={<div style={{ background: 'green', padding: '5px' }}>Layer content</div>}>
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
        marginLeft: '200px',
        background: 'red',
        padding: '30px',
      }}
    >Target</div>
  </Layer>
);
