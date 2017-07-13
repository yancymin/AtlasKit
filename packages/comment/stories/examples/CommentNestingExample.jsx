import React from 'react';
import Comment, { CommentAuthor, CommentTime, CommentAction } from '@atlaskit/comment';
import Avatar from '@atlaskit/avatar';

const clickHandler = e => console.log(`${e.target.textContent} was clicked.`);
const avatar = (<Avatar
  src="https://design.atlassian.com/images/avatars/project-128.png"
  label="AtlasKit avatar"
  size="medium"
/>);

export default (
  <Comment
    avatar={avatar}
    author={<CommentAuthor>John Smith</CommentAuthor>}
    type="author"
    time={<CommentTime>30 August, 2016</CommentTime>}
    content={<p>This comment has a reply below it.</p>}
    actions={[
      <CommentAction onClick={clickHandler}>Reply</CommentAction>,
    ]}
  >
    <Comment
      avatar={avatar}
      author={<CommentAuthor>Jane Doe</CommentAuthor>}
      time={<CommentTime>31 August, 2016</CommentTime>}
      content={<p>This is a reply to the comment above.</p>}
      actions={[
        <CommentAction onClick={clickHandler}>Reply to thread</CommentAction>,
      ]}
    />
    <Comment
      avatar={avatar}
      author={<CommentAuthor>John Smith</CommentAuthor>}
      type="author"
      time={<CommentTime>31 August, 2016</CommentTime>}
      content={<p>This is a second reply to the comment above.</p>}
      actions={[
        <CommentAction onClick={clickHandler}>Reply to thread</CommentAction>,
      ]}
    />
  </Comment>
);
