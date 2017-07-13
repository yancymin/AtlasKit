import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Container from './styled/Container';

export default class Blanket extends PureComponent {
  static propTypes = {
    /** Whether mouse events can pierce the blanket. If true, onBlanketClicked will not be fired */
    canClickThrough: PropTypes.bool,
    /** Whether the blanket has a tinted background color. */
    isTinted: PropTypes.bool,
    /** Handler function to be called when the blanket is clicked */
    onBlanketClicked: PropTypes.func,
  };

  static defaultProps = {
    canClickThrough: false,
    isTinted: false,
    onBlanketClicked: () => {},
  };

  render() {
    const { canClickThrough, isTinted, onBlanketClicked } = this.props;
    const onClick = canClickThrough ? null : onBlanketClicked;
    const containerProps = { canClickThrough, isTinted, onClick };

    // TODO make sure that the div onClick is accessible
    return <Container {...containerProps} />;
  }
}
