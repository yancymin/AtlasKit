import * as React from 'react';
import { PureComponent } from 'react';
import { MentionProvider } from '../../api/MentionResource';
import Mention, { MentionEventHandler } from './';

export interface Props {
  id: string;
  text: string;
  accessLevel?: string;
  mentionProvider?: Promise<MentionProvider>;
  onClick?: MentionEventHandler;
  onMouseEnter?: MentionEventHandler;
  onMouseLeave?: MentionEventHandler;
}

export interface State {
  isHighlighted: boolean;
}

export default class ResourcedMention extends PureComponent<Props, State> {
  constructor(props)  {
    super(props);

    this.state = {
      isHighlighted: false
    };
  }

  componentDidMount() {
    this.handleMentionProvider(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { props } = this;
    if (props.id !== nextProps.id || props.mentionProvider !== nextProps.mentionProvider) {
      this.handleMentionProvider(nextProps);
    }
  }

  private handleMentionProvider = (props: Props) => {
    const { id, mentionProvider } = props;
    if (mentionProvider) {
      mentionProvider.then(provider => {
        this.setState({
          isHighlighted: provider.shouldHighlightMention({ id })
        });
      }).catch(e => {
        this.setState({
          isHighlighted: false
        });
      });
    } else {
      this.setState({
        isHighlighted: false
      });
    }
  }

  render() {
    const { props, state } = this;

    return (
      <Mention
        id={props.id}
        text={props.text}
        isHighlighted={state.isHighlighted}
        accessLevel={props.accessLevel}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      />
    );
  }
}
