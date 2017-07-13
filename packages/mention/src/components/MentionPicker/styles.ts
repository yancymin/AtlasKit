import styled from 'styled-components';
import { akColorN100 } from '@atlaskit/util-shared-styles';

import {
  mentionListWidth,
  noDialogContainerBorderColor,
  noDialogContainerBorderRadius,
  noDialogContainerBoxShadow,
} from '../../shared-styles';

export interface MentionPickerStyleProps {
  visible?: boolean | string;
}

// tslint:disable:next-line variable-name
export const MentionPickerStyle = styled.div`
  display: ${(props: MentionPickerStyleProps) => props.visible ? 'block' : 'none'};
`;

// tslint:disable:next-line variable-name
export const MentionPickerInfoStyle = styled.div`
  background: #fff;
  color: ${akColorN100};
  border: 1px solid ${noDialogContainerBorderColor};
  border-radius: ${noDialogContainerBorderRadius};
  box-shadow: ${noDialogContainerBoxShadow}
  display: block;
  width: ${mentionListWidth};
  white-space: nowrap;

  & {
    p {
      margin: 0;
      overflow: hidden;
      padding: 9px;
      text-overflow: ellipsis;
    }
  }
`;
