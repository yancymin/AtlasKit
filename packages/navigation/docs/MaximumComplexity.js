import React from 'react';
import Navigation, {
  AkNavigationItemGroup,
  AkNavigationItem,
  AkContainerTitle,
  AkSearchDrawer,
  AkSearch,
  AkCreateDrawer,
  createGlobalTheme,
} from '@atlaskit/navigation';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import ArrowLeft from '@atlaskit/icon/glyph/arrow-left';
import SearchIcon from '@atlaskit/icon/glyph/search';
import AddIcon from '@atlaskit/icon/glyph/add';

const items = ['cat', 'dog', 'fish', 'lizard'];

const CustomLinkComponent = ({ children }) => (
  <span>{children}</span>
);

const containerTheme = createGlobalTheme('#A5ADBA', '#6554C0');
const globalTheme = createGlobalTheme('#6554C0', '#A5ADBA');

class ExampleNavNav extends React.PureComponent {
  state = {
    searchDrawerOpen: false,
    isOpen: true,
    value: '',
    width: 304,
  }
  onResize = ({ isOpen, width }) => {
    this.setState({ isOpen, width });
  }
  render() {
    return (
      <Navigation
        // Styling
        containerTheme={containerTheme}
        globalTheme={globalTheme}
        // AkNavigationItems added will not gain this link component
        linkComponent={CustomLinkComponent}
        // All information relative to size and changing size/open state
        onResize={this.onResize}
        isOpen={this.state.isOpen}
        isResizeable
        width={this.state.width}
        // Props relevant to the global nav
        globalPrimaryIcon={<AtlassianIcon size="xlarge" label="Atlassian" />}
        globalPrimaryItemHref="/components/navigation"
        globalSearchIcon={<SearchIcon label="search" />}
        onSearchDrawerOpen={() => this.setState({ searchDrawerOpen: true })}
        globalCreateIcon={<AddIcon label="Create icon" secondaryColor="inherit" />}
        onCreateDrawerOpen={() => this.setState({ createDrawerOpen: true })}
        drawerBackIcon={<ArrowLeft label="Back icon" size="medium" />}
        drawers={[(
          <AkSearchDrawer
            backIcon={<ArrowLeft label="Back" />}
            primaryIcon={<SearchIcon label="Search" />}
            header="Some Header"
            isOpen={this.state.searchDrawerOpen}
            onBackButton={() => this.setState({ searchDrawerOpen: false })}
          >
            <AkSearch
              onSearchClear={() => this.setState({ value: '' })}
              onChange={e => this.setState({ value: e.target.value })}
              value={this.state.value}
            >
              {items.filter(item => item.includes(this.state.value)).map(item => (
                <AkNavigationItem text={item} />
              ))}
            </AkSearch>
          </AkSearchDrawer>
        ), (
          <AkCreateDrawer
            backIcon={<ArrowLeft label="Back" />}
            primaryIcon={<AddIcon label="Search" />}
            header="Some Header"
            isOpen={this.state.createDrawerOpen}
            onBackButton={() => this.setState({ createDrawerOpen: false })}
          />
        )]}
        // Props relevant to the container
        containerHeaderComponent={() => (
          <AkContainerTitle icon={<AtlassianIcon label="Atlassian" />} text="Example Navbar" />
        )}
      >
        <AkNavigationItemGroup>
          <AkNavigationItem text="Nav Item" subText="Some things have subtext" href="/components/navigation" />
          <AkNavigationItem text="Selected Item" isSelected href="/components/navigation" />
          <AkNavigationItem
            icon={<AtlassianIcon
              size="small"
              label="Atlassian"
            />}
            text="With an Icon"
            href="/components/navigation"
          />
        </AkNavigationItemGroup>
      </Navigation>
    );
  }
}

export default ExampleNavNav;
