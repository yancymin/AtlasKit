import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@kadira/storybook';
import { akTypographyMixins } from '@atlaskit/util-shared-styles';
import { Chrome, Code, Description } from '@atlaskit/util-readme';
import storyStyles from './typography/typography-story.less';
import { name } from '../package.json';

/* eslint-disable import/first, import/no-duplicates */
import TypographyExample from './examples/typography';
import TypographyExampleRaw from '!raw!./examples/typography';
/* eslint-enable import/first, import/no-duplicates */

/* eslint-disable max-len,  */

storiesOf(name, module)
  .add('Mixin: heading sizes', () => (
    <div>
      <p>Below are a number of paragraph elements wich a custom class which has been mixed with one of the t-shirt sized heading mixins.</p>
      <p className={storyStyles.h900}>This is a {'<p>'} styled as h900</p>
      <p className={storyStyles.h800}>This is a {'<p>'} styled as h800</p>
      <p className={storyStyles.h700}>This is a {'<p>'} styled as h700</p>
      <p className={storyStyles.h600}>This is a {'<p>'} styled as h600</p>
      <p className={storyStyles.h500}>This is a {'<p>'} styled as h500</p>
      <p className={storyStyles.h400}>This is a {'<p>'} styled as h400</p>
      <p className={storyStyles.h300}>This is a {'<p>'} styled as h300</p>
      <p className={storyStyles.h200}>This is a {'<p>'} styled as h200</p>
      <p className={storyStyles.h100}>This is a {'<p>'} styled as h100</p>
    </div>
  ))
  .add('Mixin: Using typography styled-component mixins', () => (
    <Chrome>
      <Description>
        The heading typography mixins are available as styled-components mixins if you require their
        styles in a context where an <code>h1</code>, <code>h2</code>, etc., would not make sense.
      </Description>
      <Code
        code={TypographyExampleRaw}
      >
        {TypographyExample}
      </Code>
    </Chrome>
  ))
  .add('Mixin: All typography styled-components mixins', () => {
    const H900 = styled.p`
      ${akTypographyMixins.h900};
    `;

    const H800 = styled.p`
      ${akTypographyMixins.h800};
    `;

    const H700 = styled.p`
      ${akTypographyMixins.h700};
    `;

    const H600 = styled.p`
      ${akTypographyMixins.h600};
    `;

    const H500 = styled.p`
      ${akTypographyMixins.h500};
    `;

    const H400 = styled.p`
      ${akTypographyMixins.h400};
    `;

    const H300 = styled.p`
      ${akTypographyMixins.h300};
    `;

    const H200 = styled.p`
      ${akTypographyMixins.h200};
    `;

    const H100 = styled.p`
      ${akTypographyMixins.h100};
    `;

    return (
      <div>
        <H900>This is a <kbd>styled.p</kbd> with h900 mixed in</H900>
        <H800>This is a <kbd>styled.p</kbd> with h800 mixed in</H800>
        <H700>This is a <kbd>styled.p</kbd> with h700 mixed in</H700>
        <H600>This is a <kbd>styled.p</kbd> with h600 mixed in</H600>
        <H500>This is a <kbd>styled.p</kbd> with h500 mixed in</H500>
        <H400>This is a <kbd>styled.p</kbd> with h400 mixed in</H400>
        <H300>This is a <kbd>styled.p</kbd> with h300 mixed in</H300>
        <H200>This is a <kbd>styled.p</kbd> with h200 mixed in</H200>
        <H100>This is a <kbd>styled.p</kbd> with h100 mixed in</H100>
      </div>
    );
  });
