import React, { PureComponent } from 'react';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';

export default class BreadcrumbsExpand extends PureComponent {
  state = {
    isExpanded: false,
  }

  expand(e) {
    e.preventDefault();
    this.setState({ isExpanded: true });
  }

  render() {
    return (
      <BreadcrumbsStateless
        maxItems={2}
        isExpanded={this.state.isExpanded}
        onExpand={e => this.expand(e)}
      >
        <BreadcrumbsItem
          href="/pages"
          text="Pages"
          key="Pages"
        />
        <BreadcrumbsItem
          href="/hidden"
          text="hidden bread crumb"
          key="hidden bread crumb"
        />
        <BreadcrumbsItem
          href="/pages/home"
          text="Home"
          key="Home"
        />
      </BreadcrumbsStateless>
    );
  }
}
