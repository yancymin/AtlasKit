import styled from 'styled-components';
import {
  akColorN30,
  akColorN100,
  akColorN500,
  akColorN900
} from '@atlaskit/util-shared-styles';

export interface MentionItemStyleProps {
  selected?: boolean;
}

export interface AvatarSectionStyleProps {
  restricted?: boolean;
}

export interface NameSectionStyleProps {
  restricted?: boolean;
}

export interface InfoSectionStyleProps {
  restricted?: boolean;
}

// tslint:disable:next-line variable-name
export const RowStyle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  padding: 8px 16px;
  text-overflow: ellipsis;
  vertical-align: middle;
`;

// tslint:disable:next-line variable-name
export const AvatarStyle = styled.span`
  position: relative;
  flex: initial;
  margin-top: -2px;
  opacity: ${(props: AvatarSectionStyleProps) => props.restricted ? '0.5' : 'inherit'};
`;

// tslint:disable:next-line variable-name
export const NameSectionStyle = styled.div`
  flex: 1;
  min-width: 0;
  margin-left: 16px;
  opacity: ${(props: NameSectionStyleProps) => props.restricted ? '0.5' : 'inherit'};
`;

// tslint:disable:next-line variable-name
export const FullNameStyle = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${akColorN900};
`;

// tslint:disable:next-line variable-name
export const NicknameStyle = styled.span`
  color: ${akColorN100};
  font-size: 12px;

  margin-top: 2px;

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// tslint:disable:next-line variable-name
export const InfoSectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  opacity: ${(props: InfoSectionStyleProps) => props.restricted ? '0.5' : 'inherit'};

  & {
    /* Lozenge */
    & > span {
      margin-bottom: 2px;
    }
  }
`;

// tslint:disable:next-line variable-name
export const TimeStyle = styled.div`
  margin-left: 20px;
  flex: none;
  color: ${akColorN100};
  font-size: 12px;
`;

// tslint:disable:next-line variable-name
export const MentionItemStyle = styled.div`
  background-color: ${(props: MentionItemStyleProps) => props.selected ? akColorN30 : 'transparent'};
  display: block;
  overflow: hidden;
  list-style-type: none;
  height: 48px;
  line-height: 1.2;
  cursor: pointer;
`;

// tslint:disable:next-line variable-name
export const AccessSectionStyle = styled.div`
  padding-left: 5px;
  color: ${akColorN500}
`;
