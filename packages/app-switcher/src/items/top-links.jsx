// @flow
import React from 'react';
import HomeIcon from '../components/HomeIcon';
import SiteAdminIcon from '../components/SiteAdminIcon';
import { HomeIconContainer, SiteAdminIconContainer, TopLinkContainer } from '../styled';
import type { Translations, DropdownConfig } from '../internal/types';

export default function (
  i18n: Translations,
  isAnonymousUser: boolean,
  isHomeLinkEnabled: boolean,
  isSiteAdminLinkEnabled?: boolean,
): DropdownConfig | null {
  if (isAnonymousUser) {
    return null;
  }

  const items = [];
  if (isHomeLinkEnabled) {
    items.push({
      content: (<TopLinkContainer>{i18n.home}</TopLinkContainer>),
      elemBefore: (<HomeIconContainer><HomeIcon /></HomeIconContainer>),
      href: '/home',
      analyticEvent: { key: 'appswitcher.home.link.click' },
    });
  }

  if (isSiteAdminLinkEnabled) {
    items.push({
      content: (<TopLinkContainer>{i18n['site-admin']}</TopLinkContainer>),
      elemBefore: (<SiteAdminIconContainer><SiteAdminIcon /></SiteAdminIconContainer>),
      href: '/admin',
      analyticEvent: { key: 'appswitcher.siteAdmin.link.click' },
    });
  }

  return items.length > 0 ? { items } : null;
}
