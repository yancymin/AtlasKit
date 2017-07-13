import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Chrome, Code } from '@atlaskit/util-readme';

import { name } from '../package.json';

/* eslint-disable quotes, max-len,  */
const html = `<form>
  <h2>Log in form</h2>
  <div class="ak-field-group">
    <label for="username">Username</label>
    <input type="text" class="ak-field-text" id="username" name="username" placeholder="eg. you@yourcompany.com" autofocus>
  </div>
  <div class="ak-field-group">
    <label for="password">Password</label>
    <input type="password" class="ak-field-password" id="password" name="password">
  </div>
  <div className="ak-field-group">
    <button class="ak-button ak-button__appearance-primary">Submit</button>
  </div>
</form>`;

const jsx = (<form onSubmit={e => e.preventDefault()}>
  <h2>Log in form</h2>
  <div className="ak-field-group">
    <label htmlFor="username">Username</label>
    <input type="text" className="ak-field-text ak-field__size-medium" id="username" name="username" placeholder="eg. you@yourcompany.com" autoFocus />
  </div>
  <div className="ak-field-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="ak-field-password ak-field__size-medium" id="password" name="password" />
  </div>
  <div className="ak-field-group">
    <button className="ak-button ak-button__appearance-primary">Log in</button>
  </div>
</form>);

storiesOf(name, module)
  .add('Forms — text/password inputs', () => (
    <Chrome title="Text/password fields">
      <Code code={html} language="html">
        {jsx}
      </Code>
    </Chrome>
  ));
