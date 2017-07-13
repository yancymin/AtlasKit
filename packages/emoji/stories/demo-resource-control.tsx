import * as React from 'react';
import { PureComponent, ReactElement } from 'react';

import EmojiResource, { EmojiResourceConfig } from '../src/api/EmojiResource';

// FIXME FAB-1732 - extract or replace with third-party implementation
const toJavascriptString = (obj: any): string => {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      let arrString = '[\n';
      for (let i = 0; i < obj.length; i++) {
        arrString += `  ${toJavascriptString(obj[i])},\n`;
      }
      arrString += ']';
      return arrString;
    }
    let objString = '{\n';
    Object.keys(obj).forEach((key) => {
      objString += `  ${key}: ${toJavascriptString(obj[key])},\n`;
    });
    objString += '}';
    return objString;
  } else if (typeof obj === 'string') {
    return `'${obj}'`;
  }
  return obj.toString();
};

export interface Props {
  children: ReactElement<any>;
  emojiConfig: EmojiResourceConfig;
}

export interface State {
  emojiProvider: Promise<EmojiResource>;
}

export default class ResourcedEmojiControl extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      emojiProvider: Promise.resolve(new EmojiResource(this.props.emojiConfig)),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.refreshEmoji(nextProps.emojiConfig);
  }

  refreshEmoji(emojiConfig: EmojiResourceConfig) {
    this.setState({
      emojiProvider: Promise.resolve(new EmojiResource(this.props.emojiConfig)),
    });
  }

  emojiConfigChange = (event) => {
    // tslint:disable-next-line:no-eval
    const config = eval(`( () => (${event.target.value}) )()`);
    this.refreshEmoji(config);
  }

  render() {
    const { emojiProvider } = this.state;

    return (
      <div style={{ padding: '10px' }} >
        {React.cloneElement(this.props.children, { emojiProvider })}
        <p>
          <label htmlFor="emoji-urls">EmojiLoader config</label>
        </p>
        <p>
          <textarea
            id="emoji-urls"
            rows={15}
            style={{ width: '400px' }}
            onChange={this.emojiConfigChange}
            defaultValue={toJavascriptString(this.props.emojiConfig)}
          />
        </p>
      </div>
    );
  }
}
