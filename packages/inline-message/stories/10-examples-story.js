import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Chrome } from '@atlaskit/util-readme';

import InlineMessage from '@atlaskit/inline-message';
import { name } from '../package.json';
import DualExample from './examples/DualExample';

storiesOf(name, module)
  .add('Inline message — types', () => (
    <Chrome title="Inline message — types">
      <DualExample
        type="connectivity"
        title="JIRA Service Desk"
        secondaryText="Authenticate to see more information"
      />

      <DualExample
        type="confirmation"
        title="JIRA Service Desk"
        secondaryText="Authenticate to see more information"
      />

      <DualExample
        type="info"
        title="JIRA Service Desk"
        secondaryText="Authenticate to see more information"
      />

      <DualExample
        type="warning"
        title="JIRA Service Desk"
        secondaryText="Authenticate to see more information"
      />

      <DualExample
        type="error"
        title="JIRA Service Desk"
        secondaryText="Authenticate to see more information"
      />
    </Chrome>
  ))
  .add('Inline message — with long text', () => (
    <Chrome title="Inline message — with long text">
      <p>The below paragraph is 400px wide.</p>
      <p style={{ border: '2px solid #999', width: 400 }}>
        <InlineMessage
          title="Cookie tart chocolate bar jelly toffee."
          secondaryText="Carrot cake chocolate bar caramels. Wafer jelly beans toffee chocolate ice cream jujubes candy canes. Sugar plum brownie jelly chocolate cake. Candy canes topping halvah tiramisu caramels dessert brownie jelly-o. Sweet tart cookie cupcake jelly-o jelly caramels bear claw."
        />
      </p>
    </Chrome>
  ))
  .add('Inline message — with dialog on the right', () => (
    <Chrome title="Inline message — with dialog on the right">
      <InlineMessage
        title="JIRA Service Desk"
        secondaryText="Authenticate to see more information"
        position="right middle"
      />
    </Chrome>
  ));
