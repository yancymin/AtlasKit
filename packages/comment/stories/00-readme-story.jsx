import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme from '@atlaskit/util-readme';

import { name, description } from '../package.json';

/* eslint-disable import/no-duplicates, import/first */
import comment from '../src/components/Comment';
import commentSource from '!raw!../src/components/Comment';
import commentOverview from './examples/CommentExample';
import commentOverviewSource from '!raw!./examples/CommentExample';

import commentAction from '../src/components/ActionItem';
import commentActionSource from '!raw!../src/components/ActionItem';
import commentActionOverview from './examples/CommentActionExample';
import commentActionOverviewSource from '!raw!./examples/CommentActionExample';

import commentAuthor from '../src/components/Author';
import commentAuthorSource from '!raw!../src/components/Author';
import commentAuthorOverview from './examples/CommentAuthorExample';
import commentAuthorOverviewSource from '!raw!./examples/CommentAuthorExample';

import commentTime from '../src/components/Time';
import commentTimeSource from '!raw!../src/components/Time';
import commentTimeOverview from './examples/CommentTimeExample';
import commentTimeOverviewSource from '!raw!./examples/CommentTimeExample';

import commentLayout from '../src/components/Layout';
import commentLayoutSource from '!raw!../src/components/Layout';
import commentLayoutOverview from './examples/CommentLayoutExample';
import commentLayoutOverviewSource from '!raw!./examples/CommentLayoutExample';

import commentEdited from '../src/components/Edited';
import commentEditedSource from '!raw!../src/components/Edited';
import commentEditedOverview from './examples/CommentEditedExample';
import commentEditedOverviewSource from '!raw!./examples/CommentEditedExample';

/* eslint-enable import/no-duplicates, import/first */

storiesOf(name, module)
  .add('📖 Comment readme', () => (
    <Readme
      name={name}
      component={comment}
      componentSource={commentSource}
      example={commentOverview}
      exampleSource={commentOverviewSource}
      description={description}
    />
  ))
  .add('📖 CommentAction readme', () => (
    <Readme
      name={name}
      component={commentAction}
      componentSource={commentActionSource}
      example={commentActionOverview}
      exampleSource={commentActionOverviewSource}
      description={description}
    />
  ))
  .add('📖 CommentAuthor readme', () => (
    <Readme
      name={name}
      component={commentAuthor}
      componentSource={commentAuthorSource}
      example={commentAuthorOverview}
      exampleSource={commentAuthorOverviewSource}
      description={description}
    />
  ))
  .add('📖 CommentTime readme', () => (
    <Readme
      name={name}
      component={commentTime}
      componentSource={commentTimeSource}
      example={commentTimeOverview}
      exampleSource={commentTimeOverviewSource}
      description={description}
    />
  ))
  .add('📖 CommentLayout readme', () => (
    <Readme
      name={name}
      component={commentLayout}
      componentSource={commentLayoutSource}
      example={commentLayoutOverview}
      exampleSource={commentLayoutOverviewSource}
      description={description}
    />
  ))
  .add('📖 CommentEdited readme', () => (
    <Readme
      name={name}
      component={commentEdited}
      componentSource={commentEditedSource}
      example={commentEditedOverview}
      exampleSource={commentEditedOverviewSource}
      description={description}
    />
  ))
;
