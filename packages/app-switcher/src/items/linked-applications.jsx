// @flow
import React from 'react';
import { Item, Link } from '../styled';
import type { Translations, LinkedApplications, DropdownConfig } from '../internal/types';

export default function (
  i18n: Translations,
  isAnonymousUser: boolean,
  linkedApplications: LinkedApplications
): DropdownConfig {
  if (linkedApplications.error) {
    return {
      heading: i18n.apps,
      items: [{
        content: (<Item>{i18n['applinks.error']}</Item>),
      }],
    };
  }

  const items = linkedApplications.apps.map(application => ({
    content: (<Item>{application.name}</Item>),
    href: application.url,
    analyticEvent: { key: 'appswitcher.app.link.click', properties: { product: application.product } },
  }));

  if (linkedApplications.configureLink && !isAnonymousUser) {
    items.push({
      content: (<Item><Link>{i18n.configure}</Link></Item>),
      href: linkedApplications.configureLink,
      analyticEvent: { key: 'appswitcher.configure.link.click' },
    });
  }

  return {
    heading: i18n.apps,
    items,
  };
}
