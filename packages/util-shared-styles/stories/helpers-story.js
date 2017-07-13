import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@kadira/storybook';
import { Chrome, Code, Description } from '@atlaskit/util-readme';
import { akHelperMixins } from '@atlaskit/util-shared-styles';
import { name } from '../package.json';

const H3 = styled.h3`
  &, &:first-child { margin-top: 2em; }
`;

/* eslint-disable import/first, import/no-duplicates */
import FocusRingExample from './examples/helpers/focus-ring';
import FocusRingExampleRaw from '!raw!./examples/helpers/focus-ring';
import TextExample from './examples/helpers/text';
import TextExampleRaw from '!raw!./examples/helpers/text';
import PlaceholderExample from './examples/helpers/placeholder';
import PlaceholderExampleRaw from '!raw!./examples/helpers/placeholder';
/* eslint-enable import/first, import/no-duplicates */

function generateUtilList(n) {
  return Object
    .keys(akHelperMixins[n])
    .map((u) => {
      const util = akHelperMixins[n][u];
      const type = Array.isArray(util) ? 'constant' : (typeof util);
      return <li key={u}><code>{u}</code> {type}</li>;
    });
}

storiesOf(name, module)
  .add('Mixin: Helpers', () => {
    const focusRingUtils = generateUtilList('focusRing');
    const textUtils = generateUtilList('text');

    return (
      <Chrome>
        <h1>Helpers</h1>
        <Description>
          <H3>Focus Ring</H3>
          <p>The focus ring helper exposes {focusRingUtils.length} utilities:</p>
          <ul>{focusRingUtils}</ul>
          <p>Below are some possible implementations using the focus ring helper mixin.</p>
        </Description>
        <Code code={FocusRingExampleRaw}>
          {FocusRingExample}
        </Code>

        <Description>
          <H3>Text</H3>
          <p>The text helper exposes {textUtils.length} utility:</p>
          <ul>{textUtils}</ul>
          <p>Below are some possible implementations using the text helper mixin.</p>
        </Description>
        <Code code={TextExampleRaw}>
          {TextExample}
        </Code>

        <Description>
          <H3>Placeholder</H3>
          <p>The placholder helper generates vendor-prefixed rules for styling an {'input\'s'} placeholder.</p>
          <p>Below is an implementation using the placeholder helper mixin.</p>
        </Description>
        <Code code={PlaceholderExampleRaw}>
          {PlaceholderExample}
        </Code>
      </Chrome>
    );
  });
