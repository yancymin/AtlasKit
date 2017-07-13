import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Chrome, Code } from '@atlaskit/util-readme';

import { name } from '../package.json';

/* eslint-disable quotes, max-len,  */
const html = `<form>
  <h2>Favourite things</h2>
  <div class="ak-field-group">
    <label for="fav-fruit">Favourite fruit</label>
    <select class="ak-field-select" id="fav-fruit" name="fav-fruit">
      <optgroup label="Standard">
        <option>Apple</option>
        <option>Banana</option>
        <option selected>Cherry</option>
        <option>Orange</option>
        <option>Pear</option>
        <option>Strawberry</option>
        <option>Watermelon</option>
      </optgroup>
      <optgroup label="Exotic">
        <option>Durian</option>
        <option>Longan</option>
        <option>Lychee</option>
        <option>Paw paw</option>
        <option>Persimmon</option>
      </optgroup>
    </select>
  </div>
  <div class="ak-field-group">
    <label for="fav-fruit-multiple">Favourite fruit (multi select)</label>
    <select class="ak-field-select" multiple id="fav-fruit-multiple" name="fav-fruit-multiple">
      <optgroup label="Standard">
        <option selected>Apple</option>
        <option>Banana</option>
        <option selected>Cherry</option>
        <option>Orange</option>
        <option>Pear</option>
        <option>Strawberry</option>
        <option>Watermelon</option>
      </optgroup>
      <optgroup label="Exotic">
        <option>Durian</option>
        <option>Longan</option>
        <option>Lychee</option>
        <option selected>Paw paw</option>
        <option>Persimmon</option>
      </optgroup>
    </select>
  </div>
  <div class="ak-field-group">
    <button class="ak-button ak-button__appearance-primary">Save</button>
  </div>
</form>`;

const jsx = (<form onSubmit={e => e.preventDefault()}>
  <h2>Favourite things</h2>
  <div className="ak-field-group">
    <label htmlFor="fav-fruit">Favourite fruit</label>
    <select className="ak-field-select" id="fav-fruit" name="fav-fruit">
      <optgroup label="Standard">
        <option>Apple</option>
        <option>Banana</option>
        <option selected>Cherry</option>
        <option>Orange</option>
        <option>Pear</option>
        <option>Strawberry</option>
        <option>Watermelon</option>
      </optgroup>
      <optgroup label="Exotic">
        <option>Durian</option>
        <option>Longan</option>
        <option>Lychee</option>
        <option>Paw paw</option>
        <option>Persimmon</option>
      </optgroup>
    </select>
  </div>
  <div className="ak-field-group">
    <label htmlFor="fav-fruit-multiple">Favourite fruit (multi select)</label>
    <select className="ak-field-select" multiple id="fav-fruit-multiple" name="fav-fruit-multiple">
      <optgroup label="Standard">
        <option selected>Apple</option>
        <option>Banana</option>
        <option selected>Cherry</option>
        <option>Orange</option>
        <option>Pear</option>
        <option>Strawberry</option>
        <option>Watermelon</option>
      </optgroup>
      <optgroup label="Exotic">
        <option>Durian</option>
        <option>Longan</option>
        <option>Lychee</option>
        <option selected>Paw paw</option>
        <option>Persimmon</option>
      </optgroup>
    </select>
  </div>
  <div className="ak-field-group">
    <button className="ak-button ak-button__appearance-primary">Save</button>
  </div>
</form>);

storiesOf(name, module)
  .add('Forms — select fields', () => (
    <Chrome title="Select fields">
      <Code code={html} language="html">
        {jsx}
      </Code>
    </Chrome>
  ));
