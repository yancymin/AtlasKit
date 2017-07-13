import React from 'react';
import { shallow, mount } from 'enzyme';

import { name } from '../../package.json';

import { Group } from '../../src';
import { Heading, HeadingAfter, HeadingText } from '../../src/styled/Group';

describe(`${name} - group`, () => {
  it('should be possible to create a component', () => {
    expect(shallow(<Group />)).not.toBe(undefined);
  });

  it('should render heading', () => {
    const wrapper = shallow(<Group heading="test" />);
    expect(wrapper.find(Heading).length).toBeGreaterThan(0);
    expect(wrapper.find(Heading).find(HeadingText).length).toBeGreaterThan(0);
    expect(wrapper.find(HeadingText).childAt(0).text()).toBe('test');
    expect(wrapper.find(HeadingAfter).length).toBe(0);
  });

  it('should render elemAfter', () => {
    const wrapper = mount(<Group heading="test" elemAfter="elem" />);
    expect(wrapper.find(HeadingAfter).length).toBeGreaterThan(0);
    expect(wrapper.find(HeadingAfter).text()).toBe('elem');
  });

  it('should generate corrent ariaLabel from heading and elemAfter', () => {
    const wrapper = mount(<Group heading="test" elemAfter="elem" />);
    expect(wrapper.instance().getAriaLabel()).toBe('test elem');
  });
});
