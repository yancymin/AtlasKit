import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Chrome, Code } from '@atlaskit/util-readme';

import '../src/index.less';
import { name } from '../package.json';
import ToggleExample from './components/ToggleExample';

const toggleExampleHTML = `<!-- replace 'default' with 'large' for large toggle -->
<div class="ak-field-toggle ak-field-toggle__size-default">
  <input
    type="checkbox"
    name="option1"
    id="option1"
    value="option1"
  />
  <label for="option1">Option</label>
</div>
`;

storiesOf(name, module)
  .add('Toggle', () => (
    <Chrome title="Toggle">
      <Code code={toggleExampleHTML}>
        <table>
          <thead>
            <tr>
              <th>Style</th>
              <th>Default size</th>
              <th>Large size</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Unchecked</td>
              <td>
                <ToggleExample size="default" />
              </td>
              <td>
                <ToggleExample size="large" />
              </td>
            </tr>
            <tr>
              <td>Checked</td>
              <td>
                <ToggleExample checked size="default" />
              </td>
              <td>
                <ToggleExample checked size="large" />
              </td>
            </tr>
            <tr>
              <td>Unchecked (disabled)</td>
              <td>
                <ToggleExample disabled size="default" />
              </td>
              <td>
                <ToggleExample disabled size="large" />
              </td>
            </tr>
            <tr>
              <td>Checked (disabled)</td>
              <td>
                <ToggleExample checked disabled size="default" />
              </td>
              <td>
                <ToggleExample checked disabled size="large" />
              </td>
            </tr>
          </tbody>
        </table>
      </Code>
    </Chrome>
  ));
