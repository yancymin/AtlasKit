import React from 'react';
import Spinner from '@atlaskit/spinner';

const SpinnerExample = () => (
  <div>
    <Spinner size="xlarge" />
    <Spinner size="large" />
    <Spinner size="medium" />
    <Spinner size="small" />
    <span
      style={{
        backgroundColor: 'rgb(37, 56, 88)',
        display: 'inline-block',
      }}
    >
      <Spinner invertColor />
    </span>
  </div>
);

export default SpinnerExample;
