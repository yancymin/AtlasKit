import React from 'react';
import Toggle, { ToggleStateless } from '@atlaskit/toggle';

const TagsExample = () => (
  <div>
    <Toggle />
    <Toggle size="large" />
    <Toggle isDisabled />
    <Toggle onChange={e => console.log(e.target.checked)} />
    <ToggleStateless />
  </div>
);

export default TagsExample;
