import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Button from '@atlaskit/button';

import FieldRadioGroup, { AkFieldRadioGroup } from '../src';
import { name } from '../package.json';
import {
  sampleItems,
  sampleItemsWithSelection,
  sampleItemsWithDefault,
  longSampleWithDefault,
} from './_constants';

const formTestUrl = '//httpbin.org/get';

function radioGroupSubmitStory(content) {
  return (
    <div>
      <form
        action={formTestUrl}
        method="get"
        style={{ backgroundColor: 'white', padding: '40px', width: '500px' }}
        target="myFrame"
      >
        {content}
        <p>
          <Button type="submit" appearance="primary">Submit</Button>
        </p>
      </form>
      <p>The data submitted by the form will appear below:</p>
      <iframe src="" name="myFrame" style={{ width: '50%', height: '300px' }} />
    </div>
  );
}

function changeHandler(event) {
  console.log(`Radio item for "${event.target.value}" was selected`);
}

const imports = [
  ['React', 'react'],
  ['{ AkFieldRadioGroup }', 'ak-field-radio-group'],
];

const smartImports = [
  ['React', 'react'],
  ['FieldRadioGroup', 'ak-field-radio-group'],
];

storiesOf(name, module)
  .addCodeExampleStory('Simple radio group (dumb)', () => (
    <AkFieldRadioGroup
      items={sampleItems}
      label="Pick your favourite animal:"
      onRadioChange={changeHandler}
    />
), { imports, scripts: [changeHandler] })
  .add('Simple radio group (dumb) with selection', () => (
    <AkFieldRadioGroup
      items={sampleItemsWithSelection}
      label="Pick your favourite animal:"
      onRadioChange={changeHandler}
    />
  ))
  .addCodeExampleStory('Simple radio group', () => (
    <FieldRadioGroup
      items={sampleItems}
      label="Pick your favourite animal:"
    />
  ), { imports: smartImports })
  .add('Simple radio group with submit test', () => radioGroupSubmitStory(
    <FieldRadioGroup
      items={sampleItems}
      label="Pick your favourite animal:"
      isRequired
    />
  ))
  .addCodeExampleStory('Radio group with default value', () => (
    <FieldRadioGroup
      items={sampleItemsWithDefault}
      label="Pick your favourite animal:"
    />
  ), { imports: smartImports })
  .add('Radio group with many items and default', () => (
    <FieldRadioGroup
      items={longSampleWithDefault}
      label="Who is your favourite Simpsons character?"
    />
));
