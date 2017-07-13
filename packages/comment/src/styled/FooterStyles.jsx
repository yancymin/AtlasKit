import styled from 'styled-components';
import { akColorN500, akColorY500, akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { actionsPadding } from './constants';

const ActionsItem = styled.div`
  display: flex;
  &+&::before {
    color: ${akColorN500};
    content: "·";
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    width: ${actionsPadding}px;
  }
`;

const ErrorIcon = styled.span`
  color: ${akColorY500};
  padding-right: ${akGridSizeUnitless}px;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: ${akGridSizeUnitless * 0.75}px;
`;

export { ActionsContainer, ActionsItem, ErrorIcon };
