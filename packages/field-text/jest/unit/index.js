import React from 'react';
import { shallow, mount } from 'enzyme';
import Base from '@atlaskit/field-base';
import sinon from 'sinon';

import FieldText, { FieldTextStateless } from '../../src';
import Input from '../../src/styled/Input';

describe('FieldTextStateless', () => {
  // Stub window.cancelAnimationFrame, so Popper (used in Layer) doesn't error when accessing it.
  const animStub = window.cancelAnimationFrame;
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  it('defaults', () => {
    const wrapper = shallow(<FieldTextStateless />);
    expect(wrapper.find(Base).length).toBe(1);
    expect(wrapper.find(Input).length).toBe(1);
  });

  describe('properties', () => {
    describe('compact prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(shallow(<FieldTextStateless compact />).find(Base).props().isCompact).toBe(true);
      });
    });

    describe('disabled prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(
          shallow(<FieldTextStateless disabled />).find(Base).props().isDisabled
        ).toBe(true);
      });
    });

    describe('isReadOnly prop', () => {
      describe('set to true', () => {
        it('should sets its value on the input', () => {
          expect(mount(<FieldText isReadOnly />).find('input').props().readOnly).toBe(true);
        });

        it('should reflect its value to the FieldBase', () => {
          expect(mount(<FieldText isReadOnly />).find(Base).props().isReadOnly).toBe(true);
        });
      });

      describe('set to false', () => {
        it('should sets its value on the input', () => {
          expect(mount(<FieldText />).find('input').props().readOnly).toBe(false);
        });

        it('should reflect its value to the FieldBase', () => {
          expect(mount(<FieldText />).find(Base).props().isReadOnly).toBe(false);
        });
      });
    });

    describe('required prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(
          shallow(<FieldTextStateless required />).find(Base).props().isRequired
        ).toBe(true);
      });
    });

    describe('isInvalid prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(
          shallow(<FieldTextStateless isInvalid />).find(Base).props().isInvalid
        ).toBe(true);
      });
    });

    describe('spellCheck prop', () => {
      it('should render an input with a spellCheck prop', () => {
        expect(shallow(<FieldTextStateless isSpellCheckEnabled />)
          .find(Input).props().spellCheck).toBe(true);
      });
    });

    describe('invalidMessage prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(shallow(<FieldTextStateless invalidMessage="test" />).find(Base).props().invalidMessage).toBe('test');
      });
    });

    [
      { type: 'search' },
      { disabled: true },
      { name: 'test' },
      { placeholder: 'test placeholder' },
      { maxLength: 5 },
      { required: true },
    ].forEach(prop =>
      describe(JSON.stringify(prop), () =>
        it('Input should have attribute defined', () => {
          const key = Object.keys(prop)[0];
          const value = prop[key];
          expect(shallow(<FieldTextStateless {...prop} />).find(Input).prop(key)).toBe(value);
        })
      )
    );

    it('Input should have value="something"', () =>
      expect(shallow(<FieldTextStateless value="something" />).find(Input).prop('value'))
        .toBe('something')
    );

    it('onChange should be called when input value changes', () => {
      const spy = sinon.spy();
      const wrapper = mount(<FieldTextStateless onChange={spy} />);
      wrapper.find(Input).simulate('change');
      expect(spy.callCount).toBe(1);
    });
  });

  describe('FieldText', () => {
    it('should call onChange when input value changes', () => {
      const spy = sinon.spy();
      const wrapper = mount(<FieldText onChange={spy} />);
      wrapper.find(Input).simulate('change');
      expect(spy.callCount).toBe(1);
    });
  });

  describe('FieldText input focus', () => {
    it('should get focus when focus() is called', () => {
      let hasFocus = 0;
      const wrapper = mount(<FieldText />);
      wrapper.getDOMNode().addEventListener('focus', () => {
        hasFocus = 1;
      }, true);
      wrapper.instance().focus();

      expect(hasFocus).toBe(1);
    });
  });
});
