export { EmojiProvider, EmojiResource } from '@atlaskit/emoji';
export { MediaProvider } from '@atlaskit/media-core';
export { MentionProvider, MentionResource } from '@atlaskit/mention';

import { EmojiProvider } from '@atlaskit/emoji';
import { MediaProvider } from '@atlaskit/media-core';
import { MentionProvider } from '@atlaskit/mention';
import { PureComponent } from 'react';
import { renderNode } from './nodes';
import { ServicesConfig, EventHandlers } from './config';

export interface Props {
  document?: any;
  emojiProvider?: Promise<EmojiProvider>;
  mentionProvider?: Promise<MentionProvider>;
  mediaProvider?: Promise<MediaProvider>;
  eventHandlers?: EventHandlers;
}

export interface State {}

export default class Renderer extends PureComponent<Props, State> {
  static defaultProps = {
    document: {},
  };

  render() {
    const { props } = this;
    const { emojiProvider, mentionProvider, mediaProvider, eventHandlers } = props;

    let servicesConfig: ServicesConfig = {};

    if (emojiProvider) {
      servicesConfig.getEmojiProvider = () => emojiProvider;
    }

    if (mentionProvider) {
      servicesConfig.getMentionProvider = () => mentionProvider;
    }

    if (mediaProvider) {
      servicesConfig.getMediaProvider = () => mediaProvider;
    }

    return renderNode(this.props.document, servicesConfig, eventHandlers);
  }
}
