import React from 'react';
import Readme, { Description, Props } from '@atlaskit/util-readme';
import { storiesOf } from '@kadira/storybook';

import { AkNavigationItemGroup } from '../../src/index';

import { name, description } from '../../package.json';

const NavigationItemGroupPropDescriptions = {
  action: 'An action to place alongside the header of the container item group',
  children: 'The items that belong to this group',
  title: 'The header of the group, details the semantic grouping that this NavigationItemGroup represents',
  hasSeparator: 'Defines if the group should draw a line to divide its content from the section above',
};

storiesOf(name, module)
  .add('📖 NavigationItemGroup readme', () => (
    <Readme
      component={name}
      description={description}
    >
      <Description>
        The NavigationItemGroup component is used to group together
        NavigationItems. It can contain an action as well, to possibly add
        additional items to that group.
      </Description>
      <Props component={AkNavigationItemGroup} descriptions={NavigationItemGroupPropDescriptions} />
    </Readme>
  ));
