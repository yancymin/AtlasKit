import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { akColorB50, akColorB400, akColorN600, akGridSize, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

import ComponentIcon from '@atlaskit/icon/glyph/component';
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import OverviewIcon from '@atlaskit/icon/glyph/overview';
import PageIcon from '@atlaskit/icon/glyph/page';
// import NewWindowIcon from '@atlaskit/icon/glyph/add-item';
import NewWindowIcon from '@atlaskit/icon/glyph/open';

function getInitialState() {
  return {
    isEntering: false,
    isLeaving: false,
  };
}

export default class Navigation extends PureComponent {
  static propTypes = {
    closeNav: PropTypes.func.isRequired,
  }

  state = getInitialState()

  componentWillEnter(done) {
    this.setState({ isEntering: true }, done);
  }
  componentWillLeave(done) {
    this.setState({
      animationEndCallback: done,
      isLeaving: true,
    });
  }

  handleAnimationEnd = () => {
    const { animationEndCallback } = this.state;

    if (animationEndCallback) animationEndCallback();

    this.setState(getInitialState);
  }

  render() {
    const { closeNav } = this.props;
    const { isLeaving } = this.state;

    const NavLink = props => <NavItem onClick={closeNav} {...props} />;

    return (
      <NavContainer leaving={isLeaving} onAnimationEnd={this.handleAnimationEnd}>
        <NavLink to="/">
          <NavIcon>
            <HomeFilledIcon label="Welcome icon" />
          </NavIcon>
          <NavLabel>Welcome</NavLabel>
        </NavLink>
        <NavLink to="/install">
          <NavIcon>
            <OverviewIcon label="Install icon" />
          </NavIcon>
          <NavLabel>Install guide</NavLabel>
        </NavLink>
        <NavLink to="/components">
          <NavIcon>
            <ComponentIcon label="Components icon" />
          </NavIcon>
          <NavLabel>All Components</NavLabel>
        </NavLink>
        <NavLink to="http://go.atlassian.com/reduced-ui-pack" target="_new">
          <NavIcon>
            <PageIcon label="More icon" />
          </NavIcon>
          <NavLabel>Reduced UI pack</NavLabel>
          <NavTargetIndicator>
            <NewWindowIcon label="Link opens in a new window" />
          </NavTargetIndicator>
        </NavLink>
      </NavContainer>
    );
  }
}

const approximateMenuHeight = '200px';

const enter = keyframes`
  from { max-height: 0; opacity: 0; }
  to { max-height: ${approximateMenuHeight}; opacity: 1; }
`;
const leave = keyframes`
  from { max-height: ${approximateMenuHeight}; opacity: 1; }
  to { max-height: 0; opacity: 0; }
`;

const NavContainer = styled.div`
  animation: ${props => (props.leaving ? leave : enter)} 300ms cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
`;
const NavItem = styled(Link)`
  align-items: center;
  color: ${akColorN600};
  display: flex;
  padding: ${akGridSize} ${akGridSizeUnitless * 2}px;

  &:active, &:focus {
    background-color: ${akColorB50};
    text-decoration: none;
  }
`;
const NavIcon = styled.span`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 30px;
  min-width: 40px;
`;
const NavLabel = styled.span`
  margin-left: 10px;
`;
const NavTargetIndicator = styled.span`
  margin-left: 10px;
  color: ${akColorB400};
`;
