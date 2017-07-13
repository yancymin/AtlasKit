import * as React from 'react';
import { emoji as emojiData, mention as mentionData } from '@atlaskit/util-data-test';
import { defaultClientId, defaultServiceHost } from '@atlaskit/media-test-helpers/dist/es5/contextProvider';
import { defaultCollectionName } from '@atlaskit/media-test-helpers/dist/es5/collectionNames';
import { StoryBookTokenProvider } from '@atlaskit/media-test-helpers/dist/es5/tokenProvider';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';

import { Content } from './../styles';

import { MentionResource } from '../../src';
import { toJSON } from '../../src/utils';
import { storyMediaProviderFactory } from '../../src/test-helper';

const mediaTestHelpers = {
  defaultClientId,
  defaultServiceHost,
  defaultCollectionName,
  StoryBookTokenProvider,
};

const rejectedPromise = Promise.reject(new Error('Simulated provider rejection'));
const pendingPromise = new Promise<any>(() => {});
const providers = {
  mentionProvider: {
    resolved: Promise.resolve(mentionData.mentionStoryData.resourceProvider),
    'resolved 2': Promise.resolve(new MentionResource({
      url: 'https://pf-mentions-service.staging.atlassian.io/mentions/f7ebe2c0-0309-4687-b913-41d422f2110b',
      containerId: 'b0d035bd-9b98-4386-863b-07286c34dc14',
      productId: 'hipchat'
    })),
    pending: pendingPromise,
    rejected: rejectedPromise,
    'undefined' : undefined,
  },
  emojiProvider: {
    resolved: emojiData.emojiStoryData.getEmojiResource(),
    pending: pendingPromise,
    rejected: rejectedPromise,
    'undefined' : undefined,
  },
  mediaProvider: {
    resolved: storyMediaProviderFactory(mediaTestHelpers),
    pending: pendingPromise,
    rejected: rejectedPromise,
    'view only': storyMediaProviderFactory(mediaTestHelpers, undefined, undefined, false),
    'undefined' : undefined,
  },
};
rejectedPromise.catch(() => {});

interface State {
  editorEnabled: boolean;
  mentionProvider: string;
  mediaProvider: string;
  emojiProvider: string;
  jsonDocument?: string;
}

export default class ToolsDrawer extends React.Component<any, State> {
  constructor(props) {
    super(props);

    this.state = {
      editorEnabled: true,
      mentionProvider: 'resolved',
      mediaProvider: 'resolved',
      emojiProvider: 'resolved',
      jsonDocument: '{}',
    };
  }

  private switchProvider = (providerType, providerName) => {
    this.setState({ [providerType]: providerName });
  }

  private reloadEditor = () => {
    this.setState({ editorEnabled: false }, () => {
      this.setState({ editorEnabled: true });
    });
  }

  private onChange = editorView => {
    this.setState({
      jsonDocument: JSON.stringify(toJSON(editorView.state.doc), null, 2)
    });
  }

  render() {
    const { mentionProvider, emojiProvider, mediaProvider, jsonDocument, editorEnabled } = this.state;
    return (
      <Content>
        <div style={{ padding: '5px 0'}}>
          ️️️⚠️ Atlassians, make sure you're logged into <a href="https://id.stg.internal.atlassian.com" target="_blank">staging Identity server</a>.
        </div>
        {
          editorEnabled ?
          (this.props.renderEditor({
            mediaProvider: providers.mediaProvider[mediaProvider],
            mentionProvider: providers.mentionProvider[mentionProvider],
            emojiProvider: providers.emojiProvider[emojiProvider],
            onChange: this.onChange
          })) :
          ''
        }
        <div className="toolsDrawer">
          <div>
            <ButtonGroup>
              <label>Mention provider: </label>
              {Object.keys(providers.mentionProvider).map((providerName) => (
                <Button
                  key={`mentionProvider-${providerName}`}
                  onClick={this.switchProvider.bind(this, 'mentionProvider', providerName)}
                  appearance={providerName === mentionProvider ? 'primary' : 'default'}
                  theme="dark"
                  spacing="compact"
                >
                  {providerName}
                </Button>
              ))}
            </ButtonGroup>
          </div>
          <div>
            <ButtonGroup>
              <label>Media provider: </label>
              {Object.keys(providers.mediaProvider).map((providerName) => (
                <Button
                  key={`mediaProvider-${providerName}`}
                  onClick={this.switchProvider.bind(this, 'mediaProvider', providerName)}
                  appearance={providerName === mediaProvider ? 'primary' : 'default'}
                  theme="dark"
                  spacing="compact"
                >
                  {providerName}
                </Button>
              ))}
            </ButtonGroup>
          </div>
          <div>
            <ButtonGroup>
              <label>Emoji provider: </label>
              {Object.keys(providers.emojiProvider).map((providerName) => (
                <Button
                  key={`emojiProvider-${providerName}`}
                  onClick={this.switchProvider.bind(this, 'emojiProvider', providerName)}
                  appearance={providerName === emojiProvider ? 'primary' : 'default'}
                  theme="dark"
                  spacing="compact"
                >
                  {providerName}
                </Button>
              ))}
            </ButtonGroup>
          </div>
          <div>
            <Button onClick={this.reloadEditor} theme="dark" spacing="compact">
              Reload Editor
            </Button>
          </div>
        </div>
        <legend>JSON output:</legend>
        <pre>{jsonDocument}</pre>
      </Content>
    );
  }
}
