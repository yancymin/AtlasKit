import React, { PureComponent } from 'react';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import IssuesIcon from '@atlaskit/icon/glyph/issues';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import AkButton from '@atlaskit/button';
import { AkSearchDrawer, AkCreateDrawer, AkCustomDrawer, AkNavigationItem, AkGlobalItem } from '../../src/index';
import BasicNavigation from './BasicNavigation';

export default class DrawerWidthNavigation extends PureComponent {
  state = {
    openDrawer: null,
    isCreateDrawerFullWidth: false,
    isSearchDrawerFullWidth: false,
    customDrawerWidth: 'narrow',
  }

  getBackIcon = () => (
    <ArrowLeftIcon label="Back icon" size="medium" />
  );

  getPrimaryIcon = () => (
    <AtlassianIcon label="Atlassian icon" size="medium" />
  );

  getSearchDrawer = () => (
    <AkSearchDrawer
      backIcon={this.getBackIcon()}
      isOpen={this.state.openDrawer === 'search'}
      isFullWidth={this.state.isSearchDrawerFullWidth}
      key="search"
      onBackButton={() => this.setDrawer(null)}
      primaryIcon={this.getPrimaryIcon()}
    >
      <p>Search drawer</p>
      <AkButton onClick={this.toggleSearchDrawerWidth}>
        Change drawer width
      </AkButton>
    </AkSearchDrawer>
  );

  getCreateDrawer = () => (
    <AkCreateDrawer
      backIcon={this.getBackIcon()}
      isOpen={this.state.openDrawer === 'create'}
      isFullWidth={this.state.isCreateDrawerFullWidth}
      key="create"
      onBackButton={() => this.setDrawer(null)}
      primaryIcon={this.getPrimaryIcon()}
    >
      <p>Create drawer</p>
      <AkButton onClick={this.toggleCreateDrawerWidth}>
        Change drawer width
      </AkButton>
    </AkCreateDrawer>
  );

  getCustomDrawer = () => (
    <AkCustomDrawer
      backIcon={this.getBackIcon()}
      isOpen={this.state.openDrawer === 'custom'}
      width={this.state.customDrawerWidth}
      key="custom"
      onBackButton={() => this.setDrawer(null)}
      primaryIcon={this.getPrimaryIcon()}
    >
      <p>Create drawer</p>
      <AkButton onClick={this.changeCustomDrawerWidth}>
        Change drawer width
      </AkButton>
    </AkCustomDrawer>
  );

  setDrawer = (drawerId) => {
    this.setState({
      openDrawer: drawerId,
    });
  }

  changeCustomDrawerWidth = () => {
    const nextWidth = {
      wide: 'narrow',
      narrow: 'full',
      full: 'wide',
    }[this.state.customDrawerWidth];

    this.setState({
      customDrawerWidth: nextWidth,
    });
  };

  toggleSearchDrawerWidth = () => {
    this.setState({
      isSearchDrawerFullWidth: !this.state.isSearchDrawerFullWidth,
    });
  };

  toggleCreateDrawerWidth = () => {
    this.setState({
      isCreateDrawerFullWidth: !this.state.isCreateDrawerFullWidth,
    });
  };

  handleCreateDrawerOpen = () => {
    this.setDrawer('create');
  }

  handleSearchDrawerOpen = () => {
    this.setDrawer('search');
  }

  render() {
    return (
      <BasicNavigation
        drawers={[
          this.getSearchDrawer(),
          this.getCreateDrawer(),
          this.getCustomDrawer(),
        ]}
        isOpen={this.state.isOpen}
        onCreateDrawerOpen={this.handleCreateDrawerOpen}
        onSearchDrawerOpen={this.handleSearchDrawerOpen}
        globalHelpItem={
          <AkGlobalItem>
            <QuestionCircleIcon label="Help icon" />
          </AkGlobalItem>
        }
      >
        <AkNavigationItem
          icon={<IssuesIcon label="Custom" />}
          text="Open custom drawer"
          onClick={() => this.setDrawer('custom')}
        />
      </BasicNavigation>
    );
  }
}
