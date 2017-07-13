import React from 'react';
import Comment, { CommentTime } from '../../src';
import Tooltip from '@atlaskit/tooltip';

import { getAbsoluteTime, getRelativeTime } from '../helpers/time';

export default ({ createdTimestamp, editedTimestamp, ...props }) => {
  const editedTime = getRelativeTime(editedTimestamp) || getAbsoluteTime(editedTimestamp);
  const edited = createdTimestamp ? (
    <CommentTime>
      <Tooltip description={`Created ${getAbsoluteTime(createdTimestamp)}`} position="top">
        <span>{`Edited ${editedTime}`}</span>
      </Tooltip>
    </CommentTime>
  ) : (
    <CommentTime>{`Edited ${editedTime}`}</CommentTime>
  );

  return <Comment time={edited} {...props} />;
};
