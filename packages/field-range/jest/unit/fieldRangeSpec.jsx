/* eslint-disable no-undef, import/no-extraneous-dependencies */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import * as sinon from 'sinon';
import { expect } from 'chai';
import FieldRange from '../..';

// We need to simulate a real event on the DOM element due IE compatibility
const simulateValueChange = (input, value) => {
  const inputElement = input.find('input').node;

  inputElement.value = value;
  inputElement.dispatchEvent(new Event('input', { detail: { value } }));
};

describe('FieldRange', () => {
  describe('with default props', () => {
    let fieldRange;
    let input;

    beforeEach(() => {
      fieldRange = mount(<FieldRange value={20.12} />);
      input = fieldRange.find('input');
    });

    it('should have input with type "range"', () => {
      expect(input.props().type).to.equal('range');
    });

    it('should have min, max and step set to default values', () => {
      expect(input.props().min).to.equal(0);
      expect(input.props().max).to.equal(100);
      expect(input.props().step).to.equal(0.1);
    });

    it('should input with defined value', () => {
      expect(input.props().value).to.equal('20.12');
    });
  });

  describe('with defined props', () => {
    let fieldRange;
    let input;
    let onChangeSpy;

    beforeEach(() => {
      onChangeSpy = sinon.spy();
      fieldRange = mount(<FieldRange value={25} min={10} max={20} onChange={onChangeSpy} />);
      input = fieldRange.find('input');
    });

    it('should have defined min and max values', () => {
      expect(input.props().min).to.equal(10);
      expect(input.props().max).to.equal(20);
    });

    it('should call spy when value is changed', () => {
      simulateValueChange(input, 15);

      expect(onChangeSpy.calledOnce).to.equal(true);
      expect(onChangeSpy.calledWithExactly(15)).to.equal(true);
    });

    it('should change input value when value is changed', () => {
      simulateValueChange(input, 15);

      expect(input.props().value).to.equal('15');
    });

    it('should change input value when prop is changed', () => {
      fieldRange.setProps({ value: 15 });
      expect(input.props().value).to.equal('15');
    });
  });
});
