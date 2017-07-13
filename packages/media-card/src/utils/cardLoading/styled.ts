/* tslint:disable:variable-name */
import styled, { keyframes } from 'styled-components';
import {center, size} from '../../styles';
import { akColorN20 } from '@atlaskit/util-shared-styles';

export const blinkLoadingAnimation = keyframes`
  0%{
    opacity: 1;
  }

  50%{
    opacity: 0.6;
  }

  100%{
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  ${center}
  ${size()}
  background: ${akColorN20};
  color: #cfd4db;
  border-radius: inherit;

  > span {
    animation: ${blinkLoadingAnimation} .8s infinite;
  }
`;
