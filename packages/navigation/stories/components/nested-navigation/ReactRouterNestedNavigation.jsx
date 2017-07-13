import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch, Link, matchPath } from 'react-router-dom';

import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import TrayIcon from '@atlaskit/icon/glyph/tray';

import {
  AkContainerTitle,
  AkNavigationItem,
  AkContainerNavigationNested,
} from '../../../src/index';
import nucleusLogo from '../../nucleus.png';
import BasicNavigation from '../BasicNavigation';
import HtmlPage from '../HtmlPage';

const makePage = title => () => (
  <h1>{title}</h1>
);

const getPageContent = () => (
  <Switch>
    <Route component={makePage('The Matrix')} path="/movies/matrix" />
    <Route component={makePage('Lord of the Rings')} path="/movies/lotr" />
    <Route component={makePage('Movies')} path="/movies" />
    <Route component={makePage('The Beatles – Sgt. Peppers Lonely Hearts Club Band')} path="/albums/more/lonelyheartsclub" />
    <Route component={makePage('Tame Impala – Lonerism')} path="/albums/more/lonerism" />
    <Route component={makePage('More Albums')} path="/albums/more" />
    <Route component={makePage('The xx – coexist')} path="/albums/coexist" />
    <Route component={makePage('Alt J – an awesome wave')} path="/albums/anawesomewave" />
    <Route component={makePage('Albums')} path="/albums" />
    <Route component={makePage('About')} path="/about" />
    <Route component={makePage('Home')} />
  </Switch>
);

const RouterLinkComponent = (props) => {
  const { children, href, ...linkProps } = props;
  return <Link to={href} {...linkProps}>{children}</Link>;
};

export default class ReactRouterNestedNavigation extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    stack: [[]],
    parentRoute: null,
  }

  // eslint-disable-next-line react/sort-comp
  menus = [
    <Route path="/">
      <div>
        <AkNavigationItem href="/movies" linkComponent={RouterLinkComponent} icon={<DashboardIcon label="Dashboard" />} text="Movies" />
        <AkNavigationItem href="/albums" linkComponent={RouterLinkComponent} icon={<SettingsIcon label="Settings" />} text="Albums" />
        <AkNavigationItem href="/about" linkComponent={RouterLinkComponent} icon={<TrayIcon label="Projects" />} text="About" />
      </div>
    </Route>,
    <Route path="/movies">
      <div>
        <AkNavigationItem href="/movies/matrix" linkComponent={RouterLinkComponent} icon={<DashboardIcon label="Dashboard" />} text="The Matrix" />
        <AkNavigationItem href="/movies/lotr" linkComponent={RouterLinkComponent} icon={<DashboardIcon label="Dashboard" />} text="Lord of the Rings" />
      </div>
    </Route>,
    <Route path="/albums">
      <div>
        <AkNavigationItem href="/albums/coexist" linkComponent={RouterLinkComponent} icon={<SettingsIcon label="Settings" />} text="The xx – coexist" />
        <AkNavigationItem href="/albums/anawesomewave" linkComponent={RouterLinkComponent} icon={<SettingsIcon label="Settings" />} text="Alt J – an awesome wave" />
        <AkNavigationItem href="/albums/more" linkComponent={RouterLinkComponent} icon={<SettingsIcon label="Settings" />} text="More Albums" />
      </div>
    </Route>,
    <Route path="/albums/more">
      <div>
        <AkNavigationItem href="/albums/more/lonelyheartsclub" linkComponent={RouterLinkComponent} icon={<SettingsIcon label="Settings" />} text="The Beatles – Sgt. Peppers Lonely Hearts Club Band" />
        <AkNavigationItem href="/albums/more/lonerism" linkComponent={RouterLinkComponent} icon={<SettingsIcon label="Settings" />} text="Tame Impala – Lonerism" />
      </div>
    </Route>,
  ]

  componentWillMount() {
    this.resolveRoutes(this.context.router.route.location.pathname);
  }

  componentWillReceiveProps(newProps, newContext) {
    this.resolveRoutes(newContext.router.route.location.pathname);
  }

  resolveRoutes(pathname) {
    const stack = this.menus
      .filter(menu => matchPath(pathname, menu.props))
      .map(menu => [
        React.cloneElement(menu, { key: menu.props.path }),
      ]);

    const parentRoute = stack.length > 1 ? stack[stack.length - 2][0].props.path : null;

    this.setState({ parentRoute, stack });
  }

  getContainerHeaderComponent = () => (
    <div>
      <AkContainerTitle
        href="/"
        icon={<img alt="nucleus" src={nucleusLogo} />}
        linkComponent={RouterLinkComponent}
        subText="Is the king"
        text="AtlasKit"
      />
      {(this.state.parentRoute ? (
        <AkNavigationItem
          href={this.state.parentRoute}
          icon={<ArrowLeftIcon label="Back" />}
          linkComponent={RouterLinkComponent}
          text="Back"
        />
      ) : (
        null
      ))}
    </div>
  )

  render() {
    return (
      <HtmlPage content={getPageContent()}>
        <BasicNavigation
          containerHeaderComponent={this.getContainerHeaderComponent}
        >
          <AkContainerNavigationNested stack={this.state.stack} />
        </BasicNavigation>
      </HtmlPage>
    );
  }
}
