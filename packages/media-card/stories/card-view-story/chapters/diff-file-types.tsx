import * as React from 'react';
import {
  // file details
  videoFileDetails,
  audioFileDetails,
  docFileDetails,
  imageFileDetails,
  unknownFileDetails,
} from '@atlaskit/media-test-helpers';

import {CardView, CardAppearance} from '../../../src';

export const createFileCardsWithDifferentMediaTypes = (appearance: CardAppearance) => {
  const fileMediaTypeCards = [
    {
      title: 'Image',
      content: <CardView appearance={appearance} status="complete" metadata={imageFileDetails} />
    }, {
      title: 'Video',
      content: <CardView appearance={appearance} status="complete" metadata={videoFileDetails} />
    }, {
      title: 'Audio',
      content: <CardView appearance={appearance} status="complete" metadata={audioFileDetails} />
    }, {
      title: 'Doc',
      content: <CardView appearance={appearance} status="complete" metadata={docFileDetails} />
    }, {
      title: 'Unknown',
      content: <CardView appearance={appearance} status="complete" metadata={unknownFileDetails} />
    }
  ];

  return fileMediaTypeCards;
};
