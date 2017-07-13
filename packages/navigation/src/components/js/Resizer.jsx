import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ResizerInner from '../styled/ResizerInner';
import ResizerButton from './ResizerButton';
import {
  globalOpenWidth,
  standardOpenWidth,
} from '../../shared-variables';

export default class Resizer extends PureComponent {
  static propTypes = {
    onResizeStart: PropTypes.func,
    onResizeEnd: PropTypes.func,
    onResizeButton: PropTypes.func,
    onResize: PropTypes.func,
    navigationWidth: PropTypes.number,
    showResizeButton: PropTypes.bool,
  }
  static defaultProps = {
    onResizeStart: () => {},
    onResizeEnd: () => {},
    onResizeButton: () => {},
    onResize: () => {},
    navigationWidth: standardOpenWidth,
    showResizeButton: true,
  }
  constructor(props) {
    super(props);
    this.state = {
      startScreenX: 0,
      isHovering: false,
      isResizing: false,
    };
  }
  mouseDownHandler = (e) => {
    e.preventDefault();
    if (!this.resizerNode || e.target !== this.resizerNode) {
      return;
    }
    this.props.onResizeStart();
    this.setState({
      startScreenX: e.screenX,
    });
    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
  }

  mouseUpHandler = (e) => {
    this.props.onResizeEnd(e.screenX - this.state.startScreenX);
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);
  }

  mouseMoveHandler = (e) => {
    this.props.onResize(e.screenX - this.state.startScreenX);
  }

  mouseEnterHandler = () => {
    this.setState({
      isHovering: true,
    });
  }

  mouseLeaveHandler = () => {
    this.setState({
      isHovering: false,
    });
  }

  isPointingRight = () => this.props.navigationWidth < standardOpenWidth

  resizeButtonHandler = () => {
    const isExpanded = (this.props.navigationWidth > standardOpenWidth);
    const isPointingRight = this.isPointingRight();

    if (isPointingRight || isExpanded) {
      this.props.onResizeButton({
        isOpen: true,
        width: standardOpenWidth,
      });
    } else {
      this.props.onResizeButton({
        isOpen: false,
        width: globalOpenWidth,
      });
    }
  }

  render() {
    const resizerButton = this.props.showResizeButton ? (
      <ResizerButton
        isVisible={this.state.isHovering}
        isPointingRight={this.isPointingRight()}
        onClick={this.resizeButtonHandler}
      />
    ) : null;

    return (
      <ResizerInner
        innerRef={(resizerNode) => {
          this.resizerNode = resizerNode;
        }}
        onMouseDown={this.mouseDownHandler}
        onMouseEnter={this.mouseEnterHandler}
        onMouseLeave={this.mouseLeaveHandler}
      >
        {resizerButton}
      </ResizerInner>
    );
  }
}
