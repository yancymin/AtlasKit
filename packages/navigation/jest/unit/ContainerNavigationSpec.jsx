import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import React from 'react';
import createStub from 'raf-stub';
import styled from 'styled-components';
import ContainerNavigation from '../../src/components/js/ContainerNavigation';
import ContainerHeader from '../../src/components/js/ContainerHeader';
import { globalSecondaryActions } from '../../src/shared-variables';
import { isCollapsed } from '../../src/theme/util';
import * as presets from '../../src/theme/presets';

describe('<ContainerNavigation />', () => {
  describe('props', () => {
    it('should default theme to presets.container', () => {
      expect(mount(<ContainerNavigation />).props().theme).toBe(presets.container);
    });
  });

  describe('behaviour', () => {
    describe('putting isCollapsed on the theme', () => {
      it('should set isCollapsed to false when not collapsed', () => {
        const stub = sinon.stub().returns('');
        const Item = styled.div`
          property: ${({ theme }) => stub(isCollapsed(theme))}
        `;

        mount(
          <ContainerNavigation
            isCollapsed={false}
          >
            <Item />
          </ContainerNavigation>
        );

        expect(stub.calledWith(false)).toBe(true);
      });

      it('should set isCollapsed to true when it is collapsed', () => {
        const stub = sinon.stub().returns('');
        const Item = styled.div`
          property: ${({ theme }) => stub(isCollapsed(theme))}
        `;

        mount(
          <ContainerNavigation
            isCollapsed
          >
            <Item />
          </ContainerNavigation>
        );
        expect(stub.calledWith(true)).toBe(true);
      });
    });

    it('collapses the container header when closed', () => {
      const headerComponent = sinon.spy();
      shallow(<ContainerNavigation isCollapsed headerComponent={headerComponent} />);
      expect(headerComponent.calledWith({ isCollapsed: true })).toBe(true);
    });
  });

  describe('revealing the global primary actions', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<ContainerNavigation />);
    });

    it('should not animate the global primary actions on initial render', () => {
      expect(wrapper.find('Reveal').first().props().shouldAnimate).toBe(false);
    });

    it('should animate the global primary actions after any change', () => {
      wrapper.setProps({ showGlobalActions: true });
      expect(wrapper.find('Reveal').first().props().shouldAnimate).toBe(true);
    });
  });

  describe('revealing the global secondary actions', () => {
    let wrapper;
    let globalSecondaryReveal;

    beforeEach(() => {
      wrapper = mount(<ContainerNavigation />);
      globalSecondaryReveal = wrapper.find('GlobalNavigationSecondaryContainer > Reveal');
    });

    it('should not animate the global secondary actions on initial render', () => {
      expect(globalSecondaryReveal.prop('shouldAnimate')).toBe(false);
    });

    it('should animate the global secondary actions after any change', () => {
      wrapper.setProps({ showGlobalActions: true });
      expect(globalSecondaryReveal.prop('shouldAnimate')).toBe(true);
    });

    it('should set the global secondary actions container height based on the number of actions', () => {
      const expectedHeight = childCount => globalSecondaryActions.height(childCount).outer;

      expect(globalSecondaryReveal.prop('openHeight')).toBe(expectedHeight(0));

      wrapper.setProps({ globalSecondaryActions: [<div />, <div />] });
      expect(globalSecondaryReveal.prop('openHeight')).toBe(expectedHeight(2));

      wrapper.setProps({ globalSecondaryActions: [<div />, <div />, <div />] });
      expect(globalSecondaryReveal.prop('openHeight')).toBe(expectedHeight(3));
    });

    it('should only render GlobalSecondaryActions if showGlobalActions is true and globalSecondaryActions has item(s)', () => {
      expect(wrapper.find('GlobalSecondaryActions').length).toBe(0);

      wrapper.setProps({ showGlobalActions: true });
      expect(wrapper.find('GlobalSecondaryActions').length).toBe(0);

      wrapper.setProps({ globalSecondaryActions: [<div />] });
      expect(wrapper.find('GlobalSecondaryActions').length).toBe(1);
    });
  });

  describe('is scrolled', () => {
    const raf = createStub();
    const originalRaf = window.requestAnimationFrame;
    const originalCaf = window.cancelAnimationFrame;
    let wrapper;
    let node;

    const triggerScroll = (el, scrollTop) => {
      el.scrollTop = scrollTop;
      // currently not working with new CustomEvent() so using an older syntax
      const event = document.createEvent('Event');
      event.initEvent('scroll', true, true);
      el.dispatchEvent(event);
    };

    const isHeaderScrolled = testWrapper =>
      testWrapper.find(ContainerHeader).prop('isContentScrolled');

    beforeAll(() => { // eslint-disable-line no-undef
      window.requestAnimationFrame = raf.add;
      window.cancelAnimationFrame = raf.remove;
    });

    beforeEach(() => {
      wrapper = mount(
        <ContainerNavigation
          headerComponent={() => <div />}
        />
      );
      node = wrapper.find('ContainerNavigationInner').getDOMNode();
    });

    afterEach(() => {
      raf.reset();
    });

    afterAll(() => { // eslint-disable-line no-undef
      window.requestAnimationFrame = originalRaf;
      window.cancelAnimationFrame = originalCaf;
    });

    it('should let the header know when the container scrolls', () => {
      triggerScroll(node, 200);
      raf.step();

      expect(isHeaderScrolled(wrapper)).toBe(true);
    });
    it('should let the header know when the container is no longer scrolled', () => {
      triggerScroll(node, 200);
      raf.step();

      expect(isHeaderScrolled(wrapper)).toBe(true);

      triggerScroll(node, 0);
      raf.step();

      expect(isHeaderScrolled(wrapper)).toBe(false);
    });
  });
});
