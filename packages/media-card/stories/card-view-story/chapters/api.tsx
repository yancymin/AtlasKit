import * as React from 'react';
import {action} from '@kadira/storybook';
import {MediaItemDetails} from '@atlaskit/media-core';
import {
  gifDataUri
} from '@atlaskit/media-test-helpers';

import {CardView, CardAppearance, CardEvent} from '../../../src';
import {actions} from './utils';

const clickHandler = (result: CardEvent) => {
  result.event.preventDefault();
  action('click')(result.mediaItemDetails);
};

const mouseEnterHandler = (result: CardEvent) => {
  result.event.preventDefault();
  action('mouseEnter')(result.mediaItemDetails);
};

export const createApiCards = (appearance: CardAppearance, metadata: MediaItemDetails) => {
  // API methods
  const apiCards = [
    {
      title: 'status = complete',
      content: (
        <CardView
          status="complete"
          appearance={appearance}
          metadata={metadata}
          dataURI={gifDataUri}
          onClick={clickHandler}
          onMouseEnter={mouseEnterHandler}
          actions={actions}
        />
      )
    },
    {
      title: 'status = error',
      content: (
        <CardView
          status="error"
          appearance={appearance}
          metadata={metadata}
          dataURI={gifDataUri}
          onClick={clickHandler}
          onMouseEnter={mouseEnterHandler}
          actions={actions}
        />
      )
    },
    {
      title: 'status = loading',
      content: (
        <CardView
          status="loading"
          appearance={appearance}
          metadata={metadata}
          dataURI={gifDataUri}
          onClick={clickHandler}
          onMouseEnter={mouseEnterHandler}
          actions={actions}
        />
      )
    }
  ];

  const uploadCardWithApi = {
    title: 'status = uploading',
    content: (
      <CardView
        status="uploading"
        appearance={appearance}
        metadata={metadata}
        dataURI={gifDataUri}
        onClick={clickHandler}
        onMouseEnter={mouseEnterHandler}
        actions={actions}
      />
    )
  };

  if (appearance === 'image') {
    return [...apiCards, uploadCardWithApi];
  }

  return apiCards;
};
