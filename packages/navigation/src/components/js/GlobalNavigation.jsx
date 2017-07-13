// @flow
import React, { PureComponent } from 'react';
import { WithRootTheme } from '../../theme/util';
import GlobalPrimaryActions from './GlobalPrimaryActions';
import GlobalSecondaryActions from './GlobalSecondaryActions';
import DefaultLinkComponent from './DefaultLinkComponent';
import GlobalNavigationInner from '../styled/GlobalNavigationInner';
import GlobalNavigationPrimaryContainer from '../styled/GlobalNavigationPrimaryContainer';
import GlobalNavigationSecondaryContainer from '../styled/GlobalNavigationSecondaryContainer';
import * as presets from '../../theme/presets';
import type { ReactElement } from '../../types';

type Props = {|
  /** The icon to be used for the create button */
  createIcon?: ReactElement,
  /** A component that will be used to render links. A default link component is
  used if none is provided. */
  linkComponent?: () => mixed,
  /** The topmost icon to be placed in the global navigation - usually the product
  logo, or the product home icon */
  primaryIcon?: ReactElement,
  /** A link to place around the primary icon. */
  primaryItemHref?: string,
  /**  list of nodes to be placed in the secondary actions slot at the bottom of
  the global sidebar. This should not exceed four nodes. */
  secondaryActions: Array<ReactElement>,
  /** The icon to use in the global navigation for the global search button */
  searchIcon?: ReactElement,
  /** A handler that is called when the search drawer is requesting to be opened */
  onSearchActivate: () => mixed,
  /** A handler that is called when the createIcon is clicked */
  onCreateActivate: (e: Event) => mixed,
  /** The theme of the global navigation. Presets are available via the
  presetThemes named export, or you can generate your own using the the
  createGlobalTheme named export function. */
  theme: Object, // eslint-disable-line react/forbid-prop-types
|};

export default class GlobalNavigation extends PureComponent {
  static defaultProps = {
    accountItem: null,
    linkComponent: DefaultLinkComponent,
    primaryIcon: null,
    secondaryActions: [],
    theme: presets.global,
  };

  props: Props;

  render() {
    const {
      createIcon,
      linkComponent,
      onCreateActivate,
      onSearchActivate,
      primaryIcon,
      primaryItemHref,
      searchIcon,
      secondaryActions,
      theme,
    } = this.props;
    return (
      <WithRootTheme provided={theme}>
        <GlobalNavigationInner>
          <GlobalNavigationPrimaryContainer>
            <GlobalPrimaryActions
              createIcon={createIcon}
              linkComponent={linkComponent}
              onCreateActivate={onCreateActivate}
              onSearchActivate={onSearchActivate}
              primaryIcon={primaryIcon}
              primaryItemHref={primaryItemHref}
              searchIcon={searchIcon}
            />
          </GlobalNavigationPrimaryContainer>
          <GlobalNavigationSecondaryContainer>
            {secondaryActions.length ? (
              <GlobalSecondaryActions actions={secondaryActions} />
            ) : null}
          </GlobalNavigationSecondaryContainer>
        </GlobalNavigationInner>
      </WithRootTheme>
    );
  }
}
