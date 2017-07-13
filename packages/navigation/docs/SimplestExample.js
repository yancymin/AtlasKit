import React from 'react';
import Navigation, { AkNavigationItemGroup, AkNavigationItem, AkContainerTitle } from '@atlaskit/navigation';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';

class ExampleNavNav extends React.PureComponent {

  render() {
    return (
      <Navigation
        globalPrimaryIcon={<AtlassianIcon size="xlarge" label="Atlassian" />}
        globalPrimaryItemHref="/components/navigation"
        containerHeaderComponent={() => (
          <AkContainerTitle icon={<AtlassianIcon label="Atlassian" />} text="Example Navbar" />
        )}
      >
        <AkNavigationItemGroup>
          <AkNavigationItem text="Nav Item" href="/components/navigation" />
          <AkNavigationItem text="Selected Item" isSelected href="/components/navigation" />
        </AkNavigationItemGroup>
      </Navigation>
    );
  }
}

export default ExampleNavNav;
