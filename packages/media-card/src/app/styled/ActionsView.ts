/* tslint:disable:variable-name */
import styled from 'styled-components';
import {akGridSizeUnitless} from '@atlaskit/util-shared-styles';
import {center} from '../../styles';

export const Actions = styled.div`
  ${center}
  font-size: 14px;
`;

export const ActionsMenu = styled.div`
  display: flex;
  margin-left: ${akGridSizeUnitless / 2}px;
`;
