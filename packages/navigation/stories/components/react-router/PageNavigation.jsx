import React, { PureComponent } from 'react';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import Navigation from '../../../src/index';
import RouterHeader from './RouterHeader';
import RouterLinkComponent from './RouterLinkComponent';
import RouterLinkItem from './RouterLinkItem';

export default class PageNavigation extends PureComponent {
  render() {
    return (
      <Navigation
        containerHeaderComponent={() =>
          (<RouterHeader
            to="/iframe.html"
          />)
        }
        globalPrimaryIcon={<AtlassianIcon label="Home" size="medium" />}
        globalPrimaryItemHref="/iframe.html"
        linkComponent={RouterLinkComponent}
      >
        <RouterLinkItem
          text="Page 1"
          to="/page1"
        />
        <RouterLinkItem
          text="Page 2"
          to="/page2"
        />
        <RouterLinkItem
          text="Page 3"
          to="/page3"
        />
        <RouterLinkItem
          text="Page 4"
          to="/page4"
        />
      </Navigation>
    );
  }
}
