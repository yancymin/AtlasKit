import { mount } from 'enzyme';
import React from 'react';
import ResizerButton from '../../src/components/js/ResizerButton';
import ResizerButtonInner from '../../src/components/styled/ResizerButtonInner';

describe('<ResizerButton />', () => {
  describe('renders', () => {
    it('when isPointingRight={false}, <ResizerButton aria-expanded={false} />', () => {
      expect(
        mount(<ResizerButton isPointingRight={false} isVisible />)
          .find(ResizerButtonInner)
          .prop('aria-expanded')
      ).toBe(true);
    });
    it('when isPointingRight, <ResizerButton aria-expanded />', () => {
      expect(
        mount(<ResizerButton isPointingRight isVisible />)
          .find(ResizerButtonInner)
          .prop('aria-expanded')
      ).toBe(false);
    });
  });

  it('should render ResizerButtonInner regardless of ResizerButton.isVisible (so it can be tabbed to)', () => {
    const wrapper = mount(<ResizerButton />);
    expect(wrapper.find(ResizerButtonInner).length).toBe(1);
    wrapper.setProps({ isVisible: true });
    expect(wrapper.find(ResizerButtonInner).length).toBe(1);
  });

  it('should pass isVisible prop on to ResizerButtonInner', () => {
    const wrapper = mount(<ResizerButton />);
    expect(wrapper.find(ResizerButtonInner).prop('isVisible')).toBe(undefined);
    wrapper.setProps({ isVisible: true });
    expect(wrapper.find(ResizerButtonInner).prop('isVisible')).toBe(true);
  });
});
