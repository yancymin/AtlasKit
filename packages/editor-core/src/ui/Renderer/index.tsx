import { CardEvent } from '@atlaskit/media-card';
import { PureComponent, SyntheticEvent } from 'react';
import { Schema } from '../../prosemirror';
import ProviderFactory from '../../providerFactory';
import {
  ReactSerializer,
  renderDocument,
} from '../../renderer';
import { defaultSchema } from '../../schema';

export type MentionEventHandler = (mentionId: string, text: string, event?: SyntheticEvent<HTMLSpanElement>) => void;
export type CardEventClickHandler = (result: CardEvent) => void;

export interface MentionEventHandlers {
  onClick?: MentionEventHandler;
  onMouseEnter?: MentionEventHandler;
  onMouseLeave?: MentionEventHandler;
}

export interface EventHandlers {
  mention?: MentionEventHandlers;
  media?: {
    onClick?: CardEventClickHandler;
  };
}

export interface Props {
  document: any;
  dataProviders?: ProviderFactory;
  eventHandlers?: EventHandlers;
  schema?: Schema<any, any>;
}

export default class Renderer extends PureComponent<Props, {}> {
  private providerFactory: ProviderFactory;

  constructor(props: Props) {
    super(props);
    this.providerFactory = props.dataProviders || new ProviderFactory();
  }

  render() {
    const {
      document,
      eventHandlers,
      schema,
    } = this.props;

    const serializer = new ReactSerializer(this.providerFactory, eventHandlers);
    return renderDocument(document, serializer, schema || defaultSchema);
  }

  componentWillUnmount() {
    const { dataProviders } = this.props;

    // if this is the ProviderFactory which was created in constructor
    // it's safe to destroy it on Renderer unmount
    if (!dataProviders) {
      this.providerFactory.destroy();
    }
  }
}
