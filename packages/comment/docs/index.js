import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import CommentExample from './CommentExample';
import commentExampleSrc from '!raw-loader!./CommentExample';
import SingleComponents from './SingleComponents';
import singleComponentsSrc from '!raw-loader!./SingleComponents';
import NestedCommentsExample from './NestedCommentsExample';
import nestedCommentsExampleSrc from '!raw-loader!./NestedCommentsExample';
/* eslint-enable import/no-duplicates, import/first */

const Usage = styled.pre`
  background-color: #F4F5F7;
  border-radius: 5px;
  margin: 14px 0;
  padding: 8px;
`;

export const description = (
  <div>
    <p>
      The comment component exports both the wrapper component for comments, as well
      as several smaller components designed to be passed in to the comment component
      to display a richer comment. The complete export is:
    </p>
    <Usage>
      {`import Comment, {
  CommentAction,
  CommentAuthor,
  CommentTime,
  CommentEdited,
  CommentLayout
} from @atlaskit/comment`}
    </Usage>
    <p>
      All subcomponents are expected as props with the same lowercased name.
    </p>
    <p>
      All children components are displayed indented after the comment body,
      allowing nesting of comments.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Example Comment',
    Component: CommentExample,
    src: commentExampleSrc,
  },
  {
    title: 'Comment Components',
    Component: SingleComponents,
    src: singleComponentsSrc,
  },
  {
    title: 'Nested Comments',
    Component: NestedCommentsExample,
    src: nestedCommentsExampleSrc,
  },
];
