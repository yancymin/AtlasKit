import React, { PropTypes, PureComponent } from 'react';
import ExpanderInternal from '../styled/Expander';

export default class Expander extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isExpanded: PropTypes.bool,
  }

  static defaultProps = {
    isExpanded: false,
  }

  state = {
    isAnimating: false,
  }

  componentWillUpdate(nextProps) {
    if (this.props.isExpanded !== nextProps.isExpanded) {
      this.setState({ isAnimating: true });
    }
  }

  handleTransitionEnd = () => {
    this.setState({ isAnimating: false });
  }

  render() {
    const { isExpanded } = this.props;

    // Need to always render the ExpanderInternal otherwise the
    // reveal transiton doesn't happen. We can't use CSS animation for
    // the the reveal because we don't know the height of the content.
    const childrenIfExpanded = (this.state.isAnimating || isExpanded)
      ? this.props.children
      : null;

    return (
      <ExpanderInternal
        aria-hidden={!isExpanded}
        isExpanded={isExpanded}
        onTransitionEnd={this.handleTransitionEnd}
      >
        {childrenIfExpanded}
      </ExpanderInternal>
    );
  }
}
