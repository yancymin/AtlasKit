import React from 'react';
import sinon from 'sinon';
import NavigationItem from '../../src/components/js/NavigationItem';
import NavigationItemIcon from '../../src/components/styled/NavigationItemIcon';
import NavigationItemAfter from '../../src/components/styled/NavigationItemAfter';
import { mountWithRootTheme } from './_theme-util';

describe('<NavigationItem />', () => {
  describe('props', () => {
    it('icon should render an image', () => {
      expect(mountWithRootTheme(<NavigationItem icon={<img alt="foo" />} />).find('img').length).toBe(1);
    });
    it('isSelected=true should render a child with the isSelected prop', () => {
      expect((mountWithRootTheme(<NavigationItem isSelected />).find('NavigationItemOuter')).props().isSelected).toBe(true);
    });
    it('isSelected=false should not render a child with the isSelected prop', () => {
      expect(mountWithRootTheme(<NavigationItem />).find('NavigationItemOuter').props().isSelected).toBe(false);
    });
    it('with a href should render onto the link', () => {
      expect(mountWithRootTheme(<NavigationItem href="foo" />).find('InteractiveWrapper').props().href).toBe('foo');
    });
    it('with no href should not render a link', () => {
      expect(mountWithRootTheme(<NavigationItem />).find('a').length).toBe(0);
    });
    it('with an onClick should call the onClick', () => {
      const spy = sinon.spy();
      const navigation = mountWithRootTheme(<NavigationItem onClick={spy} />);
      navigation.find('button').simulate('click');
      expect(spy.calledOnce).toBe(true);
    });
    it('with an onMouseEnter should call the onMouseEnter', () => {
      const spy = sinon.spy();
      const navigation = mountWithRootTheme(<NavigationItem onMouseEnter={spy} />);
      navigation.find('button').simulate('mouseenter');
      expect(spy.calledOnce).toBe(true);
    });
    it('with an onMouseLeave should call the onMouseLeave', () => {
      const spy = sinon.spy();
      const navigation = mountWithRootTheme(<NavigationItem onMouseLeave={spy} />);
      navigation.find('button').simulate('mouseleave');
      expect(spy.calledOnce).toBe(true);
    });
    it('with an onClick and href should render the href on a link, and bind the onClick to it', () => {
      const spy = sinon.spy();
      const navigation = mountWithRootTheme(<NavigationItem href="foo" onClick={spy} />);
      navigation.find('a').simulate('click');
      expect(spy.calledOnce).toBe(true);
      expect(navigation.find('a').props().href).toBe('foo');
    });
    it('linkComponent should render a custom link component', () => {
      const customLink = mountWithRootTheme(
        <NavigationItem
          href="#custom-href"
          linkComponent={({ children, href }) => <a className="custom" href={href}>{children}</a>}
        />
      ).find('.custom');
      expect(customLink).not.toBe(undefined);
      expect(customLink.props().href).toBe('#custom-href');
    });
    it('textAfter should render in the navigation item', () => {
      expect(mountWithRootTheme(<NavigationItem action={<span className="ACTION" />} />).find('.ACTION').length).toBeGreaterThan(0);
    });
    it('action should render in the navigation item', () => {
      expect(mountWithRootTheme(<NavigationItem textAfter={<span className="TEXTAFTER" />} />).find('.TEXTAFTER').length).toBeGreaterThan(0);
    });
    it('textAfter should not render if the prop is not set', () => {
      expect(mountWithRootTheme(<NavigationItem />).find('TextAfter').length).toBe(0);
    });
    it('action should not render if the prop is not set', () => {
      expect(mountWithRootTheme(<NavigationItem />).find('NavigationItemAction').length).toBe(0);
    });
    it('textAfter and action should both be renderable at the same time', () => {
      const wrapper = mountWithRootTheme(
        <NavigationItem
          action={<span className="ACTION" />}
          textAfter={<span className="TEXTAFTER" />}
        />
      );
      expect(wrapper.find('.ACTION').length).toBeGreaterThan(0);
      expect(wrapper.find('.TEXTAFTER').length).toBeGreaterThan(0);
    });
    it('subText should render in the navigation item', () => {
      expect(mountWithRootTheme(<NavigationItem subText="SUBTEXT" />).html()).toEqual(expect.stringContaining('SUBTEXT'));
    });

    describe('isDropdownTrigger=true and dropIcon is provided', () => {
      it('should render dropIcon', () => {
        const wrapper = mountWithRootTheme(<NavigationItem isDropdownTrigger dropIcon={<img alt="foo" />} />);
        expect(wrapper.find('img').length).toBe(1);
      });

      it('should render NavigationItemIcon wrapper with isDropdownTrigger prop forwarded', () => {
        const wrapper = mountWithRootTheme(<NavigationItem isDropdownTrigger dropIcon={<img alt="foo" />} />);
        expect(wrapper.find(NavigationItemIcon).prop('isDropdownTrigger')).toBe(true);
      });

      describe('if textAfter is provided', () => {
        it('should render NavigationItemAfter wrapper with isDropdownTrigger prop forwarded', () => {
          const wrapper = mountWithRootTheme(<NavigationItem isDropdownTrigger dropIcon={<img alt="foo" />} textAfter="test" />);
          expect(wrapper.find(NavigationItemAfter).at(0).prop('isDropdownTrigger')).toBe(true);
        });
      });
    });
    it('should render a caption if one is provided', () => {
      const wrapper = mountWithRootTheme(<NavigationItem caption="CAPTION" />);
      expect(wrapper.html()).toEqual(expect.stringContaining('CAPTION'));
    });

    describe('isDropdownTrigger=false and dropIcon is provided', () => {
      it('should not render dropIcon', () => {
        const wrapper = mountWithRootTheme(<NavigationItem dropIcon={<img alt="foo" />} />);
        expect(wrapper.find(NavigationItemIcon).length).toBe(0);
        expect(wrapper.find('img').length).toBe(0);
      });

      describe('if textAfter is provided', () => {
        it('should render NavigationItemAfter wrapper without isDropdownTrigger prop forwarded', () => {
          const wrapper = mountWithRootTheme(<NavigationItem dropIcon={<img alt="foo" />} textAfter="test" />);
          expect(wrapper.find(NavigationItemAfter).prop('isDropdownTrigger')).toBe(false);
        });
      });
    });
  });
  describe('behaviour', () => {
    it('mousedown on the link is prevented', () => {
      const spy = sinon.spy();
      mountWithRootTheme(<NavigationItem href="foo" />).find('InteractiveWrapper').simulate('mouseDown', {
        preventDefault: spy,
      });
      expect(spy.called).toBe(true);
    });
  });
});
