/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akColorN30 } from '@atlaskit/util-shared-styles';

export const Wrapper = styled.div`
  float: right;
  display: flex;
  align-items: center;
  position: relative;
  min-height: 20px;
`;

export const Avatar = styled.img`
  height: 24px;
  width: 24px;
  border-radius: 100%;
  border: 2px solid ${akColorN30};
  position: absolute;
  background: #607d8b;
`;
