import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Chrome, Code } from '@atlaskit/util-readme';

import { name } from '../package.json';

/* eslint-disable quotes, max-len,  */
const html = `<form>
  <h1>All fields required</h1>
  <div class="ak-field-group">
    <label for="username">Username</label>
    <input type="text" class="ak-field-text" id="username" name="username" placeholder="eg. you@yourcompany.com" required>
  </div>
  <div class="ak-field-group">
    <label for="password">Password</label>
    <input type="password" class="ak-field-password" id="password" name="password" required>
  </div>
  <div class="ak-field-group">
    <label for="description">Description</label>
    <textarea class="ak-field-textarea" rows="3" id="description" name="description" required>
  </div>
  <div class="ak-field-group">
    <label for="fav-movie">Favourite movie</label>
    <select class="ak-field-select" id="fav-movie" name="fav-movie" required>
      <option value="">Choose a favourite</option>
      <option value="sw">Star Wars</option>
      <option value="hp">Harry Potter and the Half-Blood Prince</option>
      <option value="lotr">The Lord of the Rings</option>
    </select>
  </div>
  <div class="ak-field-group">
    <label for="fruit">Fruit</label>
    <select class="ak-field-select" multiple id="fruit" name="fruit" required>
      <option>Apple</option>
      <option>Banana</option>
      <option>Cherry</option>
      <option>Orange</option>
      <option>Pear</option>
      <option>Strawberry</option>
      <option>Watermelon</option>
    </select>
  </div>
  <div class="ak-field-group">
    <label for="search">Search</label>
    <input type="search" class="ak-field-search" id="search" name="search" required>
  </div>
  <div class="ak-field-group">
    <label for="email">Email</label>
    <input type="email" class="ak-field-email" id="email" name="email" required>
  </div>
  <div class="ak-field-group">
    <label for="url">Url</label>
    <input type="url" class="ak-field-url" id="url" name="url" required>
  </div>
  <div class="ak-field-group">
    <label for="tel">Tel</label>
    <input type="tel" class="ak-field-tel" id="tel" name="tel" required>
  </div>
  <div class="ak-field-group">
    <label for="number">Number</label>
    <input type="number" class="ak-field-number" id="number" name="number" placeholder="between 10 and 20 only" min="10" max="20" required>
  </div>
  <div class="ak-field-group">
    <label for="range">Range</label>
    <input type="range" class="ak-field-range" id="range" name="range">
  </div>
  <div class="ak-field-group">
    <label for="date">Date</label>
    <input type="date" class="ak-field-date" id="date" name="date" required>
  </div>
  <div class="ak-field-group">
    <label for="month">Month</label>
    <input type="month" class="ak-field-month" id="month" name="month" required>
  </div>
  <div class="ak-field-group">
    <label for="week">Week</label>
    <input type="week" class="ak-field-week" id="week" name="week" required>
  </div>
  <div class="ak-field-group">
    <label for="time">Time</label>
    <input type="time" class="ak-field-time" id="time" name="time" required>
  </div>
  <div class="ak-field-group">
    <label for="datetime-local">Datetime-local</label>
    <input type="datetime-local" class="ak-field-datetime-local" id="datetime-local" name="datetime-local" required>
  </div>
  <div class="ak-field-group">
    <label for="color">Color</label>
    <input type="color" class="ak-field-color" id="color" name="color" required>
  </div>
  <div class="ak-field-group">
    <button class="ak-button ak-button__appearance-primary">Submit</button>
  </div>
</form>`;
const jsx = (<form onSubmit={e => e.preventDefault()}>
  <h1>All fields required</h1>
  <div className="ak-field-group">
    <label htmlFor="username">Username</label>
    <input type="text" className="ak-field-text" id="username" name="username" placeholder="eg. you@yourcompany.com" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="ak-field-password" id="password" name="password" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="description">Description</label>
    <textarea className="ak-field-textarea" rows="3" id="description" name="description" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="fav-movie">Favourite movie</label>
    <select className="ak-field-select" id="fav-movie" name="fav-movie" required>
      <option value="">Choose a favourite</option>
      <option value="sw">Star Wars</option>
      <option value="hp">Harry Potter and the Half-Blood Prince</option>
      <option value="lotr">The Lord of the Rings</option>
    </select>
  </div>
  <div className="ak-field-group">
    <label htmlFor="fruit">Fruit</label>
    <select className="ak-field-select" multiple id="fruit" name="fruit" required>
      <option>Apple</option>
      <option>Banana</option>
      <option>Cherry</option>
      <option>Orange</option>
      <option>Pear</option>
      <option>Strawberry</option>
      <option>Watermelon</option>
    </select>
  </div>
  <div className="ak-field-group">
    <label htmlFor="search">Search</label>
    <input type="search" className="ak-field-search" id="search" name="search" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="email">Email</label>
    <input type="email" className="ak-field-email" id="email" name="email" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="url">Url</label>
    <input type="url" className="ak-field-url" id="url" name="url" required value="asewrkjasdflkj" disabled />
  </div>
  <div className="ak-field-group">
    <label htmlFor="tel">Tel</label>
    <input type="tel" className="ak-field-tel" id="tel" name="tel" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="number">Number</label>
    <input type="number" className="ak-field-number" id="number" name="number" placeholder="between 10 and 20 only" min="10" max="20" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="range">Range</label>
    <input type="range" className="ak-field-range" id="range" name="range" />
  </div>
  <div className="ak-field-group">
    <label htmlFor="date">Date</label>
    <input type="date" className="ak-field-date" id="date" name="date" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="month">Month</label>
    <input type="month" className="ak-field-month" id="month" name="month" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="week">Week</label>
    <input type="week" className="ak-field-week" id="week" name="week" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="time">Time</label>
    <input type="time" className="ak-field-time" id="time" name="time" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="datetime-local">Datetime-local</label>
    <input type="datetime-local" className="ak-field-datetime-local" id="datetime-local" name="datetime-local" required />
  </div>
  <div className="ak-field-group">
    <label htmlFor="color">Color</label>
    <input type="color" className="ak-field-color" id="color" name="color" required />
  </div>
  <div className="ak-field-group">
    <button className="ak-button ak-button__appearance-primary">Submit</button>
  </div>
</form>);

storiesOf(name, module)
  .add('Forms — validation', () => (
    <Chrome title="Example form to test native HTML5 validation">
      <Code code={html}>
        {jsx}
      </Code>
    </Chrome>
  ));
