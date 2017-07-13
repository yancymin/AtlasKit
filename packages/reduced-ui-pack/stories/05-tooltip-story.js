import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Chrome, Code } from '@atlaskit/util-readme';

import '../src/index.less';
import { name } from '../package.json';
import TooltipExample from './components/TooltipExample';

const tooltipExampleHTML = `<!-- allowed positions are 'top', 'right', 'bottom', 'left' -->
<button data-ak-tooltip="Oh hi there" data-ak-tooltip-position="top">Hover me</button>

<a href="https://atlassian.com" data-ak-tooltip="Oh hi there" data-ak-tooltip-position="top">Hover me</a>
`;

storiesOf(name, module)
  .add('Tooltip', () => (
    <Chrome title="Tooltip">
      <Code code={tooltipExampleHTML}>
        <p>
          Note that tooltips are only available for <code>button</code> elements, and
          <code>a</code> elements with an <code>href</code> attribute.
        </p>
        <h2>Button triggers</h2>
        <TooltipExample type="button" position="top" />
        <TooltipExample type="button" position="right" />
        <TooltipExample type="button" position="bottom" />
        <TooltipExample type="button" position="left" />
        <TooltipExample
          type="button"
          buttonText="Long text"
          tooltip="Oh hi there I am a tooltip with way too much text, let us see how I behave!"
        />

        <h2>Link triggers</h2>
        <TooltipExample type="link" position="top" />
        <TooltipExample type="link" position="right" />
        <TooltipExample type="link" position="bottom" />
        <TooltipExample type="link" position="left" />
        <TooltipExample
          type="link"
          buttonText="Long text"
          tooltip="Oh hi there I am a tooltip with way too much text, let us see how I behave!"
        />

        <h2>Non-interactive triggers</h2>
        <TooltipExample type="span" position="top" />
        <TooltipExample type="span" position="right" />
        <TooltipExample type="span" position="bottom" />
        <TooltipExample type="span" position="left" />
        <TooltipExample
          type="span"
          buttonText="Long text"
          tooltip="Oh hi there I am a tooltip with way too much text, let us see how I behave!"
        />
      </Code>
    </Chrome>
  ));
