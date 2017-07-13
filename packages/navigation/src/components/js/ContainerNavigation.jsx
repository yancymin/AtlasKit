// @flow
import React, { PureComponent } from 'react';
import memoizeOne from 'memoize-one';
import { WithRootTheme } from '../../theme/util';
import ContainerHeader from './ContainerHeader';
import ContainerNoHeader from '../styled/ContainerNoHeader';
import DefaultLinkComponent from './DefaultLinkComponent';
import GlobalPrimaryActions from './GlobalPrimaryActions';
import GlobalSecondaryActions from './GlobalSecondaryActions';
import Reveal from './Reveal';
import ContainerNavigationInner from '../styled/ContainerNavigationInner';
import ContainerNavigationChildren from '../styled/ContainerNavigationChildren';
import GlobalNavigationSecondaryContainer from '../styled/GlobalNavigationSecondaryContainer';
import subscribe from '../../watch-scroll-top';
import {
  globalPrimaryActions,
  globalSecondaryActions as globalSecondaryActionsSizes,
} from '../../shared-variables';
import { container } from '../../theme/presets';
import type { ReactElement, Provided } from '../../types';

type Props = {|
  children: ReactElement,
  /** Icon to be rendered in the globalPrimaryActions internal component when
  isCollapsed is true. When clicked, onGlobalCreateActivate is called. It is
  recommended that you use an atlaskit icon. */
  globalCreateIcon?: ReactElement,
  /** Icon to be rendered at the top of the globalPrimaryActions internal component
  when isCollapsed is true. It is renered as a linkComponent, using the
  globalPrimaryItemHref. It is recommended that you use an atlaskit icon. */
  globalPrimaryIcon?: ReactElement,
  /** href to be used around the globalPrimaryIcon. */
  globalPrimaryItemHref?: string,
  /** Icon to be displayed in the middle of the internal globalPrimaryActions
  component. On click, onGlobalSearchActivate is called. It is recommended
  that you use an atlaskit icon. */
  globalSearchIcon?: ReactElement,
  /** Functional react component that is passed the prop isCollapsed. The AkContainerTitle
  component is designed to be used as the headerComponent. */
  headerComponent: () => mixed,
  /** Set to determine whether the ContainerNavigation should be rendered in its
  open state or closed state. Passed through to the headerComponent. */
  isCollapsed?: boolean,
  /** A component to be used as a link. By Default this is an anchor. when a href
  is passed to it, and otherwise is a button. */
  linkComponent?: () => mixed,
  /** Function to be called when the globalCreateIcon is clicked on. */
  onGlobalCreateActivate: () => void,
  /** Function to be called when the globalSearchIcon is clicked on. */
  onGlobalSearchActivate: () => void,
  /** Sets whether the globalyPrimaryActions should be displayed. These should be
  components shared with the GlobalNavigation component, so they can be included
  in the ContainerNavigation when Navigation is collapsed. */
  showGlobalActions?: boolean,
  /** Theme object. Custom theme objects should be generated using the createGlobalTheme
  function. */
  theme?: Provided, // eslint-disable-line react/forbid-prop-types
  globalSecondaryActions: Array<ReactElement>,
|}

export default class ContainerNavigation extends PureComponent {
  static defaultProps = {
    showGlobalActions: false,
    globalSecondaryActions: [],
    isCollapsed: false,
    linkComponent: DefaultLinkComponent,
    theme: container,
  }

  constructor(props: Props, context) {
    super(props, context);

    this.state = {
      isScrolling: false,
      isInitiallyRendered: false,
    };

    // Memoizing this function so that it will only be called
    // when the underlying DOM node is changing OR if it is
    // unmounting (in which case it will be `null`).
    this.onRefChange = memoizeOne(this.onRefChange);
  }

  componentWillReceiveProps() {
    // After any update we are going to start animating.
    // Not doing this in componentDidMount to prevent an
    // unneeded second render on mount.
    if (!this.state.isInitiallyRendered) {
      this.setState({
        isInitiallyRendered: true,
      });
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  onScrollTopChange = (number: number) => {
    const isScrolling = number > 0;

    if (isScrolling === this.state.isScrolling) {
      return;
    }

    this.setState({
      isScrolling,
    });
  }

  onRefChange = (el) => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    // If headerComponent doesn't exist we don't need to track scroll position,
    // because it's only used by ContainerHeader component
    if (!el || !this.props.headerComponent) {
      return;
    }

    this.unsubscribe = subscribe(el, this.onScrollTopChange);
  }

  props: Props

  render() {
    const {
      showGlobalActions,
      globalSecondaryActions,
      children,
      globalCreateIcon,
      globalPrimaryIcon,
      globalPrimaryItemHref,
      globalSearchIcon,
      headerComponent,
      linkComponent,
      onGlobalCreateActivate,
      onGlobalSearchActivate,
      isCollapsed,
      theme,
    } = this.props;

    // Only animating the revealing of GlobalPrimaryActions and GlobalSecondaryActions
    // after the first render. Before that it is rendered without animation.
    const { isInitiallyRendered, isScrolling } = this.state;

    const header = headerComponent ? (
      <ContainerHeader
        isContentScrolled={isScrolling}
      >
        {headerComponent({ isCollapsed })}
      </ContainerHeader>) : <ContainerNoHeader />;

    return (
      <WithRootTheme
        provided={theme}
        isCollapsed={isCollapsed}
      >
        {/* This div is needed for legacy reasons.
        All children should use isCollapsed on the theme */}
        <ContainerNavigationInner
          innerRef={this.onRefChange}
        >
          <Reveal
            shouldAnimate={isInitiallyRendered}
            isOpen={showGlobalActions}
            openHeight={globalPrimaryActions.height.outer}
          >
            <GlobalPrimaryActions
              createIcon={globalCreateIcon}
              linkComponent={linkComponent}
              onCreateActivate={onGlobalCreateActivate}
              onSearchActivate={onGlobalSearchActivate}
              primaryIcon={globalPrimaryIcon}
              primaryItemHref={globalPrimaryItemHref}
              searchIcon={globalSearchIcon}
            />
          </Reveal>
          {header}
          <ContainerNavigationChildren>
            {children}
          </ContainerNavigationChildren>
          <GlobalNavigationSecondaryContainer>
            <Reveal
              shouldAnimate={isInitiallyRendered}
              isOpen={showGlobalActions}
              openHeight={
                globalSecondaryActionsSizes.height(
                  React.Children.count(globalSecondaryActions)
                ).outer
              }
            >
              {showGlobalActions && globalSecondaryActions.length ? (
                <GlobalSecondaryActions actions={globalSecondaryActions} />
              ) : null}
            </Reveal>
          </GlobalNavigationSecondaryContainer>
        </ContainerNavigationInner>
      </WithRootTheme>
    );
  }
}
