import styled from 'styled-components';
import {
  akColorN0,
  akColorN50A,
  akColorN60A,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';

const ButtonWrapper = styled.div`
  background-color: ${akColorN0};
  border-radius: ${(akGridSizeUnitless / 2) - 1}px;
  box-shadow: 0 ${akGridSizeUnitless / 2}px ${akGridSizeUnitless}px -${akGridSizeUnitless / 4}px ${akColorN50A},
              0 0 1px ${akColorN60A};
  box-sizing: border-box;
  z-index: 200;

  &:last-child {
    margin-left: ${akGridSizeUnitless / 2}px;
  }
`;

ButtonWrapper.displayName = 'ButtonWrapper';

export default ButtonWrapper;
