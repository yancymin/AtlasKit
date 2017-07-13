/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akColorN20 } from '@atlaskit/util-shared-styles';
import { Root, cardShadow, centerSelf, borderRadius, size } from '../../styles';
import {BreakpointSizeValue} from '../../utils/breakpointSize';

export interface CardProps {
  cardSize: BreakpointSizeValue;
}

const cardSize = ({cardSize}: CardProps) => {
  switch (cardSize) {
    case 'small':
      return `
        .title {
          font-size: 12px;
        }
        .file-type-icon span {
          // We need to use important here since we can't use the dimensions provided by the Icon component
          ${size('14px !important')}
        }
      `;

    case 'medium':
      return `
        .title {
          font-size: 14px;
        }
        .file-type-icon span {
          ${size('16px !important')}
        }
      `;

    case 'large':
      return `
        .overlay {
          padding: 24px;
        }
        .title {
          font-size: 14px;
        }
        .file-size {
          font-size: 14px;
        }
        .file-type-icon span {
          ${size('18px !important')}
        }
      `;

    case 'xlarge':
      return `
        border-radius: 2px;

        .title {
          font-size: 16px;
        }

        .file-size {
          font-size: 14px;
        }

        .wrapper, .img-wrapper {
          border-radius: 2px;
        }

        .overlay {
          padding: 24px;
        }

        .file-type-icon span {
          ${size('18px !important')}
        }
      `;
  }
};

export const Card = styled(Root)`
  ${cardShadow}
  ${cardSize}
  ${borderRadius}
  background: #fff;
  display: table;
  cursor: pointer;
  line-height: normal;
  position: relative;

  .wrapper {
    ${borderRadius}
    background: ${akColorN20};
    display: block;
    height: inherit;
    position: relative;

    .img-wrapper{
      ${borderRadius}
      position: relative;
      width: inherit;
      height: inherit;
      display: block;

      img {
        ${centerSelf}
        max-height: 100%;
        max-width: 100%;
        display: block;
      }
    }
  }
`;
