import React from 'react';
import Navigation, {
  createGlobalTheme,
  AkNavigationItemGroup,
  AkNavigationItem,
  AkContainerTitle,
} from '@atlaskit/navigation';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import { akColorP400, akColorN20 } from '@atlaskit/util-shared-styles';

const containerTheme = createGlobalTheme(akColorN20, akColorP400);
const globalTheme = createGlobalTheme(akColorP400, akColorN20);

class ExampleNavNav extends React.PureComponent {
  state = {
    searchDrawerOpen: false,
  }
  render() {
    return (
      <Navigation
        containerTheme={containerTheme}
        globalTheme={globalTheme}
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
