import React from 'react';
import styled, { css } from 'styled-components';
import { akColorR300, akColorN30, akHelperMixins } from '@atlaskit/util-shared-styles';

const Wrapper = styled.div`
  display: flex;
`;

const getFocusStyles = ({ appearance }) => {
  switch (appearance) {
    case 'custom':
      return akHelperMixins.focusRing.generate(akColorR300, '4px');
    case 'hover':
      return css`
        ${akHelperMixins.focusRing.default}

        &:hover {
          ${akHelperMixins.focusRing.none}
        }
      `;
    default:
      return akHelperMixins.focusRing.default;
  }
};

const Box = styled.button`
  background-color: white;
  border-radius: 3px;
  border: 1px solid ${akColorN30};
  font-size: 0.9rem;
  font-weight: 500;
  margin-right: 1em;
  margin-top: 1em;
  outline: 0px,
  padding: 0.6em 1em;
  text-align: center;

  ${getFocusStyles}
`;

export default (
  <Wrapper>
    <Box appearance="default">Default behaiour</Box>
    <Box appearance="hover">No glow on hover</Box>
    <Box appearance="custom">Custom styles</Box>
  </Wrapper>
);
