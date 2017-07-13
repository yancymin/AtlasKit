import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import React, { PureComponent } from 'react';
import Navigation from '../../src/components/js/Navigation';
import Drawer from '../../src/components/js/Drawer';
import * as presets from '../../src/theme/presets';
import {
  containerClosedWidth,
  globalOpenWidth,
  standardOpenWidth,
  containerOpenWidth,
  resizeClosedBreakpoint,
} from '../../src/shared-variables';

const expect = window.expect;

class Child extends PureComponent {
  render() {
    return <div>Hi there</div>;
  }
}

describe('<Navigation />', () => {
  describe('is open', () => {
    it('should render a <ContainerNavigation />', () => {
      expect(shallow(<Navigation isOpen />).find('ContainerNavigation').length).toBe(1);
    });

    it('should render a <GlobalNavigation />', () => {
      expect(shallow(<Navigation isOpen />).find('GlobalNavigation').length).toBe(1);
    });

    it('should render the provided Drawers', () => {
      const drawer1 = (<Drawer key="d1" />);
      const drawer2 = (<Drawer key="d2" />);
      expect(shallow(<Navigation isOpen drawers={[drawer1, drawer2]} />).find('Drawer').length).toBe(2);
    });

    it('should render a Spacer that has the width of the GlobalNavigation and ContainerNavigation', () => {
      const wrapper = shallow(<Navigation isOpen />);

      expect(wrapper.find('Spacer').first().props().width).toBe(globalOpenWidth + containerOpenWidth);
    });
  });

  describe('is closed', () => {
    it('should render a <ContainerNavigation />', () => {
      expect(shallow(<Navigation isOpen={false} />).find('ContainerNavigation').length).toBe(1);
    });

    it('should not render a <GlobalNavigation />', () => {
      expect(shallow(<Navigation isOpen={false} />).find('GlobalNavigation').length).toBe(0);
    });

    it('should render the provided Drawers', () => {
      const drawer1 = (<Drawer key="d1" />);
      const drawer2 = (<Drawer key="d2" />);
      expect(shallow(<Navigation isOpen={false} drawers={[drawer1, drawer2]} />).find('Drawer').length).toBe(2);
    });

    it('should render a Spacer that has the width of the GlobalNavigation', () => {
      const wrapper = shallow(<Navigation isOpen={false} />);

      expect(wrapper.find('Spacer').first().props().width).toBe(globalOpenWidth);
    });
  });

  describe('resizing', () => {
    const getSpacerWidth = wrapper => wrapper.find('Spacer').first().props().width;

    it('should not allow resizing if not resizable', () => {
      const onResizeStart = sinon.stub();
      const onResize = sinon.stub();
      const wrapper = shallow(
        <Navigation
          isOpen
          isResizeable={false}
          onResize={onResize}
          onResizeStart={onResizeStart}
        />
      );

      // cannot resize because there is no Resizer
      expect(wrapper.find('Resizer').length).toBe(0);
    });

    it('should call onResizeStart when the resizer starts resizing', () => {
      const stub = sinon.stub();
      const wrapper = shallow(<Navigation onResizeStart={stub} />);

      wrapper.find('Resizer').simulate('resizeStart');

      expect(stub.called).toBe(true);
    });

    it('should render a Spacer that has the width of the current container', () => {
      const wrapper = shallow(<Navigation isOpen />);

      wrapper.find('Resizer').simulate('resize', 2000);

      expect(wrapper.find('Spacer').first().props().width)
        .toBe(2000 + (containerOpenWidth + globalOpenWidth));
    });

    it('should call onResize when a resize finishes', () => {
      const stub = sinon.stub();
      const wrapper = shallow(<Navigation isOpen onResize={stub} />);

      wrapper.find('Resizer').simulate('resizeEnd');

      expect(stub.called).toBe(true);
    });

    it('should never have a width less than the GlobalNavigation', () => {
      const wrapper = shallow(<Navigation isOpen />);

      wrapper.find('Resizer').simulate('resize', -300);

      expect(getSpacerWidth(wrapper)).toBe(globalOpenWidth);
    });

    it('should allow the width to grow above the standard width if not collapsible', () => {
      const wrapper = shallow(<Navigation isOpen isCollapsible={false} />);

      wrapper.find('Resizer').simulate('resize', 5);

      expect(getSpacerWidth(wrapper)).toBe(globalOpenWidth + containerOpenWidth + 5);
    });

    it('should not allow the width to drop below the standard width if not collapsible', () => {
      const wrapper = shallow(<Navigation isOpen isCollapsible={false} />);

      wrapper.find('Resizer').simulate('resize', -5);

      expect(getSpacerWidth(wrapper)).toBe(globalOpenWidth + containerOpenWidth);
    });

    describe('snapping', () => {
      const resize = (wrapper, resizeTo) =>
        wrapper.find('Resizer')
            .simulate('resizeStart')
            .simulate('resize', resizeTo)
            .simulate('resizeEnd');

      describe('starting open', () => {
        it('should snap closed if moving beyond the resize breakpoint', () => {
          const stub = sinon.stub();
          const wrapper = shallow(<Navigation isOpen onResize={stub} />);
          const diff = standardOpenWidth - resizeClosedBreakpoint;
          // moving to the left beyond the resize breakpoint
          const resizeTo = (-1 * diff) - 1;

          resize(wrapper, resizeTo);

          expect(stub.calledWith({
            width: globalOpenWidth,
            isOpen: false,
          })).toBe(true);
        });

        it('should snap open if closing but did not move past the resize breakpoint', () => {
          const stub = sinon.stub();
          const wrapper = shallow(<Navigation isOpen onResize={stub} />);
          const diff = standardOpenWidth - resizeClosedBreakpoint;
          // moving to the left but not enough
          const resizeTo = (-1 * diff) + 1;

          resize(wrapper, resizeTo);

          expect(stub.calledWith({
            width: standardOpenWidth,
            isOpen: true,
          })).toBe(true);
        });
      });

      describe('starting closed', () => {
        it('should snap closed if opening but did not move beyond the resize breakpoint', () => {
          const stub = sinon.stub();
          const wrapper = shallow(<Navigation isOpen={false} onResize={stub} />);
          // moving to the right but not beyond the resize breakpoint
          const resizeTo = globalOpenWidth + 1;

          resize(wrapper, resizeTo);

          expect(stub.calledWith({
            width: globalOpenWidth,
            isOpen: false,
          })).toBe(true);
        });

        it('should snap open if expanding beyond the resize breakpoint', () => {
          const stub = sinon.stub();
          const wrapper = shallow(<Navigation isOpen={false} onResize={stub} />);
          const diff = resizeClosedBreakpoint - globalOpenWidth;
          // moving to the right beyond the resize breakpoint
          const resizeTo = diff + 1;

          resize(wrapper, resizeTo);

          expect(stub.calledWith({
            width: standardOpenWidth,
            isOpen: true,
          })).toBe(true);
        });
      });

      it('should not snap if the proposed width is greater than the standard navigation width', () => {

      });

      it('should not allow the width the drop below the closed width', () => {

      });
    });
  });

  describe('forwarding props', () => {
    it('containerHeaderComponent - passes a func for the container header component to <ContainerNavigation />', () => {
      const header = () => (<div>foo</div>);
      expect(shallow(<Navigation containerHeaderComponent={header} />)
        .find('ContainerNavigation').props().headerComponent).toBe(header);
    });

    it('should pass globalSearchIcon onto <GlobalNavigation />', () => {
      const icon = <img alt="search" />;
      expect(mount(<Navigation globalSearchIcon={icon} />).find('GlobalNavigation').props().searchIcon).toBe(icon);
    });

    it('should pass globalCreateIcon onto <GlobalNavigation />', () => {
      const icon = <img alt="create" />;
      expect(mount(<Navigation globalCreateIcon={icon} />).find('GlobalNavigation').props().createIcon).toBe(icon);
    });

    it('should pass globalTheme onto <GlobalNavigation />', () => {
      const theme = presets.settings;
      expect(mount(<Navigation globalTheme={theme} />).find('GlobalNavigation').props().theme).toBe(theme);
    });

    it('should pass containerTheme onto <ContainerNavigation />', () => {
      const theme = presets.settings;
      expect(mount(<Navigation containerTheme={theme} />).find('ContainerNavigation').props().theme).toBe(theme);
    });

    it('should pass globalSearchIcon onto <ContainerNavigation />', () => {
      const icon = <img alt="search" />;
      expect(mount(<Navigation globalSearchIcon={icon} />).find('ContainerNavigation').props().globalSearchIcon).toBe(icon);
    });

    it('should pass globalCreateIcon onto <ContainerNavigation />', () => {
      const icon = <img alt="create" />;
      expect(mount(<Navigation globalCreateIcon={icon} />).find('ContainerNavigation').props().globalCreateIcon).toBe(icon);
    });

    it('onResize is called after the resizeDelta has been reset to 0 (so that animations are enabled again)', (done) => {
      const navigation = shallow(<Navigation />);
      navigation.setProps({
        onResize: () => {
          expect(navigation.state().resizeDelta).toBe(0);
          done();
        },
      });
      navigation.find('Resizer').simulate('resizeStart');
      navigation.find('Resizer').simulate('resize', -300);
      navigation.find('Resizer').simulate('resizeEnd');
    });

    it('globalPrimaryItem should map to global navigation\'s primaryItem', () => {
      const primaryIcon = <span className="PRIMARY_ICON" />;
      expect(mount(
        <Navigation
          globalPrimaryIcon={primaryIcon}
        />).find('GlobalNavigation').props().primaryIcon).toBe(primaryIcon);
    });
    it('should allow you to pass in global secondard actions', () => {
      const wrapper = mount(
        <Navigation
          globalSecondaryActions={[<Child />, <Child />]}
        />
      );

      expect(wrapper
        .find('GlobalNavigation')
        .find('GlobalSecondaryActions')
        .find(Child)
        .length
      ).toBe(2);
    });
    it('linkComponent is passed on to <GlobalNavigation/>', () => {
      const linkComponent = () => null;
      expect(mount(
        <Navigation
          linkComponent={linkComponent}
        />).find('GlobalNavigation').props().linkComponent).toBe(linkComponent);
    });

    it('initial width prop is reflected on <Spacer />', () => {
      expect(shallow(<Navigation width={500} />).find('Spacer').first().props().width).toBe(500);
      expect(shallow(<Navigation width={200} />).find('Spacer').first().props().width).toBe(200);
    });

    it('should override width when container is closed', () => {
      expect(shallow(<Navigation isOpen={false} width={500} />)
        .find('Spacer').first().props().width).toBe(containerClosedWidth);
    });
  });

  describe('not collapsible and is open is set to false', () => {
    let wrapper;
    let warnStub;

    beforeEach(() => {
      warnStub = sinon.stub(console, 'warn');
      wrapper = shallow(<Navigation isCollapsible={false} isOpen={false} />);
    });

    afterEach(() => {
      warnStub.restore();
      wrapper.unmount();
    });

    it('should keep the container navigation open', () => {
      expect(wrapper.find('ContainerNavigation').length).toBe(1);
    });

    it('should tell the container not to render the global primary items', () => {
      expect(wrapper.find('ContainerNavigation').props().showGlobalActions)
        .toBe(false);
    });

    it('should render the global navigation', () => {
      expect(wrapper.find('GlobalNavigation').length).toBe(1);
    });

    it('should render the correct width', () => {
      expect(wrapper.find('Spacer').first().props().width)
        .toBe(globalOpenWidth + containerOpenWidth);
    });

    it('should log a warning on mount', () => {
      expect(warnStub.called).toBe(true);
    });

    it('should log a warning on update', () => {
      warnStub.reset();
      const customWrapper = shallow(<Navigation isOpen />);

      expect(warnStub.callCount).toBe(0);

      customWrapper.setProps({
        isOpen: false,
        isCollapsible: false,
      });

      expect(warnStub.callCount).toBe(1);
    });
  });

  describe('collapsing', () => {
    it('should allow collapsing if isCollapsible is set to false and navigation width is expanded', () => {
      const wrapper = shallow(<Navigation isOpen isCollapsible={false} />);
      wrapper.find('Resizer')
        .simulate('resize', 1);

      expect(wrapper.find('Resizer').props().showResizeButton).toBe(true);
    });

    it('should not allow collapsing if isCollapsible is set to false and navigation width is not expanded', () => {
      const wrapper = shallow(<Navigation isOpen isCollapsible={false} />);

      expect(wrapper.find('Resizer').props().showResizeButton).toBe(false);
    });
  });
});
