/* eslint-disable react/prop-types */

import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import {
  AkContainerItem as NavItem,
  AkContainerItemGroup as NavItemGroup,
} from '@atlaskit/navigation';

import ComponentIcon from '@atlaskit/icon/glyph/component';
import MediaServicesZipIcon from '@atlaskit/icon/glyph/media-services/zip';
import PackageIcon from '@atlaskit/icon/glyph/bitbucket/repos';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

import packages from '../../../data';

const componentKeys = Object.keys(packages);

const ComponentNavItem = withRouter(({ componentKey, location, destination }) => {
  const component = packages[componentKey];
  const url = `${destination}/${componentKey}`;
  const isSelected = location.pathname === url;

  return (
    <Link to={url} key={componentKey}>
      <NavItem
        icon={<PackageIcon size="small" label={`${component.name} icon`} />}
        text={component.name}
        isSelected={isSelected}
      />
    </Link>
  );
});

const NavList = ({ title, filterMethod, destination }) => (
  <NavItemGroup title={title}>
    {componentKeys
      .filter(filterMethod)
      .map(key => (
        <ComponentNavItem
          componentKey={key}
          key={key}
          destination={destination}
        />
    ))}
  </NavItemGroup>
);

const PackagesNav = ({
  backIcon,
  router,
  pathname,
  filterMethod,
  icon,
  destination,
  title,
  navItemText,
}) => (
  <div style={{ paddingBottom: akGridSizeUnitless * 3 }}>
    <NavItem
      icon={backIcon}
      onClick={() => router.history.push('/')}
      text="Back"
    />
    <NavItem
      icon={icon}
      onClick={() => router.history.push(destination)}
      text={navItemText}
      isSelected={pathname === destination}
    />
    <NavList title={title} filterMethod={filterMethod} destination={destination} />
  </div>
);

const ComponentNav = ({ backIcon, router, pathname }) => {
  const componentVariables = {
    filterMethod: k => k,
    icon: <ComponentIcon label="Components icon" />,
    destination: '/components',
    title: 'Components',
    navItemText: 'All components',
  };

  const patternVariables = {
    filterMethod: key => packages[key].isPattern,
    icon: <MediaServicesZipIcon label="Patterns icon" />,
    destination: '/patterns',
    title: 'Patterns',
    navItemText: 'All patterns',

  };
  const variables = pathname.includes('/patterns') ? patternVariables : componentVariables;

  return PackagesNav({ backIcon, router, pathname, ...variables });
};

export default ComponentNav;
