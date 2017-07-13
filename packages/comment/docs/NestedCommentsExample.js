import React, { PureComponent, PropTypes } from 'react';
import Comment, { CommentAuthor } from '@atlaskit/comment';
import Avatar from '@atlaskit/avatar';
import avatarImg from './sample-avatar.png';

class DefaultComment extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <Comment
        avatar={<Avatar src={avatarImg} label="AtlasKit avatar" size="medium" />}
        author={<CommentAuthor href="/author">John Smith</CommentAuthor>}
        content={(
          <p>This comment is so generic it can be repeated</p>
        )}
      >
        {this.props.children}
      </Comment>
    );
  }
}

const CommentExample = () => (
  <div>
    <DefaultComment>
      <DefaultComment>
        <DefaultComment />
      </DefaultComment>
      <DefaultComment />
    </DefaultComment>
  </div>
);

export default CommentExample;
