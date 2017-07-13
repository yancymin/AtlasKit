import React from 'react';
import { mount, shallow } from 'enzyme';
import AvatarImage, { DefaultImage } from '../../src/components/AvatarImage';

const src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
const imgSpan = '[role="img"]';

describe('Avatar', () =>
  describe('Image', () => {
    it('should render an image span when the src is set"', () => {
      const wrapper = mount(<AvatarImage src={src} />);
      expect(wrapper.find(imgSpan).exists()).toBe(true);
    });
    it('should not render an image span when the src is not set"', () =>
      expect(shallow(<AvatarImage />).find(imgSpan).exists()).toBe(false)
    );

    describe('default avatar', () => {
      describe('should render default avatar', () => {
        it('when no properties are provided', () =>
          expect(shallow(<AvatarImage />).find(DefaultImage).exists()).toBe(true)
        );

        it('when there is an error', () =>
          expect(shallow(<AvatarImage />)
            .setState({ hasError: true, isLoading: false })
            .find(DefaultImage).exists()
          ).toBe(true)
        );

        it('when src is set and there is an error', () =>
          expect(shallow(<AvatarImage src={src} />)
            .setState({ hasError: true, isLoading: false })
            .find(DefaultImage).exists()
          ).toBe(true)
        );
      });

      describe('should not render default avatar', () => {
        it('when loading=true and no src', () =>
          expect(shallow(<AvatarImage />)
            .setState({ isLoading: true })
            .find(DefaultImage).exists()
          ).toBe(false)
        );

        it('when src is set', () =>
          expect(shallow(<AvatarImage src={src} />).find(DefaultImage).exists()).toBe(false)
        );
      });
    });

    describe('src property', () => {
      describe('set at mount time', () => {
        let wrapper;
        beforeEach(() => (wrapper = mount(<AvatarImage src={src} />)));

        it('should set the background image on the internal span to src', () => {
          expect(wrapper.prop('src')).toBe(src);
          wrapper.find('img').simulate('load');
          const span = wrapper.find(imgSpan).getDOMNode();
          expect(span.style.backgroundImage).toBe(`url(${src})`);
        });

        it('should render an image span when src is set', () =>
          expect(wrapper.find(imgSpan).exists()).toBe(true)
        );

        it('should set isLoading=false when a same src is provided as the src already loaded', () => {
          expect(wrapper.state('isLoading')).toBe(true);
          wrapper.find('img').simulate('load');
          expect(wrapper.state('isLoading')).toBe(false);
          wrapper.setProps({ src });
          expect(wrapper.state('isLoading')).toBe(false);
          expect(wrapper.state('hasError')).toBe(false);
        });

        it('should set isLoading=true when a new src is provided', () => {
          wrapper.setProps({ src });
          expect(wrapper.state('isLoading')).toBe(true);
          expect(wrapper.state('hasError')).toBe(false);
        });

        it('should set isLoading=false & hasError=false when src is loaded without errors', () => {
          wrapper.find('img').simulate('load');
          expect(wrapper.state('isLoading')).toBe(false);
          expect(wrapper.state('hasError')).toBe(false);
        });

        it('should set isLoading=false & hasError=true when a new invalid src is provided', () => {
          wrapper.find('img').simulate('error');
          expect(wrapper.state('isLoading')).toBe(false);
          expect(wrapper.state('hasError')).toBe(true);
        });

        it('should NOT render an img tag when src is NOT set', () => {
          wrapper = mount(<AvatarImage />);
          expect(wrapper.find('img').exists()).toBe(false);
        });
      });

      describe('set after mount time', () => {
        it('should load image successfully when src set', () => {
          const wrapper = mount(<AvatarImage />);
          expect(wrapper.state('isLoading')).toBe(false);
          wrapper.setProps({ src });
          expect(wrapper.state('isLoading')).toBe(true);
          wrapper.find('img').simulate('load');
          expect(wrapper.state('isLoading')).toBe(false);
        });
      });
    });
  })
);
