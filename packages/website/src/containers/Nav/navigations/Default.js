/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

import {
  AkContainerItem as NavItem,
  AkContainerItemGroup as NavItemGroup,
} from '@atlaskit/navigation';

import ComponentIcon from '@atlaskit/icon/glyph/component';
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import OverviewIcon from '@atlaskit/icon/glyph/overview';
import MediaServicesZipIcon from '@atlaskit/icon/glyph/media-services/zip';
import BitbucketIcon from '@atlaskit/icon/glyph/bitbucket';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import PageIcon from '@atlaskit/icon/glyph/page';

const externalLinks = [
  ['//bitbucket.org/atlassian/atlaskit', 'Repository', BitbucketIcon],
  ['//atlassian.design', 'Design guidelines', DashboardIcon],
];

const DefaultNav = ({ pathname, router, goToNext = () => {} }) => (
  <div>
    <NavItemGroup>
      <Link to="/">
        <NavItem
          icon={<HomeFilledIcon label="Welcome icon" />}
          text="Welcome"
          isSelected={pathname === '/'}
        />
      </Link>
    </NavItemGroup>
    <NavItemGroup title="Get Started">
      <Link to="./install">
        <NavItem
          icon={<OverviewIcon label="Install icon" />}
          text="Install guide"
        />
      </Link>
      <NavItem
        icon={<ComponentIcon label="Components icon" />}
        onClick={() => {
          router.history.push('/components');
          goToNext();
        }}
        text="Components"
      />
      <NavItem
        icon={<MediaServicesZipIcon label="Pattern icon" />}
        onClick={() => {
          router.history.push('/patterns');
          goToNext();
        }}
        text="Patterns"
      />
      <Link to="http://go.atlassian.com/reduced-ui-pack" target="_new">
        <NavItem
          icon={<PageIcon label="More icon" />}
          text="Reduced UI pack"
        />
      </Link>
    </NavItemGroup>
    <NavItemGroup title="Resources">
      {externalLinks.map(([url, title, Icon]) => (
        <a key={url} href={url} target="_new">
          <NavItem
            icon={<Icon label={title} />}
            text={title}
            isSelected={pathname === url}
          />
        </a>
      ), this)}
    </NavItemGroup>
  </div>
);

export default DefaultNav;
