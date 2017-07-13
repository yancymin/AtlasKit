import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Chrome, Code } from '@atlaskit/util-readme';

import { name } from '../package.json';

/* eslint-disable quotes, max-len,  */
const html = `<form>
  <h2>Settings</h2>
  <fieldset class="ak-field-group">
    <legend><span>Time display options</span></legend>
    <div class="ak-field-radio">
      <input type="radio" name="option" id="option1" value="option1" checked>
      <label for="option1">Use relative times (eg. 2 minutes ago)</label>
    </div>
    <div class="ak-field-radio">
      <input type="radio" name="option" id="option2" value="option2">
      <label for="option2">Use your time zone</label>
    </div>
    <div class="ak-field-radio">
      <input type="radio" name="option" id="option3" value="option3" disabled>
      <label for="option3">Use the server time</label>
    </div>
  </fieldset>
  <div class="ak-field-group">
    <button class="ak-button ak-button__appearance-primary">Save</button>
  </div>
</form>`;

const jsx = (<form onSubmit={e => e.preventDefault()}>
  <h2>Settings</h2>
  <fieldset className="ak-field-group">
    <legend><span>Time display options</span></legend>
    <div className="ak-field-radio">
      <input type="radio" name="option" id="option1" value="option1" defaultChecked />
      <label htmlFor="option1">Use relative times (eg. 2 minutes ago)</label>
    </div>
    <div className="ak-field-radio">
      <input type="radio" name="option" id="option2" value="option2" />
      <label htmlFor="option2">Use your time zone</label>
    </div>
    <div className="ak-field-radio">
      <input type="radio" name="option" id="option3" value="option3" disabled />
      <label htmlFor="option3">Use the server time</label>
    </div>
  </fieldset>
  <div className="ak-field-group">
    <button className="ak-button ak-button__appearance-primary">Save</button>
  </div>
</form>);

storiesOf(name, module)
  .add('Forms — radio buttons', () => (
    <Chrome title="Radio buttons">
      <Code code={html} language="html">
        {jsx}
      </Code>
    </Chrome>
  ));
