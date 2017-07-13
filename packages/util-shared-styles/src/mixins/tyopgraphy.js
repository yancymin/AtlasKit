import { css } from 'styled-components';
import { akColorN300, akFontSizeDefault, akGridSizeUnitless } from '../index';

const fontSizeDefault = parseInt(akFontSizeDefault, 10);
const gridSize = parseInt(akGridSizeUnitless, 10);

const baseHeading = (fontSize, lineHeight) => css`
  font-size: ${fontSize / fontSizeDefault}em;
  font-style: inherit;
  line-height: ${lineHeight / fontSize};
`;

const h900 = css`
  ${baseHeading(35, 40)}
  font-weight: 500;
  letter-spacing: -0.01em;
  margin-top: ${gridSize * 6.5}px;
`;

const h800 = css`
  ${baseHeading(29, 32)}
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-top: ${gridSize * 5}px;
`;

const h700 = css`
  ${baseHeading(24, 28)}
  font-weight: 500;
  letter-spacing: -0.01em;
  margin-top: ${gridSize * 5}px;
`;

const h600 = css`
  ${baseHeading(20, 24)}
  font-weight: 500;
  letter-spacing: -0.008em;
  margin-top: ${gridSize * 3.5}px;
`;

const h500 = css`
  ${baseHeading(16, 20)}
  font-weight: 600;
  letter-spacing: -0.006em;
  margin-top: ${gridSize * 3}px;
`;

const h400 = css`
  ${baseHeading(14, 16)}
  font-weight: 600;
  letter-spacing: -0.003em;
  margin-top: ${gridSize * 2}px;
`;

const h300 = css`
  ${baseHeading(12, 16)}
  color: ${akColorN300};
  font-weight: 600;
  margin-top: ${gridSize * 2.5}px;
  text-transform: uppercase;
`;

const h200 = css`
  ${baseHeading(12, 16)}
  color: ${akColorN300};
  font-weight: 600;
  margin-top: ${gridSize * 2}px;
`;

const h100 = css`
  ${baseHeading(12, 16)}
  color: ${akColorN300};
  font-weight: normal;
  margin-top: ${gridSize * 2}px;
`;

export default {
  h100,
  h200,
  h300,
  h400,
  h500,
  h600,
  h700,
  h800,
  h900,
};
