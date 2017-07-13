import React, { PureComponent } from 'react';
import Avatar from '@atlaskit/avatar';
import Comment, { CommentAction, CommentAuthor, CommentTime } from '@atlaskit/comment';

import sampleAvatarImg from './sample-avatar.png';

export default class DummyComment extends PureComponent {
  render() {
    return (
      <Comment
        author={<CommentAuthor>John Smith</CommentAuthor>}
        avatar={<Avatar src={sampleAvatarImg} label="User avatar" size={'large'} />}
        time={<CommentTime>30, August 2016</CommentTime>}
        type="internal"
        content={'This is some content'}
        actions={[
          <CommentAction>Reply</CommentAction>,
          <CommentAction>Edit</CommentAction>,
          <CommentAction>Delete</CommentAction>,
          <CommentAction>Like</CommentAction>,
        ]}
      />
    );
  }
}
