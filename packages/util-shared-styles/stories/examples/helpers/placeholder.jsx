import React from 'react';
import styled, { css } from 'styled-components';
import { akHelperMixins } from '../../..';

const placeholderStyles = css`
  color: red;
`;

const Field = styled.input`
  ${akHelperMixins.placeholder(placeholderStyles)}
`;

export default (
  <div>
    <Field placeholder="Red placeholder" />
  </div>
);
