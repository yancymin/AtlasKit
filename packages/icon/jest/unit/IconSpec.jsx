import React, { PureComponent } from 'react';
import { mount, shallow } from 'enzyme';

import { name } from '../../package.json';
import Icon, { size } from '../../src';

const sizeValues = {
  small: '16px',
  medium: '24px',
  large: '32px',
  xlarge: '48px',
};

describe(name, () => {
  describe('Icon', () => {
    const secretContent = 'secret content';
    const secretWrapper = () => (<div>{secretContent}</div>);
    const empty = () => (<div>Icon</div>);

    const MyIcon = props => <Icon glyph={secretWrapper} {...props} />;

    describe('exports', () => {
      it('exports the React component, and size', () => {
        expect(Icon).not.toBe(undefined);
        expect(size).not.toBe(undefined);

        expect(new Icon({ label: 'My icon' })).toBeInstanceOf(PureComponent);
        expect(Object.values(size)).toEqual(['small', 'medium', 'large', 'xlarge']);
      });
    });

    it('should be possible to create an Icon via a subclass', () => {
      const myIcon = mount(<MyIcon label="My icon" />);
      expect(myIcon.text()).toBe(secretContent);
    });

    describe('label property', () => {
      it('is accessed by glyph', () => {
        /* eslint-disable react/prop-types */
        const LabelWriter = props => <div>{props.label}</div>;
        /* eslint-enable react/prop-types */
        const LabelIcon = props => <Icon glyph={LabelWriter} {...props} />;

        const labelContent = 'label content';
        const wrapper = mount(<LabelIcon label={labelContent} />);
        expect(wrapper.text()).toBe(labelContent);
      });
    });

    describe('size property', () => {
      Object.values(size).forEach((s) => {
        it(`with value ${s}`, () => {
          const wrapper = shallow(<Icon glyph={empty} label="My icon" size={s} />);
          expect(wrapper.props().style.height).toBe(sizeValues[s]);
          expect(wrapper.props().style.width).toBe(sizeValues[s]);
        });
      });
    });

    describe('primaryColor property', () => {
      it('is set to inherit the text color by default', () => {
        const wrapper = mount(<MyIcon label="default primaryColor" />);

        expect(wrapper.find('span').props().style.color).toBe('currentColor');
      });
      it('can be changed to a hex value', () => {
        const wrapper = mount(<MyIcon label="hex primaryColor" primaryColor="#ff0000" />);

        expect(wrapper.find('span').props().style.color).toBe('#ff0000');
      });
      it('can be changed to a named color', () => {
        const wrapper = mount(<MyIcon label="named primaryColor" primaryColor="rebeccapurple" />);

        expect(wrapper.find('span').props().style.color).toBe('rebeccapurple');
      });
    });

    describe('secondaryColor property', () => {
      it('is set to white by default', () => {
        const wrapper = mount(<MyIcon label="default secondaryColor" />);

        expect(wrapper.find('span').props().style.fill).toBe('white');
      });
      it('can be changed to a hex value', () => {
        const wrapper = mount(<MyIcon label="hex secondaryColor" secondaryColor="#ff0000" />);

        expect(wrapper.find('span').props().style.fill).toBe('#ff0000');
      });
      it('can be changed to a named color', () => {
        const wrapper = mount(<MyIcon label="named secondaryColor" secondaryColor="rebeccapurple" />);

        expect(wrapper.find('span').props().style.fill).toBe('rebeccapurple');
      });
    });

    describe('onClick property', () => {
      it('should set a click handler', () => {
        const handler = jest.fn().mockImplementation(() => {}); // eslint-disable-line no-undef

        const wrapper = shallow(<Icon glyph={empty} label="My icon" onClick={handler} />);
        expect(wrapper.prop('onClick')).toBe(handler);

        wrapper.find('span').simulate('click');
        expect(handler.mock.calls.length).toBe(1);
      });
    });
  });
});
