import styled from 'styled-components';
import { akColorN40 } from '@atlaskit/util-shared-styles';
import { getBorderRadius } from './utils';

// if image is loading, we hide the image so it doesn't obscure the gray loading
// block until the source image is loaded.
const getBackgroundColor = (props: { isLoading: boolean }) => (props.isLoading ? akColorN40 : 'transparent');

export const Span = styled.span`
  background-color: ${getBackgroundColor};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: ${getBorderRadius};
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
`;

export const Svg = styled.svg`
  background-color: ${getBackgroundColor};
  border-radius: ${getBorderRadius};
  height: 100%;
  width: 100%;
`;

export const HiddenImage = styled.img`
  display: none;
`;
