import * as React from 'react';
import { KeyboardEvent, PureComponent } from 'react';
import { Input } from './styles';

export interface Props {
  autoFocus?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  onMouseDown?: Function;
  onBlur?: Function;
}

export interface State {
  value?: string;
}

export default class PanelTextInput extends PureComponent<Props, State> {
  private input?: HTMLInputElement;

  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue || ''
    };
  }

  componentWillReceiveProps(props: Props) {
    this.setState({
      value: props.defaultValue
    });
  }

  onMouseDown = () => {
    const { onMouseDown } = this.props;
    if (onMouseDown) {
      onMouseDown();
    }
  }

  onBlur = () => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur();
    }
  }

  render() {
    const { placeholder } = this.props;
    const { value } = this.state;
    return (
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeydown}
        onMouseDown={this.onMouseDown}
        onBlur={this.onBlur}
        innerRef={this.handleRef}
      />
    );
  }

  focus() {
    const { input } = this;
    if (input) {
      input.focus();
    }
  }

  private handleChange = () => {
    const { onChange } = this.props;
    if (this.input) {
      this.setState({
        value: this.input.value
      });
    }

    if (onChange && this.input) {
      onChange(this.input.value);
    }
  }

  private handleKeydown = (e: KeyboardEvent<any>) => {
    if (e.keyCode === 13 && this.props.onSubmit) {
      e.preventDefault(); // Prevent from submiting if an editor is inside a form.
      this.props.onSubmit(this.input!.value);
    } else if (e.keyCode === 27 && this.props.onCancel) {
      this.props.onCancel();
    }
  }

  private handleRef = (input: HTMLInputElement | null) => {
    if (input instanceof HTMLInputElement) {
      if (this.props.autoFocus) {
        input.focus();
      }
      this.input = input;
    } else {
      this.input = undefined;
    }
  }
}
