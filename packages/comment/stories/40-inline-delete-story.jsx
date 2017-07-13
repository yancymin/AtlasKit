import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Avatar from '@atlaskit/avatar';
import Flag, { FlagGroup } from '@atlaskit/flag';
import Modal from '@atlaskit/modal-dialog';
import WarningIcon from '@atlaskit/icon/glyph/warning';

import Comment, { CommentAction, CommentAuthor, CommentTime } from '../src';
import { name } from '../package.json';
import { sampleText } from './_constants';
import sampleAvatarImg from './sample-avatar.png';

const sampleAvatar = <Avatar src={sampleAvatarImg} label="User avatar" />;

class InlineDeleteCommentList extends React.PureComponent {
  state = {
    comments: [],
    deleteActions: [],
  }

  componentWillMount() {
    this.setState({
      comments: React.Children.toArray(this.props.children),
    });
  }

  getDeleteActionByCommentIndex = commentIndex => (
    this.state.deleteActions.reduce((foundAction, action, actionIndex) => (
      typeof foundAction !== 'number' && action.index === commentIndex ? actionIndex : foundAction
    ), null)
  )

  deleteComment = (deletedItemIndex) => {
    const comments = [...this.state.comments];
    const deleteAction = {
      comment: comments[deletedItemIndex],
      index: deletedItemIndex,
      flagShouldDismiss: false,
    };
    comments[deletedItemIndex] = null;
    const deleteActions = [deleteAction, ...this.state.deleteActions];
    this.setState({ comments, deleteActions });
  }

  undoDeleteComment = (deleteActionIndex) => {
    const comments = [...this.state.comments];
    const { comment, index } = this.state.deleteActions[deleteActionIndex];
    comments[index] = comment;

    const deleteActions = [...this.state.deleteActions];
    deleteActions[deleteActionIndex].flagShouldDismiss = true;

    this.setState({ comments, deleteActions });
  }

  removeDeleteAction = (deletedCommentIndex) => {
    const deleteActionIndex = this.getDeleteActionByCommentIndex(deletedCommentIndex);
    const deleteActions = [...this.state.deleteActions];
    deleteActions.splice(deleteActionIndex, 1);

    this.setState({ deleteActions });
  }

  renderComments() {
    return this.state.comments.map((comment, index) => (
      comment ? (
        React.cloneElement(comment, {
          actions: [
            <CommentAction onClick={() => this.deleteComment(index)}>Delete</CommentAction>,
          ],
        })
      ) : (
        null
      )
    ));
  }

  renderFlags() {
    return this.state.deleteActions.length ? (
      <FlagGroup onDismissed={this.removeDeleteAction}>
        {this.state.deleteActions.map((deleteAction, deleteActionIndex) => (
          <Flag
            actions={[
              {
                content: 'Undo',
                onClick: () => this.undoDeleteComment(deleteActionIndex),
              },
            ]}
            appearance="normal"
            icon={<WarningIcon label="Warning" />}
            id={deleteAction.index}
            key={deleteAction.index}
            shouldDismiss={deleteAction.flagShouldDismiss}
            title="Comment deleted"
          />
        ))}
      </FlagGroup>
    ) : (
      null
    );
  }

  render() {
    return (
      <div>
        {this.renderComments()}
        {this.renderFlags()}
      </div>
    );
  }
}

storiesOf(name, module)
  .add('inline delete comment', () => (
    <Modal
      footer={<span>&nbsp;</span>}
      header={<h3>List of comments in a modal</h3>}
      isOpen
    >
      <InlineDeleteCommentList>
        <Comment
          author={<CommentAuthor>John Smith</CommentAuthor>}
          avatar={sampleAvatar}
          time={<CommentTime>30, August 2016</CommentTime>}
          type="Author"
          content={<div><p>{`Comment 1. ${sampleText}`}</p></div>}
        />
        <Comment
          author={<CommentAuthor>John Smith</CommentAuthor>}
          avatar={sampleAvatar}
          time={<CommentTime>30, August 2016</CommentTime>}
          type="Author"
          content={<div><p>{`Comment 2. ${sampleText}`}</p></div>}
        />
        <Comment
          author={<CommentAuthor>John Smith</CommentAuthor>}
          avatar={sampleAvatar}
          time={<CommentTime>30, August 2016</CommentTime>}
          type="Author"
          content={<div><p>{`Comment 3. ${sampleText}`}</p></div>}
        />
      </InlineDeleteCommentList>
    </Modal>
  ));
