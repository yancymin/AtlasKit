// @flow
import React, { PureComponent } from 'react';
import { Input } from './styled';

type Props = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => null;
};

type State = {
  value: number;
};

const isIE = navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0;
const eventName = isIE ? 'change' : 'input';
const defaultStep = 0.1;

// We need to pass an event handler to "input" element since we are using the "controlled" mode
const dummyOnChangeHandler = () => {};

export default class Slider extends PureComponent {
  static defaultProps = {
    min: 0,
    max: 100,
    step: defaultStep,
    onChange: () => {
    },
  };

  constructor(props) {
    super(props);

    this.inputElement = null;
    this.state = {
      value: props.value,
    };
  }

  state: State;

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  componentWillUnmount() {
    const { inputElement, onInputChange } = this;
    if (!inputElement) { return; }

    inputElement.removeEventListener(eventName, onInputChange);
  }

  onInputChange = (e) => {
    const value = parseFloat(e.target.value);
    const { onChange } = this.props;

    this.setState({ value });

    if (onChange) {
      onChange(value);
    }
  }

  // We can't just use the React-way of adding events since "onChange" doesn't work on IE.
  // Instead we need to grab the DOM reference and add the right even manually.
  // https://github.com/facebook/react/issues/3096
  // https://github.com/facebook/react/issues/554
  addEvents = (element) => {
    if (!element) { return; }

    this.inputElement = element;
    const { onInputChange } = this;
    element.addEventListener(eventName, onInputChange);
  }

  props: Props;

  render() {
    const { min, max, step } = this.props;
    const { value } = this.state;

    return (<Input
      innerRef={this.addEvents}
      type="range"
      value={value.toString()}
      min={min}
      max={max}
      step={step}
      onChange={dummyOnChangeHandler}
    />);
  }
}
