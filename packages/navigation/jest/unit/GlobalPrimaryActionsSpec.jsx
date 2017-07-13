import React from 'react';
import sinon from 'sinon';
import GlobalPrimaryActions from '../../src/components/js/GlobalPrimaryActions';
import { mountWithRootTheme, shallowWithTheme } from './_theme-util';

describe('<GlobalPrimaryActions />', () => {
  describe('renders', () => {
    it('renders 0 GlobalItems with no props', () => {
      expect(shallowWithTheme(<GlobalPrimaryActions />).find('GlobalItem').length).toBe(0);
    });
    it('renders 1 GlobalItem with a primaryIcon', () => {
      expect(shallowWithTheme(<GlobalPrimaryActions primaryIcon={<img alt="foo" />} />).find('GlobalItem').length).toBe(1);
    });
    it('renders 2 GlobalItems with a primaryIcon and a search icon', () => {
      expect(shallowWithTheme(<GlobalPrimaryActions
        primaryIcon={<img alt="foo" />}
        searchIcon={<img alt="foo" />}
      />).find('GlobalItem').length).toBe(2);
    });
    it('renders 3 GlobalItems with a primaryIcon, searchIcon and a createIcon', () => {
      expect(shallowWithTheme(<GlobalPrimaryActions
        primaryIcon={<img alt="foo" />}
        searchIcon={<img alt="foo" />}
        createIcon={<img alt="foo" />}
      />).find('GlobalItem').length).toBe(3);
    });
  });
  describe('props', () => {
    it('appearance is passed onto all <GlobalItem />', () => {
      const globalItems = shallowWithTheme(<GlobalPrimaryActions appearance="container" />).find('GlobalItem');
      expect(globalItems.everyWhere(globalItem => globalItem.props().appearance === 'container')).toBe(true);
    });
    it('linkComponent is passed onto the first <GlobalItem />', () => {
      const linkComponent = () => null;
      expect(shallowWithTheme(<GlobalPrimaryActions linkComponent={linkComponent} primaryIcon={<img alt="foo" />} />).find('GlobalItem').at(0).props().linkComponent).toBe(linkComponent);
    });

    it('primaryIcon is passed onto the first <GlobalItem />', () => {
      const primaryIcon = <img alt="foo" />;
      expect(shallowWithTheme(<GlobalPrimaryActions primaryIcon={primaryIcon} />).find('GlobalItem').at(0).props().children).toBe(primaryIcon);
    });
    it('primaryItemHref is passed onto the first <GlobalItem />', () => {
      expect(shallowWithTheme(<GlobalPrimaryActions primaryIcon={<img alt="foo" />} primaryItemHref="#foo" />).find('GlobalItem').at(0).props().href).toBe('#foo');
    });
    it('onSearchActivate is given to to the first <DrawerTrigger />', () => {
      const handler = sinon.spy();
      expect(mountWithRootTheme(<GlobalPrimaryActions
        searchIcon={'s'}
        createIcon={'c'}
        onSearchActivate={handler}
      />).find('DrawerTrigger').at(0).props().onActivate).toBe(handler);
    });
    it('onCreateActivate is given to to the second <DrawerTrigger />', () => {
      const handler = sinon.spy();
      expect(mountWithRootTheme(<GlobalPrimaryActions
        searchIcon={'s'}
        createIcon={'c'}
        onCreateActivate={handler}
      />).find('DrawerTrigger').at(1).props().onActivate).toBe(handler);
    });
  });
});
