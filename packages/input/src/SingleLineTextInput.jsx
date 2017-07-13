import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import keyCode from 'keycode';
import { akFontSizeDefault } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const common = `
  color: inherit;
  font-size: ${akFontSizeDefault};
  letter-spacing: normal;
  appearance: none;
`;

const ReadView = styled.div`
  ${common}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EditView = styled.input`
  ${common}
  line-height: inherit;
  background: transparent;
  border: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  cursor: inherit;
  outline: none;
  width: 100%;
  :invalid: {
    boxshadow: none;
  },
`;

export default class SingleLineTextInput extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    style: PropTypes.shape({}),
    isInitiallySelected: PropTypes.bool,
    isEditing: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func,
    onKeyDown: PropTypes.func,
  }

  static defaultProps = {
    style: {},
    isInitiallySelected: false,
    onConfirm: () => {},
    onKeyDown: () => {},
  }

  componentDidMount() {
    this.selectInputIfNecessary();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isEditing) {
      this.selectInputIfNecessary();
    }
  }

  onKeyDown = (event) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
    if (event.keyCode === keyCode('enter')) {
      this.props.onConfirm(event);
    }
  }

  getInputProps = () => {
    const inputProps = {
      ...this.props,
      type: 'text',
      onKeyDown: this.onKeyDown,
    };
    delete inputProps.style;
    delete inputProps.isEditing;
    delete inputProps.isInitiallySelected;
    delete inputProps.onConfirm;
    return inputProps;
  }

  selectInputIfNecessary() {
    if (this.props.isEditing && this.props.isInitiallySelected) {
      this.inputRef.select();
    }
  }

  renderEditView() {
    return (
      <EditView
        style={this.props.style}
        {...this.getInputProps()}
        innerRef={(ref) => { this.inputRef = ref; }}
      />
    );
  }

  renderReadView() {
    return (
      <ReadView style={this.props.style}>{this.props.value}</ReadView>
    );
  }

  render() {
    return this.props.isEditing ? this.renderEditView() : this.renderReadView();
  }
}
