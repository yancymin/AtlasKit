import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Span from '../styled/Chrome';

export default class Chrome extends PureComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    isLink: PropTypes.bool.isRequired,
    isRemovable: PropTypes.bool.isRequired,
    isRemoved: PropTypes.bool,
    isRemoving: PropTypes.bool,
    isRounded: PropTypes.bool,
    markedForRemoval: PropTypes.bool.isRequired,
    onFocusChange: PropTypes.func.isRequired,
  }

  handleKeyPress = (e) => {
    const spacebarOrEnter = (e.key === ' ' || e.key === 'Enter');

    if (this.chromeRef && spacebarOrEnter) {
      this.chromeRef.querySelector('a').click();
    }
  }
  handleBlur = () => {
    this.props.onFocusChange(false);
  }
  handleFocus = (e) => {
    if (e.target === this.chromeRef) this.props.onFocusChange(true);
  }

  render() {
    const {
      children, isLink, isRemovable, isRemoved, isRemoving, isRounded, markedForRemoval,
    } = this.props;

    const props = {
      innerRef: r => (this.chromeRef = r),
      isRemovable,
      isRemoved,
      isRemoving,
      isRounded,
      markedForRemoval,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onKeyPress: this.handleKeyPress,
      tabIndex: -1,
    };

    if (isLink) {
      props.role = 'link';
      props.tabIndex = 0;
    }

    return <Span {...props}>{children}</Span>;
  }
}
