import { SyntheticEvent } from 'react';

export interface HighlightDetail {
  start: number;
  end: number;
}

export interface Highlight {
  name: HighlightDetail[];
  mentionName: HighlightDetail[];
  nickname: HighlightDetail[];
}

export interface Presence {
  time?: string;
  status?: string;
}

export interface MentionDescription {
  id: string;
  avatarUrl?: string;
  name?: string;
  mentionName?: string;
  nickname?: string;
  highlight?: Highlight;
  lozenge?: string;
  presence?: Presence;
  accessLevel?: string;
  weight?: number;
  userType?: string;
}

export interface OnMentionEvent {
  (mention: MentionDescription, event?: SyntheticEvent<any>): void;
}

export enum MentionType {
  SELF,
  RESTRICTED,
  DEFAULT
}

enum UserAccessLevel {
  NONE,
  SITE,
  APPLICATION,
  CONTAINER,
}

enum UserType {
  DEFAULT,
  SPECIAL
}

export function isRestricted(accessLevel) {
  return accessLevel && accessLevel !== UserAccessLevel[UserAccessLevel.CONTAINER];
}

export function isSpecialMention(mention: MentionDescription) {
  return mention.userType && mention.userType === UserType[UserType.SPECIAL];
}
