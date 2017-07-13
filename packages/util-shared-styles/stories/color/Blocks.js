import { Tooltip } from '@atlaskit/tooltip';
import React from 'react';
import naturalSort from 'javascript-natural-sort';
import wcagContrast from 'wcag-contrast';
import uid from 'uid';

import styles from './styles.less';

import Block from './Block';
import * as lessVars from '../../src';
import Prism, {
  SWATCH_PRIMARY,
  SWATCH_SECONDARY,
  tintRgx,
} from '../../jest/unit/_Prism';

const {
  akColorN0: alternateTextColor,
  akColorN800: defaultTextColor,
} = lessVars;
const tooltipId = `tooltip-${uid()}`;
const prism = new Prism(lessVars);

function sortEntryNaturalByName(a, b) {
  const [nameA] = a;
  const [nameB] = b;
  return naturalSort(nameA, nameB);
}

function getTextColorBasedOnBackground(backgroundColor) {
  const contrast = wcagContrast.hex(backgroundColor, defaultTextColor);
  return wcagContrast.score(contrast) !== '' ? defaultTextColor : alternateTextColor;
}

function getDescriptionForColor(color) {
  const colorName = prism
    .getColorNames(color)
    .filter((cName) => {
      const swatch = Prism.getSwatchFromColorName(cName);
      return swatch !== SWATCH_PRIMARY && swatch !== SWATCH_SECONDARY;
    })
    .shift();
  const swatch = Prism.getSwatchFromColorName(colorName);
  const displayName = Prism.getNameFromSwatch(swatch);
  const colorNumber = Prism.getColorNumberFromColorName(colorName);
  return `${displayName} ${swatch}${colorNumber}`;
}

/**
* This returns the nearest color value for a given color name
* For a neutral tint, this would return the according neutral
*/
function getNearestColorValue(colorName) {
  if (Prism.isTint(colorName)) {
    return prism.getColorByName(colorName.replace(tintRgx, ''));
  }
  return prism.getColorByName(colorName);
}

const Blocks = props => (
  <div className={styles.Blocks}>
    {
      props.entries
        .sort(sortEntryNaturalByName)
        .map(([colorName, color]) => {
          const textColor = getTextColorBasedOnBackground(getNearestColorValue(colorName));
          return (
            <Block
              key={colorName}
              tooltipId={tooltipId}
              description={getDescriptionForColor(color)}
              backgroundColor={color}
              foregroundColor={textColor}
            />
          );
        })
    }
    <Tooltip id={tooltipId} />
  </div>
);
Blocks.propTypes = {
  entries: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.string)),
};

export default Blocks;
