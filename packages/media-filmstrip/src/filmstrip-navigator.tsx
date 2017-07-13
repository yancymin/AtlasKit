/* tslint:disable:variable-name */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Component, DragEvent as ReactDragEvent, DragEventHandler, WheelEvent} from 'react';
import {FilmStripViewWrapper, FilmStripListWrapper, FilmStripList, ArrowLeftWrapper, ArrowRightWrapper, ShadowLeft, ShadowRight, FilmStripListItem} from './styled';
import ArrowLeft from '@atlaskit/icon/glyph/arrowleft';
import ArrowRight from '@atlaskit/icon/glyph/arrowright';

export interface FilmstripNavigatorProps {
  children?: any;
  width?: number;

  onDrop?: (event: DragEvent) => void;
  onDragEnter?: (event: DragEvent) => void;
  onDragOver?: (event: DragEvent) => void;
}

function onDragEvent(dragEventHandler?: (event: DragEvent) => void): DragEventHandler<HTMLDivElement> {
  return (event: ReactDragEvent<HTMLDivElement>) => {
    if (!dragEventHandler) {
      return;
    }

    event.preventDefault();
    dragEventHandler(event.nativeEvent as DragEvent);
  };
}

export interface FilmStripNavigatorState {
  showLeft: boolean;
  showRight: boolean;
  position: number;
  showTransition: boolean;
  transitionDuration: number;
}

interface FilmStripNavigatorPartialState {
  showLeft?: boolean;
  showRight?: boolean;
  position?: number;
  showTransition?: boolean;
  transitionDuration?: number;
}

export type NavigationDirection = 'left' | 'right';

const minDuration = 0.5;
const baseAnimationDuration = 0.5;
const maxAnimationDuration = 1.0;
const cardPadding = 4;
const initialPadding = 10;

export class FilmStripNavigator extends Component<FilmstripNavigatorProps, FilmStripNavigatorState> {
  private wrapperWidth: number;
  private listWidth: number;
  private numOfCards: number;
  private cardWidth: number;
  private listElement: HTMLElement;
  private unmounted: boolean;

  constructor(props) {
    super(props);
    this.state = {
      showLeft: false,
      showRight: false,
      position: 0,
      showTransition: false,
      transitionDuration: 0
    };
  }

  componentDidMount() {
    this.unmounted = false;
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    this.unmounted = true;
    window.removeEventListener('resize', this.onWindowResize);
  }

  render() {
    const {
      width: propWidth,
      children,
      onDrop,
      onDragEnter,
      onDragOver
    } = this.props;

    const {
      position,
      showTransition,
      transitionDuration: stateTransistionDuration,
      showLeft,
      showRight
    } = this.state;

    const width = propWidth ? `${propWidth}px`: undefined;

    const transform = `translateX(${-position}px)`;
    const leftArrow = this.arrowFor('left');
    const rightArrow = this.arrowFor('right');

    const transitionProperty = showTransition ? 'transform' : 'none';
    const transitionDuration = `${stateTransistionDuration}s`;

    const items = children ? children.map((item, k) => (
      <FilmStripListItem key={item.key || k}>
        {item}
      </FilmStripListItem>
    )) : null;

    return (
      <FilmStripViewWrapper style={{width}} onWheel={this.onScroll} onDrop={onDragEvent(onDrop)} onDragEnter={onDragEvent(onDragEnter)} onDragOver={onDragEvent(onDragOver)}>
        {showLeft ? leftArrow : undefined}
        <FilmStripListWrapper className="filmtrip-list-wrapper">
          <FilmStripList style={{transform, transitionProperty, transitionDuration}} innerRef={this.getDimensions}>
            {items}
          </FilmStripList>
        </FilmStripListWrapper>
        {showRight ? rightArrow : undefined}
      </FilmStripViewWrapper>
    );
  }

  componentDidUpdate() {
    if (!this.listElement) { return; }

    const newListWidth = this.listElement.getBoundingClientRect().width;

    // Update dimensions if the list has grown
    if (newListWidth !== this.listWidth) {
      this.getDimensions();
    }
  }

  private arrowFor(direction: NavigationDirection): JSX.Element {
    if (direction === 'left') {
      return <ShadowLeft>
               <ArrowLeftWrapper className="arrow" onClick={this.navigate('left')}>
                 <ArrowLeft label="left"/>
               </ArrowLeftWrapper>
             </ShadowLeft>;
    }

    return <ShadowRight>
             <ArrowRightWrapper className="arrow" onClick={this.navigate('right')}>
               <ArrowRight label="right"/>
             </ArrowRightWrapper>
           </ShadowRight>;
  }

  private onWindowResize = (event) => {
    const parent = ReactDOM.findDOMNode(this).parentElement;
    if (!parent || !this.allowNavigation) { return; }

    this.wrapperWidth = parent.getBoundingClientRect().width;
    this.setNewPosition(this.state.position, this.state.showTransition);
  }

