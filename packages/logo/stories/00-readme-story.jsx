import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Readme from '@atlaskit/util-readme';

import { name } from '../package.json';

/* eslint-disable import/no-duplicates, import/first */
import defaultComponent from '../src/components/LogoBase';
import defaultComponentSource from '!raw!../src/components/LogoBase';
import defaultOverview from './examples/basic-usage';
import defaultOverviewSource from '!raw!./examples/basic-usage';
/* eslint-enable import/no-duplicates, import/first */

const description = 'The Logo package provides components for Atlassian brand and product logos of various sizes.';

storiesOf(name, module)
  .add('📖 Logo Readme', () => (
    <Readme
      name={name}
      component={defaultComponent}
      componentSource={defaultComponentSource}
      example={defaultOverview}
      exampleSource={defaultOverviewSource}
      description={description}
    />
  ));
