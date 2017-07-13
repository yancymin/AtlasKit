// @flow
import React, { PureComponent } from 'react';

import Container from './styled/Container';
import Svg from './styled/Svg';
import type { Func, SpinnerGlyphProps, SpinnerGlyphState } from './types';

const SIZES_MAP = {
  small: 20,
  medium: 30,
  large: 50,
  xlarge: 100,
};
const DEFAULT_SIZE = SIZES_MAP.small;

export default class SpinnerGlyph extends PureComponent {
  // eslint-disable-next-line react/sort-comp
  props: SpinnerGlyphProps

  state: SpinnerGlyphState = {
    phase: '',
  }

  parentNode: ?Node

  componentWillAppear(callback: Func) { this.enter(callback); }

  componentDidAppear() { this.idle(); }

  componentWillEnter(callback: Func) { this.enter(callback); }

  componentDidEnter() { this.idle(); }

  componentWillLeave(callback: Func) { this.leave(callback); }

  componentDidLeave() { this.props.onComplete(); }

  enter(callback: Func) {
    const setEnterPhase = () => {
      this.setState({ phase: 'ENTER' });
      this.runAfterAnimation(callback);
    };

    const { delay } = this.props;
    if (delay) {
      this.setState({ phase: 'DELAY' });
      this.runAfterAnimation(setEnterPhase);
    } else {
      setEnterPhase();
    }
  }

  idle() {
    this.setState({ phase: 'IDLE' });
  }

  leave(callback: Func) {
    this.setState({ phase: 'LEAVE' });
    this.runAfterAnimation(callback);
  }

  runAfterAnimation = (callback: Func) => {
    const { parentNode } = this;
    function executeCallback(event: AnimationEvent) {
      // ignore animation events on the glyph
      if (event.target.tagName === 'svg') {
        return false;
      }
      callback();
      return parentNode && parentNode.removeEventListener('animationend', executeCallback);
    }
    return parentNode && parentNode.addEventListener('animationend', executeCallback);
  }

  validateSize = () => {
    const { size } = this.props;
    const spinnerSize = SIZES_MAP[size] || size;
    return typeof spinnerSize === 'number' ? spinnerSize : DEFAULT_SIZE;
  }

  render() {
    const { phase } = this.state;
    const { delay, invertColor } = this.props;
    const size = this.validateSize();

    const strokeWidth = Math.round(size / 10);
    const strokeRadius = (size / 2) - (strokeWidth / 2);

    return (
      <Container
        delay={delay / 1000}
        innerRef={(node: Node) => { this.parentNode = node ? node.parentElement : null; }}
        phase={phase}
        size={size}
      >
        <Svg
          focusable="false"
          height={size}
          invertColor={invertColor}
          phase={phase}
          size={size}
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={strokeRadius}
          />
        </Svg>
      </Container>
    );
  }
}
