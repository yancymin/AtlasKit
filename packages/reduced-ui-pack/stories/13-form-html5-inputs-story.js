import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Chrome, Code } from '@atlaskit/util-readme';

import { name } from '../package.json';

/* eslint-disable quotes, max-len,  */

const html = `<form>
  <div class="ak-field-group">
    <label for="search">Search</label>
    <input type="search" class="ak-field-search" id="search" name="search">
  </div>
  <div class="ak-field-group">
    <label for="email">Email</label>
    <input type="email" class="ak-field-email" id="email" name="email">
  </div>
  <div class="ak-field-group">
    <label for="url">Url</label>
    <input type="url" class="ak-field-url" id="url" name="url">
  </div>
  <div class="ak-field-group">
    <label for="tel">Tel</label>
    <input type="tel" class="ak-field-tel" id="tel" name="tel">
  </div>
  <div class="ak-field-group">
    <label for="number">Number</label>
    <input type="number" class="ak-field-number" id="number" name="number">
  </div>
  <div class="ak-field-group">
    <label for="range">Range</label>
    <input type="range" class="ak-field-range" id="range" name="range">
  </div>
  <div class="ak-field-group">
    <label for="date">Date</label>
    <input type="date" class="ak-field-date" id="date" name="date">
  </div>
  <div class="ak-field-group">
    <label for="month">Month</label>
    <input type="month" class="ak-field-month" id="month" name="month">
  </div>
  <div class="ak-field-group">
    <label for="week">Week</label>
    <input type="week" class="ak-field-week" id="week" name="week">
  </div>
  <div class="ak-field-group">
    <label for="time">Time</label>
    <input type="time" class="ak-field-time" id="time" name="time">
  </div>
  <div class="ak-field-group">
    <label for="datetime">Datetime</label>
    <input type="datetime" class="ak-field-datetime" id="datetime" name="datetime">
  </div>
  <div class="ak-field-group">
    <label for="datetime-local">Datetime-local</label>
    <input type="datetime-local" class="ak-field-datetime-local" id="datetime-local" name="datetime-local">
  </div>
  <div class="ak-field-group">
    <label for="color">Color</label>
    <input type="color" class="ak-field-color" id="color" name="color">
  </div>
  <div class="ak-field-group">
    <button class="ak-button ak-button__appearance-primary">Submit</button>
  </div>
</form>`;

const jsx = (<form onSubmit={e => e.preventDefault()}>
  <div className="ak-field-group">
    <label htmlFor="search">Search</label>
    <input type="search" className="ak-field-search" id="search" name="search" />
  </div>
  <div className="ak-field-group">
    <label htmlFor="email">Email</label>
    <input type="email" className="ak-field-email" id="email" name="email" />
  </div>
  <div className="ak-field-group">
    <label htmlFor="url">Url</label>
    <input type="url" className="ak-field-url" id="url" name="url" />
  </div>
  <div className="ak-field-group">
    <label htmlFor="tel">Tel</label>
    <input type="tel" className="ak-field-tel" id="tel" name="tel" />
  </div>
  <div className="ak-field-group">
    <label htmlFor="number">Number</label>
    <input type="number" className="ak-field-number" id="number" name="number" />
  </div>
  <div className="ak-field-group">
    <label htmlFor="range">Range</label>
    <input type="range" className="ak-field-range" id="range" name="range" />
  </div>
  <div className="ak-field-group">
    <label htmlFor="date">Date</label>
    <input type="date" className="ak-field-date" id="date" name="date" />
  </div>
  <div className="ak-field-group">
    <label htmlFor="month">Month</label>
    <input type="month" className="ak-field-month" id="month" name="month" />
  </div>
  <div className="ak-field-group">
    <label htmlFor="week">Week</label>
    <input type="week" className="ak-field-week" id="week" name="week" />
  </div>
  <div className="ak-field-group">
    <label htmlFor="time">Time</label>
    <input type="time" className="ak-field-time" id="time" name="time" />
  </div>
  <div className="ak-field-group">
    <label htmlFor="datetime-local">Datetime-local</label>
    <input type="datetime-local" className="ak-field-datetime-local" id="datetime-local" name="datetime-local" />
  </div>
  <div className="ak-field-group">
    <label htmlFor="color">Color</label>
    <input type="color" className="ak-field-color" id="color" name="color" />
  </div>
  <div className="ak-field-group">
    <button className="ak-button ak-button__appearance-primary">Submit</button>
  </div>
</form>);

storiesOf(name, module)
  .add('Forms — other HTML5 inputs', () => (
    <Chrome title="Other HTML5 inputs">
      <Code code={html} language="html">
        {jsx}
      </Code>
    </Chrome>
  ));