  private get allowNavigation() {
    return this.numOfCards > 1;
  }

  private getDimensions = (el?: HTMLElement) => {
    const element = el || this.listElement;

    if (!element || !element.parentElement) {
      return;
    }

    this.listElement = element;
    this.wrapperWidth = element.parentElement.getBoundingClientRect().width;
    this.listWidth = element.getBoundingClientRect().width;
    this.numOfCards = element.children.length;

    if (!this.allowNavigation) { return; }

    if (this.numOfCards !== 0) {
      const card = element.firstChild as HTMLElement;
      const totalWidth = card.clientWidth || 0;
      this.cardWidth = Math.max(totalWidth - (cardPadding + initialPadding), 0);
    } else {
      this.cardWidth = 0;
    }

    if (!this.unmounted) {
      this.setNewPosition(0, this.state.showTransition);
    }
  }

  private onScroll = (e: WheelEvent<HTMLDivElement>) => {
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    if (!this.allowNavigation || !isHorizontalScroll) { return; }

    e.preventDefault();
    const showTransition = false;
    this.updateState({showTransition});
    this.setNewPosition(this.state.position + e.deltaX, showTransition);
  }

  private updateState(newState: FilmStripNavigatorPartialState) {
    this.setState((prevState) => {
      return {...prevState, ...newState};
    });
  }

  private getTransitionDuration(oldPosition: number, newPosition: number): number {
    if (Math.abs(newPosition - oldPosition) < 1E-6) {
      return baseAnimationDuration;
    } else {
      const diff = Math.abs(newPosition - oldPosition);
      const relativeOffset = diff / this.wrapperWidth;
      const duration = maxAnimationDuration - baseAnimationDuration * relativeOffset;
      return Math.max(Math.min(duration, maxAnimationDuration), minDuration);
    }
  }

  private setNewPosition(desiredPosition: number, showTransition: boolean): void {
    const oldPosition = this.state.position;
    const minPosition = 0;
    const maxPosition = Math.max(this.listWidth - this.wrapperWidth, 0);
    const position = Math.max(Math.min(desiredPosition, maxPosition), minPosition);

    const left = position;
    const right = position + this.wrapperWidth;

    const showLeft = left > 0;
    const showRight = right < this.listWidth;

    const transitionDuration = this.getTransitionDuration(oldPosition, position);
    const arrowVisibilityDelay = showTransition ? transitionDuration * 1000 : 0;

    // Delaying arrow state in order to not modify it visibility until the transition has finished
    setTimeout(() => {
      this.triggerScrollEvent();
      this.updateState({showLeft, showRight});
    }, arrowVisibilityDelay);

    this.updateState({position, transitionDuration});
  }

  // Triggers a real scroll event in the Wrapper in order to let child components about the position update.
  // We need to do this this way since we are moving the list using "translateX"
  // instead of the normal scroll events
  triggerScrollEvent() {
    if (!this.listElement || !this.listElement.parentElement) { return; }

    const event = document.createEvent('MouseEvents');
    event.initEvent('scroll', true, true);

    this.listElement.parentElement.dispatchEvent(event);
  }

  private getClosest(position: number, start: number, accumulator: number, stop: number): number {
    // First position
    let minDist = Math.abs(position - start);
    let result = start;

    // Positions between cards
    let x = accumulator;
    for (let i = 0; i < this.numOfCards - 1; ++i) {
      x += (this.cardWidth + 2 * cardPadding);

      const dist = Math.abs(position - x);
      if (dist < minDist) {
        minDist = dist;
        result = x;
      }
    }

    // Last position
    const dist = Math.abs(position - stop);
    if (dist < minDist) {
      result = stop;
    }

    return result;
  }

  private getClosestForLeft(leftPosition: number): number {
    return this.getClosest(leftPosition, 0, initialPadding - 2 * cardPadding, this.listWidth - initialPadding);
  }

  private getClosestForRight(rightPosition: number): number {
    return this.getClosest(rightPosition, initialPadding, initialPadding, this.listWidth);
  }

  private moveLeft(showTransition: boolean): void {
    const currentLeft = this.state.position;
    const newLeft = currentLeft - this.wrapperWidth;
    this.setNewPosition(this.getClosestForLeft(newLeft), showTransition);
  }

  private moveRight(showTransition: boolean): void {
    const currentRight = this.state.position + this.wrapperWidth;
    const newRight = currentRight + this.wrapperWidth;
    const adjustedRight = this.getClosestForRight(newRight);
    this.setNewPosition(adjustedRight - this.wrapperWidth, showTransition);
  }

  navigate(direction: NavigationDirection): () => void {
    const component = this;

    return () => {
      const showTransition = true;
      component.updateState({showTransition});

      if (direction === 'left') {
        component.moveLeft(showTransition);
      } else {
        component.moveRight(showTransition);
      }
    };
  }
}

export default FilmStripNavigator;
