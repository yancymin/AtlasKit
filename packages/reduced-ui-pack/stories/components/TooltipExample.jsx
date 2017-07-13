import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class TooltipExample extends PureComponent {
  static propTypes = {
    buttonText: PropTypes.string,
    position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    tooltip: PropTypes.string,
    type: PropTypes.oneOf(['button', 'link', 'span']),
  }

  static defaultProps = {
    position: 'top',
    tooltip: 'Oh hi there!',
    type: 'button',
  }

  renderTriggerElement = () => {
    const triggerContents = this.props.buttonText || this.props.position;
    const triggerProps = {
      'data-ak-tooltip': this.props.tooltip,
      'data-ak-tooltip-position': this.props.position,
    };

    if (this.props.type === 'button') {
      return (
        <button
          className="ak-button ak-button__appearance-default"
          {...triggerProps}
        >
          {triggerContents}
        </button>
      );
    } else if (this.props.type === 'link') {
      return <a href="#trigger" {...triggerProps}>{triggerContents}</a>;
    }
    return <span {...triggerProps}>{triggerContents}</span>;
  }

  render() {
    return (
      <span style={{ display: 'inline-block', margin: 4 }}>
        {this.renderTriggerElement()}
      </span>
    );
  }
}
