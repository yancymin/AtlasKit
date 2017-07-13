import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CommentLayout from './Layout';
import HeaderItems from './Header';
import FooterItems from './Footer';
import { Content } from '../styled/CommentStyles';

export default class Comment extends PureComponent {
  static propTypes = {
    /** An list of CommentAction items rendered as a row of buttons below the comment content */
    actions: PropTypes.arrayOf(PropTypes.node),
    /** A CommentAuthor element containing the name of the comment author. */
    author: PropTypes.node,
    /** The element to display as the Comment avatar - generally an AtlasKit Avatar */
    avatar: PropTypes.node.isRequired,
    /** Nested comments should be provided as children of the Comment */
    children: PropTypes.node,
    /** The main content of the Comment */
    content: PropTypes.node,
    /** Whether this comment should appear highlighted */
    highlighted: PropTypes.bool,
    /** The name of a group that a comment is restricted to. Will display in the top items */
    restrictedTo: PropTypes.string,
    /** Enable "optimistic saving" mode, remove actions and show `savingText` prop */
    isSaving: PropTypes.bool,
    /** Text to show when in "optimistic saving" mode */
    savingText: PropTypes.string,
    /** A CommentTime element containing the time to be displayed */
    time: PropTypes.node,
    /** The type of the comment - will be rendered in a lozenge at the top of the Comment */
    type: PropTypes.string,
    /** will be rendered beside the time to show whether the comment is edited or not */
    edited: PropTypes.node,
    /** Indicates whether the component is in an error state - hides actions and time */
    isError: PropTypes.bool,
    /** A list of CommentAction items rendered with a warning icon instead of the actions */
    errorActions: PropTypes.arrayOf(PropTypes.node),
    /** Text to show in the error icon label */
    errorIconLabel: PropTypes.string,
  }

  static defaultProps = {
    actions: [],
    restrictedTo: '',
    highlighted: false,
    isSaving: false,
    savingText: 'Sending...',
    isError: false,
    errorActions: [],
    errorIconLabel: '',
  }

  render() {
    const {
      actions,
      author,
      avatar,
      children,
      content,
      edited,
      errorActions,
      errorIconLabel,
      highlighted,
      isError,
      isSaving,
      restrictedTo,
      savingText,
      time,
      type,
    } = this.props;

    const headerProps = { author, edited, isError, isSaving, restrictedTo, savingText, time, type };
    const footerProps = { actions, errorActions, errorIconLabel, isError, isSaving };
    const layoutContent = (
      <div>
        <HeaderItems {...headerProps} />
        <Content isDisabled={isSaving || isError}>
          {content}
        </Content>
        <FooterItems {...footerProps} />
      </div>
    );

    return (
      <CommentLayout
        avatar={avatar}
        content={layoutContent}
        highlighted={highlighted}
      >
        {children}
      </CommentLayout>
    );
  }
}
