import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Description, Heading, Props } from '@atlaskit/util-readme';
import readmeStyles from './_readme/readme-styles.less';

/* eslint-disable import/no-duplicates, import/first */
import LayerExample from './_readme/LayerExample';
import LayerExampleRaw from '!raw!./_readme/LayerExample';
/* eslint-enable import/first, import/no-duplicates */

import { name } from '../package.json';
import Layer from '../src';

/* eslint-disable max-len */
const layerPropDescriptions = {
  position: 'The position of a layer relative to its target. The position attribute takes two positional arguments in the format `position="edge edge-position"`, where `edge` specifies which edge to align the layer to, and `edge-position` specifies where on that edge the layer should appear. Refer to the table below for examples.',
  autoFlip: 'If true, a Layer will flip it\'s position to the opposite side of its target if it does not fit in the available space. Alternatively, supply an ordered list of positions here to specify the flipping behavior, e.g. `autoFlip={[\'top\', \'bottom\']}`. Available positions here are: "top", "bottom", "left", and "right". The content will first try to fit in the position specified by the `position` prop, and then try each other direction in order.',
  boundariesElement: 'One of "viewport", "window" or "scrollParent". If autoFlip is enabled, the Layer will attempt to remain inside this element.',
  offset: 'A string representing the offsets from the target element in the format "[x-offset] [y-offset]", measured in pixels.',
  content: 'The HTML content to display in the layer. This will be aligned to the target according to the `position` prop.',
  onFlippedChange: 'Callback that is used to know when the `flipped` state of Layer changes. This occurs when placing a Layered element in the requested position would cause Layer to be rendered outside of the boundariesElement (usually viewport). See below for more details.',
  children: 'The target element to align the Layer `content` to.',
};

const layerPropTypes = {
  position: 'string',
  autoFlip: 'bool | Array(string)',
  boundariesElement: 'string',
};

storiesOf(name, module)
  .add('Layer readme', () => (
    <Readme
      component={name}
      description={<Description>
        <p>
          The layer is responsible for the positioning of an element on a page.
          For example, if you want to create a custom tooltip component, you could wrap it with a
          layer to set its position relative to a target.
        </p>
        <p>
          If you use a layer with a component that could be opened or closed, you will need to
          ensure that you re-render the layer the first time you open the component, otherwise it
          will render with the wrong position.
        </p>
      </Description>}
    >
      <Code code={LayerExampleRaw}>
        {LayerExample}
      </Code>
      <Props component={Layer} descriptions={layerPropDescriptions} types={layerPropTypes} />
      <div>
        <Heading type="3">Position</Heading>
        <Description>
          The following table illustrates the available positions for a Layer relative to its target.
        </Description>
        <table className={readmeStyles.layerPositions}>
          <tbody>
            <tr>
              <td /><td>top left</td><td>top center</td><td>top right</td><td />
            </tr>
            <tr>
              <td>left top</td><td /><td /><td /><td>right top</td>
            </tr>
            <tr>
              <td>left middle</td><td /><td className={readmeStyles.target}>Target</td><td /><td>right middle</td>
            </tr>
            <tr>
              <td>left bottom</td><td /><td /><td /><td>right bottom</td>
            </tr>
            <tr>
              <td /><td>bottom left</td><td>bottom center</td><td>bottom right</td><td />
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <Heading type="3">onFlippedChange callback</Heading>
        <Description>
          The `onFlippedChange` callback will be called with the following arguments:
        </Description>
        <table className={readmeStyles.onFlippedChange}>
          <tbody>
            <tr>
              <th>Key</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
            <tr>
              <td>flipped</td>
              <td>boolean</td>
              <td>Whether the Layer has been moved away from its original position.</td>
            </tr>
            <tr>
              <td>actualPosition</td>
              <td>string</td>
              <td>The current position of the Layer (e.g. &quot;top left&quot;).</td>
            </tr>
            <tr>
              <td>originalPosition</td>
              <td>string</td>
              <td>The position that the Layer originally tried to position itself at.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Readme>
  ));
/* eslint-enable max-len */
