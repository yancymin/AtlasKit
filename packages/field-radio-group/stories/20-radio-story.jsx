import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { AkRadio } from '../src';
import { name } from '../package.json';

function changeHandler(event) {
  console.log(`Radio item for "${event.target.name}" was selected.`);
}

const imports = [
  ['React', 'react'],
  ['{ AkRadio }', 'ak-field-radio-group'],
];

const scripts = [changeHandler];

storiesOf(name, module)
  .addCodeExampleStory('Radio items', () => (
    <div>
      <AkRadio key={1} name="not-selected" value="true" onChange={changeHandler}>Not selected</AkRadio>
      <AkRadio key={2} name="selected" value="true" onChange={changeHandler} isSelected>Selected</AkRadio>
      <AkRadio key={3} name="disabled" value="true" onChange={changeHandler} isDisabled>Disabled</AkRadio>
      <AkRadio key={4} name="selected-disabled" value="true" onChange={changeHandler} isSelected isDisabled>Selected + disabled</AkRadio>
      <AkRadio key={5} name="markup-content" value="true" onChange={changeHandler}><b>Markup</b> in the <a href="/link">content</a></AkRadio>
    </div>
  ), { imports, scripts });
