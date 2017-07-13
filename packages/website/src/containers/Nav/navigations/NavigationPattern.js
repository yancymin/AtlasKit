/* eslint-disable react/prop-types */

import React from 'react';
import { Link } from 'react-router-dom';

import {
  AkContainerItem as NavItem,
  AkContainerItemGroup as NavItemGroup,
} from '@atlaskit/navigation';

import PageFilledIcon from '@atlaskit/icon/glyph/page-filled';
import DetailViewIcon from '@atlaskit/icon/glyph/detail-view';
import PackageIcon from '@atlaskit/icon/glyph/bitbucket/repos';

import packages from '../../../data';

const NavigationNav = ({ pathname, backIcon, router }) => (
  <div>
    <NavItem
      icon={backIcon}
      onClick={() => router.history.push('/patterns')}
      text="Back"
    />
    <NavItemGroup>
      <Link to="/patterns/navigation">
        <NavItem
          icon={<PageFilledIcon label="Welcome icon" />}
          text="Usage"
          isSelected={pathname === '/patterns/navigation'}
        />
      </Link>
      <Link to="/patterns/navigation/examples">
        <NavItem
          icon={<DetailViewIcon label="Welcome icon" />}
          text="Examples"
          isSelected={pathname === '/patterns/navigation/examples'}
        />
      </Link>
    </NavItemGroup>
    <NavItemGroup title="components">
      {packages.navigation.props.map(component => (
        <Link to={`/patterns/navigation/components/${component.name}`} key={component.name}>
          <NavItem
            icon={<PackageIcon size="small" label={`${component.name} icon`} />}
            text={component.name}
            isSelected={pathname === `/patterns/navigation/components/${component.name}`}
          />
        </Link>
      ))}
    </NavItemGroup>
  </div>
);

export default NavigationNav;
