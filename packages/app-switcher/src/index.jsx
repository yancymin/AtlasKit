// @flow
import React, { Component } from 'react';
import { DropdownMenuStateless } from '@atlaskit/dropdown-menu';

import type {
  RecentContainers,
  LinkedApplications,
  SuggestedApplication,
  DropdownOptions,
  Translations,
  DropdownItem,
} from './internal/types';

import getTopLinks from './items/top-links';
import getRecentContainers from './items/recent-containers';
import getLinkedApplications from './items/linked-applications';
import getSuggestedApplication from './items/suggested-application';

import { AppSwitcherContainer } from './styled';

export default class AppSwitcher extends Component {
  props: { // eslint-disable-line react/sort-comp
    recentContainers: RecentContainers,
    linkedApplications: LinkedApplications,
    isAnonymousUser: boolean,
    isHomeLinkEnabled: boolean,
    isSiteAdminLinkEnabled?: boolean,
    suggestedApplication: SuggestedApplication,
    i18n: Translations,
    trigger: Function,
    analytics: Function,
    isDropdownOpenInitially: boolean,
    dropdownOptions: DropdownOptions,
    isLoading: boolean,
    onAppSwitcherOpen: Function,
  };

  static defaultProps = {
    analytics: () => {},
    isDropdownOpenInitially: true,
    dropdownOptions: {},
    isHomeLinkEnabled: true,
    isSiteAdminLinkEnabled: false,
    isLoading: false,
    onAppSwitcherOpen: () => {},
  };

  state = {
    isDropdownOpen: this.props.isDropdownOpenInitially,
    suggestedApplicationHiddenByUser: false,
  };

  onItemActivated = (activated: { item: DropdownItem }) => {
    if (activated.item.analyticEvent) {
      this.props.analytics(
        activated.item.analyticEvent.key,
        activated.item.analyticEvent.properties
      );
    }

    if (activated.item.action === 'suggestedApplicationDontShowAgainClick') {
      // If we remove the suggested application immediately, the droplist component interprets the
      // click as outside the dropdown menu and closes the menu, which isn't the behaviour we want.
      setTimeout(() => this.setState({ suggestedApplicationHiddenByUser: true }), 0);
      this.props.suggestedApplication.onDontShowAgainClick();
    }
  };

  onOpenChange = (attrs: { isOpen: boolean }) => {
    if (!this.state.isDropdownOpen && attrs.isOpen) {
      this.props.analytics('appswitcher.trigger.click');
      this.props.onAppSwitcherOpen();
    }

    this.setState({ isDropdownOpen: attrs.isOpen });
  };

  render = () => {
    const {
      i18n,
      isAnonymousUser,
      isHomeLinkEnabled,
      isSiteAdminLinkEnabled,
      isLoading,
      recentContainers,
      linkedApplications,
      suggestedApplication,
      trigger,
      dropdownOptions,
    } = this.props;

    // NOTE: dropdownItems here are passing content that are React elements and not strings
    // This is not the intended behaviour of DropdownMenu and could result in major issues in the
    // future. (Its what is throwing the warnings in tests too)
    const dropdownItems = [
      getTopLinks(i18n, isAnonymousUser, isHomeLinkEnabled, isSiteAdminLinkEnabled),
      getRecentContainers(i18n, isAnonymousUser, recentContainers),
      getLinkedApplications(i18n, isAnonymousUser, linkedApplications),
      getSuggestedApplication(i18n, isAnonymousUser, suggestedApplication,
        this.state.suggestedApplicationHiddenByUser),
    ].filter(item => item != null);

    return (
      <AppSwitcherContainer>
        <DropdownMenuStateless
          items={dropdownItems}
          isLoading={isLoading}
          isOpen={this.state.isDropdownOpen}
          onOpenChange={this.onOpenChange}
          onItemActivated={this.onItemActivated}
          appearance="tall"
          position="bottom left"
          shouldFlip={false}
          {...dropdownOptions}
        >
          {trigger(this.state.isDropdownOpen)}
        </DropdownMenuStateless>
      </AppSwitcherContainer>
    );
  }
}
