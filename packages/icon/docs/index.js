import React from 'react';
import styled from 'styled-components';
import { akBorderRadius, akColorN20, akGridSize, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

import IconSizeExample from './examples/IconSizeExample';
import IconSizeExampleSrc from '!raw-loader!./examples/IconSizeExample';
import IconCustomExample from './examples/IconCustomExample';
import IconCustomExampleSrc from '!raw-loader!./examples/IconCustomExample';
import IconAllExample from './examples/IconAllExample';
import IconAllExampleSrc from '!raw-loader!./examples/IconAllExample';

const Pre = styled.pre`
  background-color: ${akColorN20};
  border-radius: ${akBorderRadius};
  box-sizing: border-box;
  font-family: Monaco, Menlo, monospace;
  font-size: 0.9em;
  margin: ${akGridSizeUnitless * 2}px 0;
  overflow-x: auto;
  padding: ${akGridSize};
`;

export const description = (
  <div>
    <h3>Icons 🎉</h3>
    <p>
      {`The default export from this package is a wrapper which accepts a glyph property.
      Generally, you won't need this unless you're using your own custom icon.`}
    </p>
    <Pre>{"import Icon from '@atlaskit/icon';"}</Pre>
    <p>{"To use one of AtlasKit's built-in icons you should import it directly."}</p>
    <Pre>{"import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';"}</Pre>
    <p>{'You can explore all of our icons in the example below.'}</p>
  </div>
);

export const examples = [
  {
    title: 'Icons and sizes',
    Component: IconSizeExample,
    src: IconSizeExampleSrc,
  },
  {
    title: 'Custom icon',
    Component: IconCustomExample,
    src: IconCustomExampleSrc,
  },
  {
    title: 'All icons',
    Component: IconAllExample,
    src: IconAllExampleSrc,
  },
];
