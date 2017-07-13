import React from 'react';
import Question from '@atlaskit/icon/glyph/question';
import { Item } from '@atlaskit/droplist';

export default (<div>
  <Item elemBefore={<Question />}>Two non-primary appearances</Item>
  <Item elemBefore={<Question />}>Two non-primary appearances</Item>
  <Item appearance="primary" elemBefore={<Question />}>Primary appearance</Item>
</div>
);
