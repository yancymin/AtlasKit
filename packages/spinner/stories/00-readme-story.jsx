import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props, Description } from '@atlaskit/util-readme';

/* eslint-disable import/first, import/no-duplicates */
import SpinnerOverviewExampleRaw from '!raw!./examples/SpinnerOverview';
import SpinnerOverviewExample from './examples/SpinnerOverview';
/* eslint-enable import/first, import/no-duplicates */

import { name } from '../package.json';
import Spinner from '../src';

const description = (<Description>
  <p>Spinners are used for showing a system process of unknown length going on
    that ends with the system displaying results to the user.
  </p>
  <p>The spinner will display a loading in animation and then continue spinning until the
    <code>`isCompleting`</code> prop is set on it.
  </p>
  <p>If this prop is set to true the spinner will begin playing the outro animation (approximately
    300ms).
  </p>
  <p>You can be notified once the animation is complete by hooking into the
    <code>`onComplete`</code> callback like so.
  </p>
  <p>See the rest of the examples in this storybook for a more in depth usages.</p>
</Description>);

const propDescriptions = {
  invertColor: 'a flag to indicate that the spinner is being displayed on a dark background',
  isCompleting: 'a flag to signal that a loader should start playing it&#39;s fade out animation',
  onComplete: 'a callback function called after the fade out animation has finished',
  size: `a number indicating the width of the spinner, or one of "small" (20px), "medium" (30px),
        "large" (50px), or xlarge (100px) or a number to set a custom size (in pixels)`,
};

storiesOf(name, module)
  .add('📖 Spinner Readme', () => (
    <div>
      <Readme
        component={Spinner}
        description={description}
      >
        <Code code={SpinnerOverviewExampleRaw}>
          {SpinnerOverviewExample}
        </Code>
        <Props component={Spinner} descriptions={propDescriptions} />
      </Readme>
    </div>
  ));
