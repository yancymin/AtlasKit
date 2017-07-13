import React from 'react';
import { Link } from 'react-router-dom';
/* eslint-disable import/no-duplicates, import/first */
import ButtonAppearances from './ButtonAppearances';
import buttonAppearancesSrc from '!raw-loader!./ButtonAppearances';
import ButtonOptions from './ButtonOptions';
import buttonOptionsSrc from '!raw-loader!./ButtonOptions';
import ButtonSelect from './ButtonSelect';
import buttonSelectSrc from '!raw-loader!./ButtonSelect';
import ButtonDark from './ButtonDark';
import buttonDarkSrc from '!raw-loader!./ButtonDark';
/* eslint-enable import/no-duplicates, import/first */

export const description = (
  <div>
    <p>
      Buttons are used as triggers for actions. They are used in forms,
      toolbars, dialog footers and as stand-alone action triggers.
    </p>
    <p>
      <strong>Note:</strong> If you want to use multiple buttons in a row, use
      the <Link to="/components/button-group">Button Group</Link> component to wrap
      the Buttons.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Appearance Options',
    Component: ButtonAppearances,
    src: buttonAppearancesSrc,
  },
  {
    title: 'Dark Themed Buttons',
    Component: ButtonDark,
    src: buttonDarkSrc,
  },
  {
    title: 'Selectable button',
    Component: ButtonSelect,
    src: buttonSelectSrc,
  },
  {
    title: 'Other Options',
    Component: ButtonOptions,
    src: buttonOptionsSrc,
  },

];
