import React from 'react';
import styled from 'styled-components';
import { akHelperMixins } from '@atlaskit/util-shared-styles';

const text = 'Macaroon cupcake powder dragée liquorice fruitcake cookie sesame snaps cake.';
const Truncate = styled.p`
  ${akHelperMixins.text.truncate('200px')}
`;

export default (
  <div>
    <p><strong>Full String</strong></p>
    <p>{text}</p>
    <p><strong>Truncated</strong></p>
    <Truncate>{text}</Truncate>
  </div>
);
