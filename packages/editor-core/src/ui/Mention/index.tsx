import * as React from 'react';
import { PureComponent } from 'react';
import { ResourcedMention } from '@atlaskit/mention';
import { MentionEventHandlers } from '../Renderer';
import {
  default as ProviderFactory,
  WithProviders
} from '../../providerFactory';

export interface MentionProps {
  id: string;
  providers?: ProviderFactory;
  eventHandlers?: MentionEventHandlers;
  text: string;
  accessLevel?: string;
}

const noop = () => {};

export default class Mention extends PureComponent<MentionProps, {}> {
  private providerFactory: ProviderFactory;

  constructor(props) {
    super(props);
    this.providerFactory = props.providers || new ProviderFactory();
  }

  componentWillUnmount() {
    if (!this.props.providers) {
      // new ProviderFactory is created if no `providers` has been set
      // in this case when component is unmounted it's safe to destroy this providerFactory
      this.providerFactory.destroy();
    }
  }

  private renderWithProvider = (providers) => {
    const { eventHandlers, id, text, accessLevel } = this.props;
    const actionHandlers = {};

    if (eventHandlers) {
      ['onClick', 'onMouseEnter', 'onMouseLeave'].forEach(handler => {
        actionHandlers[handler] = eventHandlers[handler] || noop;
      });
    }

    return (
      <ResourcedMention
        id={id}
        text={text}
        accessLevel={accessLevel}
        mentionProvider={providers.mentionProvider}
        {...actionHandlers}
      />
    );
  }

  render() {
    return (
      <WithProviders
        providers={['mentionProvider']}
        providerFactory={this.providerFactory}
        renderNode={this.renderWithProvider}
      />
    );
  }
}
