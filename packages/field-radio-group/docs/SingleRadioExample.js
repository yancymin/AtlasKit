import React from 'react';
import { AkRadio } from '@atlaskit/field-radio-group';

const Example = () => (
  <AkRadio
    name="standalone"
    value="singleButton"
    onChange={e => console.log('standalone change', e.target.value)}
  >
    Solely rendered radio button
  </AkRadio>
);

export default Example;
