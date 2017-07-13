import * as React from 'react';
import {storiesOf} from '@kadira/storybook';
import {CardActionType} from '@atlaskit/media-core';
import {
  StoryList,

  // link details
  genericLinkDetails,

  // file details
  genericFileDetails,
  imageFileDetails,

  gifDataUri
} from '@atlaskit/media-test-helpers';

import {CardAppearance} from '../../src';
import {CardView} from '../../src/root/cardView';

import {createFileCardsWithDifferentDataURIs} from './chapters/diff-images';
import {createCardsOfDifferentSize} from './chapters/diff-card-sizes';
import {createCardsOfDifferentResizeModes} from './chapters/diff-card-resize-modes';
import {createFileCardsWithDifferentMediaTypes} from './chapters/diff-file-types';
import {createMissingMetadataFileCards, createMissingMetadataLinkCards} from './chapters/missing-metadata';
import {createApiCards} from './chapters/api';
import {createMenuActionCards} from './chapters/menu';
import {createErrorAndLoadingCards} from './chapters/error-and-loading';
import {createSelectableCards, createSelectableCardsWithMenu} from './chapters/selectable';
import {actions} from './chapters/utils';
import {generateStoriesForEditableCards} from './editableCard';

const generateStoriesForFilesWithAppearance = (appearance: CardAppearance) => {
  const fileCards = createFileCardsWithDifferentDataURIs(appearance);

  const fileMediaTypeCards = createFileCardsWithDifferentMediaTypes(appearance);

  // error and loading state
  const fileLoadingAndErrorCards = createErrorAndLoadingCards(appearance, 'file');

  // menu actions
  const fileMenuActionsCards = createMenuActionCards(appearance, imageFileDetails);

  // upload progress
  const uploadProgressCards = [
    {title: '10%', content: <CardView status="uploading" appearance={appearance} metadata={genericFileDetails} dataURI={gifDataUri} progress={0.1} />},
    {title: '50%', content: <CardView status="uploading" appearance={appearance} metadata={genericFileDetails} dataURI={gifDataUri} progress={0.5} />},
    {title: '90%', content: <CardView status="uploading" appearance={appearance} metadata={genericFileDetails} dataURI={gifDataUri} progress={0.9} />},
    {title: 'No dataURI', content: <CardView status="uploading" appearance={appearance} metadata={genericFileDetails} progress={0.6} />},
    {title: 'Delete action', content: <CardView status="uploading" appearance={appearance} metadata={genericFileDetails} progress={0.6} actions={actions.filter(a => a.type === CardActionType.delete)} />}
  ];

  // selectable
  const fileSelectableCards = createSelectableCards(appearance, imageFileDetails, 'file');
  const selectableWithMenu = createSelectableCardsWithMenu(appearance, imageFileDetails, 'file');

  // api cards
  const apiCards = createApiCards(appearance, genericFileDetails);

  // missing metadata and/or data uri
  const fileMissingMetadataOrDataUriCards = createMissingMetadataFileCards(appearance);

  return (
    <div>
      <h3>Files</h3>
      <StoryList>{fileCards}</StoryList>

      <h3>Resize modes</h3>
      <StoryList>{createCardsOfDifferentResizeModes()}</StoryList>

      <h3>Sizes (Breakpoints check)</h3>
      <StoryList>{createCardsOfDifferentSize(appearance, genericFileDetails, gifDataUri)}</StoryList>

      <h4>Media Types - no placeholders</h4>
      <StoryList>{fileMediaTypeCards}</StoryList>

      <h4>Loading and error states</h4>
      <StoryList>{fileLoadingAndErrorCards}</StoryList>

      <h4>Menu actions</h4>
      <StoryList>{fileMenuActionsCards}</StoryList>

      {appearance === 'image' ? (
        <div>
          <h4>Selectable with menu actions</h4>
          <StoryList display="column">{selectableWithMenu}</StoryList>
        </div>
      ) : null}

      <h4>API methods</h4>
      <StoryList>{apiCards}</StoryList>

      {appearance === 'image' || appearance === 'auto' ? (
          <div>
            <h4>Upload progress</h4>
            <StoryList>{uploadProgressCards}</StoryList>
          </div>
        ) : null}

      {appearance === 'image' || appearance === 'auto' ? (
          <div>
            <h4>Selectable</h4>
            <StoryList>{fileSelectableCards}</StoryList>
          </div>
        ) : null}

      <h4>Missing metadata or data uri</h4>
      <StoryList>{fileMissingMetadataOrDataUriCards}</StoryList>
    </div>
  );
};

const generateStoriesForLinksWithAppearance = (appearance: CardAppearance) => {
  const linkCard = [
    {
      title: `Link card "${appearance}"`,
      content: <CardView appearance={appearance} status="complete" metadata={genericLinkDetails} />
    }
  ];

  // loading and error
  const linkLoadingAndErrorCards = createErrorAndLoadingCards(appearance, 'link');

  // menu actions
  const linkMenuActionsCards = createMenuActionCards(appearance, genericLinkDetails);

  // api methods
  const apiCards = createApiCards(appearance, genericLinkDetails);

  // missing metadata
  const linkMissingMetadataCards = createMissingMetadataLinkCards(appearance);

  return (
    <div>
      <h3>Links</h3>
      <StoryList>{linkCard}</StoryList>

      <h3>Sizes</h3>
      <StoryList>{createCardsOfDifferentSize(appearance, genericLinkDetails)}</StoryList>

      <h4>Loading and error states</h4>
      <StoryList>{linkLoadingAndErrorCards}</StoryList>

      <h4>Menu actions</h4>
      <StoryList>{linkMenuActionsCards}</StoryList>

      <h4>API methods</h4>
      <StoryList>{apiCards}</StoryList>

      <h4>Missing metadata</h4>
      <StoryList>{linkMissingMetadataCards}</StoryList>
    </div>
  );
};

const generateStoriesForAppearance = (appearance: CardAppearance) => {
  const fileCardStories =  appearance !== 'square' && appearance !== 'horizontal'
    ? generateStoriesForFilesWithAppearance(appearance)
    : null;

  const linkCardStories = generateStoriesForLinksWithAppearance(appearance);

  return () => (
    <div>
      <div style={{margin: '20px 40px'}}>
        {fileCardStories}
        {linkCardStories}
      </div>
    </div>
  );
};

storiesOf('CardView', {})
  .add('Make it your way 🍽', generateStoriesForEditableCards)
  .add('Auto cards', generateStoriesForAppearance('auto'))
  .add('Small cards', generateStoriesForAppearance('small'))
  .add('Image cards', generateStoriesForAppearance('image'))
  .add('Horizontal cards', generateStoriesForAppearance('horizontal'))
  .add('Square cards', generateStoriesForAppearance('square'));
