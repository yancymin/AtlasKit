import { shallow, mount } from 'enzyme';
import React from 'react';
import DefaultLogo, * as logos from '../../src';
import { name } from '../../package.json';

describe(name, () => {
  describe('Product logos', () => {
    it('are properly defined', () => {
      expect(Object.keys(logos)).toEqual(expect.arrayContaining([
        'AtlassianLogo',
        'BitbucketLogo',
        'ConfluenceLogo',
        'HipchatLogo',
        'JiraLogo',
        'default',
      ]));
    });
    it('has the Atlassian logo exported as default', () => {
      expect(DefaultLogo).toBe(logos.AtlassianLogo);
    });
    it('passes down props to the underlying Logo component', () => {
      Object.values(logos).forEach((ProductLogo) => {
        const wrapper = shallow(<ProductLogo collapseTo="type" size="small" />);
        expect(wrapper.find('Logo').props().collapseTo).toBe('type');
        expect(wrapper.find('Logo').props().size).toBe('small');
      });
    });
    it('does not allow logoText to be overridden on the underlying component', () => {
      Object.values(logos).forEach((ProductLogo) => {
        const wrapper = mount(<ProductLogo logoText={<svg id="bad-logo" />} />);
        expect(wrapper.find('#bad-logo')).toHaveLength(0);
      });
    });
  });
});
