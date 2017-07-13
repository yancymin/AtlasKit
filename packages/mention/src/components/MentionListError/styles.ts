import styled from 'styled-components';
import {
  akBorderRadius,
  akColorN500,
  akTypographyMixins,
} from '@atlaskit/util-shared-styles';

// tslint:disable:next-line variable-name
export const MentionListErrorStyle = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  color: ${akColorN500};
  border: 1px solid #fff;
  border-radius: ${akBorderRadius};
`;

export const GenericErrorVisualStyle = styled.div`
  height: 108px;
  margin-bottom: 8px;
  margin-top: 36px;
  width: 83px;
`;

export const MentionListErrorHeadlineStyle = styled.div`
  ${akTypographyMixins.h400};
  margin-bottom: 8px;
`;

export const MentionListAdviceStyle = styled.div`
  margin-bottom: 48px;
`;

