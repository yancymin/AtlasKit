import * as React from 'react';
import { PureComponent } from 'react';
import Layer from '@atlaskit/layer';
import { EmojiProvider } from '../src/api/EmojiResource';
import EmojiPicker from '../src/components/picker/EmojiPicker';
import { OnEmojiEvent } from '../src/types';

export interface Props {
  onSelection?: OnEmojiEvent;
  emojiProvider: Promise<EmojiProvider>;
}

export default class EmojiPickerTextInput extends PureComponent<Props, undefined> {
  static defaultProps = {
    onSelection: () => {},
  };

  render() {
    const { emojiProvider, onSelection } = this.props;

    return (
      <div style={{ padding: '10px' }} >
        <Layer
          content={
            <EmojiPicker
              onSelection={onSelection}
              emojiProvider={emojiProvider}
            />
          }
          position="bottom left"
        >
        <input
          id="picker-input"
          style={{
            height: '20px',
            margin: '10px',
          }}
        />
        </Layer>
      </div>
    );
  }

}
