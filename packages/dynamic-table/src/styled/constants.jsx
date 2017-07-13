import { css } from 'styled-components';
import { akColorN40, akColorN60, akColorN300, akGridSize } from '@atlaskit/util-shared-styles';

import { ASC, DESC } from '../internal/constants';

export const gridUnit = parseInt(akGridSize, 10);
export const baselineUnit = gridUnit / 2;

export const truncateStyle = ({ width, isFixedSize, shouldTruncate }) => css`
  ${width ? css`width: ${width}%;` : ''}
  ${isFixedSize ? css`overflow: hidden;` : ''};
  ${isFixedSize && shouldTruncate ? css`
    text-overflow: ellipsis;
    white-space: nowrap;
  ` : ''}
`;

export const onClickStyle = ({ onClick }) => onClick && css`
  &:hover {
    cursor: pointer;
  }
`;

export const arrowsStyle = ({ isSortable, sortOrder }) => {
  if (!isSortable) return '';

  const pseudoBase = css`
    border: 3px solid transparent;
    display: block;
    height: 0;
    position: absolute;
    right: -${gridUnit}px;
    width: 0;
  `;

  return css`
    & > span {
      position: relative;
        &:before {
          ${pseudoBase};
            border-bottom: 3px solid ${sortOrder === ASC ? akColorN300 : akColorN40};
            bottom: 8px;
            content: ' ';
          };
        &:after {
          ${pseudoBase};
          border-top: 3px solid ${sortOrder === DESC ? akColorN300 : akColorN40};
          bottom: 0;
          content: ' ';
        };
      }

      &:hover > span {
        &:before {
          border-bottom: 3px solid ${sortOrder === ASC ? akColorN300 : akColorN60};
        }
        &:after {
          border-top: 3px solid ${sortOrder === DESC ? akColorN300 : akColorN60};
        }
      }
    `;
};

export const cellStyle = css`
    border: none;
    padding: ${baselineUnit}px ${gridUnit}px;
    text-align: left;
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }
`;
