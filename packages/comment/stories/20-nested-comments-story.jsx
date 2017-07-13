import { storiesOf } from '@kadira/storybook';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Avatar from '@atlaskit/avatar';

import Comment, { CommentAction, CommentAuthor, CommentTime } from '../src';
import { name } from '../package.json';
import { clickHandler } from './_constants';
import sampleAvatarImg from './sample-avatar.png';

class NestedComment extends PureComponent {
  static propTypes = {
    nestedLevel: PropTypes.string,
    content: PropTypes.node,
    children: PropTypes.node,
  }

  render() {
    const size = this.props.nestedLevel > 0 ? 'medium' : 'large';
    return (
      <Comment
        author={<CommentAuthor>John Smith</CommentAuthor>}
        avatar={<Avatar src={sampleAvatarImg} label="User avatar" size={size} />}
        time={<CommentTime>30, August 2016</CommentTime>}
        type="internal"
        content={this.props.content}
        actions={[
          <CommentAction onClick={clickHandler}>Reply</CommentAction>,
          <CommentAction onClick={clickHandler}>Edit</CommentAction>,
          <CommentAction onClick={clickHandler}>Delete</CommentAction>,
          <CommentAction onClick={clickHandler}>Like</CommentAction>,
        ]}
      >
        {this.props.children}
      </Comment>
    );
  }
}

storiesOf(name, module)
  .add('nested comments', () => (
    <div>
      <NestedComment content="Root-level comment" nestedLevel="0">
        <NestedComment content="1st-level comment 1" nestedLevel="1">
          <NestedComment content="2nd-level child comment" nestedLevel="2" />
        </NestedComment>
        <NestedComment content="1st-level comment 2" nestedLevel="1" />
      </NestedComment>
      <NestedComment content="Root-level comment" nestedLevel="0">
        <NestedComment content="1st-level comment 1" nestedLevel="1" />
        <NestedComment content="1st-level comment 2" nestedLevel="1" />
        <NestedComment content="1st-level comment 3" nestedLevel="1" >
          <NestedComment content="2nd-level child comment" nestedLevel="2" />
        </NestedComment>
        <NestedComment content="1st-level comment 4" nestedLevel="1">
          <NestedComment content="2nd-level child comment" nestedLevel="2">
            <NestedComment content="3rd-level child comment" nestedLevel="3">
              <NestedComment content="4th-level child comment" nestedLevel="4" />
            </NestedComment>
          </NestedComment>
        </NestedComment>
      </NestedComment>
    </div>
  ));
