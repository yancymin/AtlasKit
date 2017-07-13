import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Tooltip from './Tooltip';

/* eslint-disable react/no-unused-prop-types */
/* export the smart (useful) component by default. Class name doesnt matter as user's will name it
   at import time */
export default class AKTooltip extends PureComponent {
  static propTypes = {
    /** Text to appear inside the tooltip. */
    description: PropTypes.string,
    /** Position relative to the child component. */
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    /** Component the tooltip will be relative to. */
    children: PropTypes.node,
  }

  static defaultProps = {
    description: '',
    position: 'bottom',
    children: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  hideTooltip = () => {
    this.setState({ visible: false });
  }

  showTooltip = () => {
    this.setState({ visible: true });
  }

  render() {
    const props = this.props;

    return (<Tooltip
      visible={this.state.visible}
      description={props.description}
      position={props.position}
      onMouseOver={this.showTooltip}
      onMouseOut={this.hideTooltip}
    >
      {props.children}
    </Tooltip>);
  }
}

export { Tooltip };

/* eslint-enable react/no-unused-prop-types */
