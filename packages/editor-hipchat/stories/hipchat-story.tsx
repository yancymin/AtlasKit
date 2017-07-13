import Button from '@atlaskit/button';

import { defaultClientId, defaultServiceHost } from '@atlaskit/media-test-helpers/dist/es5/contextProvider';
import { defaultCollectionName } from '@atlaskit/media-test-helpers/dist/es5/collectionNames';
import { StoryBookTokenProvider } from '@atlaskit/media-test-helpers/dist/es5/tokenProvider';
import { action, storiesOf } from '@kadira/storybook';
import { storyDecorator, storyMediaProviderFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import { pd } from 'pretty-data';
import * as React from 'react';
import { PureComponent } from 'react';
import Editor from '../src';
import { emojiProvider, mentionProvider, testImageUrl, testImageName } from './story-data';
import { name, version } from '../package.json';

const mediaTestHelpers = {
  defaultClientId,
  defaultServiceHost,
  defaultCollectionName,
  StoryBookTokenProvider,
};

let handleChange: () => void;
let editor: Editor;

const handleEditorRender = (elem: any) => {
  if (elem) {
    editor = elem;
  }
};

storiesOf(name, module)
  .addDecorator(function (story: Function, context: { kind: string, story: string }) {
    type Props = {};
    type State = { value?: any, story?: any, prettify?: boolean };

    class Demo extends PureComponent<Props, State> {
      state: State;

      constructor(props: Props) {
        super(props);
        handleChange = this.handleChange;

        this.state = {
          value: {},
          prettify: true,
          story: story(),
        };
      }

      handleChange = () => {
        this.setState({ value: editor.value });
      }

      togglePrettify = () => {
        this.setState({ prettify: !this.state.prettify });
      }

      render() {
        const json = this.state.prettify
          ? pd.json(this.state.value)
          : JSON.stringify(this.state.value);


        return (
          <div ref="root">
            <div style={{ border: '1px solid #C1C7D0', borderRadius: 3, padding: '4px 4px 4px 8px' }}>
              {this.state.story}
            </div>
            <fieldset style={{ marginTop: 20 }}>
              <legend>
                JSON output
                 (
                  <input type="checkbox" checked={this.state.prettify} onChange={this.togglePrettify}/>
                  <span onClick={this.togglePrettify} style={{ cursor: 'pointer' }}>prettify</span>
                 )
              </legend>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {json}
              </pre>
            </fieldset>
          </div>
        );
      }
    }

    return <Demo/>;
  })
  .addDecorator(storyDecorator(version))
  .add('Simple', () => {
    return (
      <Editor
        ref={handleEditorRender}
        onChange={handleChange}
        onSubmit={action('submit')}
      />
    );
  })
  .add('With mentions and emojis', () =>
    (
      <Editor
        ref={handleEditorRender}
        onChange={handleChange}
        onSubmit={action('submit')}
        mentionProvider={mentionProvider}
        emojiProvider={emojiProvider}
        reverseMentionPicker={false}
      />
    )
  )
  .add('With media', () => {
    let reactEditorComponent: Editor;

    function openMediaPicker() {
      if (reactEditorComponent) {
        reactEditorComponent.showMediaPicker();
      }
    }

    function insertTestFile() {
      if (reactEditorComponent) {
        reactEditorComponent.insertFileFromDataUrl(testImageUrl, testImageName);
      }
    }

    const editor = (
      <div>
        <div style={{ float: 'right', position: 'relative', top: -6, left: 6 }}>
          <Button onClick={openMediaPicker} appearance="primary">Show media picker</Button>&nbsp;
          <Button onClick={insertTestFile} appearance="primary">Insert from base64</Button>
        </div>
        <Editor
          // tslint:disable-next-line:jsx-no-lambda
          ref={elem => reactEditorComponent = elem}
          onSubmit={action('submit')}
          mediaProvider={storyMediaProviderFactory(mediaTestHelpers)}
        />
      </div>
    );

    return editor;
  })
  .add('With maxContentSize', () => {
    return (
      <Editor
        ref={handleEditorRender}
        onChange={handleChange}
        maxContentSize={100}
      />
    );
  })
  .add('With onChange', () => {
    return (
      <Editor
        ref={handleEditorRender}
        onChange={action('onChange')}
      />
    );
  })
  .add('With legacy format', () =>
    (
      <Editor
        ref={handleEditorRender}
        onChange={handleChange}
        onSubmit={action('submit')}
        mentionProvider={mentionProvider}
        emojiProvider={emojiProvider}
        reverseMentionPicker={false}
        useLegacyFormat={true}
      />
    )
  ).add('Editor Hipchat with all enabled', () => {
    let reactEditorComponent;

    function openMediaPicker() {
      if (reactEditorComponent) {
        reactEditorComponent.showMediaPicker();
      }
    }

    const editor = (
      <div>
        <div style={{ float: 'right', position: 'relative', top: -6, left: 6 }}>
          <Button onClick={openMediaPicker} appearance="primary">Show media picker</Button>
        </div>
        <Editor
          maxContentSize={400}
          mentionProvider={mentionProvider}
          emojiProvider={emojiProvider}
          reverseMentionPicker={false}
          onChange={action('change')}
            // tslint:disable-next-line:jsx-no-lambda
          ref={elem => reactEditorComponent = elem}
          onSubmit={action('submit')}
          mediaProvider={storyMediaProviderFactory(mediaTestHelpers)}
        />
      </div>
    );

    return editor;
  });

