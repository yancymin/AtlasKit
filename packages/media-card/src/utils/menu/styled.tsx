/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akColorN500 } from '@atlaskit/util-shared-styles';
import { Root, borderRadius, size, center } from '../../styles';

export const Wrapper = styled(Root)`
  display: flex;
  position: relative;
`;

// We need to set a explicit value to the Icon (svg) wrapper since otherwise will grow up too much
export const MeatBallsWrapper = styled.div`
  width: 23px;
`;

export const DeleteBtn = styled.div`
  ${center}
  ${borderRadius}
  ${size(26)}
  color: ${akColorN500};

  &:hover {
    cursor: pointer;
    background-color: rgba(9, 30, 66, 0.06);
  }
`;
