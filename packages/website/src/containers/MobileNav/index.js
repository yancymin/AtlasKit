import React, { PureComponent } from 'react';
import styled from 'styled-components';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import {
  akColorN0,
  akColorN30,
  akColorN800,

  akGridSize,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import { Link } from 'react-router-dom';
import Button from '@atlaskit/button';
import MenuIcon from '@atlaskit/icon/glyph/menu';

import Navigation from './Navigation';
import atlasKitLogo from '../../images/atlaskit-logo.png';

export const NAVBAR_HEIGHT = `${akGridSizeUnitless * 7}px`;

export default class MobileNavigation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      navIsOpen: false,
    };
  }

  toggleNav = (e) => {
    e.preventDefault();
    const { navIsOpen } = this.state;
    this.setState({
      navIsOpen: !navIsOpen,
    });
  }

  closeNav = () => {
    window.scrollTo(0, 0);
    this.setState({
      navIsOpen: false,
    });
  }

  render() {
    const { navIsOpen } = this.state;

    return (
      <Wrapper>
        <Navbar>
          <NavbarLink to="/">
            <NavbarBrand alt="AtlasKit Logo" src={atlasKitLogo} />
            <NavbarTitle>AtlasKit</NavbarTitle>
          </NavbarLink>
          <Button
            onClick={this.toggleNav}
            isSelected={navIsOpen}
            iconBefore={(
              <Hamburger>
                <MenuIcon
                  label={navIsOpen ? 'Close Navigation' : 'Open Navigation'}
                  size="small"
                  style={{ marginLeft: 10, marginRight: 10 }}
                />
              </Hamburger>
            )}
          />
        </Navbar>
        <TransitionGroup>
          {navIsOpen ? <Navigation closeNav={this.closeNav} /> : null}
        </TransitionGroup>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background-color: ${akColorN0};
  border-bottom: 1px solid ${akColorN30};
`;

const Navbar = styled.div`
  align-items: center;
  box-sizing: border-box;
  color: ${akColorN800};
  display: flex;
  height: ${NAVBAR_HEIGHT};
  justify-content: space-between;
  line-height: 1;
  padding-left: ${akGridSizeUnitless * 2}px;
  padding-right: ${akGridSizeUnitless * 2}px;
`;

const NavbarLink = styled(Link)`
  align-items: center;
  color: inherit !important;
  display: flex;

  &:hover {
    text-decoration: none;
  }
`;

const NavbarBrand = styled.img`
  border-radius: 4px;
  display: inline-block;
  height: 40px;
  width: 40px;
`;

const NavbarTitle = styled.span`
  display: inline-block;
  font-size: 20px;
  margin: 10px;
`;
const Hamburger = styled.div`
  margin: 0 ${akGridSize};
`;
