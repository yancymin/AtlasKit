import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import Avatar from '@atlaskit/avatar';

import Comment, { CommentAction, CommentAuthor, CommentTime } from '../src';
import CommentWithRelativeEditedTime from './examples/EditedRelativeTimeExample';
import { name } from '../package.json';
import { clickHandler, sampleText, nonSpacedSampleText } from './_constants';
import sampleAvatarImg from './sample-avatar.png';

const sampleAvatar = <Avatar src={sampleAvatarImg} label="User avatar" />;

storiesOf(name, module)
  .add('simple comment', () => (
    <Comment
      author={<CommentAuthor>John Smith</CommentAuthor>}
      avatar={sampleAvatar}
      time={<CommentTime>30, August 2016</CommentTime>}
      type="Author"
      content={<div><p>{sampleText}</p><p>{sampleText}</p></div>}
      actions={[
        <CommentAction onClick={clickHandler}>Reply</CommentAction>,
        <CommentAction onClick={clickHandler}>Edit</CommentAction>,
        <CommentAction onClick={clickHandler}>Delete</CommentAction>,
        <CommentAction onClick={clickHandler}>Like</CommentAction>,
      ]}
    />
  ))
  .add('simple comment with edited flag', () => (
    <CommentWithRelativeEditedTime
      author={<CommentAuthor>John Smith</CommentAuthor>}
      avatar={sampleAvatar}
      createdTimestamp={Date.now() - (24 * 60 * 60 * 1000)}
      editedTimestamp={Date.now() - (30 * 60 * 1000)}
      type="Author"
      content={<div><p>{sampleText}</p><p>{sampleText}</p></div>}
      actions={[
        <CommentAction onClick={clickHandler}>Reply</CommentAction>,
        <CommentAction onClick={clickHandler}>Edit</CommentAction>,
        <CommentAction onClick={clickHandler}>Delete</CommentAction>,
        <CommentAction onClick={clickHandler}>Like</CommentAction>,
      ]}
    />
  ))
  .add('comment with no top and bottom bars', () => (
    <Comment avatar={sampleAvatar} content={<p>{sampleText}</p>} />
  ))
  .add('comment with links for author and time', () => (
    <Comment
      author={<CommentAuthor href="#">John Smith</CommentAuthor>}
      avatar={sampleAvatar}
      time={<CommentTime href="#">30, August 2016</CommentTime>}
      type="Author"
      content={<div><p>{sampleText}</p><p>{sampleText}</p></div>}
      actions={[
        <CommentAction onClick={clickHandler}>Reply</CommentAction>,
        <CommentAction onClick={clickHandler}>Edit</CommentAction>,
        <CommentAction onClick={clickHandler}>Delete</CommentAction>,
        <CommentAction onClick={clickHandler}>Like</CommentAction>,
      ]}
    />
  ))
  .add('comment with different mouse event handlers', () => {
    const mouseOverHandler = event => action(`${event.target.textContent} button got mouseOver.`)();
    const focusHandler = event => action(`${event.target.textContent} button got focus.`)();
    return (
      <Comment
        author={<CommentAuthor href="#" onClick={clickHandler} onMouseOver={mouseOverHandler}>
          John Smith (click or hover)
        </CommentAuthor>}
        avatar={sampleAvatar}
        time={<CommentTime onClick={clickHandler} onMouseOver={mouseOverHandler}>
          30, August 2016 (click or hover)
        </CommentTime>}
        type="Author"
        content={<div><p>{sampleText}</p><p>{sampleText}</p></div>}
        actions={[
          <CommentAction onClick={clickHandler}>Click</CommentAction>,
          <CommentAction onMouseOver={mouseOverHandler}>Hover</CommentAction>,
          <CommentAction onFocus={focusHandler}>Focus</CommentAction>,
        ]}
      />
    );
  })
  .add('comment with different avatar sizes', () => {
    const avatarWithSize = size => (
      <Comment
        key={size}
        author={<CommentAuthor>John Smith</CommentAuthor>}
        avatar={<Avatar src={sampleAvatarImg} label="User avatar" size={size} />}
        type="Author"
        time={<CommentTime>30, August 2016</CommentTime>}
        content={
          <div>
            <p>{size} avatar</p>
            <p>{sampleText}</p>
          </div>
        }
        actions={[
          <CommentAction onClick={clickHandler}>Reply</CommentAction>,
          <CommentAction onClick={clickHandler}>Edit</CommentAction>,
          <CommentAction onClick={clickHandler}>Delete</CommentAction>,
          <CommentAction onClick={clickHandler}>Like</CommentAction>,
        ]}
      />
    );
    return (
      <div>
        {['small', 'medium', 'large', 'xlarge'].map(size => avatarWithSize(size))}
      </div>
    );
  })
  .add('comment with img avatar', () => (
    <Comment
      author={<CommentAuthor>John Smith</CommentAuthor>}
      avatar={<img src={sampleAvatarImg} alt="img avatar" height="40" width="40" />}
      content={<p>{sampleText}</p>}
    />
  ))
  .add('comment with restricted property', () => (
    <Comment
      author={<CommentAuthor>John Smith</CommentAuthor>}
      avatar={sampleAvatar}
      time={<CommentTime>30, August 2016</CommentTime>}
      type="Author"
      content={<div><p>{sampleText}</p><p>{sampleText}</p></div>}
      restrictedTo="atlassian-staff"
      actions={[
        <CommentAction onClick={clickHandler}>Like</CommentAction>,
      ]}
    />
  ))
  .add('comment with restricted property and edited flag', () => (
    <CommentWithRelativeEditedTime
      author={<CommentAuthor>John Smith</CommentAuthor>}
      avatar={sampleAvatar}
      createdTimestamp={Date.now() - (24 * 60 * 60 * 1000)}
      editedTimestamp={Date.now() - (30 * 60 * 1000)}
      type="Author"
      content={<div><p>{sampleText}</p><p>{sampleText}</p></div>}
      restrictedTo="developers"
      actions={[
        <CommentAction onClick={clickHandler}>Like</CommentAction>,
      ]}
    />
  ))
  .add('comment with optimistic saving', () => (
    <Comment
      author={<CommentAuthor>John Smith</CommentAuthor>}
      avatar={sampleAvatar}
      time={<CommentTime>30, August 2016</CommentTime>}
      type="Author"
      isSaving
      content={<div>
        <p>The time permalink should be replaced</p>
        <p>You should not be able to see my actions</p>
        <p>Also, this text should be grey!</p>
      </div>}
      restrictedTo="atlassian-staff"
      actions={[
        <CommentAction onClick={clickHandler}>Like</CommentAction>,
      ]}
    />
  ))
  .add('comment with restricted size and non-space-separated content', () => (
    <div style={{ width: 500 }}>
      <Comment
        author={<CommentAuthor>John Smith</CommentAuthor>}
        avatar={<img src={sampleAvatarImg} alt="img avatar" height="40" width="40" />}
        content={<p>{nonSpacedSampleText}</p>}
      />
    </div>
  ))
  .add('comment in an error state', () => (
    <div style={{ width: 500 }}>
      <Comment
        author={<CommentAuthor>John Smith</CommentAuthor>}
        avatar={<img src={sampleAvatarImg} alt="img avatar" height="40" width="40" />}
        content={<p>{nonSpacedSampleText}</p>}
        isError
        errorActions={[
          <CommentAction onClick={clickHandler}>Retry</CommentAction>,
          <CommentAction onClick={clickHandler}>Cancel</CommentAction>,
        ]}
        errorLabel="Error"
      />
    </div>
));
