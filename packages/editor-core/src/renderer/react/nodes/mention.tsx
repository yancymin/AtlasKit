import * as React from 'react';
import { PureComponent } from 'react';
import { EventHandlers } from '../../../ui/Renderer';
import Mention from '../../../ui/Mention';
import ProviderFactory from '../../../providerFactory';

export interface MentionProps {
  id: string;
  providers?: ProviderFactory;
  eventHandlers?: EventHandlers;
  text: string;
  accessLevel?: string;
}

export default class MentionItem extends PureComponent<MentionProps, {}> {
  render() {
    const {
      eventHandlers,
      id,
      providers,
      text,
      accessLevel,
    } = this.props;

    return (
      <Mention
        id={id}
        text={text}
        accessLevel={accessLevel}
        providers={providers}
        eventHandlers={eventHandlers && eventHandlers.mention}
      />
    );
  }
}
