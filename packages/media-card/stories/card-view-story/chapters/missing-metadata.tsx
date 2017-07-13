import * as React from 'react';
import * as deepcopy from 'deepcopy';
import {FileDetails, UrlPreview} from '@atlaskit/media-core';
import {CardView, CardAppearance} from '../../../src';

import {
  genericUrlPreview,
  genericFileDetails,
  gifDataUri
} from '@atlaskit/media-test-helpers';

export const createMissingMetadataFileCards = (appearance: CardAppearance) => {
  const minimumDetails: FileDetails = {};

  const missingNameDetails: FileDetails = deepcopy(genericFileDetails);
  delete missingNameDetails.name;

  const missingFileSizeDetails: FileDetails = deepcopy(genericFileDetails);
  delete missingFileSizeDetails.size;

  const missingMediaTypeDetails: FileDetails = deepcopy(genericFileDetails);
  delete missingMediaTypeDetails.mediaType;

  return [
    {
      title: 'No details',
      content: <CardView appearance={appearance} status="complete" metadata={minimumDetails} />
    },
    {
      title: 'Missing name',
      content: <CardView appearance={appearance} status="complete" metadata={missingNameDetails} dataURI={gifDataUri} />
    },
    {
      title: 'Missing file size',
      content: <CardView appearance={appearance} status="complete" metadata={missingFileSizeDetails} dataURI={gifDataUri} />
    },
    {
      title: 'Missing media type',
      content: <CardView appearance={appearance} status="complete" metadata={missingMediaTypeDetails} dataURI={gifDataUri} />
    },
    {
      title: 'Missing data uri',
      content: <CardView appearance={appearance} status="complete" metadata={genericFileDetails} />
    }
  ];
};

export const createMissingMetadataLinkCards = (appearance: CardAppearance) => {
  const minimumDetails: UrlPreview = {
    type: 'link',
    url: 'some-url',
    title: 'Some url title'
  };

  const missingDescriptionPreview: UrlPreview = deepcopy(genericUrlPreview);
  delete missingDescriptionPreview.description;

  const missingSitePreview: UrlPreview = deepcopy(genericUrlPreview);
  delete missingSitePreview.site;

  const missingResourcesPreview: UrlPreview = deepcopy(genericUrlPreview);
  delete missingResourcesPreview.resources;

  const missingThumbnailPreview: UrlPreview = deepcopy(genericUrlPreview);
  if (missingThumbnailPreview.resources) {
    delete missingThumbnailPreview.resources.thumbnail;
  }

  const missingIconPreview: UrlPreview = deepcopy(genericUrlPreview);
  if (missingIconPreview.resources) {
    delete missingIconPreview.resources.icon;
  }

  return [
    {
      title: 'No details',
      content: <CardView appearance={appearance} status="complete" metadata={minimumDetails} />
    },
    {
      title: 'Missing description',
      content: <CardView appearance={appearance} status="complete" metadata={missingDescriptionPreview} />
    },
    {
      title: 'Missing site',
      content: <CardView appearance={appearance} status="complete" metadata={missingSitePreview} />
    },
    {
      title: 'Missing resources',
      content: <CardView appearance={appearance} status="complete" metadata={missingResourcesPreview} />
    },
    {
      title: 'Missing thumbnail',
      content: <CardView appearance={appearance} status="complete" metadata={missingThumbnailPreview} />
    },
    {
      title: 'Missing icon',
      content: <CardView appearance={appearance} status="complete" metadata={missingIconPreview} />
    }
  ];
};
