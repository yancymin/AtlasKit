import uid from 'uid';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import CloseIcon from 'ak-icon/glyph/cancel';
import ConfirmIcon from 'ak-icon/glyph/confirm';
import { Handle, IconWrapper, Inner, Input, Label, Slide } from './styled';

export default class ToggleStateless extends PureComponent {
  static propTypes = {
    /** Whether the toggle is checked or not */
    isChecked: PropTypes.bool,
    /** Whether the toggle is disabled or not. This will prevent any interaction with the user */
    isDisabled: PropTypes.bool,
    /** Label to be set for accessibility */
    label: PropTypes.string,
    /** Descriptive name for value property to be submitted in a form */
    name: PropTypes.string,
    /** Handler to be called when toggle is unfocused */
    onBlur: PropTypes.func,
    /** Handler to be called when native 'change' event happens internally. */
    onChange: PropTypes.func,
    /** Handler to be called when toggle is focused. */
    onFocus: PropTypes.func,
    /** Defines the size of the toggle. */
    size: PropTypes.oneOf(['regular', 'large']),
    /** The value to be submitted in a form. */
    value: PropTypes.string,
  }

  static defaultProps = {
    isChecked: false,
    isDisabled: false,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    size: 'regular',
  };

  state = {
    isFocused: false,
  }

  componentDidUpdate() {
    // TODO: This is a hack. find a way to make it work with preventDefault onMouseDown event
    if (this.mouseWasDown) {
      this.input.blur();
      this.mouseWasDown = false;
    }
  }

  handleMouseDown = () => (
    this.mouseWasDown = true
  )
  handleBlur = (e) => {
    this.setState({ isFocused: false });
    this.props.onBlur(e);
  }
  handleChange = (e) => {
    this.props.onChange(e);
  }
  handleFocus = (e) => {
    this.setState({ isFocused: true });
    this.props.onFocus(e);
  }

  render() {
    const { isChecked, isDisabled, label, name, size, value } = this.props;
    const { isFocused } = this.state;
    const styledProps = { isChecked, isDisabled, isFocused, size };
    const Icon = isChecked ? ConfirmIcon : CloseIcon;
    const id = uid();

    return (
      <Label size={size} isDisabled={isDisabled} htmlFor={id} onMouseDown={this.handleMouseDown}>
        <Input
          checked={isChecked}
          disabled={isDisabled}
          id={id}
          name={name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          innerRef={el => (this.input = el)}
          type="checkbox"
          value={value}
        />
        <Slide {...styledProps}>
          <Inner {...styledProps}>
            <Handle
              isChecked={isChecked}
              isDisabled={isDisabled}
              size={size}
            />
            <IconWrapper isChecked={isChecked} size={size}>
              <Icon label={label || (isChecked ? 'Uncheck' : 'Check')} />
            </IconWrapper>
          </Inner>
        </Slide>
      </Label>
    );
  }
}
