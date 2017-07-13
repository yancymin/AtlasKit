import React from 'react';
import Readme, { Description, Props } from '@atlaskit/util-readme';
import { storiesOf } from '@kadira/storybook';

import { AkContainerTitle } from '../../src/index';

import { name, description } from '../../package.json';

const containerTitlePropDescriptions = {
  icon: 'The icon for the what is currently being navigated in the container.',
  text: 'The title of the container',
  href: 'The href for the link - usually the home page of the container',
  linkComponent: 'Used to render all links in the ContainerNavigation. See linkComponent docs for more details',
};

storiesOf(name, module)
  .add('📖 ContainerTitle readme', () => (
    <Readme
      component={name}
      description={description}
    >
      <Description>
        The ContainerTitle component represents the title of a container. It
        displays the logo and a brief description of what is currently being
        browsed in the container navigation.
      </Description>
      <Props component={AkContainerTitle} descriptions={containerTitlePropDescriptions} />
    </Readme>
  ));
