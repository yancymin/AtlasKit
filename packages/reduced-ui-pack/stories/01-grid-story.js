import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Chrome, Code } from '@atlaskit/util-readme';

import { name } from '../package.json';

/* eslint-disable quotes, max-len,  */
const gridHTML = `<ak-grid>
  <ak-grid-column size="8">
    <h1>Main heading</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
  </ak-grid-column>
  <ak-grid-column size="4">
    <h2>Sidebar</h2>
    <p>Blanditiis voluptatum perspiciatis doloribus dignissimos accusamus commodi, nobis ut, error iusto,
      quas vitae nesciunt consequatur possimus labore!</p>
  </ak-grid-column>
  <ak-grid-column>
    <h2>Content below which takes up remaining space</h2>
    <p>
      Blanditiis voluptatum perspiciatis doloribus dignissimos accusamus commodi, nobis ut, error iusto,
      quas vitae nesciunt consequatur possimus labore! Mollitia est quis minima asperiores.
    </p>
  </ak-grid-column>
</ak-grid>`;
const gridJSX = (<ak-grid is>
  <ak-grid-column is size="8">
    <h1>Main heading</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
  </ak-grid-column>
  <ak-grid-column is size="4">
    <h2>Sidebar</h2>
    <p>Blanditiis voluptatum perspiciatis doloribus dignissimos accusamus commodi, nobis ut, error iusto,
      quas vitae nesciunt consequatur possimus labore!</p>
  </ak-grid-column>
  <ak-grid-column is>
    <h2>Content below which takes up remaining space</h2>
    <p>
      Blanditiis voluptatum perspiciatis doloribus dignissimos accusamus commodi, nobis ut, error iusto,
      quas vitae nesciunt consequatur possimus labore! Mollitia est quis minima asperiores.
    </p>
  </ak-grid-column>
</ak-grid>);

storiesOf(name, module)
  .add('Grid layout', () => (
    <Chrome title="Grid layout">
      <Code code={gridHTML}>
        {gridJSX}
      </Code>
    </Chrome>
  ));
