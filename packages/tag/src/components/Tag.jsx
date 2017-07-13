import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Chrome from './Chrome';
import Content from './Content';
import Remove from './Remove';

import Before from '../styled/Before';
import Container from '../styled/Container';

export default class Tag extends PureComponent {
  static propTypes = {
    /** Set whether tags should be rounded. */
    appearance: PropTypes.oneOf(['default', 'rounded']),
    /** Component to be rendered before the Tag. */
    elemBefore: PropTypes.node,
    /** Text to be displayed in the tag. */
    text: PropTypes.string.isRequired,
    /** uri or path. If provided, the tag will be a link.  */
    href: PropTypes.string,
    /** Text display as the aria-label for remove text. Setting this makes the
    tag removable. */
    removeButtonText: PropTypes.string,
    /** Handler to be called before the tag is removed. If it does not return a
    truthy value, the tag will not be removed. */
    onBeforeRemoveAction: PropTypes.func,
    /** Handler to be called after tag is removed. Called with the string 'Post
    Removal Hook'. */
    onAfterRemoveAction: PropTypes.func,
  }

  static defaultProps = {
    appearance: 'default',
    elemBefore: null,
    onAfterRemoveAction: () => {},
    onBeforeRemoveAction: () => true,
  }

  constructor(props) {
    super(props);
    this.state = {
      isRemoving: false,
      isRemoved: false,
      markedForRemoval: false,
    };
  }

  handleRemoveRequest = () => {
    if (this.props.onBeforeRemoveAction()) {
      this.setState({ isRemoving: true, isRemoved: false });
    }
  }
  handleRemoveComplete = () => {
    this.props.onAfterRemoveAction(this.props.text);
    this.setState({ isRemoving: false, isRemoved: true });
  }

  handleHoverChange = (hoverState) => {
    this.setState({ markedForRemoval: hoverState });
  }
  handleFocusChange = (focusState) => {
    this.setState({ isFocused: focusState });
  }

  render() {
    const { isFocused, isRemoved, isRemoving, markedForRemoval } = this.state;
    const { appearance, elemBefore, href, removeButtonText, text } = this.props;

    const isRemovable = Boolean(removeButtonText);
    const isRounded = appearance === 'rounded';
    const styled = { isFocused, isRemovable, isRemoved, isRemoving, isRounded, markedForRemoval };
    const onAnimationEnd = e => isRemoving && this.handleRemoveComplete(e);

    return (
      <Container {...styled} onAnimationEnd={onAnimationEnd}>
        <Chrome {...styled} isLink={!!href} onFocusChange={this.handleFocusChange}>
          {elemBefore ? (
            <Before>{elemBefore}</Before>
          ) : null}
          <Content {...styled} href={href}>
            {text}
          </Content>
          {isRemovable ? (
            <Remove
              {...styled}
              onHoverChange={this.handleHoverChange}
              onRemoveAction={this.handleRemoveRequest}
              removeText={removeButtonText}
            />
          ) : null}
        </Chrome>
      </Container>
    );
  }
}
