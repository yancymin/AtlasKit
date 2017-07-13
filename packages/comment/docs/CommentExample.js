import React from 'react';
import Comment, {
  CommentAuthor,
  CommentTime,
  CommentAction,
  CommentEdited,
} from '@atlaskit/comment';
import Avatar from '@atlaskit/avatar';
import avatarImg from './sample-avatar.png';

const onClick = e => console.log(`${e.target.textContent} was clicked.`);

const CommentExample = () => (
  <div>
    <Comment
      avatar={<Avatar src={avatarImg} label="AtlasKit avatar" size="medium" />}
      author={<CommentAuthor href="/author">John Smith</CommentAuthor>}
      type="author"
      edited={<CommentEdited>Edited</CommentEdited>}
      restrictedTo="Admins Only"
      time={<CommentTime>30 August, 2016</CommentTime>}
      content={
        <p>
         Content goes here. This can include <a href="/link">links</a> and
         other content.
        </p>
      }
      actions={[
        <CommentAction onClick={onClick}>Reply</CommentAction>,
        <CommentAction onClick={onClick}>Edit</CommentAction>,
        <CommentAction onClick={onClick}>Like</CommentAction>,
      ]}
    />
  </div>
);

export default CommentExample;
