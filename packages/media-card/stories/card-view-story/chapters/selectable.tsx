import * as React from 'react';
import {MediaItemType, MediaItemDetails} from '@atlaskit/media-core';
import {
  gifDataUri
} from '@atlaskit/media-test-helpers';

import {CardView, CardAppearance} from '../../../src';
import {actions} from './utils';

export const createSelectableCards = (appearance: CardAppearance, metadata: MediaItemDetails, mediaItemType: MediaItemType) => {
  const dataURI = mediaItemType === 'file' ? gifDataUri : undefined;

  return [
    {
      title: 'Complete - Selectable',
      content: <CardView appearance={appearance} status="complete" metadata={metadata} dataURI={dataURI} selectable={true} />
    }, {
      title: 'Complete - Selected',
      content: <CardView appearance={appearance} status="complete" metadata={metadata} dataURI={dataURI} selectable={true} selected={true} />
    }, {
      title: 'Uploading - Selectable',
      content: <CardView appearance={appearance} status="uploading" progress={0.3} metadata={metadata}  dataURI={dataURI} selectable={true} />
    }, {
      title: 'Uploading - Selected',
      content: <CardView appearance={appearance} status="uploading" progress={0.7} metadata={metadata} dataURI={dataURI} selectable={true} selected={true} />
    }, {
      title: 'Uploading - Selected (with delete)',
      content: <CardView appearance={appearance} status="uploading" progress={0.7} actions={actions.slice(2)} metadata={metadata} dataURI={dataURI} selectable={true} selected={true} />
    }
  ];
};

export const createSelectableCardsWithMenu = (appearance: CardAppearance, metadata: MediaItemDetails, mediaItemType: MediaItemType) => {
  const dataURI = mediaItemType === 'file' ? gifDataUri : undefined;

  return [
    {
      title: 'Card with menu',
      content: <CardView appearance={appearance} status="complete" metadata={metadata} dataURI={dataURI} actions={actions} />
    }, {
      title: 'Selected card',
      content: <CardView appearance={appearance} status="complete" metadata={metadata} dataURI={dataURI} selectable={true} selected={true} />
    }
  ];
};
