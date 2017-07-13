import React from 'react';
import Comment, { CommentTime } from '../../src';
import Tooltip from '@atlaskit/tooltip';

import { getAbsoluteTime, getRelativeTime } from '../helpers/time';

export default ({ timestamp, ...props }) => {
  const relativeTime = getRelativeTime(timestamp);
  const absoluteTime = getAbsoluteTime(timestamp);

  const time = relativeTime ? (
    <CommentTime>
      <Tooltip description={absoluteTime} position="top">
        <span>{relativeTime}</span>
      </Tooltip>
    </CommentTime>
  ) : (
    <CommentTime>{absoluteTime}</CommentTime>
  );

  return <Comment time={time} {...props} />;
};
