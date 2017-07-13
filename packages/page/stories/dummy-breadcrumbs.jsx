import React, { PureComponent } from 'react';
import Breadcrumbs, { AkBreadcrumbsItem } from '@atlaskit/breadcrumbs';

export default class DummyCode extends PureComponent {
  render() {
    return (
      <Breadcrumbs>
        <AkBreadcrumbsItem href="#" text="Atlassian" />
        <AkBreadcrumbsItem href="#" text="Atlaskit" />
        <AkBreadcrumbsItem href="#" text="AK-1252-grid-component" />
        <AkBreadcrumbsItem href="#" text="Commits" />
      </Breadcrumbs>
    );
  }
}
