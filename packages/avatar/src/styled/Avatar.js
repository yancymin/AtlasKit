import styled from 'styled-components';
import { BORDER_WIDTH, ICON_OFFSET, ICON_SIZES } from './constants';
import { getAvatarDimensions, getInnerStyles } from './utils';

// =================================

// OUTER WRAPPER
export default styled.div`
  ${props => getAvatarDimensions(props, { includeBorderWidth: true })}
  display: inline-block;
  position: relative;
  outline: 0;
  ${p => p.stackIndex && `z-index: ${p.stackIndex};`}
`;

// INNER WRAPPER
export const Inner = styled.div`
  ${getInnerStyles}
`;

// PRESENCE WRAPPER
const getPresenceLayout = ({ appearance, size }) => {
  const presencePosition = appearance === 'square'
    ? -(BORDER_WIDTH[size] * 2)
    : ICON_OFFSET[size];
  const presenceSize = ICON_SIZES[size];

  return `
    bottom: ${presencePosition}px;
    height: ${presenceSize}px;
    right: ${presencePosition}px;
    width: ${presenceSize}px;
  `;
};
export const PresenceWrapper = styled.span`
  ${getPresenceLayout}
  pointer-events: none;
  position: absolute;
`;

// STATUS WRAPPER
const getStatusLayout = ({ appearance, size }) => {
  const statusPosition = appearance === 'square'
    ? -(BORDER_WIDTH[size] * 2)
    : ICON_OFFSET[size];
  const statusSize = ICON_SIZES[size];

  return `
    height: ${statusSize}px;
    right: ${statusPosition}px;
    top: ${statusPosition}px;
    width: ${statusSize}px;
  `;
};
export const StatusWrapper = styled.span`
  ${getStatusLayout}
  position: absolute;
`;
