import React from 'react';
import DefaultLogo from '@atlaskit/logo';
import { akColorR500 } from '@atlaskit/util-shared-styles';

const Examples = () => (
  <div>
    <DefaultLogo />
    <br />
    <span style={{ color: akColorR500 }}>
      <DefaultLogo />
    </span>
    <br />
    <DefaultLogo collapseTo="icon" />
    <br />
    <DefaultLogo collapseTo="type" />
    <br />
    <DefaultLogo size="small" />
    <br />
    <DefaultLogo size="medium" />
    <br />
    <DefaultLogo size="large" />
    <br />
    <DefaultLogo size="xlarge" />
    <br />

  </div>
);

export default Examples;
