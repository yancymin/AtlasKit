import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { DropdownMenuStateless } from '@atlaskit/dropdown-menu';
import AppSwitcher from '../../src';
import { name } from '../../package.json';

const data = {
  recentContainers: [
    {
      name: 'Recent container',
      url: 'https://instance.atlassian.net/view/container',
      iconUrl: '',
      type: 'confluence-space',
    },
  ],
  linkedApplications: {
    configureLink: 'https://www.atlassian.com',
    apps: [
      {
        name: 'JIRA',
        url: 'https://instance.atlassian.net/',
        product: 'jira',
      },
      {
        name: 'Confluence',
        url: 'https://instance.atlassian.net/wiki',
        product: 'confluence',
      },
    ],
    error: false,
  },
  isAnonymousUser: false,
  suggestedApplication: {
    show: true,
    application: 'confluence',
    url: 'https://www.atlassian.com/confluence',
  },
  i18n: {
    home: 'Home',
    apps: 'Apps',
    'applinks.error': 'Applinks error',
    configure: 'Configure',
    recent: 'Recent',
    'try.other.apps': 'Try Other Atlassian Apps',
    'don\'t.show.this.again': 'Don’t show this again',
    'container.confluence-space': 'Space',
    'container.jira-project': 'Project',
    'suggested.application.description.confluence': 'Collaboration and content sharing',
    'suggested.application.description.jira': 'Issue & project tracking software',
  },
  isDropdownOpenInitially: false,
  trigger: () => {},
};

describe(name, () => {
  it('should pass dropdown options to StatelessDropdown', () => {
    const wrapper = shallow(
      <AppSwitcher {...data} dropdownOptions={{ test: 'test' }} />
    );

    expect(wrapper.find(DropdownMenuStateless).prop('test')).toBe('test');
  });

  it('should pass isLoading to StatelessDropdown', () => {
    expect(shallow(
      <AppSwitcher
        {...data}
        isLoading
      />).find(DropdownMenuStateless).prop('isLoading')
    ).toBe(true);

    expect(shallow(
      <AppSwitcher
        {...data}
        isLoading={false}
      />).find(DropdownMenuStateless).prop('isLoading')
    ).toBe(false);
  });

  it('should invoke the open callback when it opens', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <AppSwitcher {...data} onAppSwitcherOpen={spy} />
    );
    expect(spy.callCount).toBe(0);

    wrapper.instance().onOpenChange({
      isOpen: true,
    });
    expect(spy.callCount).toBe(1);
  });
});
