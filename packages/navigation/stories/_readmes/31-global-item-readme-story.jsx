import React from 'react';
import Readme, { Description, Props } from '@atlaskit/util-readme';
import { storiesOf } from '@kadira/storybook';

import { AkGlobalItem } from '../../src/index';

import { name, description } from '../../package.json';

const globalItemPropDescriptions = {
  children: 'The contents of the GlobalItem - usually an icon',
  href: 'The href that the GlobalItem links to',
  isSelected: 'Whether the GlobalItem is currently in the selected state - usually when the popup they are controlling is open',
  size: 'The size of the GlobalItem - medium sizes are used for the primary items, and small for the account and help items',
  linkComponent: 'Used to render all links in the ContainerNavigation. See linkComponent docs for more details',
};

storiesOf(name, module)
  .add('📖 GlobalItem readme', () => (
    <Readme
      component={name}
      description={description}
    >
      <Description>
        The GlobalItem is the equivalent of NavigationItem, but for use in the
        GlobalNavigation. The difference is that these items are presented
        differently – they can only contain icons, and have a circular
        background. When using the Navigation component, these items will pop
        through into the ContainerNaviation when the Navigation is in the
        collapsed state.
      </Description>
      <Props component={AkGlobalItem} descriptions={globalItemPropDescriptions} />
    </Readme>
  ));
