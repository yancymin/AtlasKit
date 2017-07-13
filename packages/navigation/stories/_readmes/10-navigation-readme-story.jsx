import React from 'react';
import Readme, { Props, Description, Code } from '@atlaskit/util-readme';
import { storiesOf } from '@kadira/storybook';

import Navigation from '../../src/index';

import { name, description } from '../../package.json';

const navigationPropDescriptions = {
  children: 'Content to go inside the Container Navigation',
  containerTheme: 'The theme of the container navigation. Presets are available via the presetThemes named export.',
  containerHeaderComponent: 'The component to be rendered in the container as the header – usually a product logo or a container title',
  drawers: 'An array of Drawer components that the navigation will render',
  globalTheme: 'The theme of the global navigation. Presets are available via the presetThemes named export, or you can generate your own using the the createGlobalTheme named export function.',
  globalCreateIcon: 'The icon to be used for the create button in the global navigation',
  globalPrimaryIcon: 'The topmost icon to be placed in the global navigation - usually the product logo, or the product home icon',
  globalPrimaryItemHref: 'A link to place around the primary icon. The rendering of this link is controlled by Navigation.linkComponent',
  globalSearchIcon: 'The icon to use in the global navigation for the global search button',
  globalSecondaryActions: 'A list of nodes to be placed in the secondary actions slot in the global sidebar. This should not exceed four nodes.',
  isCollapsible: `Whether or not the node is able to be collapsed.
                 If set to false the navigation can never be collapsed down to just the global bar.
                 Resizing will only allow the navigation to be expanded beyond the standard width (global navigation + container navigation)
                 and will not allow it to go smaller than the standard width.
                 If isOpen is set to false, isOpen will be ignored and a warning will be logged.`,
  isOpen: 'Whether the navigation is currently open',
  isResizeable: 'Whether the navigation is resizeable by the user. The navigation\'s open state can still be set by isOpen',
  linkComponent: 'A component that will be used to render links. See the linkComponent docs for more details',
  onCreateDrawerOpen: 'A handler that is called when the create drawer is requesting to be opened',
  onSearchDrawerOpen: 'A handler that is called when the search drawer is requesting to be opened',
  onResize: 'A handler to call when the navigation finishes resizing',
  onResizeStart: 'A handler to call when the navigation starts resizing',
  width: 'The width at which to render the navigation. This is only adhered to if Navigation.isOpen is true.',
};

storiesOf(name, module)
  .add('📖 Navigation readme', () => (
    <Readme
      component={name}
      description={description}
    >
      <Description>
        The Navigation component is a high level component that wraps many
        individual components. The general structure of the component is
        displayed below.
        <Code>{`
          Navigation
            - Global Navigation
              - Create
              - Search
            - Container Navigation
              - Container header
              - Items
            - Drawers
        `}</Code>
        The Global Navigation is the blue bar on the left, and is used for
        global product actions like search and create, and user account options.
        The Container Navigation is the grey bar on the right, and is used for
        container specific links and navigation. Navigation wraps both of these
        components, and passes props onto these children.
      </Description>
      <Props component={Navigation} descriptions={navigationPropDescriptions} />
    </Readme>
  ));
