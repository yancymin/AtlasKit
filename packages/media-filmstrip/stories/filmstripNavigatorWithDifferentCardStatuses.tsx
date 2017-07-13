import * as React from 'react';
import {Card, CardView} from '@atlaskit/media-card';
import {createStorybookContext, genericLinkId} from '@atlaskit/media-test-helpers';
import {FilmStripNavigator} from '../src';

const context = createStorybookContext();

export default () => (
  <div>
    <FilmStripNavigator>
      <CardView status="complete" />
      <CardView status="loading" />
      <CardView status="error" />
      <CardView status="loading" />
      <CardView status="loading" />
      <CardView status="complete" />
    </FilmStripNavigator>
    <FilmStripNavigator width={700}>
      <CardView status="complete" />
      <Card context={context} identifier={genericLinkId}/>
      <CardView status="loading" />
      <CardView status="processing" />
      <CardView status="error" />
    </FilmStripNavigator>
  </div>
);
