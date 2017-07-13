import React from 'react';
import styled from 'styled-components';
import { akElevationMixins } from '@atlaskit/util-shared-styles';

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

// the below adaptation may be written statically like ${akElevationMixins.e100}
const Box = styled.div`
  ${({ elevation }) => akElevationMixins[elevation]}
  background-color: white;
  border-radius: 3px;
  font-size: 1.6em;
  font-weight: 500;
  margin-bottom: 1em;
  min-width: 240px;
  padding: 0.6em 1em;
  text-align: center;
`;

export default (
  <Wrapper>
    <Box elevation="e100">Cards on a board</Box>
    <Box elevation="e200">Inline dialogs</Box>
    <Box elevation="e500">Modals</Box>
    <Box elevation="e600">Flag messages</Box>
  </Wrapper>
);
