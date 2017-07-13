import Readme, { Code, Heading } from '@atlaskit/util-readme';
import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import * as OverviewExampleRaw from '!raw!./examples/overview.tsx';
import OverviewExample from './examples/overview';
import EncodingExamples from './examples/encoding';
import { description, name } from '../package.json';

storiesOf(name, module)
  .add('Readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={OverviewExampleRaw}>
          {OverviewExample}
        </Code>
        <Heading type="2">Props</Heading>
        <table>
          <thead style={{ border: 0, borderBottom: '1px solid #ddd' }}>
            <tr>
              <th>Name (* is required)</th>
              <th>Type</th>
              <th>Default value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody style={{ border: 0 }}>
            <tr>
              <td><code>context</code></td>
              <td><code>'default'</code></td>
              <td>'default'</td>
              <td>Deprecated.</td>
            </tr>
            <tr>
              <td><code>isExpandedByDefault</code></td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>If <code>true</code>, the editor is expanded (i.e. not collapsed).</td>
            </tr>
            <tr>
              <td><code>defaultValue</code></td>
              <td><code>string</code></td>
              <td>--</td>
              <td>A JIRA HTML value string containing the initial value. The structure of the HTML is the server-rendered shape for rendering JIRA wiki markup.</td>
            </tr>
            <tr>
              <td><code>onCancel</code></td>
              <td><code>(editor?: Editor) => void</code></td>
              <td>--</td>
              <td>A callback for when the editor's cancel button is triggered.</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(editor?: Editor) => void</code></td>
              <td>--</td>
              <td>A callback for when the editor's content changes.</td>
            </tr>
            <tr>
              <td><code>onSave</code></td>
              <td><code>(editor?: Editor) => void</code></td>
              <td>--</td>
              <td>A callback for when the editor's save button is triggered.</td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td><code>string</code></td>
              <td>--</td>
              <td>Text to display in the collapsed editor.</td>
            </tr>
            <tr>
              <td><code>analyticsHandler</code></td>
              <td><code>{`(name: string, properties?: { [key: string]: string | Number } ): any`}</code></td>
              <td><code>--</code></td>
              <td>A callback for handling an analytics event emitted from the editor.</td>
            </tr>
            <tr>
              <td><code>allowAdvancedTextFormatting</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>If <code>true</code>, inline code and strikethrough can be used in the editor.</td>
            </tr>
            <tr>
              <td><code>allowSubSup</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>If <code>true</code>, sub and sup can be used in the editor.</td>
            </tr>
            <tr>
              <td><code>allowLists</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>If <code>true</code>, unordered and ordered lists can be used in the editor.</td>
            </tr>
            <tr>
              <td><code>allowLinks</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>If <code>true</code>, links can be used in the editor.</td>
            </tr>
            <tr>
              <td><code>allowCodeBlock</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>If <code>true</code>, code block can be used in the editor.</td>
            </tr>
            <tr>
              <td><code>allowBlockQuote</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>If <code>true</code>, blockquote can be used in the editor.</td>
            </tr>
            <tr>
              <td><code>mediaProvider</code></td>
              <td><code>Promise?</code></td>
              <td><code>--</code></td>
              <td>If <code>provided</code>, media can be used in the editor.</td>
            </tr>
            <tr>
              <td><code>mentionProvider</code></td>
              <td><code>Promise?</code></td>
              <td><code>--</code></td>
              <td>If <code>provided</code>, mentions can be used in the editor.</td>
            </tr>
            <tr>
              <td><code>mentionEncoder</code></td>
              <td><code>(userId: string) => string</code></td>
              <td><code>--</code></td>
              <td>If <code>provided</code>, controlls how mention will be encoded to html.</td>
            </tr>
          </tbody>
        </table>
        <Heading type="2">Document structure translation</Heading>
        <p>{name} includes translation logic between Atlassian Editor's internal structure, and JIRA's HTML encoding structure.</p>
        <table>
          <thead style={{ border: 0, borderBottom: '1px solid #ddd' }}>
            <tr>
              <th>Description</th>
              <th>Document structure</th>
              <th>JIRA HTML (raw)</th>
              <th>JIRA HTML (rendered)</th>
            </tr>
          </thead>
          <tbody style={{ border: 0 }}>
            {EncodingExamples.map((example, i) =>
            <tr key={i}>
              <td>{example.description}</td>
              <td><code>{example.editor}</code></td>
              <td><code>{example.jira}</code></td>
              <td dangerouslySetInnerHTML={{ __html: example.jira }} />
            </tr>
            )}
          </tbody>
        </table>
      </Readme>
    </div>
  ));
