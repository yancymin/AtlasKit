import styled from 'styled-components';
import {
  akBorderRadius,
  akGridSize,
  akGridSizeUnitless,
  akElevationMixins,
} from '@atlaskit/util-shared-styles';
import { focusRingMixin } from './constants';
import { getAppearance } from '../shared-variables';
import { getFocusRingStyle } from './CustomFocusButton';

const getBackgroundColor = ({ appearance }) => getAppearance(appearance).backgroundColor;
const getBodyColor = ({ appearance }) => getAppearance(appearance).bodyColor;
const getTitleColor = ({ appearance }) => getAppearance(appearance).titleColor;

export default styled.div`
  background-color: ${getBackgroundColor};
  border-radius: ${akBorderRadius};
  box-sizing: border-box;
  color: ${getBodyColor};
  display: flex;
  padding: ${akGridSizeUnitless * 2}px;
  width: 100%;

  ${akElevationMixins.e600}
  ${focusRingMixin}
`;

// Header
export const Header = styled.div`
  display: flex;
`;

export const Title = styled.span`
  color: ${getTitleColor};
  font-weight: 600;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DismissButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  border-radius: ${akBorderRadius};
  color: ${getBodyColor};
  cursor: pointer;
  display: flex;
  margin-left: ${akGridSize};
  padding: 0;
  white-space: nowrap;

  ${getFocusRingStyle}
`;

// Content
export const Content = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
`;

export const Expander = styled.div`
  max-height: ${({ isExpanded }) => (isExpanded ? 150 : 0)}px;
  opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0)};
  overflow: ${({ isExpanded }) => (isExpanded ? 'visible' : 'hidden')};
  transition: max-height 0.3s, opacity 0.3s;
`;

export const Description = styled.div`
  color: ${getBodyColor};
  margin-top: ${akGridSize};
`;

export const Icon = styled.div`
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: ${akGridSizeUnitless * 4}px;
`;
