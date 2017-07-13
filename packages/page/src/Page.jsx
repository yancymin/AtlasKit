import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled, { ThemeProvider } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
`;

const NavigationAndContent = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

const BannerContainer = styled.div`
  flex: 1 0 auto;
  transition: max-height 0.25s ease-in-out;
  max-height: ${props => (props.isBannerOpen ? 52 : 0)}px; /* 52 is line height (20) + 4*grid */
  position: relative;
  width: 100%;
  z-index: 3;
`;

const Banner = styled.div`
  position: fixed;
  width: 100%;
`;

const Navigation = styled.div`
  position: relative;
  z-index: 2;
`;

const PageContent = styled.div`
  flex: 1 0 auto;
  position: relative;
  z-index: 1;
`;

export default class Page extends PureComponent {
  static displayName = 'AkPage';

  static propTypes = {
    banner: PropTypes.node,
    children: PropTypes.node,
    isBannerOpen: PropTypes.bool,
    navigation: PropTypes.node,
  }

  static defaultProps = {
    isBannerOpen: false,
  }
  render() {
    return (
      <ThemeProvider theme={{}}>
        <Wrapper>
          {this.props.banner ? (
            <BannerContainer
              aria-hidden={this.props.isBannerOpen}
              isBannerOpen={this.props.isBannerOpen}
            >
              <Banner>
                {this.props.banner}
              </Banner>
            </BannerContainer>
          ) : null}
          <NavigationAndContent>
            <Navigation>
              {this.props.navigation}
            </Navigation>
            <PageContent>
              {this.props.children}
            </PageContent>
          </NavigationAndContent>
        </Wrapper>
      </ThemeProvider>
    );
  }
}
