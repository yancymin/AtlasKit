import React from 'react';
import NavigationItemGroup from '../../src/components/js/NavigationItemGroup';
import { mountWithRootTheme } from './_theme-util';

describe('<NavigationItemGroup />', () => {
  describe('props', () => {
    it('title should render a title', () => {
      expect(mountWithRootTheme(<NavigationItemGroup title="foo" />).find('NavigationItemGroupTitle').text()).toBe('foo');
    });
    it('action should render in the container item group', () => {
      expect(mountWithRootTheme(<NavigationItemGroup action={<div className="create">Create button</div>} />).find('.create').length).toBeGreaterThan(0);
    });
    it('separator should render in the container item group', () => {
      expect(mountWithRootTheme(<NavigationItemGroup hasSeparator />).find('NavigationItemGroupSeparator').length).toBe(1);
    });
    it('with no action specified, no action should be rendered', () => {
      expect(mountWithRootTheme(<NavigationItemGroup />).find('NavigationItemGroupAction').length).toBe(0);
    });
    it('with no separator specified, no separator should be rendered', () => {
      expect(mountWithRootTheme(<NavigationItemGroup />).find('NavigationItemGroupSeparator').length).toBe(0);
    });
  });
});
