import { storiesOf } from '@kadira/storybook';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@atlaskit/avatar';

import Comment, { CommentAction, CommentAuthor, CommentTime } from '../src';
import { name } from '../package.json';
import { clickHandler, sampleText } from './_constants';
import sampleAvatarImg from './sample-avatar.png';

const sampleAvatar = <Avatar src={sampleAvatarImg} label="User avatar" />;

class NestedComment extends PureComponent {
  static propTypes = {
    content: PropTypes.node,
    children: PropTypes.node,
    id: PropTypes.string,
    nestedLevel: PropTypes.number,
  }

  state = {
    isHighlighted: window.location.hash.replace('#', '') === this.props.id,
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.handleHashChange);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  handleHashChange = () => {
    const isHighlighted = window.location.hash.replace('#', '') === this.props.id;
    if (isHighlighted !== this.state.isHighlighted) {
      this.setState({ isHighlighted });
    }
  }

  render() {
    const { children, content, id, nestedLevel } = this.props;
    const size = nestedLevel > 0 ? 'medium' : 'large';

    return (
      <Comment
        author={<CommentAuthor>John Smith</CommentAuthor>}
        avatar={<a name={id}><Avatar src={sampleAvatarImg} label="User avatar" size={size} /></a>}
        highlighted={this.state.isHighlighted}
        time={<CommentTime>30, August 2016</CommentTime>}
        type="internal"
        content={<p>{`${content}. ${sampleText}`}</p>}
        actions={[
          <CommentAction onClick={clickHandler}>Reply</CommentAction>,
          <CommentAction onClick={clickHandler}>Edit</CommentAction>,
          <CommentAction onClick={clickHandler}>Delete</CommentAction>,
          <CommentAction onClick={clickHandler}>Like</CommentAction>,
        ]}
      >
        {children}
      </Comment>
    );
  }
}

storiesOf(name, module)
  .add('highlighted state', () => (
    <div style={{ width: 500 }}>
      <Comment
        author={<CommentAuthor>Author</CommentAuthor>}
        avatar={sampleAvatar}
        highlighted
        time={<CommentTime>30 Aug 2016</CommentTime>}
        type="Author"
        content={<p>{sampleText}</p>}
        actions={[
          <CommentAction onClick={clickHandler}>Reply</CommentAction>,
          <CommentAction onClick={clickHandler}>Edit</CommentAction>,
          <CommentAction onClick={clickHandler}>Delete</CommentAction>,
          <CommentAction onClick={clickHandler}>Like</CommentAction>,
        ]}
      />
      <Comment
        author={<CommentAuthor>Author</CommentAuthor>}
        avatar={sampleAvatar}
        highlighted
        time={<CommentTime>30 Aug 2016</CommentTime>}
        type="Author"
        content={<p>{sampleText}</p>}
      />
    </div>
  ))
  .add('highlighted state tied to URL hash', () => (
    <div style={{ width: 500 }}>
      <NestedComment id="comment1" key="comment1" content="Root-level comment" nestedLevel={0}>
        <NestedComment id="comment2" key="comment2" content="1st-level comment 1" nestedLevel={1}>
          <NestedComment id="comment3" key="comment3" content="2nd-level child comment" nestedLevel={2} />
        </NestedComment>
        <NestedComment id="comment4" key="comment4" content="1st-level comment 2" nestedLevel={1} />
      </NestedComment>
      <NestedComment id="comment5" key="comment5" content="Root-level comment" nestedLevel={0}>
        <NestedComment id="comment6" key="comment6" content="1st-level comment 1" nestedLevel={1} />
        <NestedComment id="comment7" key="comment7" content="1st-level comment 2" nestedLevel={1} />
        <NestedComment id="comment8" key="comment8" content="1st-level comment 3" nestedLevel={1} >
          <NestedComment id="comment9" key="comment9" content="2nd-level child comment" nestedLevel={2} />
        </NestedComment>
        <NestedComment id="comment10" key="comment10" content="1st-level comment 4" nestedLevel={1}>
          <NestedComment id="comment11" key="comment11" content="2nd-level child comment" nestedLevel={2}>
            <NestedComment id="comment12" key="comment12" content="3rd-level child comment" nestedLevel={3}>
              <NestedComment id="comment13" key="comment13" content="4th-level child comment" nestedLevel={4} />
            </NestedComment>
          </NestedComment>
        </NestedComment>
      </NestedComment>
      <nav style={{ position: 'fixed', top: '0', left: '550px' }}>
        <div><a href="#comment1">Link to comment 1</a></div>
        <div><a href="#comment2">Link to comment 2</a></div>
        <div><a href="#comment3">Link to comment 3</a></div>
        <div><a href="#comment4">Link to comment 4</a></div>
        <div><a href="#comment5">Link to comment 5</a></div>
        <div><a href="#comment6">Link to comment 6</a></div>
        <div><a href="#comment7">Link to comment 7</a></div>
        <div><a href="#comment8">Link to comment 8</a></div>
        <div><a href="#comment9">Link to comment 9</a></div>
        <div><a href="#comment10">Link to comment 10</a></div>
        <div><a href="#comment11">Link to comment 11</a></div>
        <div><a href="#comment12">Link to comment 12</a></div>
        <div><a href="#comment13">Link to comment 13</a></div>
      </nav>
    </div>
  )
);
