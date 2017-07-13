import React from 'react';
import styled from 'styled-components';
import { akTypographyMixins } from '@atlaskit/util-shared-styles';

const Header = styled.div`
  align-items: baseline;
  display: flex;
`;

const LinkItem = styled.li`
  ${akTypographyMixins.h600}
  display: inline-block;
  list-style-type: none;
  margin-right: 16px;
`;

export default (
  <Header>
    <h1>Documentation</h1>
    <ul>
      <LinkItem><a href="#rest-api">REST API</a></LinkItem>
      <LinkItem><a href="#modules">Modules</a></LinkItem>
      <LinkItem><a href="#javascript-api">JavaScript API</a></LinkItem>
    </ul>
  </Header>
);
