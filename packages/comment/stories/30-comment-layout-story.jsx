import { storiesOf } from '@kadira/storybook';
import PropTypes from 'prop-types';
import React from 'react';
import Avatar from '@atlaskit/avatar';
import Editor from '@atlaskit/editor-bitbucket';

import storyStyles from './stories.less';
import { CommentLayout } from '../src';
import { name } from '../package.json';
import sampleAvatarImg from './sample-avatar.png';

const sampleAvatar = <Avatar src={sampleAvatarImg} label="User avatar" />;

const NestedCommentLayout = props =>
  <CommentLayout
    avatar={sampleAvatar}
    className={storyStyles.commentLayoutBorder}
    content={<div className={storyStyles.sampleContent}>Content</div>}
  >
    {props.children}
  </CommentLayout>;

NestedCommentLayout.propTypes = { children: PropTypes.node };

const NestedCommentLayoutNoAvatar = props =>
  <CommentLayout
    className={storyStyles.commentLayoutBorder}
    content={<div className={storyStyles.sampleContent}>Content with no avatar</div>}
  >
    {props.children}
  </CommentLayout>;

NestedCommentLayoutNoAvatar.propTypes = { children: PropTypes.node };

const NestedCommentLayoutEditor = props =>
  <CommentLayout
    avatar={sampleAvatar}
    className={storyStyles.commentLayoutBorder}
    content={<Editor isExpandedByDefault defaultValue="Editor in content" />}
  >
    {props.children}
  </CommentLayout>;

NestedCommentLayoutEditor.propTypes = { children: PropTypes.node };

storiesOf(name, module)
  .add('nested comment layouts', () => (
    <div>
      <NestedCommentLayout>
        <NestedCommentLayoutEditor>
          <NestedCommentLayout>
            <NestedCommentLayoutEditor>
              <NestedCommentLayout>
                <NestedCommentLayout>
                  <NestedCommentLayoutEditor>
                    <NestedCommentLayout>
                      <NestedCommentLayoutEditor />
                    </NestedCommentLayout>
                  </NestedCommentLayoutEditor>
                </NestedCommentLayout>
              </NestedCommentLayout>
              <NestedCommentLayoutEditor />
            </NestedCommentLayoutEditor>
          </NestedCommentLayout>
        </NestedCommentLayoutEditor>
      </NestedCommentLayout>
      <NestedCommentLayout />
      <NestedCommentLayout />
      <NestedCommentLayoutNoAvatar />
      <NestedCommentLayoutEditor />
      <NestedCommentLayoutEditor>
        <NestedCommentLayoutEditor>
          <NestedCommentLayout />
        </NestedCommentLayoutEditor>
        <NestedCommentLayout />
      </NestedCommentLayoutEditor>
    </div>
  ))
  .add('comment layout with editor', () => (
    <CommentLayout
      avatar={sampleAvatar}
      content={<Editor isExpandedByDefault />}
    />
));
