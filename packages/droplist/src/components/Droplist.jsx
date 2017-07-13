import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Layer from '@atlaskit/layer';
import Spinner from '@atlaskit/spinner';
import { akGridSize } from '@atlaskit/util-shared-styles';

import Wrapper, { Content, SpinnerContainer, Trigger } from '../styled/Droplist';

const halfFocusRing = 1;
const numberOfVisibleItems = 9;
const dropOffset = `0 ${akGridSize}`;

export default class Droplist extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(['default', 'tall']),
    children: PropTypes.node,
    isLoading: PropTypes.bool,
    isOpen: PropTypes.bool,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    onOpenChange: PropTypes.func,
    position: PropTypes.string,
    shouldAllowMultilineItems: PropTypes.bool,
    shouldFitContainer: PropTypes.bool,
    shouldFlip: PropTypes.bool,
    trigger: PropTypes.node,
  }
  static defaultProps = {
    appearance: 'default',
    children: null,
    isLoading: false,
    isOpen: false,
    onClick: () => {},
    onKeyDown: () => {},
    onOpenChange: () => {},
    position: 'bottom left',
    shouldAllowMultilineItems: false,
    shouldFitContainer: false,
    shouldFlip: true,
    trigger: null,
  }
  static childContextTypes = {
    shouldAllowMultilineItems: PropTypes.bool,
  }

  getChildContext() {
    return { shouldAllowMultilineItems: this.props.shouldAllowMultilineItems };
  }

  componentDidMount = () => {
    if (this.props.shouldFitContainer && this.dropContentRef) {
      this.dropContentRef.style.width = `${this.triggerRef.offsetWidth - (halfFocusRing * 2)}px`;
    }

    document.addEventListener('click', this.handleClickOutside);
    document.addEventListener('keydown', this.handleEsc);
  }

  componentDidUpdate = () => {
    const { isOpen, shouldFitContainer } = this.props;

    if (isOpen && shouldFitContainer && this.dropContentRef) {
      this.dropContentRef.style.width = `${this.triggerRef.offsetWidth - (halfFocusRing * 2)}px`;
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleEsc);
  }

  setMaxHeight = (dropDomRef) => {
    const { appearance } = this.props;
    const maxHeight = this.getMaxHeight();

    if (maxHeight && appearance !== 'tall') {
      dropDomRef.style.maxHeight = `${maxHeight}px`;
    }
  }

  getMaxHeight = () => {
    // When dropdown contains more than 9 elemens (droplist items, droplist groups),
    // it should have scroll and cut off half of the 10th item to indicate that there are more
    // items then are seen.
    const items = this.dropContentRef.querySelectorAll('[data-role="droplistGroupHeading"], [data-role="droplistItem"]');
    const scrollThresholdItemIndex = Math.min(items.length, numberOfVisibleItems);
    const scrollThresholdItem = items[scrollThresholdItemIndex - 1];

    if (!scrollThresholdItem || (scrollThresholdItemIndex < numberOfVisibleItems)) return null;

    return scrollThresholdItem.offsetTop + (scrollThresholdItem.clientHeight / 2);
  }

  handleEsc = (event) => {
    if (event.key === 'Escape') {
      this.close({ event });
    }
  }

  handleClickOutside = (event) => {
    if (this.props.isOpen) {
      const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
      if (!domNode || (event.target instanceof Node && !domNode.contains(event.target))) {
        this.close({ event });
      }
    }
  }

  close = (attrs) => {
    this.props.onOpenChange({ isOpen: false, event: attrs.event });
  }

  render() {
    const {
      children, isOpen, isLoading, onClick, onKeyDown, position, shouldFlip,
      shouldFitContainer, trigger,
    } = this.props;

    const triggerRef = ref => (this.triggerRef = ref);
    const contentRef = (ref) => {
      if (ref) {
        this.dropContentRef = ref;
        this.setMaxHeight(ref);
      }
    };
    const layerContent = isOpen ? (
      <Content data-role="droplistContent" innerRef={contentRef}>
        {isLoading ? (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        ) : children}
      </Content>
    ) : null;

    return (
      <Wrapper
        fit={shouldFitContainer}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <Layer
          autoFlip={shouldFlip}
          content={layerContent}
          offset={dropOffset}
          position={position}
        >
          <Trigger fit={shouldFitContainer} innerRef={triggerRef}>
            {trigger}
          </Trigger>
        </Layer>
      </Wrapper>
    );
  }
}
