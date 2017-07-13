/* tslint:disable:variable-name */
import styled from 'styled-components';
import {akGridSizeUnitless, akColorN0, akColorN300} from '@atlaskit/util-shared-styles';
import {center, ellipsis, size} from '../../styles';

const iconSize = akGridSizeUnitless * 2;
const marginSize = akGridSizeUnitless * 2;

export interface WrapperProps {
  contentMaxWidth: number;
}

export const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  max-width: ${({contentMaxWidth}: WrapperProps) => contentMaxWidth}px;
  flex-wrap: wrap;
  padding-left: 16px;
`;

export const Widget = styled.div`
  ${center}
  height: 18px;
  max-width: calc(100% - (2 * ${marginSize}px));
  margin-right: ${marginSize}px;
  margin-bottom: ${marginSize}px;

  /* space the widget items */
  & > * + * {
    margin-left: ${akGridSizeUnitless / 2}px;
  }

`;

export interface TitleProps {
  inverse?: boolean;
}

export const Title = styled.div`
  color: ${({inverse}: TitleProps) => inverse && akColorN0 || akColorN300};
`;

export const Text = styled.div`
  ${ellipsis('none')}
`;

export const IconImage = styled.img`
  ${size(iconSize)}
`;
