/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Switch } from 'react-router-dom';

import Navigation, {
  AkContainerTitle as NavTitle,
  AkSearchDrawer,
} from '@atlaskit/navigation';

import ArrowLeft from '@atlaskit/icon/glyph/arrow-left';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import SearchIcon from '@atlaskit/icon/glyph/search';

import atlasKitLogo from '../../images/atlaskit-logo.png';
import SearchDrawer from './SearchDrawer';
import Groups from './Groups';

import { matchNavExample } from '../../pages/Navigation/utils';
import DefaultNav from './navigations/Default';
import ComponentNav from './navigations/Component';
import NavigationNav from './navigations/NavigationPattern';

const Header = () => (
  <Link to="/">
    <NavTitle
      icon={<img alt="AtlasKit Logo" src={atlasKitLogo} />}
      text="AtlasKit"
    />
  </Link>
);

const getIndex = (pathname: string): number => {
  if (/^\/components/.test(pathname)) return 1;
  if (/^\/patterns\/navigation/.test(pathname)) return 2;
  if (/^\/patterns/.test(pathname)) return 1;
  return 0;
};

class StandardNav extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  render() {
    const { router } = this.context;
    const { pathname } = router.route.location;
    const backIcon = <ArrowLeft label="Back icon" />;
    const globalPrimaryIcon = <AtlassianIcon label="Atlassian icon" size="medium" />;
    return (
      <Navigation
        containerHeaderComponent={Header}
        drawerBackIcon={<ArrowLeft label="Back icon" size="medium" />}
        drawers={[(
          <AkSearchDrawer
            backIcon={backIcon}
            isOpen={this.props.isSearchDrawerOpen}
            key="search"
            onBackButton={() => this.props.onSearchDrawerToggle(false)}
            primaryIcon={globalPrimaryIcon}
          >
            <SearchDrawer
              onResultClicked={() => this.props.onSearchDrawerToggle(false)}
              onSearchInputRef={r => (this.searchInputRef = r)}
            />
          </AkSearchDrawer>
        )]}
        globalPrimaryIcon={<AtlassianIcon size="xlarge" label="Atlassian" />}
        globalPrimaryItemHref="https://atlassian.design"
        globalSearchIcon={<SearchIcon label="Search icon" />}
        isResizeable={false}
        onSearchDrawerOpen={() => {
          this.props.onSearchDrawerToggle(true);
          if (this.searchInputRef) {
            this.searchInputRef.focus();
          }
        }}
      >
        <Groups
          ref={r => (this.nest = r)}
          selectedIndex={getIndex(pathname)}
        >
          <DefaultNav
            pathname={pathname}
            router={router}
            goToNext={this.nest && this.nest.goToNext}
          />
          <ComponentNav
            backIcon={backIcon}
            router={router}
            pathname={pathname}
          />
          <NavigationNav
            pathname={pathname}
            backIcon={backIcon}
            router={router}
          />
        </Groups>
      </Navigation>
    );
  }
}

const Nav = ({ isSearchDrawerOpen, onSearchDrawerToggle }) => (
  <Switch>
    <Route
      path="/patterns/navigation/examples/:exampleName"
      render={({ match }) => {
        const example = matchNavExample(match.params.exampleName);
        if (example) {
          const Comp = example.Component;
          return (
            <Comp />
          );
        }
        return (
          <StandardNav
            isSearchDrawerOpen={isSearchDrawerOpen}
            onSearchDrawerToggle={onSearchDrawerToggle}
          />
        );
      }}
    />
    <Route
      render={() => <StandardNav
        isSearchDrawerOpen={isSearchDrawerOpen}
        onSearchDrawerToggle={onSearchDrawerToggle}
      />}
    />
  </Switch>
);

export default Nav;
