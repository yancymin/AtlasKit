import React from 'react';
import { AkNavigationItem, AkContainerNavigation } from '@atlaskit/navigation';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';

export default (
  <AkContainerNavigation>
    <AkNavigationItem href="#" text="1) A basic container item with some text" />
    <AkNavigationItem href="#" icon={<AtlassianIcon />} text="2) A compact container item" />
    <AkNavigationItem href="#" text="3) A basic container item with some text" />
    <AkNavigationItem href="#" text="4) A basic container item with some text" />
  </AkContainerNavigation>
);
