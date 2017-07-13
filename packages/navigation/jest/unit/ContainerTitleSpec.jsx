import React from 'react';
import ContainerTitle from '../../src/components/js/ContainerTitle';
import { mountWithRootTheme, shallowWithTheme } from './_theme-util';

describe('<ContainerTitle />', () => {
  describe('props', () => {
    it('icon should render an image', () => {
      expect(shallowWithTheme(<ContainerTitle icon={<img alt="foo" />} />).find('img')).toHaveLength(1);
    });

    it('linkComponent can be used to render an arbitrary link', () => {
      const wrapper = mountWithRootTheme(<ContainerTitle
        href="http://google.com"
        linkComponent={({ href, children }) => <a href={href} data-foo="foo">{children}</a>}
      />);
      expect(wrapper.find('[data-foo]').length).toBe(1);
      expect(wrapper.find('linkComponent').props().href).toBe('http://google.com');
    });

    it('should render its title', () => {
      const wrapper = mountWithRootTheme(
        <ContainerTitle text="Main text" />
      );

      expect(wrapper.text()).toBe('Main text');
    });

    it('should render subText if it is provided', () => {
      const wrapper = mountWithRootTheme(
        <ContainerTitle text="Main text" subText="sub text" />
      );

      expect(wrapper.text()).toBe('Main textsub text');
    });
  });
});
