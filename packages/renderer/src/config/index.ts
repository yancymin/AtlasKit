import { EmojiProvider } from '@atlaskit/emoji';
import { MentionProvider } from '@atlaskit/mention';
import { CardEvent } from '@atlaskit/media-card';
import { MediaProvider } from '@atlaskit/media-core';
import { SyntheticEvent } from 'react';
import { AppCardAction } from '../nodes/applicationCard';

export type CardEventClickHandler = (result: CardEvent) => void;

export interface ServicesConfig {
  getEmojiProvider?: () => Promise<EmojiProvider>;
  getMentionProvider?: () => Promise<MentionProvider>;
  getMediaProvider?: () => Promise<MediaProvider>;
}

export type MentionEventHandler = (mentionId: string, text: string, event?: SyntheticEvent<HTMLSpanElement>) => void;

export interface EventHandlers {
  mention?: {
    onClick?: MentionEventHandler;
    onMouseEnter?: MentionEventHandler;
    onMouseLeave?: MentionEventHandler;
  };
  media?: {
    onClick?: CardEventClickHandler;
  };
  applicationCard?: {
    onClick?: (url?: string) => void;
    onActionClick?: (action: AppCardAction) => void;
  };
}
