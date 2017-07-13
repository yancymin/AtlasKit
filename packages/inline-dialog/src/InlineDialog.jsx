import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Layer from '@atlaskit/layer';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import Container from './styled/Container';

// this offset is passed to popper as two space separated numbers representing
// the offset from the target the first is distance along the same axis you are
// on (top or bottom aligned would move left/right) and the second is on the
// perpendicular axis (how far 'away' you are from the target) both are measured
// in pixels
const dialogOffset = `0 ${akGridSizeUnitless}`;

// TODO: expose positions and flipPositions from Layer and pull in here
const positions = [
  'top left', 'top center', 'top right', 'right top', 'right middle', 'right bottom',
  'bottom left', 'bottom center', 'bottom right', 'left top', 'left middle', 'left bottom',
];
const flipPositions = ['top', 'right', 'bottom', 'left'];

// TODO: expose applicable props from Layer and pull in here
export default class InlineDialog extends PureComponent {
  static propTypes = {
    /** The elements that the InlineDialog will be positioned relative to. */
    children: PropTypes.node,
    /** The elements to be displayed within the InlineDialog. */
    content: PropTypes.node,
    /** Sets whether to show or hide the dialog. */
    isOpen: PropTypes.bool,
    /** Function called when you lose focus on the object. */
    onContentBlur: PropTypes.func,
    /** Function called when you click on the open dialog. */
    onContentClick: PropTypes.func,
    /** Function called when you focus on the open dialog. */
    onContentFocus: PropTypes.func,
    /** Function called when the dialog is open and a click occurs anywhere outside
    the dialog. Calls with an object { isOpen: false } and the type of event that
    triggered the close. */
    onClose: PropTypes.func,
    /** Where the dialog should appear, relative to the contents of the children. */
    position: PropTypes.oneOf(positions),
    /** Whether the dialog's position should be altered when there is no space
    for it in its default position. If an array is passed, it will use the first
    position where there is enough space, displaying in the last position if none
    have enough space. */
    shouldFlip: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.oneOf(flipPositions)),
    ]),
  }

  static defaultProps = {
    isOpen: false,
    onContentBlur: () => {},
    onContentClick: () => {},
    onContentFocus: () => {},
    onClose: () => {},
    position: 'bottom center',
    shouldFlip: false,
  }

  componentDidMount = () => {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.props.isOpen) {
      const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
      if (!domNode || (event.target instanceof Node && !domNode.contains(event.target))) {
        this.props.onClose({ isOpen: false, event });
      }
    }
  }

  render() {
    const {
      children, content, isOpen, onContentBlur, onContentClick, onContentFocus,
      position, shouldFlip,
    } = this.props;

    const layerContent = isOpen ? (
      <Container
        onBlurCapture={onContentBlur}
        onClick={onContentClick}
        onFocusCapture={onContentFocus}
        tabIndex="-1"
      >
        {content}
      </Container>
    ) : null;

    return (
      <Layer
        autoFlip={shouldFlip}
        content={layerContent}
        offset={dialogOffset}
        position={position}
      >
        <div>
          {children}
        </div>
      </Layer>
    );
  }
}
