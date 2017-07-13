import * as React from 'react';
import { PureComponent } from 'react';
import { akEditorFloatingPanelZIndex } from '../../styles';
import Portal from '../Portal';
import { calculatePosition, calculatePlacement, findOverflowScrollParent, Position } from './utils';

export interface Props {
  alignX?: 'left' | 'right';
  alignY?: 'top' | 'bottom';
  target?: HTMLElement;
  fitHeight?: number;
  fitWidth?: number;
  boundariesElement?: HTMLElement;
  mountTo?: HTMLElement;
  // horizontal offset, vertical offset
  offset?: number[];
  onPositionCalculated?: (position: Position) => Position;
  onPlacementChanged?: (placement: [string, string]) => void;
}

export interface State {
  // Popup Html element reference
  popup?: HTMLElement;

  position?: Position;

  overflowScrollParent: HTMLElement | false;
}

export default class Popup extends PureComponent<Props, State> {
  static defaultProps = {
    offset: [0, 0],
    boundariesElement: document.body
  };

  state: State = {
    overflowScrollParent: false
  };

  private debounced: number | null = null;
  private placement: [string, string] = ['', ''];

  /**
   * Calculates new popup position
   */
  private updatePosition(props: Props, popup?: HTMLElement) {
    const { target, fitHeight, fitWidth, boundariesElement, offset, onPositionCalculated, onPlacementChanged, alignX, alignY } = props;

    if (!target || !popup) {
      return;
    }

    const placement = calculatePlacement(target, boundariesElement!, fitWidth, fitHeight, alignX, alignY);
    if (onPlacementChanged && this.placement.join('') !== placement.join('')) {
      onPlacementChanged(placement);
      this.placement = placement;
    }

    let position = calculatePosition({ placement, target, popup, offset: offset! });
    position = onPositionCalculated ? onPositionCalculated(position) : position;

    this.setState({ position });
  }

  /**
   * Popup initialization.
   * Checks whether it's possible to position popup along given target, and if it's not throws an error.
   */
  private initPopup(popup: HTMLElement) {
    const { target } = this.props;
    const overflowScrollParent = findOverflowScrollParent(popup);

    if (popup.offsetParent && !popup.offsetParent.contains(target!)) {
      throw new Error('Popup\'s offset parent doesn\'t contain target which means it\'s impossible to correctly position popup along with given target.');
    }

    if (overflowScrollParent && !overflowScrollParent.contains(popup.offsetParent)) {
      throw new Error('Popup is inside "overflow: scroll" container, but its offset parent isn\'t. Currently Popup isn\'t capable of position itself correctly in such case. Add "position: relative" to "overflow: scroll" container or to some other FloatingPanel wrapper inside it.');
    }

    this.setState({ popup, overflowScrollParent }, () => {
      this.updatePosition(this.props, popup);
    });
  }

  private handleRef = (popup: HTMLElement) => {
    if (!popup) {
      return;
    }

    this.initPopup(popup);
  }

  private handleResize = () => {
    if (this.debounced) {
      clearTimeout(this.debounced);
      this.debounced = null;
    }

    this.debounced = setTimeout(() => {
      this.debounced = null;

      const { popup } = this.state;
      this.updatePosition(this.props, popup);
    }, 200);
  }

  componentWillReceiveProps(newProps: Props) {
    const { popup } = this.state;
    this.updatePosition(newProps, popup);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  private renderPopup() {
    const { position } = this.state;

    return (
      <div
        ref={this.handleRef}
        style={{ position: 'absolute', zIndex: akEditorFloatingPanelZIndex, ...position }}
      >
          {this.props.children}
      </div>
    );
  }

  render() {
    if (!this.props.target) {
      return null;
    }

    if (this.props.mountTo) {
      return <Portal mountTo={this.props.mountTo}>{this.renderPopup()}</Portal>;
    }

    // Without mountTo property renders popup as is,
    // which means it will be croped by "overflow: hidden" container.
    return this.renderPopup();
  }
}
