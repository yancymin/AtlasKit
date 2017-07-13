import React from 'react';
import { mount } from 'enzyme';

import { MultiSelectStateless } from '../../src';

import { name } from '../../package.json';

describe(`${name} - stateless`, () => {
  const animStub = window.cancelAnimationFrame;
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  describe('behavior', () => {
    let select;
    beforeEach(() => {
      select = mount(<MultiSelectStateless />);
    });

    describe('focus', () => {
      it('should focus the input field if shouldFocus is set to true', () => {
        const input = select.find('input');
        expect(document.activeElement).not.toBe(input.node);
        select.setProps({ shouldFocus: true });
        expect(document.activeElement).toBe(input.node);
      });
    });
  });
});
