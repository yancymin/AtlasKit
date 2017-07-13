// @flow
import React, { PureComponent } from 'react';
import GlobalNavigation from './GlobalNavigation';
import ContainerNavigation from './ContainerNavigation';
import NavigationFixedContainer from '../styled/NavigationFixedContainer';
import NavigationGlobalNavigationWrapper from '../styled/NavigationGlobalNavigationWrapper';
import NavigationContainerNavigationWrapper from '../styled/NavigationContainerNavigationWrapper';
import DefaultLinkComponent from './DefaultLinkComponent';
import Resizer from './Resizer';
import type { ReactElement, Provided } from '../../types';
import Spacer from './Spacer';
import {
  containerClosedWidth,
  containerOpenWidth,
  globalOpenWidth,
  resizeClosedBreakpoint,
  standardOpenWidth,
} from '../../shared-variables';
import * as presets from '../../theme/presets';

const warnIfCollapsedPropsAreInvalid = ({ isCollapsible, isOpen }) => {
  if (!isCollapsible && !isOpen) {
    // eslint-disable-next-line no-console
    console.warn(`
        Navigation is being told it cannot collapse and that it is not open.
        When Navigation cannot collapse it must always be open.
        Ignoring isOpen={true}
      `);
  }
};

const getSnappedWidth = (width) => {
  // |------------------------------|
  //      |           |             |
  //    closed    breakpoint       open
  //          * snap closed
  //                       * snap open
  //                                    * maintain expanded width

  // Snap closed if width ever goes below the resizeClosedBreakpoint
  if (width < resizeClosedBreakpoint) {
    return globalOpenWidth;
  }

  // Snap open if in between the closed breakpoint and the standard width
  if (width > resizeClosedBreakpoint && width < standardOpenWidth) {
    return standardOpenWidth;
  }

  // At this point the width > standard width.
  // We allow you to have your own wider width.
  return width;
};

type resizeObj = {|
  width: number,
  isOpen: boolean
|}

type Props = {|
  /** Elements to be displayed in the ContainerNavigationComponent */
  children?: ReactElement,
  /** Theme object to be used to color the navigation container. */
  containerTheme?: Provided,
  /** Component to be rendered as the header of the container.  */
  containerHeaderComponent?: () => ReactElement,
  /** Location to pass in an array of AkSearchDrawers to be rendered. There is no
  decoration done to the components passed in here. */
  drawers?: ReactElement[],
  /** Theme object to be used to color the global container. */
  globalTheme?: Provided,
  /** Icon to be used as the 'create' icon. onCreateDrawerOpen is called when it
  is clicked. */
  globalCreateIcon?: ReactElement,
  /** Icon to be displayed at the top of the GlobalNavigation. This is wrapped in
  the linkComponent. */
  globalPrimaryIcon?: ReactElement,
  /** Link to be passed to the linkComponent that wraps the globalCreateIcon. */
  globalPrimaryItemHref?: string,
  /** Icon to be used as the 'create' icon. onSearchDrawerOpen is called when it
  is clicked. */
  globalSearchIcon?: ReactElement,
  /** An array of elements to be displayed at the bottom of the global component.
  These should be icons or other small elements. There should be no more than four.
  Secondary Actions will not be visible when nav is collapsed. */
  globalSecondaryActions?: ReactElement[],
  /** Set whether collapse should be allowed. If false, the nav cannot be dragged
  to be smaller. */
  isCollapsible?: boolean,
  /** Set whether the nav is collapsed or not. Note that this is never controlled
  internally as state, so if it is collapsible, you need to manually listen to onResize
  to determine when to change this if you are letting users manually collapse the
  nav. */
  isOpen?: boolean,
  /** Sets whether to disable all resize prompts. */
  isResizeable?: boolean,
  /** A component to be used as a link. By Default this is an anchor. when a href
  is passed to it, and otherwise is a button. */
  linkComponent?: () => mixed,
  /** Function called at the end of a resize event. It is called with an object
  containing a width and an isOpen. These can be used to update the props of Navigation. */
  onResize?: (obj: resizeObj) => mixed,
  /** Function to be called when a resize event starts. */
  onResizeStart?: () => mixed,
  /** Function called when the globalCreateIcon is clicked. */
  onCreateDrawerOpen?: () => mixed,
  /** Function called when the globalSearchIcon is clicked. */
  onSearchDrawerOpen?: () => mixed,
  /** Width of the navigation. Width cannot be reduced below the minimum, and the
  collapsed with will be respected above the provided width. */
  width?: number,
|}

export default class Navigation extends PureComponent {
  static defaultProps = {
    containerTheme: presets.container,
    drawers: [],
    globalTheme: presets.global,
    globalSecondaryActions: [],
    isCollapsible: true,
    isCreateDrawerOpen: false,
    isOpen: true,
    isResizeable: true,
    isSearchDrawerOpen: false,
    linkComponent: DefaultLinkComponent,
    onCreateDrawerOpen: () => { },
    onResize: () => { },
    onResizeStart: () => { },
    onSearchDrawerOpen: () => { },
    width: globalOpenWidth + containerOpenWidth,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      resizeDelta: 0,
      isResizing: false,
      isTogglingIsOpen: false,
    };

