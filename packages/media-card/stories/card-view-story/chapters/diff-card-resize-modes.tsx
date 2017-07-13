import * as React from 'react';
import {ImageResizeMode} from '@atlaskit/media-core';
import {wideTransparentImage, tallImage, smallImage, smallTransparentImage} from '@atlaskit/media-test-helpers';

import {CardView} from '../../../src';

const images = [wideTransparentImage, tallImage, smallImage, smallTransparentImage];
const resizeModes: Array<ImageResizeMode> = ['crop', 'fit', 'full-fit'];

export const createCardsOfDifferentResizeModes = () => {
  return resizeModes.map(mode => {
    const content = images.map(img => (
      <CardView
        appearance="image"
        status="complete"
        resizeMode={mode}
        dataURI={img}
      />
    ));

    return {
      title: mode,
      content
    };
  });
};
