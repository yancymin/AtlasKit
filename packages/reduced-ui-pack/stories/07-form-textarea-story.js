import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Chrome, Code } from '@atlaskit/util-readme';

import { name } from '../package.json';

/* eslint-disable quotes, max-len,  */
const html = `<form>
  <h2>Add a comment</h2>
  <div class="ak-field-group">
    <label for="description">Comment</label>
    <textarea class="ak-field-textarea" rows="5" id="comment" name="comment"></textarea>
  </div>
  <div class="ak-field-group">
    <button class="ak-button ak-button__appearance-primary">Submit</button>
  </div>
</form>`;

const jsx = (<form onSubmit={e => e.preventDefault()}>
  <h2>Add a comment</h2>
  <div className="ak-field-group">
    <label htmlFor="description">Comment</label>
    <textarea className="ak-field-textarea" rows="5" id="comment" name="comment" />
  </div>
  <div className="ak-field-group">
    <button className="ak-button ak-button__appearance-primary">Add comment</button>
  </div>
</form>);

storiesOf(name, module)
  .add('Forms — textarea', () => (
    <Chrome title="Textarea fields">
      <Code code={html} language="html">
        {jsx}
      </Code>
    </Chrome>
  ));
