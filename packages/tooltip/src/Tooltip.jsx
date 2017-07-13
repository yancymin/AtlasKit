import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Layer from '@atlaskit/layer';

import styles from './styles.less';
import { positionToPopperPosition, getAnimationClass } from './internal/helpers';

/* eslint-disable react/no-unused-prop-types */

export default class StatelessTooltip extends PureComponent {
  static propTypes = {
    /** Position relative to the child component. */
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    /** Text to appear inside the tooltip. */
    description: PropTypes.string,
    /** Set whether the tooltip is visible or not. */
    visible: PropTypes.bool,
    /** Handler called when the mouse enters the child component. */
    onMouseOver: PropTypes.func,
    /** Handler called when the mouse leaves the child component. */
    onMouseOut: PropTypes.func,
    /** Component the tooltip will be relative to. */
    children: PropTypes.node,
  }

  static defaultProps = {
    position: 'bottom',
    description: '',
    visible: false,
    onMouseOver: () => {},
    onMouseOut: () => {},
    children: null,
  }

  constructor(props) {
    super(props);
    this.state = { isFlipped: false };
  }

  handleLayerFlipChange = ({ flipped }) => {
    this.setState({ isFlipped: flipped });
  }

  render() {
    const props = this.props;
    const animationClass = getAnimationClass(props.position, this.state.isFlipped);
    const content = props.visible ?
      (<div className={`${styles.tooltip} ${animationClass}`}>{props.description}</div>) :
      null;

    return (
      <div onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut}>
        <Layer
          position={positionToPopperPosition(props.position)}
          autoFlip
          content={content}
          onFlippedChange={this.handleLayerFlipChange}
        >
          {this.props.children}
        </Layer>
      </div>
    );
  }
}

/* eslint-enable react/no-unused-prop-types */
