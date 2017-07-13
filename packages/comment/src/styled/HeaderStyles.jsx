import styled from 'styled-components';
import { akColorN100A, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const BulletSpacer = styled.span`
  padding-right: ${akGridSizeUnitless / 2}px;
`;

const Restricted = styled.div`
  color: ${akColorN100A};
  display: flex;
`;

const RestrictedIconWrapper = styled.span`
  margin-right: ${akGridSizeUnitless / 2}px;
`;
RestrictedIconWrapper.displayName = 'RestrictedIconWrapper';

const TopItem = styled.div`
  display: inline-block;
  &:first-child {
    margin-left: 0;
    [dir="rtl"] & {
      margin-right: 0;
    }
  }
  margin-left: ${akGridSizeUnitless}px;

  [dir="rtl"] & {
    margin-left: 0;
    margin-right: ${akGridSizeUnitless}px;
  }
`;

const TopItemsContainer = styled.div`
  display: flex;
`;

export { BulletSpacer, Restricted, RestrictedIconWrapper, TopItem, TopItemsContainer };
