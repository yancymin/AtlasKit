import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

const Page = ({ children, navigation, navigationWidth }) => (
  <ThemeProvider theme={{}}>
    <Wrapper>
      <Navigation>
        {navigation}
      </Navigation>
      <Content navigationWidth={navigationWidth}>
        {children}
      </Content>
    </Wrapper>
  </ThemeProvider>
);
Page.propTypes = {
  children: PropTypes.node,
  navigation: PropTypes.node,
  navigationWidth: PropTypes.number,
};
Page.defaultProps = {
  navigationWidth: 0,
};

const Wrapper = styled.div`
  display: flex;
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  min-height: 100%;
  width: 100%;
`;
const Navigation = styled.div`
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 0;
  max-height: 100%;
  position: relative;
  z-index: 2;
`;
const Content = styled.div`
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 0;
  position: relative;
  width: calc(100% - ${props => props.navigationWidth}px);
  z-index: 1;
`;

export default Page;
