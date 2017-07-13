import * as React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {Card, CardView, CardEvent} from '@atlaskit/media-card';
import {createStorybookContext, genericUrlPreviewId, genericLinkId, genericFileId} from '@atlaskit/media-test-helpers';

import {FilmStripNavigator} from '../src';
import {
  OverflowContainer,
  Spacer,
  LazyWrapper
} from './styled';
import filmstripNavigatorWithDifferentCardStatuses from './filmstripNavigatorWithDifferentCardStatuses';

const context = createStorybookContext();

const clickAction = (event: CardEvent) => {
  action('click')(event.mediaItemDetails);
};
const menuActions = [
  {label: 'Open', handler: () => { action('open')(); }}
];

const getDefaultNavigator = (overflow: boolean, key?) => {
  return (
    <FilmStripNavigator key={key}>
      <CardView onClick={clickAction} status="complete" actions={menuActions}/>
      <CardView onClick={clickAction} status="complete" metadata={{mediaType: 'doc', name: 'foobar.docx', size: 1000}}/>
      <Card onClick={clickAction} appearance="image" context={context} identifier={genericUrlPreviewId}/>
      <Card onClick={clickAction} appearance="image" context={context} identifier={genericLinkId}/>
      <Card onClick={clickAction} context={context} identifier={genericFileId}/>
    </FilmStripNavigator>
  );
};

const onlyCards = (key?) => (
  <FilmStripNavigator width={900} key={key}>
    <Card onClick={clickAction} appearance="image" context={context} identifier={genericUrlPreviewId}/>
    <Card onClick={clickAction} appearance="image" context={context} identifier={genericLinkId}/>
    <Card onClick={clickAction} appearance="image" context={context} identifier={genericLinkId}/>
    <Card onClick={clickAction} context={context} identifier={genericFileId}/>
    <Card onClick={clickAction} context={context} identifier={genericFileId}/>
    <Card onClick={clickAction} appearance="image" context={context} identifier={genericLinkId}/>
    <Card onClick={clickAction} context={context} identifier={genericFileId}/>
    <Card onClick={clickAction} context={context} identifier={genericFileId}/>
    <Card onClick={clickAction} appearance="image" context={context} identifier={genericUrlPreviewId}/>
    <Card onClick={clickAction} appearance="image" context={context} identifier={genericUrlPreviewId}/>
    <Card onClick={clickAction} appearance="image" context={context} identifier={genericUrlPreviewId}/>
    <Card onClick={clickAction} appearance="image" context={context} identifier={genericUrlPreviewId}/>
    <Card onClick={clickAction} appearance="image" context={context} identifier={genericLinkId}/>
  </FilmStripNavigator>
);

storiesOf('FilmStripNavigator', {})
  .add('With a Card and CardView', () => getDefaultNavigator(false))
  .add('Only with Cards', () => onlyCards())
  .add('Lazy loading - No Overflow', () => {
    return (
      <LazyWrapper>
        <h2>Scroll down to test lazyload</h2>
        {
          [1, 1, 1, 1, 1].map((_, i) => [
            <Spacer key={i}><h2>Keep scrolling!</h2></Spacer>,
            onlyCards(i + 100)
          ])
        }
      </LazyWrapper>
    );
  })
  .add('Lazy loading - Overflow', () => {
    return (
      <div style={{margin: '40px'}}>
        <h2>Scroll down to test lazyload in an overflow container</h2>
        <OverflowContainer>
          {
            [1, 1, 1, 1, 1].map((_, i) => [
              <Spacer key={i}><h2>Keep scrolling!</h2></Spacer>,
              onlyCards(i + 100)
            ])
          }
        </OverflowContainer>
      </div>
    );
  })
  .add('Different Card statuses', filmstripNavigatorWithDifferentCardStatuses);
