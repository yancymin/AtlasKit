import * as React from 'react';
import {MediaItemType} from '@atlaskit/media-core';

import {CardView, CardAppearance} from '../../../src';

export const createErrorAndLoadingCards = (appearance: CardAppearance, mediaItemType: MediaItemType) => {
  return [
    {
      title: 'Loading',
      content: <CardView appearance={appearance} status="loading" mediaItemType={mediaItemType} />
    }, {
      title: 'Error',
      content: <CardView appearance={appearance} status="error" mediaItemType={mediaItemType} />
    }
  ];
};
