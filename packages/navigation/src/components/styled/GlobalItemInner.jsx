import styled from 'styled-components';
import { globalItemSizes, gridSize } from '../../shared-variables';
import { getProvided } from '../../theme/util';

const GlobalItemInner = styled.div`
  color: ${({ theme }) => getProvided(theme).text};
  background-color: ${({ theme }) => getProvided(theme).item.default.background};
  /* fill controls the secondary color used by some icons like the help icon */
  fill: ${({ theme }) => getProvided(theme).background.primary};
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  width: ${({ size }) => globalItemSizes[size]}px;
  height: ${({ size }) => globalItemSizes[size]}px;
  justify-content: center;
  margin-top: ${({ size }) => (size === 'small' ? gridSize : 0)}px;

  &:hover {
    background-color: ${({ theme }) => getProvided(theme).item.hover.background};
  }

  &:focus {
    background-color: ${({ theme }) => getProvided(theme).item.focus.background};
  }

  &:active {
    background-color: ${({ theme }) => getProvided(theme).item.active.background};
  }
`;

GlobalItemInner.displayName = 'GlobalItemInner';
export default GlobalItemInner;
