import * as React from 'react';
import { ChangeEvent, PureComponent } from 'react';

import { EmojiProvider } from '../src/api/EmojiResource';
import ResourcedEmoji from '../src/components/common/ResourcedEmoji';

export interface Props {
  emojiProvider: Promise<EmojiProvider>;
}

export interface State {
  id?: string;
}

export default class ResourcedEmojiById extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
    };
  }

  private onIdChange = (event: ChangeEvent<any>) => {
    this.setState({
      id: event.target.value,
    });
  }

  render() {
    const { emojiProvider } = this.props;
    const { id = '' } = this.state;

    return (
      <div>
        <p>Emoji id: <input onChange={this.onIdChange} /></p>
        <p>
          <ResourcedEmoji
            emojiProvider={emojiProvider}
            emojiId={{ id, shortName: `:${id}:` }}
          />
        </p>
      </div>
    );
  }
}
