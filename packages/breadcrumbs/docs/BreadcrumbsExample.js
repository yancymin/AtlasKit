import React, { PureComponent } from 'react';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';

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
        isExpanded={this.state.isExpanded}
        onExpand={e => this.expand(e)}
      >
        <BreadcrumbsItem
          href="/pages"
          text="Pages"
        />
        <BreadcrumbsItem
          href="/pages/home"
          text="Home"
        />
        <BreadcrumbsItem
          href="/item"
          iconBefore={<AtlassianIcon label="Test icon" />}
          text="Icon Before"
        />
        <BreadcrumbsItem
          href="/item"
          iconAfter={<AtlassianIcon label="Test icon" />}
          text="Icon After"
        />
      </BreadcrumbsStateless>
    );
  }
}
