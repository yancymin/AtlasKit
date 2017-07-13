import React, { PropTypes, PureComponent } from 'react';
import { Box } from './styled';

export default class AnimatedBox extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(['bold', 'combined', 'optimistic']),
    children: PropTypes.node,
  }
  state = { isAnimating: false }
  componentDidMount() {
    const elem = this.animatedEl;
    elem.addEventListener('animationend', this.animationDone);
  }
  componentWillUnmount() {
    const elem = this.animatedEl;
    elem.removeEventListener('animationend', this.animationDone);
  }

  handleClick = () => this.setState({ isAnimating: true });
  animationDone = () => this.setState({ isAnimating: false });

  render() {
    const { appearance, children } = this.props;

    return (
      <Box
        appearance={appearance}
        innerRef={n => (this.animatedEl = n)}
        isAnimating={this.state.isAnimating}
        onClick={this.handleClick}
      >
        <span>{children}</span>
      </Box>
    );
  }
}
