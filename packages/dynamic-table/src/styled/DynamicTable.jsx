import styled, { css } from 'styled-components';
import { gridUnit, baselineUnit } from './constants';

export const Table = styled.table`
  ${({ isFixedSize }) => (isFixedSize && css`table-layout: fixed;`)};
  border-collapse: collapse;
  width: 100%;
`;

export const Caption = styled.caption`
  font-size: 1.42857143em;
  font-style: inherit;
  font-weight: 500;
  letter-spacing: -0.008em;
  line-height: 1.2;
  margin-bottom: ${gridUnit}px;
  margin-top: ${baselineUnit * 7}px;
  text-align: left;
`;
