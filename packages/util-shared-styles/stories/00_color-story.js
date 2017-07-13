import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { name } from '../package.json';
import * as lessVars from '../src';
import Prism, {
  SWATCH_PRIMARY,
  SWATCH_SECONDARY,
  SWATCH_NEUTRAL,
  SWATCH_RED,
  SWATCH_TEAL,
  SWATCH_PURPLE,
  SWATCH_GREEN,
  SWATCH_YELLOW,
  SWATCH_BLUE,
} from '../jest/unit/_Prism';
import Blocks from './color/Blocks';

const prism = new Prism(lessVars);
const neutrals = Object.entries(prism.getColorsBySwatch(SWATCH_NEUTRAL));
const tintFilter = ([colorName]) => Prism.isTint(colorName);

storiesOf(name, module)
  .add('Colors: Primary', () => (
    <Blocks entries={Object.entries(prism.getColorsBySwatch(SWATCH_PRIMARY))} />
  ))
  .add('Colors: Secondary', () => (
    <Blocks entries={Object.entries(prism.getColorsBySwatch(SWATCH_SECONDARY))} />
  ))
  .add('Colors: Neutrals', () => {
    const neutralNoTints = neutrals.filter(entry => !tintFilter(entry));
    return (
      <Blocks entries={neutralNoTints} />
    );
  })
  .add('Colors: Neutrals (tints)', () => {
    const neutralTints = neutrals.filter(entry => tintFilter(entry));
    return (
      <Blocks entries={neutralTints} />
    );
  })
  .add('Colors: Swatches', () => {
    const swatches = [
      SWATCH_RED,
      SWATCH_YELLOW,
      SWATCH_GREEN,
      SWATCH_BLUE,
      SWATCH_PURPLE,
      SWATCH_TEAL,
    ];
    return (
      <div style={{ display: 'flex' }}>
        {swatches.map(swatch => (
          <Blocks key={swatch} entries={Object.entries(prism.getColorsBySwatch(swatch))} />
        ))}
      </div>
    );
  });
