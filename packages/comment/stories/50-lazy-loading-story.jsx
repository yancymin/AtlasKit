import { storiesOf } from '@kadira/storybook';
import React from 'react';
import styled from 'styled-components';
import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';

import { CommentAuthor } from '../src';
import CommentWithRelativeTime from './examples/RelativeTimeExample';
import { name } from '../package.json';
import { sampleText } from './_constants';
import sampleAvatarImg from './sample-avatar.png';

const sampleAvatar = <Avatar src={sampleAvatarImg} label="User avatar" />;

const Wrapper = styled.div`
  padding: 20px;
  width: 500px;

  h3 {
    margin-bottom: 20px;
  }
`;

const MoreCommentsWrapper = styled.div`
  display: flex;
  height: 32px;
  margin-bottom: 20px;
`;

const LoadingMessage = styled.span`
  margin-left: 8px;
`;

class LazyLoadCommentBlock extends React.PureComponent {
  state = {
    comments: [
      {
        author: 'Author',
        avatar: sampleAvatar,
        time: Date.now() - (3 * 24 * 60 * 60 * 1000),
        content: `Comment 3. ${sampleText}`,
      },
      {
        author: 'Author',
        avatar: sampleAvatar,
        time: Date.now() - (2 * 24 * 60 * 60 * 1000),
        content: `Comment 2. ${sampleText}`,
      },
      {
        author: 'Author',
        avatar: sampleAvatar,
        time: Date.now() - (24 * 60 * 60 * 1000),
        content: `Comment 1. ${sampleText}`,
      },
    ],
    isFetchingComments: 0,
    olderCommentsAvailable: 2,
  }

  fetchOlderComments = () => {
    this.setState({ isFetchingComments: true });

    window.setTimeout(() => {
      const fetchedComments = [
        {
          author: 'Author',
          avatar: sampleAvatar,
          time: Date.now() - (5 * 24 * 60 * 60 * 1000),
          content: `Comment 5. ${sampleText}`,
        },
        {
          author: 'Author',
          avatar: sampleAvatar,
          time: Date.now() - (4 * 24 * 60 * 60 * 1000),
          content: `Comment 4. ${sampleText}`,
        },
      ];

      const comments = [...fetchedComments, ...this.state.comments];
      const olderCommentsAvailable = this.state.olderCommentsAvailable - fetchedComments.length;

      this.setState({
        comments,
        isFetchingComments: false,
        olderCommentsAvailable,
      });
    }, 2000);
  }

  renderComments() {
    return this.state.comments.map(({ author, avatar, content, time }) => (
      <CommentWithRelativeTime
        author={<CommentAuthor>{author}</CommentAuthor>}
        avatar={avatar}
        key={time}
        timestamp={time}
        content={content}
      />
    ));
  }

  render() {
    const { isFetchingComments, olderCommentsAvailable } = this.state;
    return (
      <Wrapper>
        <h3>Comments</h3>
        {!isFetchingComments && olderCommentsAvailable ? (
          <MoreCommentsWrapper>
            <Button onClick={this.fetchOlderComments}>
              View {olderCommentsAvailable} older comment{olderCommentsAvailable > 1 ? 's' : null}
            </Button>
          </MoreCommentsWrapper>
        ) : null}
        {isFetchingComments ? (
          <MoreCommentsWrapper>
            <Spinner />
            <LoadingMessage>Loading more comments...</LoadingMessage>
          </MoreCommentsWrapper>
        ) : null}
        <div>
          {this.renderComments()}
        </div>
      </Wrapper>
    );
  }
}

storiesOf(name, module)
  .add('lazy-loading comment block', () => (
    <LazyLoadCommentBlock />
  ));
