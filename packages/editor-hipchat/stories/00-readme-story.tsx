import { storiesOf } from '@kadira/storybook';
import Readme, { Code, Heading } from '@atlaskit/util-readme';
import * as React from 'react';

import * as exampleMediaServicesFileJson from '!raw!./examples/mediaservices-file.json';
import * as exampleMessageJson from '!raw!./examples/message.json';
import * as OverviewExampleRaw from '!raw!./examples/overview.tsx';
import * as documentJsonSchema from '!raw!./schema/document.json';
import OverviewExample from './examples/overview';

import { description, name } from '../package.json';

storiesOf(name, module)
  .add(`📖 ${name} Readme`, () => (
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
              <td><code>id</code></td>
              <td><code>string</code></td>
              <td>--</td>
              <td>A HTML ID to assign to the container element for the editor.</td>
            </tr>
            <tr>
              <td><code>maxContentSize</code></td>
              <td><code>number</code></td>
              <td>--</td>
              <td>The maximum size for a document, measured in document tokens.</td>
            </tr>
            <tr>
              <td><code>onSubmit</code></td>
              <td><code>(doc: Doc) => void</code></td>
              <td>--</td>
              <td>A callback for when the document is submitted (e.g. via enter).</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>() => void</code></td>
              <td>--</td>
              <td>A callback for when the document is changed.</td>
            </tr>
            <tr>
              <td><code>mentionProvider</code></td>
              <td><code>Promise&lt;MentionProvider&gt;</code></td>
              <td>--</td>
              <td>A resource provider for mentions. If provided, mentions is enabled.<br />See @atlaskit/mention for details.</td>
            </tr>
            <tr>
              <td><code>presenceProvider</code></td>
              <td><code>any</code></td>
              <td>--</td>
              <td>A resource provider for presence. If provided, presence is enabled in mention picker.<br />See @atlaskit/mention for details.</td>
            </tr>
            <tr>
              <td><code>reverseMentionPicker</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>If true, mention picker position is reversed. See @atlaskit/mention for details.</td>
            </tr>
          </tbody>
        </table>
        <Heading type="2">Document</Heading>
        <p>
          The editor produces a "document" that is a precise description of the content. This is enforced internally using a combination of a <a href="https://prosemirror.net/guide/schema.html">ProseMirror schema</a> and a filter pass using encoding to strip unwanted content (e.g. a mention query).
        </p>
        <Heading type="3">JSON Schema</Heading>
        <p>This schema describes the exposed document structure and is subject to change.</p>
        <Code language="js">{documentJsonSchema}</Code>
        <p><strong>Expected changes:</strong></p>
        <ul>
          <li>
            <p>The document content currently is an array of inline nodes. This will change to being a <code>doc</code> node with a child block (e.g. <code>paragraph</code>). See <a href="https://product-fabric.atlassian.net/wiki/pages/viewpage.action?pageId=50397266">{`https://product-fabric.atlassian.net/wiki/pages/viewpage.action?pageId=50397266`}</a> for details.</p>
          </li>
          <li>
            <p>Mark encoding will change from <code>{`{"_": "name", "attr1": "value"}`}</code> to <code>{`{"type": "name", "attrs": {"attr1": "value"}}`}</code> as part of the upgrade to the ProseMirror 0.12. At the moment some consumers are expecting the old format, and others are expecting the new.</p>
          </li>
          <li>
            <p><code>mention</code> node attributes are currently optional, but the semantics for nodes that have attributes missing is not defined. This should be defined.</p>
          </li>
          <li>
            <p><code>mention</code> node currently has a <code>text</code> property is a duplicate of the <code>displayName</code> attribute.</p>
            <p><code>text</code> will be removed, and only the <code>displayName</code> attribute will remain.</p>
            <p>The value of <code>displayName</code> will <strong>not</strong> include a leading @ character.</p>
          </li>
          <li>
            <p><code>link</code> mark attribute <code>url</code> will be renamed to <code>href</code>.</p>
          </li>
          <li>
            <p>Hard break are currently represented as a <code>text</code> node with <code>"\n"</code>. This will change to using a <code>hard_break</code> node.</p>
          </li>
          <li>
            <p>Extra node types like <code>block_quote</code> and <code>code_block</code> will be added when rendering support is available.</p>
          </li>
          <li>
            <p>Media items are currently not contributed to the document by the editor, but will be in the future.</p>
            <p>However they <strong>are</strong> added as a post-processing step in HipChat itself. An example of such a node is as follows:</p>
            <Code language="js">{exampleMediaServicesFileJson}</Code>
          </li>
        </ul>
        <Heading type="3">Example message</Heading>
        <Code language="js">{exampleMessageJson}</Code>
      </Readme>
    </div>
  ));
