import styled from 'styled-components';
import { akBorderRadius } from '@atlaskit/util-shared-styles';
import { scrollableMaxHeight } from '../../shared-styles';

// tslint:disable:next-line variable-name
export const ScrollableStyle = styled.div`
  display: block;
  overflowX: hidden;
  overflowY: auto;

  padding: 4px 0;
  margin: 0;

  background: white;
  maxHeight: ${scrollableMaxHeight};

  borderRadius: ${akBorderRadius};
`;
