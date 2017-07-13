import React from 'react';
import Button from '@atlaskit/button';
import styled from 'styled-components';

const Background = styled.div`
  background-color: rgb(37, 56, 88);
  padding: 10px;
`;

const ButtonDark = () => (
  <Background>
    <Button theme="dark">
      Default
    </Button>
    <Button appearance="primary" theme="dark">
      Primary
    </Button>
    <Button appearance="link" theme="dark">
      Link
    </Button>
    <Button appearance="subtle" theme="dark">
      Subtle
    </Button>
    <Button appearance="subtle-link" theme="dark">
      Subtle link
    </Button>
  </Background>
);

export default ButtonDark;
