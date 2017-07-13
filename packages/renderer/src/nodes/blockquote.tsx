import {
  akColorN40,
  akColorN300,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

export default styled.blockquote`
  margin: ${akGridSizeUnitless * 1.5}px 0 0 0;
  color: ${akColorN300};
  border-left: 2px solid ${akColorN40};
  padding-left: ${akGridSizeUnitless * 2}px;

  [dir="rtl"] & {
    padding-left: 0;
    padding-right: ${akGridSizeUnitless * 2}px;
  }

  &:first-child {
    margin-top: 0;
  }

  &::before {
    content: "";
  }

  &::after {
    content: "";
  }

  & > :last-child {
    display: inline-block;
  }
`;
