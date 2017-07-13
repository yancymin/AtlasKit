import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Chrome, Code, Description } from '@atlaskit/util-readme';

import { name } from '../package.json';
import AnimatedBoxGroup from './animation/AnimatedBoxGroup';
import { Container } from './animation/styled';

/* eslint-disable import/first, import/no-duplicates */
import AnimationExample from './examples/animation';
import AnimationExampleRaw from '!raw!./examples/animation';
/* eslint-enable import/first, import/no-duplicates */

storiesOf(name, module)
  .add('Mixin: Animation', () => (
    <Container>
      <h1>Animation Mixins</h1>
      <p>
        In this example we are animating the <code>translateY</code> property but
        the same idea would apply to animating anthing else.
      </p>
      <h4>Bold</h4>
      <p>
        Bold animations should be used to focus attentions on a certain element on a
        page and only one such animation should ever be present at a time. It follows an
        80/20 rule where it will do 80% of it&#39;s motion in the first 20% of the time
      </p>
      <h4>Optimistic</h4>
      <p>
        Optimistic animations should be used to make a page still feel like it is moving
        whilst things are moving. The curve itself will cause a property to “overshoot”
        by 5%, “undershoot” by 2.5% and finally, settle on the end value.
      </p>
      <h4>Combined</h4>
      <p>The combined animation curve brings in the best of both worlds.</p>
      <AnimatedBoxGroup />
      <Chrome>
        <Description>
          <h2>Usage Example</h2>
          <p>A combination of CSS properties working with the <code>createBold</code> mixin:</p>
        </Description>
        <Code code={AnimationExampleRaw}>
          {AnimationExample}
        </Code>
      </Chrome>
    </Container>
  ));
