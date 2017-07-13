import Readme, { Code, Heading } from '@atlaskit/util-readme';
import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import * as OverviewExampleRaw from '!raw!./examples/overview.tsx';
import OverviewExample from './examples/overview';

import { description, name } from '../package.json';

storiesOf(name, module)
  .add('Readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <div style={{ position: 'relative' }}>
          <Code code={OverviewExampleRaw}>
            {OverviewExample}
          </Code>
        </div>
        <Heading type="2">Picker Props</Heading>
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
              <td><code>emojiService *</code></td>
              <td><code>EmojiService</code></td>
              <td>--</td>
              <td>An instance of the emoji service (see @atlaskit/emoji).</td>
            </tr>
            <tr>
              <td><code>onSelection *</code></td>
              <td><code>Function</code></td>
              <td>--</td>
              <td>Callback for when an emoji is selected.</td>
            </tr>
            <tr>
              <td><code>miniMode</code></td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Render the picker in "miniMode". Used when picker is rendered inside the reactions component.</td>
            </tr>
            <tr>
              <td><code>boundariesElement</code></td>
              <td><code>string</code></td>
              <td>--</td>
              <td>Optional boundariesElement for the popup. Takes a css-selector.</td>
            </tr>
            <tr>
              <td><code>allowAllEmojis</code></td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>When set to true the picker will allow inserting any emoji from the emoji picker. Default to false.</td>
            </tr>
          </tbody>
        </table>
        <Heading type="2">Reactions Props</Heading>
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
              <td><code>ari *</code></td>
              <td><code>string</code></td>
              <td>--</td>
              <td>Atlassian Resource Identifier.</td>
            </tr>
            <tr>
              <td><code>emojiService *</code></td>
              <td><code>EmojiService</code></td>
              <td>--</td>
              <td>An instance of the emoji service (see @atlaskit/emoji).</td>
            </tr>
            <tr>
              <td><code>reactionsServivce *</code></td>
              <td><code>ReactionsService</code></td>
              <td>--</td>
              <td>An instance of the reactions service.</td>
            </tr>
            <tr>
              <td><code>onReactionClick *</code></td>
              <td><code>Function</code></td>
              <td>--</td>
              <td>Callback for when an reaction is clicked.</td>
            </tr>
            <tr>
              <td><code>boundariesElement</code></td>
              <td><code>string</code></td>
              <td>--</td>
              <td>Optional boundariesElement for the popup. Takes a css-selector.</td>
            </tr>
            <tr>
              <td><code>allowAllEmojis</code></td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>When set to true the picker will allow inserting any emoji from the emoji picker.</td>
            </tr>
          </tbody>
        </table>
      </Readme>
    </div>
  ));
