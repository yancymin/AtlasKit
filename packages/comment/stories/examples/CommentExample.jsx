import React from 'react';
import Comment, { CommentAuthor, CommentTime, CommentAction } from '@atlaskit/comment';
import Avatar from '@atlaskit/avatar';

const clickHandler = e => console.log(`${e.target.textContent} was clicked.`);

export default (
  <Comment
    avatar={<Avatar src="https://design.atlassian.com/images/avatars/project-128.png" label="AtlasKit avatar" size="medium" />}
    author={<CommentAuthor href="/author">John Smith</CommentAuthor>}
    type="author"
    time={<CommentTime href="/time">30 August, 2016</CommentTime>}
    content={(
      <div>
        <p>Content goes here. This can include <a href="/link">links</a> and other content.</p>
      </div>
    )}
    actions={[
      <CommentAction onClick={clickHandler}>Reply</CommentAction>,
      <CommentAction onClick={clickHandler}>Edit</CommentAction>,
      <CommentAction onClick={clickHandler}>Like</CommentAction>,
    ]}
    errorActions={[
      <CommentAction onClick={clickHandler}>Retry</CommentAction>,
      <CommentAction onClick={clickHandler}>Cancel</CommentAction>,
    ]}
    errorIconLabel="Failed to save the comment"
  />
);
