import React from 'react';
import Navigation, { AkNavigationItemGroup, AkNavigationItem, AkContainerTitle } from '@atlaskit/navigation';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';

class ExampleNavNav extends React.PureComponent {
  state = {
    searchDrawerOpen: false,
    isOpen: true,
  }

  onResize = ({ isOpen }) => {
    this.setState({ isOpen });
  }

  render() {
    return (
      <Navigation
        onResize={this.onResize}
        isOpen={this.state.isOpen}
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
