import styled from 'styled-components';
import Button from '@atlaskit/button';

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const ButtonActive = styled(Button)`
  color: #000 !important; /* @todo: until Button supports not faded disabled state */
  font-weight: bold;
`;

export const Ellipsis = styled.span`
  display: flex;
  padding: 0 10px;
  text-align: center;
  align-items: center;
`;
