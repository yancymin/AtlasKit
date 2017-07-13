import { Tooltip } from '@atlaskit/tooltip';
import * as React from 'react';
import { PureComponent, ReactElement } from 'react';
import { AkButton } from './styles';

export interface Props {
  selected?: boolean;
  disabled?: boolean;
  href?: string;
  title?: string;
  target?: string;
  theme?: 'dark';
  className?: string;
  iconBefore?: ReactElement<any>;
  iconAfter?: ReactElement<any>;
  spacing?: 'default' | 'compact' | 'none';
  onClick?: () => void;
}

export interface State {
  isTooltipVisible: boolean;
}

export default class ToolbarButton extends PureComponent<Props, {}> {
  state: State = {
    isTooltipVisible: false
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const button = (
      <AkButton
        className={`${this.props.className}`}
        ariaHaspopup={true}
        isDisabled={this.props.disabled}
        isSelected={this.props.selected}
        spacing={this.props.spacing || 'none'}
        appearance="subtle"
        href={this.props.href}
        onClick={this.handleClick}
        target={this.props.target}
        theme={this.props.theme}
        iconBefore={this.props.iconBefore}
        iconAfter={this.props.iconAfter}
      >
        {this.props.children}
      </AkButton>
    );

    return this.props.title
      ? (
        <Tooltip
          position="top"
          description={this.props.title}
          visible={this.state.isTooltipVisible}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        >
          {button}
        </Tooltip>
      )
      : button;
  }

  private handleClick = () => {
    const { disabled, onClick } = this.props;
    if (!disabled && onClick) {
      onClick();
    }

    this.setState({ isTooltipVisible: false });
  }

  private handleMouseOver = () => {
    this.setState({ isTooltipVisible: true });
  }

  private handleMouseOut = () => {
    this.setState({ isTooltipVisible: false });
  }
}
