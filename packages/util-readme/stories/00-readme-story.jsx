import { storiesOf } from '@kadira/storybook';
import React from 'react';

/* eslint-disable import/first, import/no-duplicates */
import Readme from '../src';
import ReadmeSrc from '!raw!../src';

// I know this looks ridiculous, but it's just a shortcut around
// infinitely recursing to demo the page that is already displayed in this story.
import ThisSrc from '!raw!../stories/00-readme-story';
/* eslint-enable import/first, import/no-duplicates */

import { name } from '../package.json';

const ReadmeDescription = 'A Readme component that gives a scaffold of a readme, complete with description, installation instructions, example use case and comprehensive proptype description.';

storiesOf(name, module)
  .add('📖 Breadcrumbs readme', () => (
    <Readme
      component={Readme}
      componentSource={ReadmeSrc}
      description={ReadmeDescription}
      example={'This page is an example of the Readme Component'}
      exampleSource={ThisSrc}
      name={'@atlaskit/util-readme'}
    />
  ));
