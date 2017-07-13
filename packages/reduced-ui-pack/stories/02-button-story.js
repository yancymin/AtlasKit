import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Chrome, Code } from '@atlaskit/util-readme';

import { name } from '../package.json';

/* eslint-disable quotes, max-len,  */

const defaultButtonHTML = `<button type="button" class="ak-button ak-button__appearance-default">Default ak-button</button>`;
const defaultButtonJSX = <button type="button" className="ak-button ak-button__appearance-default">Default ak-button</button>;
const defaultButtonDisabledHTML = `<button type="button" class="ak-button ak-button__appearance-default" disabled>Default ak-button</button>`;
const defaultButtonDisabledJSX = <button type="button" className="ak-button ak-button__appearance-default" disabled>Default ak-button</button>;

const subtleButtonHTML = `<button type="button" class="ak-button ak-button__appearance-subtle">Subtle ak-button</button>`;
const subtleButtonJSX = <button type="button" className="ak-button ak-button__appearance-subtle">Subtle ak-button</button>;
const subtleButtonDisabledHTML = `<button type="button" class="ak-button ak-button__appearance-subtle" disabled>Subtle ak-button</button>`;
const subtleButtonDisabledJSX = <button type="button" className="ak-button ak-button__appearance-subtle" disabled>Subtle ak-button</button>;

const primaryButtonHTML = `<button type="button" class="ak-button ak-button__appearance-primary">Primary ak-button</button>`;
const primaryButtonJSX = <button type="button" className="ak-button ak-button__appearance-primary">Primary ak-button</button>;
const primaryButtonDisabledHTML = `<button type="button" class="ak-button ak-button__appearance-primary" disabled>Primary ak-button</button>`;
const primaryButtonDisabledJSX = <button type="button" className="ak-button ak-button__appearance-primary" disabled>Primary ak-button</button>;

const linkButtonHTML = `<button type="button" class="ak-button ak-button__appearance-link">Link ak-button</button>`;
const linkButtonJSX = <button type="button" className="ak-button ak-button__appearance-link">Link ak-button</button>;
const linkButtonDisabledHTML = `<button type="button" class="ak-button ak-button__appearance-link" disabled>Link ak-button</button>`;
const linkButtonDisabledJSX = <button type="button" className="ak-button ak-button__appearance-link" disabled>Link ak-button</button>;

const subtleLinkButtonHTML = `<button type="button" class="ak-button ak-button__appearance-subtle-link">Subtle link ak-button</button>`;
const subtleLinkButtonJSX = <button type="button" className="ak-button ak-button__appearance-subtle-link">Subtle link ak-button</button>;
const subtleLinkButtonDisabledHTML = `<button type="button" class="ak-button ak-button__appearance-subtle-link" disabled>Subtle link ak-button</button>`;
const subtleLinkButtonDisabledJSX = <button type="button" className="ak-button ak-button__appearance-subtle-link" disabled>Subtle link ak-button</button>;

storiesOf(name, module)
  .add('Buttons', () => (
    <Chrome title="Buttons">
      <h2>default appearance</h2>
      <Code code={defaultButtonHTML}>
        {defaultButtonJSX}
      </Code>
      <h2>subtle appearance</h2>
      <Code code={subtleButtonHTML}>
        {subtleButtonJSX}
      </Code>
      <h2>primary appearance</h2>
      <Code code={primaryButtonHTML}>
        {primaryButtonJSX}
      </Code>
      <h2>link appearance</h2>
      <Code code={linkButtonHTML}>
        {linkButtonJSX}
      </Code>
      <h2>subtle-link appearance</h2>
      <Code code={subtleLinkButtonHTML}>
        {subtleLinkButtonJSX}
      </Code>
    </Chrome>
  ))
  .add('Buttons — disabled', () => (
    <Chrome title="Buttons — disabled">
      <h2>default appearance</h2>
      <Code code={defaultButtonDisabledHTML}>
        {defaultButtonDisabledJSX}
      </Code>
      <h2>subtle appearance</h2>
      <Code code={subtleButtonDisabledHTML}>
        {subtleButtonDisabledJSX}
      </Code>
      <h2>primary appearance</h2>
      <Code code={primaryButtonDisabledHTML}>
        {primaryButtonDisabledJSX}
      </Code>
      <h2>link appearance</h2>
      <Code code={linkButtonDisabledHTML}>
        {linkButtonDisabledJSX}
      </Code>
      <h2>subtle-link appearance</h2>
      <Code code={subtleLinkButtonDisabledHTML}>
        {subtleLinkButtonDisabledJSX}
      </Code>
    </Chrome>
  ));
