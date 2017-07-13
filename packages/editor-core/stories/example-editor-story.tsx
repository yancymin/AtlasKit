import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';

import Editor from './editor';
import ToolsDrawer from './ToolsDrawer';
import { name, version } from '../package.json';
import * as v1schema from '../dist/json-schema/v1/full.json';
import { storyDecorator } from '../src/test-helper';

const CANCEL_ACTION = () => action('Cancel')();
const SAVE_ACTION = () => action('Save')();

const jsonPretty = (obj: any) => JSON.stringify(obj, null, 2);
const analyticsHandler = (actionName, props) => action(actionName)(props);

class DemoEditor extends React.PureComponent<any, any> {
  private editorRef: Editor;

  private onChange = () => {
    const editor = this.editorRef;

    if (editor && editor.doc && this.props.onChange) {
      this.props.onChange(editor.state.editorView);
    }
  }

  private handleEditorRef = (ref) => {
    this.editorRef = ref;
  }

  render() {
    const {mediaProvider, mentionProvider, emojiProvider} = this.props;
    return (
      <Editor
        analyticsHandler={analyticsHandler}
        onCancel={CANCEL_ACTION}
        onSave={SAVE_ACTION}
        onChange={this.onChange}
        mediaProvider={mediaProvider}
        mentionProvider={mentionProvider}
        emojiProvider={emojiProvider}
        isExpandedByDefault={true}
        ref={this.handleEditorRef}
        devTools={true}
      />
    );
  }
}

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('Example editor', () => (
    <ToolsDrawer
      // tslint:disable-next-line:jsx-no-lambda
      renderEditor={({mediaProvider, mentionProvider, emojiProvider, onChange}) =>
        <DemoEditor
          onChange={onChange}
          mediaProvider={mediaProvider}
          mentionProvider={mentionProvider}
          emojiProvider={emojiProvider}
        />}
    />
  ))
  .add('v1 JSON Schema', () => (
    <pre><code className="json">{jsonPretty(v1schema)}</code></pre>
  ));
