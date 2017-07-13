import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { emoji as emojiData, mention as mentionData } from '@atlaskit/util-data-test';

import Editor from './editor';
import { Content } from './styles';
import { name } from '../package.json';
import imageUploadHandler from '../stories/imageUpload/handler';
import {
  CustomBoundryExample,
  PortalExample, PortalWithCustomBoundaryExample, PortalInScrollContainerExample
} from './popup-examples';

const CANCEL_ACTION = () => action('Cancel')();
const SAVE_ACTION = () => action('Save')();

const analyticsHandler = (actionName, props) => action(actionName)(props);
const mentionProvider = new Promise<any>(resolve => resolve(mentionData.mentionStoryData.resourceProvider));
const emojiProvider = emojiData.emojiStoryData.getEmojiResource();

storiesOf(name, module)
  .add('Popup Examples', () => {
    return (
      <div>
        <Content>
          <h2>Intentionally Broken Example</h2>
          <p style={{ marginBottom: 14 }}>Boundries: document.body | Container: 300px, overflow: hidden.</p>
          <div style={{ width: 300, overflow: 'hidden' }}>
            <Editor
              imageUploadHandler={imageUploadHandler}
              analyticsHandler={analyticsHandler}
              onCancel={CANCEL_ACTION}
              onSave={SAVE_ACTION}
              mentionProvider={mentionProvider}
              emojiProvider={emojiProvider}
              isExpandedByDefault={true}
              ref={this.handleEditorRef}
            />
          </div>
        </Content>

        <hr/>

        <Content>
          <h2>Basic</h2>
          <p style={{ marginBottom: 14 }}>Boundries: document.body | Container: 300px, no overflow.</p>
          <div style={{ width: 300 }}>
            <Editor
              imageUploadHandler={imageUploadHandler}
              analyticsHandler={analyticsHandler}
              onCancel={CANCEL_ACTION}
              onSave={SAVE_ACTION}
              mentionProvider={mentionProvider}
              emojiProvider={emojiProvider}
              isExpandedByDefault={true}
              ref={this.handleEditorRef}
            />
          </div>
        </Content>

        <Content>
          <h2>Basic with Custom Boundry</h2>
          <p style={{ marginBottom: 14 }}>Boundries: custom | Container: 500px, no overflow.</p>
          <div style={{ width: 500 }}>
            <CustomBoundryExample
              imageUploadHandler={imageUploadHandler}
              analyticsHandler={analyticsHandler}
              onCancel={CANCEL_ACTION}
              onSave={SAVE_ACTION}
              mentionProvider={mentionProvider}
              emojiProvider={emojiProvider}
            />
          </div>
        </Content>

        <hr/>

        <Content>
          <h2>Basic Portal</h2>
          <p style={{ marginBottom: 14 }}>Boundries: document.body | Container: 300px, overflow: hidden.</p>
          <div style={{ width: 300 }}>
            <PortalExample
              imageUploadHandler={imageUploadHandler}
              analyticsHandler={analyticsHandler}
              onCancel={CANCEL_ACTION}
              onSave={SAVE_ACTION}
              mentionProvider={mentionProvider}
              emojiProvider={emojiProvider}
              devTools={true}
            />
          </div>
        </Content>

        <Content>
          <h2>Portal with Custom Boundry</h2>
          <p style={{ marginBottom: 14 }}>Boundries: custom | Container: 500px, overflow: hidden.</p>
          <div style={{ width: 500 }}>
            <PortalWithCustomBoundaryExample
              imageUploadHandler={imageUploadHandler}
              analyticsHandler={analyticsHandler}
              onCancel={CANCEL_ACTION}
              onSave={SAVE_ACTION}
              mentionProvider={mentionProvider}
              emojiProvider={emojiProvider}
            />
          </div>
        </Content>

        <Content>
          <h2>Portal in Scroll Container</h2>
          <p style={{ marginBottom: 14 }}>Boundries: custom | Container: 700px, overflow: hidden.</p>
          <div style={{ maxWidth: 700 }}>
            <PortalInScrollContainerExample
              imageUploadHandler={imageUploadHandler}
              analyticsHandler={analyticsHandler}
              onCancel={CANCEL_ACTION}
              onSave={SAVE_ACTION}
              mentionProvider={mentionProvider}
              emojiProvider={emojiProvider}
            />
          </div>
        </Content>
      </div>
    );
  });
