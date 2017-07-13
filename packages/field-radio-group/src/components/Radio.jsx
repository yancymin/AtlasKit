import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import InputWrapper from '../styled/InputWrapper';
import Input from '../styled/Input';
import RadioIcon from '../styled/RadioIcon';
import Indicator from '../styled/RadioIconCheckedIndicator';

/* eslint-disable jsx-a11y/label-has-for */
export default class Radio extends PureComponent {
  static propTypes = {
    isDisabled: PropTypes.bool,
    isRequired: PropTypes.bool,
    isSelected: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  }

  static defaultProps = {
    isDisabled: false,
    isSelected: false,
  }

  state = {
    isHover: false,
    isFocus: false,
  }

  onMouseEnter = () => this.setState({ isHover: true })

  onMouseLeave = () => this.setState({ isHover: false })

  onFocus = () => this.setState({ isFocus: true })

  onBlur = () => this.setState({ isFocus: false })

  render() {
    return (
      <div>
        <label>
          <InputWrapper>
            <Input
              checked={this.props.isSelected}
              disabled={this.props.isDisabled}
              name={this.props.name}
              onChange={this.props.onChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              required={this.props.isRequired}
              type="radio"
              value={this.props.value}
            />
            <RadioIcon
              isDisabled={this.props.isDisabled}
              isFocus={this.state.isFocus}
              isHover={this.state.isHover}
              isSelected={this.props.isSelected}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
            >
              {this.props.isSelected ? <Indicator isFocus={this.state.isFocus} /> : null}
            </RadioIcon>
          </InputWrapper>
          <span>
            {this.props.children}
          </span>
        </label>
      </div>
    );
  }
}