    warnIfCollapsedPropsAreInvalid(props);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      isTogglingIsOpen: this.props.isOpen !== nextProps.isOpen,
    });

    warnIfCollapsedPropsAreInvalid(nextProps);
  }

  onResize = (resizeDelta) => {
    this.setState({
      isResizing: true,
      resizeDelta,
    });
  }

  onResizeEnd = () => {
    const width = this.getRenderedWidth();
    const snappedWidth = getSnappedWidth(width);

    const resizeState = {
      isOpen: (snappedWidth >= standardOpenWidth),
      width: snappedWidth,
    };

    this.setState({
      resizeDelta: 0,
      isResizing: false,
    }, function callOnResizeAfterSetState() {
      this.props.onResize(resizeState);
    });
  }

  getRenderedWidth = () => {
    const { isOpen, width, isCollapsible } = this.props;
    const baselineWidth = isOpen ? width : containerClosedWidth;
    const minWidth = isCollapsible ? containerClosedWidth : standardOpenWidth;
    return Math.max(
      minWidth,
      baselineWidth + this.state.resizeDelta
    );
  }

  props: Props

  triggerResizeButtonHandler = (resizeState) => {
    this.props.onResize(resizeState);
  }

  render() {
    const {
      children,
      containerTheme,
      containerHeaderComponent,
      drawers,
      globalTheme,
      globalCreateIcon,
      globalPrimaryIcon,
      globalPrimaryItemHref,
      globalSearchIcon,
      globalSecondaryActions,
      isCollapsible,
      isResizeable,
      isOpen,
      linkComponent,
      onCreateDrawerOpen,
      onResizeStart,
      onSearchDrawerOpen,
    } = this.props;

    const {
      isTogglingIsOpen,
      isResizing,
    } = this.state;

    // if collapsed then:
    // 1. isOpen is ignored
    // 2. You cannot resize to a size smaller than the default open size

    const renderedWidth = this.getRenderedWidth();

    const isGlobalNavPartiallyCollapsed = isResizing &&
      renderedWidth < (globalOpenWidth + containerClosedWidth);

    // Cover over the global navigation when it is partially collapsed
    const containerOffsetX = isGlobalNavPartiallyCollapsed ?
      renderedWidth - (globalOpenWidth + containerClosedWidth) : 0;

    // always show global navigation if it is not collapsible
    const showGlobalNavigation = !isCollapsible || isOpen || isResizing;

    const containerWidth = showGlobalNavigation ?
      Math.max(renderedWidth - globalOpenWidth, containerClosedWidth) :
      containerClosedWidth;

    const isContainerCollapsed = !showGlobalNavigation || containerWidth === containerClosedWidth;
    const shouldAnimateContainer = isTogglingIsOpen && !isResizing;

    // When the navigation is not collapsible, and the width is expanded.
    // Users should be able to click the collapse button to go back to the original width
    const canCollapse = isCollapsible || containerWidth > containerOpenWidth;

    const globalNavigation = showGlobalNavigation ? (
      <NavigationGlobalNavigationWrapper>
        <GlobalNavigation
          theme={globalTheme}
          createIcon={globalCreateIcon}
          linkComponent={linkComponent}
          onCreateActivate={onCreateDrawerOpen}
          onSearchActivate={onSearchDrawerOpen}
          primaryIcon={globalPrimaryIcon}
          primaryItemHref={globalPrimaryItemHref}
          searchIcon={globalSearchIcon}
          secondaryActions={globalSecondaryActions}
        />
      </NavigationGlobalNavigationWrapper>
    ) : null;

    const resizer = isResizeable ? (
      <Resizer
        navigationWidth={renderedWidth}
        onResize={this.onResize}
        onResizeButton={this.triggerResizeButtonHandler}
        onResizeStart={onResizeStart}
        onResizeEnd={this.onResizeEnd}
        showResizeButton={canCollapse}
      />
    ) : null;

    return (
      <div>
        {/* Used to push the page to the right the width of the nav */}
        <Spacer
          shouldAnimate={shouldAnimateContainer}
          width={renderedWidth}
        >
          <NavigationFixedContainer>
            {globalNavigation}
            <NavigationContainerNavigationWrapper
              horizontalOffset={containerOffsetX}
            >
              <ContainerNavigation
                theme={containerTheme}
                showGlobalActions={!showGlobalNavigation}
                globalCreateIcon={globalCreateIcon}
                globalPrimaryIcon={globalPrimaryIcon}
                globalPrimaryItemHref={globalPrimaryItemHref}
                globalSearchIcon={globalSearchIcon}
                globalSecondaryActions={globalSecondaryActions}
                headerComponent={containerHeaderComponent}
                linkComponent={linkComponent}
                onGlobalCreateActivate={onCreateDrawerOpen}
                onGlobalSearchActivate={onSearchDrawerOpen}
                isCollapsed={isContainerCollapsed}
              >
                {children}
              </ContainerNavigation>
            </NavigationContainerNavigationWrapper>
            {resizer}
          </NavigationFixedContainer>
        </Spacer>
        {drawers}
      </div>
    );
  }
}
