/* tslint:disable:variable-name */
import styled, {css} from 'styled-components';
import {akGridSizeUnitless, akFontFamily, akColorN0, akColorN20, akColorN800, akColorN900} from '@atlaskit/util-shared-styles';
import {colorWithAlpha} from '../../utils/colorWithAlpha';

const previewWidth = 116;

export interface CardProps {
  background: string | undefined;
}

const cardColors = ({background}: CardProps) => {
  if (background) {
    return css`
      color: ${akColorN0};
      background-color: ${colorWithAlpha(akColorN900, 0.5)};
    `;
  } else {
    return css`
      color: ${akColorN800};
      background-color: ${akColorN20};
    `;
  }
};

const cardOverlay = ({background}: CardProps) => {
  if (background) {
    return css`
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
        border-radius: 3px;
        background-image: url(${background});
        background-size: cover;
        background-repeat: no-repeat;
      }
    `;
  } else {
    return '';
  }
};

export const Card = styled.div`

  ${cardColors}
  ${cardOverlay}

  display: inline-flex; /* make the card fit to its contents */
  flex-direction: row; /* make the preview and content side-by-side */

  min-width: 368px;
  max-width: 100%; /* make the card fit its container */

  /* allow us to position the background underlay when we have a background */
  position: relative;

  font-size: 12px;
  font-family: ${akFontFamily};

  /* TODO: reuse existing card wrapper */
  border-radius: 3px;

  /* TODO: reuse */
  box-shadow: 0 2px 4px 0 ${colorWithAlpha(akColorN900, 0.5)};

`;

export const Preview = styled.div`
  width: ${previewWidth}px; /* fixed px the design asks for */
  background-image: url(${({image}: {image: string}) => image});
  background-size: cover;
  flex-shrink: 0;
`;

export interface CardContentProps {
  hasPreview?: boolean;
}

export const CardContent = styled.div`
  flex-grow: 1;
  max-width: ${({hasPreview}: CardContentProps) => hasPreview && css`calc(100% - ${previewWidth}px)` || '100%'};
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: ${akGridSizeUnitless * 3}px;
  margin: 0 ${akGridSizeUnitless}px 12px ${akGridSizeUnitless * 2}px;
`;
