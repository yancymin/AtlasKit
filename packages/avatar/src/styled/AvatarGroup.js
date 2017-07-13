import styled from 'styled-components';
import { akGridSize, akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { BORDER_WIDTH } from './constants';

const gutterUnitless = akGridSizeUnitless / 2;
const gutter = `${gutterUnitless}px`;

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  line-height: 1;
  margin-left: -${gutter};
  margin-right: -${gutter};

  > * {
    margin-bottom: ${akGridSize};
    padding-left: ${gutter};
    padding-right: ${gutter};
  }
`;

export const Stack = styled.div`
  display: flex;
  line-height: 1;

  > * {
    margin-right: -${props => (BORDER_WIDTH[props.size] * 2) + gutterUnitless}px;
  }
`;
