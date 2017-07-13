import '!style!css!less!./cq-styles.less';
import * as mediaTestHelpers from '@atlaskit/media-test-helpers';
import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { PureComponent } from 'react';
import Editor from '../src';
import { name, version } from '../package.json';
import { storyDecorator, storyMediaProviderFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import { pd } from 'pretty-data';
import { resourceProvider } from './mentions/story-data';
import Spinner from '@atlaskit/spinner';

const CANCEL_ACTION = () => action('Cancel')();
const SAVE_ACTION = () => action('Save')();
let handleChange: (editor: Editor) => void;

const CODE_MACRO = `<ac:structured-macro ac:name="code" ac:schema-version="1" ac:macro-id="1c61c2dd-3574-45f3-ac07-76d400504d84"><ac:parameter ac:name="language">js</ac:parameter><ac:parameter ac:name="theme">Confluence</ac:parameter><ac:parameter ac:name="title">Example</ac:parameter><ac:plain-text-body><![CDATA[if (true) {
  console.log('Hello World');
}]]></ac:plain-text-body></ac:structured-macro>`;

const PANEL_MACRO = `<ac:structured-macro ac:name="warning" ac:schema-version="1" ac:macro-id="f348e247-44a6-41e5-8034-e8aa469649b5"><ac:parameter ac:name="title">Hello</ac:parameter><ac:rich-text-body><p>Warning panel</p></ac:rich-text-body></ac:structured-macro>`;
const JIRA_ISSUE = '<p><ac:structured-macro ac:name="jira" ac:schema-version="1" ac:macro-id="a1a887df-a2dd-492b-8b5c-415d8eab22cf"><ac:parameter ac:name="server">JIRA (product-fabric.atlassian.net)</ac:parameter><ac:parameter ac:name="serverId">70d83bc8-0aff-3fa5-8121-5ae90121f5fc</ac:parameter><ac:parameter ac:name="key">ED-1068</ac:parameter></ac:structured-macro></p>';
const JIRA_ISSUES_LIST = '<p><ac:structured-macro ac:name="jira" ac:schema-version="1" ac:macro-id="be852c2a-4d33-4ceb-8e21-b3b45791d92e"><ac:parameter ac:name="server">JIRA (product-fabric.atlassian.net)</ac:parameter><ac:parameter ac:name="columns">key,summary,type,created,updated,due,assignee,reporter,priority,status,resolution</ac:parameter><ac:parameter ac:name="maximumIssues">20</ac:parameter><ac:parameter ac:name="jqlQuery">project = ED AND component = codeblock</ac:parameter><ac:parameter ac:name="serverId">70d83bc8-0aff-3fa5-8121-5ae90121f5fc</ac:parameter></ac:structured-macro></p>';

const mentionProvider = new Promise<any>(resolve => {
  resolve(resourceProvider);
});

storiesOf(name, module)
  .addDecorator(function (story: Function, context: { kind: string, story: string }) {
    type Props = {};
    type State = { cxhtml?: string, story?: any, prettify?: boolean, isMediaReady?: boolean};
    class Demo extends PureComponent<Props, State> {
      state: State;

      constructor(props: Props) {
        super(props);
        handleChange = this.handleChange;
        this.state = {
          cxhtml: '',
          prettify: true,
          story: story(),
          isMediaReady: true,
        };
      }

      handleChange = (editor: Editor) => {
        this.setState({ isMediaReady: false });

        action('Change')();

        editor.value.then((value) => {
          action('Value has been resolved')(value);
          this.setState({
            isMediaReady: true,
            cxhtml: value
          });
        });
      }

      togglePrettify = () => {
        this.setState({ prettify: !this.state.prettify });
      }

      render() {
        const xml = this.state.prettify ? pd.xml(this.state.cxhtml || '') : this.state.cxhtml || '';

        return (
          <div ref="root">
            {this.state.story}
            <fieldset style={{ marginTop: 20 }}>
              <legend>
                CXHTML output
                 (
                  <input type="checkbox" checked={this.state.prettify} onChange={this.togglePrettify}/>
                  <span onClick={this.togglePrettify} style={{ cursor: 'pointer' }}> prettify</span>
                 )
              </legend>
              {this.state.isMediaReady ?
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{xml}</pre>
                :
                <div style={{ padding: 20 }}><Spinner size="large" /></div>
              }
            </fieldset>
          </div>
        );
      }
    }

    return <Demo/>;
  })
  .addDecorator(storyDecorator(version))
  .add('Default', () =>
    <Editor
      isExpandedByDefault={true}
      onCancel={CANCEL_ACTION}
      onSave={SAVE_ACTION}
      onChange={handleChange}
      mentionProvider={mentionProvider}
    />
  )
  .add('With Media support', () =>
    //  TODO: remove the following note and link after the login is not required anymore or there's better way to run the story.
    <div>
      <div style={{ padding: '5px 0'}}>
        ️️️⚠️ Atlassians, make sure you're logged into <a href="https://id.stg.internal.atlassian.com" target="_blank">staging Identity server</a>.
      </div>
      <Editor
        isExpandedByDefault={true}
        mentionProvider={mentionProvider}
        mediaProvider={storyMediaProviderFactory(mediaTestHelpers)}
        onCancel={CANCEL_ACTION}
        onSave={SAVE_ACTION}
        onChange={handleChange}
      />
    </div>
  )
  .add('Disabled', () => {
    type Props = {};
    type State = { disabled: boolean };

    class Demo extends PureComponent<Props, State> {
      state = { disabled: true };

      render() {
        return (
          <div>
            <Editor
              disabled={this.state.disabled}
              isExpandedByDefault={true}
              onCancel={CANCEL_ACTION}
              onSave={SAVE_ACTION}
              onChange={handleChange}
              mentionProvider={mentionProvider}
            />

            <fieldset style={{ marginTop: 20 }}>
              <button onClick={this.toggleDisabled}>Toggle disabled state</button>
            </fieldset>
          </div>
        );
      }

      private toggleDisabled = () => this.setState({ disabled: !this.state.disabled });
    }

    return <Demo />;
  })
  .add('Expanded prop', () => {
    type Props = {};
    type State = { expanded: boolean };

    class Demo extends PureComponent<Props, State> {
      state = { expanded: false };

      render() {
        return (
          <div>
            <Editor
              expanded={this.state.expanded}
              isExpandedByDefault={false}
              onCancel={CANCEL_ACTION}
              onSave={SAVE_ACTION}
              onChange={handleChange}
            />

            <fieldset style={{ marginTop: 20 }}>
              <button onClick={this.toggleExpanded}>Toggle expanded state</button>
            </fieldset>
          </div>
        );
      }

      private toggleExpanded = () => this.setState({ expanded: !this.state.expanded });
    }

    return <Demo />;
  })
  .add('CXHTML input', () => {
    type Props = {};
    type State = { input: string, output: string };
    class Demo extends PureComponent<Props, State> {
      state = { input: '', output: '' };
      refs: {
        input: HTMLTextAreaElement;
      };

      render() {
        return (
          <div ref="root">
            <fieldset style={{ marginTop: 20, marginBottom: 20 }}>
              <legend>Input</legend>
              <textarea
                style={{
                  boxSizing: 'border-box',
                  border: '1px solid lightgray',
                  fontFamily: 'monospace',
                  padding: 10,
                  width: '100%',
                  height: 100
                }}
                ref="input"
              />
              <button onClick={this.handleImportClick}>Import</button>
              <button onClick={this.handleInsertCodeClick}>Insert Code</button>
              <button onClick={this.handleInsertPanelClick}>Insert Panel</button>
              <button onClick={this.handleInsertJiraIssueClick}>Insert JIRA Issue</button>
              <button onClick={this.handleInsertJiraIssuesListClick}>Insert JIRA Issues List</button>
            </fieldset>
            <Editor
              isExpandedByDefault={true}
              onCancel={CANCEL_ACTION}
              onChange={handleChange}
              onSave={SAVE_ACTION}
              defaultValue={this.state.input}
              key={this.state.input}
              mentionProvider={mentionProvider}
            />
          </div>
        );
      }

      private handleImportClick = () => this.setState({ input: this.refs.input.value });
      private handleInsertCodeClick = () => this.setState({ input: CODE_MACRO });
      private handleInsertPanelClick = () => this.setState({ input: PANEL_MACRO });
      private handleInsertJiraIssueClick = () => this.setState({ input: JIRA_ISSUE });
      private handleInsertJiraIssuesListClick = () => this.setState({ input: JIRA_ISSUES_LIST });
    }

    return <Demo />;
  })
;
