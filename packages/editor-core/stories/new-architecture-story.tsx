import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';

import Editor from './../src/editor';
import ToolsDrawer from './ToolsDrawer';
import { name } from '../package.json';
const SAVE_ACTION = () => action('Save')();

storiesOf(name, module)
  .add('Tray Editor', () =>
    <ToolsDrawer
      // tslint:disable-next-line:jsx-no-lambda
      renderEditor={({mentionProvider, emojiProvider, mediaProvider, onChange}) =>
        <Editor
          appearance="tray"

          allowTextFormatting={true}
          saveOnEnter={true}

          mentionProvider={mentionProvider}
          emojiProvider={emojiProvider}
          mediaProvider={mediaProvider}
          onChange={onChange}
          onSave={SAVE_ACTION}
        />}
    />);
