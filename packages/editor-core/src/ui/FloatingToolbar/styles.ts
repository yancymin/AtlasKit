import { akEditorPopupBackground } from '../../styles';
import { akBorderRadius } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

// tslint:disable-next-line:variable-name
export const Container = styled.div`
  background: ${akEditorPopupBackground};
  border-radius: ${akBorderRadius};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
`;
