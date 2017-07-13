import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
// I am disabling eslint in the line below because we have an unexplained, unreproducible issue in
// CI sometimes where popper is not always resolvable. See AK-2971.
import Popper from 'popper.js'; // eslint-disable-line  import/no-unresolved, import/extensions
import { akZIndexLayer } from '@atlaskit/util-shared-styles';

import { POSITION_ATTRIBUTE_ENUM, getFlipBehavior, positionPropToPopperPosition } from './internal/helpers';

/* eslint-disable react/no-unused-prop-types */

export default class Layer extends PureComponent {
  static propTypes = {
    position: PropTypes.oneOf(POSITION_ATTRIBUTE_ENUM.values),
    autoFlip: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.oneOf(['top', 'right', 'bottom', 'left'])),
    ]),
    boundariesElement: PropTypes.oneOf(['viewport', 'window', 'scrollParent']),
    offset: PropTypes.string,
    content: PropTypes.node,
    onFlippedChange: PropTypes.func,
    children: PropTypes.node,
  }

  static defaultProps = {
    position: POSITION_ATTRIBUTE_ENUM.default,
    boundariesElement: 'viewport',
    autoFlip: true,
    offset: '0 0',
    content: null,
    onFlippedChange: () => {},
    children: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      position: null,
      transform: null,
      flipped: false,
      actualPosition: null,
      // We set these default offsets to prevent a flash of popper content in the wrong position
      // which can cause incorrect height calculations. Popper will calculate these values
      offsets: {
        popper: {
          left: -9999,
          top: -9999,
        },
      },
      originalPosition: null,
      // fix Safari parent width: https://product-fabric.atlassian.net/browse/ED-1784
      cssPosition: 'absolute',
    };
  }

  componentDidMount() {
    this.applyPopper(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.applyPopper(nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.flipped !== this.state.flipped) {
      this.props.onFlippedChange({
        flipped: this.state.flipped,
        actualPosition: this.state.actualPosition,
        originalPosition: this.state.originalPosition,
      });
    }
  }

  componentWillUnmount() {
    if (this.popper) {
      this.popper.destroy();
    }
  }

  extractStyles = (state) => {
    if (state) {
      const left = Math.round(state.offsets.popper.left);
      const top = Math.round(state.offsets.popper.top);

      this.setState({
        // position: fixed or absolute
        cssPosition: state.offsets.popper.position,
        transform: `translate3d(${left}px, ${top}px, 0px)`,
        // state.flipped is either true or undefined
        flipped: !!state.flipped,
        actualPosition: state.position,
        originalPosition: state.originalPosition,
      });
    }
  };

  applyPopper(props) {
    if (!this.targetRef || !this.contentRef) {
      return;
    }

    if (this.popper) {
      this.popper.destroy();
    }

    // "new Popper(...)" operation is very expensive when called on virtual DOM.
    // This condition reduces the number of calls so we can run our tests faster
    // (time was reduced from 100s to 13s).
    if (!props.content) {
      return;
    }

    // we wrap our target in a div so that we can safely get a reference to it, but we pass the
    // actual target to popper
    const actualTarget = this.targetRef.firstChild;

    const popperOpts = {
      placement: positionPropToPopperPosition(props.position),
      onCreate: this.extractStyles,
      onUpdate: this.extractStyles,
      modifiers: {
        applyStyle: {
          enabled: false,
        },
        hide: {
          enabled: false,
        },
        offset: {
          enabled: true,
          offset: this.props.offset,
        },
        flip: {
          enabled: !!this.props.autoFlip,
          flipVariations: true,
          boundariesElement: this.props.boundariesElement,
          padding: 0, // leave 0 pixels between popper and the boundariesElement
        },
        preventOverflow: {
          enabled: !!this.props.autoFlip,
          escapeWithReference: true,
        },
      },
    };

    const flipBehavior = getFlipBehavior(props);
    if (flipBehavior) {
      popperOpts.modifiers.flip.behavior = flipBehavior;
    }

    this.popper = new Popper(actualTarget, this.contentRef, popperOpts);
  }

  render() {
    const { cssPosition, transform } = this.state;
    return (
      <div>
        <div ref={ref => (this.targetRef = ref)}>
          {this.props.children}
        </div>
        <div
          ref={ref => (this.contentRef = ref)}
          style={{ top: 0, left: 0, position: cssPosition, transform, zIndex: akZIndexLayer }}
        >
          {this.props.content}
        </div>
      </div>
    );
  }
}

/* eslint-enable react/no-unused-prop-types */
