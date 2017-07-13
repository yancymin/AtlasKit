import * as React from 'react';
import {MediaItemDetails} from '@atlaskit/media-core';

import {CardView, CardAppearance, CardDimensions} from '../../../src';
import {actions} from './utils';

const dimensions: Array<CardDimensions> = [
  {
    width: '80px',
    height: '80px'
  },
  {
    width: '80px',
    height: '250px'
  },
  {
    width: '350px',
    height: '80px'
  }
];

export const createCardsOfDifferentSize = (appearance: CardAppearance, metadata: MediaItemDetails, dataURI?: string) => {
  const cards = dimensions.map(dim => {
    return {
      title: `${dim.width} x ${dim.height}`,
      content: (
        <CardView
          appearance={appearance}
          status="complete"

          metadata={metadata}
          dataURI={dataURI}

          dimensions={dim}

          actions={actions}
        />
      )
    };
  });

  return cards;
};
