import * as React from 'react';
import {
  // file details
  genericFileDetails,

  // dataURIs for file cards
  tallImage,
  wideImage,
  wideTransparentImage,
  smallImage,
  smallTransparentImage
} from '@atlaskit/media-test-helpers';

import {CardView, CardAppearance} from '../../../src';

export const createFileCardsWithDifferentDataURIs = (appearance: CardAppearance) => {
  const dataURIs = [
    {name: 'tall image', dataURI: tallImage},
    {name: 'wide image', dataURI: wideImage},
    {name: 'wide transparent image', dataURI: wideTransparentImage},
    {name: 'small image', dataURI: smallImage},
    {name: 'small transparent image', dataURI: smallTransparentImage},
  ];

  return Object.keys(dataURIs).map(key => {
    const {name, dataURI} = dataURIs[key];

    return {
      title: name,
      content: <CardView appearance={appearance} status="complete" metadata={genericFileDetails} dataURI={dataURI} />
    };
  });
};
