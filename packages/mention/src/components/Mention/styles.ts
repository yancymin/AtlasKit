import styled from 'styled-components';
import {
  akColorB400,
  akColorN0,
  akColorN20,
  akColorN30,
  akColorN500,
} from '@atlaskit/util-shared-styles';
import { MentionType } from '../../types';

export interface MentionStyleProps {
  mentionType: MentionType;
}

const mentionStyle = {};
mentionStyle[MentionType.SELF] = {
  background: akColorB400,
  border: akColorB400,
  text: akColorN20,
};
mentionStyle[MentionType.RESTRICTED] = {
  background: akColorN0,
  border: akColorN500,
  text: akColorN500,
};
mentionStyle[MentionType.DEFAULT] = {
  background: akColorN30,
  border: akColorN30,
  text: akColorN500,
};


// tslint:disable-next-line:variable-name
export const MentionStyle = styled.span`${(props: MentionStyleProps) => `
  background: ${mentionStyle[props.mentionType].background};
  border: 1px solid ${mentionStyle[props.mentionType].border};
  border-radius: 20px;
  color: ${mentionStyle[props.mentionType].text};
  cursor: pointer;
  padding: 0 4px 2px 3px;
  white-space: nowrap;
`}`;

// tslint:disable-next-line:variable-name
export const MentionContainer = styled.span`
  display: inline-block;
  white-space: nowrap;
`;
