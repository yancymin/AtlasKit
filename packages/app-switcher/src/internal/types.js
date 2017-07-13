// @flow
type ReactNode = any; // @todo: https://github.com/facebook/flow/pull/3931

export type Applications = Array<{
  name: string,
  url: string,
  product: string,
}>;

export type ConfigureLink = string | boolean;

export type RecentContainers = Array<{
  name: string,
  url: string,
  iconUrl: string,
  type: string,
}>;

export type LinkedApplications = {
  configureLink: ConfigureLink,
  apps: Applications,
  error: boolean,
};

export type Translations = {
  home: ReactNode,
  'site-admin'?: ReactNode,
  apps: ReactNode,
  configure: ReactNode,
  recent: ReactNode,
  'try.other.apps': ReactNode,
  "don't.show.this.again": ReactNode,
  'container.confluence-space': ReactNode,
  'container.jira-project': ReactNode,
  'suggested.application.description.confluence': ReactNode,
  'suggested.application.description.jira': ReactNode,
  'applinks.error': ReactNode,
};

export type SuggestedApplication = {
  show: boolean,
  application?: 'jira' | 'confluence',
  url?: string,
  onDontShowAgainClick?: Function,
};

export type DropdownOptions = {
  appearance?: 'default' | 'tall',
  isTriggerNotTabbable?: boolean,
  position?: string,
  shouldFlip?: boolean,
};

export type DropdownItem = {
  content: ReactNode,
  elemBefore?: ReactNode,
  href?: ReactNode,
  analyticEvent?: { key: string, properties?: Object }
};

export type DropdownConfig = {
  heading?: ReactNode,
  items: Array<DropdownItem>
};
