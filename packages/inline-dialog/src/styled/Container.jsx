import styled from 'styled-components';
import {
  akBorderRadius,
  akColorN0,
  akGridSizeUnitless,
  akElevationMixins,
} from '@atlaskit/util-shared-styles';

export default styled.div`
  background: ${akColorN0};
  border-radius: ${akBorderRadius};
  border: 1px solid ${akColorN0};
  box-sizing: border-box; /* so padding is taken into account for max-width */
  max-height: ${akGridSizeUnitless * 60}px;
  max-width: ${akGridSizeUnitless * 62}px;
  padding: ${akGridSizeUnitless * 3}px;

  ${akElevationMixins.e200}
`;
