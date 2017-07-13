/* tslint:disable:variable-name */
import styled from 'styled-components';
import {akGridSizeUnitless} from '@atlaskit/util-shared-styles';

const paddingSize = akGridSizeUnitless * 2;

export interface WrapperProps {
  contentMaxWidth: number;
}

export const Wrapper = styled.div`
  box-sizing: border-box;
  max-width: ${({contentMaxWidth}: WrapperProps) => contentMaxWidth}px;
  padding: 0 ${paddingSize}px 12px ${paddingSize}px;
  line-height: ${akGridSizeUnitless * 2}px;
`;
