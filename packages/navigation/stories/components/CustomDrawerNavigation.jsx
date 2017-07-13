import React, { PureComponent } from 'react';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import IssuesIcon from '@atlaskit/icon/glyph/issues';
import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import { AkCustomDrawer, AkSearchDrawer, AkCreateDrawer, AkNavigationItemGroup, AkNavigationItem, AkGlobalItem } from '../../src/index';
import BasicNavigation from './BasicNavigation';

export default class CustomDrawerNavigation extends PureComponent {
  state = {
    openDrawer: null,
    width: 300,
  };

  setDrawer(drawerId) {
    this.setState({
      openDrawer: drawerId,
    });
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
      isWide
      key="search"
      onBackButton={() => this.setDrawer(null)}
      primaryIcon={this.getPrimaryIcon()}
    >
      <p>Search drawer</p>
    </AkSearchDrawer>
  );

  getCreateDrawer = () => (
    <AkCreateDrawer
      backIcon={this.getBackIcon()}
      isOpen={this.state.openDrawer === 'create'}
      isWide
      key="create"
      onBackButton={() => this.setDrawer(null)}
      primaryIcon={this.getPrimaryIcon()}
      triggerRef={this.state.reportsTrigger}
    >
      <p>Create drawer</p>
    </AkCreateDrawer>
  );

  getQueuesDrawer = () => (
    <AkCustomDrawer
      backIcon={this.getBackIcon()}
      isOpen={this.state.openDrawer === 'queues'}
      key="queues"
      onBackButton={() => this.setDrawer(null)}
      primaryIcon={this.getPrimaryIcon()}
    >
      <AkNavigationItem
        icon={<DashboardIcon label="Blockers" />}
        text="Blockers"
      />
      <AkNavigationItem
        icon={<DashboardIcon label="Urgent SLA" />}
        text="Urgent SLA"
      />
      <AkNavigationItem
        icon={<DashboardIcon label="All open issues" />}
        text="All open issues"
      />
    </AkCustomDrawer>
  );

  getReportsDrawer = () => (
    <AkCustomDrawer
      backIcon={this.getBackIcon()}
      isOpen={this.state.openDrawer === 'reports'}
      key="reports"
      onBackButton={() => this.setDrawer(null)}
      primaryIcon={this.getPrimaryIcon()}
    >
      <div>
        <AkNavigationItemGroup title="Team">
          <AkNavigationItem text="Workload" />
          <AkNavigationItem text="SLA goals" />
          <AkNavigationItem text="Satisfaction" />
        </AkNavigationItemGroup>
        <AkNavigationItemGroup title="Knowledge Base">
          <AkNavigationItem text="Article usage" />
          <AkNavigationItem text="Article effectiveness" />
        </AkNavigationItemGroup>
        <AkNavigationItemGroup title="Custom">
          <AkNavigationItem text="Created vs Resolved" />
          <AkNavigationItem text="Time to resolution" />
          <AkNavigationItem text="SLA success rate" />
          <AkNavigationItem text="SLA met vs breached" />
          <AkNavigationItem text="Resolution by component" />
        </AkNavigationItemGroup>
      </div>
    </AkCustomDrawer>
  );

  resize(resizeState) {
    this.setState({
      openDrawer: resizeState.isOpen ? this.state.openDrawer : null,
      width: resizeState.width,
    });
  }

  render() {
    const queuesItemOpen = (<AkNavigationItem icon={<DashboardIcon label="Queues" />} text="Queues" />);
    const queuesItemCollapsed = (<AkNavigationItem
      icon={<ArrowRightIcon label="Queues" />}
      onClick={() => { this.setDrawer('queues'); }}
      text="Queues"
    />);
    const reportsItemOpen = (<AkNavigationItem icon={<SettingsIcon label="Reports" />} text="Reports" />);
    const reportsItemCollapsed = (<AkNavigationItem
      icon={<ArrowRightIcon label="Reports" />}
      onClick={() => { this.setDrawer('reports'); }}
      text="Reports"
    />);

    return (
      <BasicNavigation
        drawers={[
          this.getSearchDrawer(),
          this.getCreateDrawer(),
          this.getQueuesDrawer(),
          this.getReportsDrawer(),
        ]}
        onCreateDrawerOpen={() => this.setDrawer('create')}
        onResize={(resizeState) => { this.resize(resizeState); }}
        onSearchDrawerOpen={() => this.setDrawer('search')}
        width={this.state.width}
        globalHelpItem={
          <AkGlobalItem onClick={() => { this.setDrawer('reports'); }}>
            <QuestionCircleIcon label="Help icon" />
          </AkGlobalItem>
        }
      >
        <div>
          {this.state.openDrawer ? queuesItemOpen : queuesItemCollapsed }
          <AkNavigationItem icon={<IssuesIcon label="Customers" />} text="Collapse navigation and click one of the other two icons" />
          {this.state.openDrawer ? reportsItemOpen : reportsItemCollapsed }
        </div>
      </BasicNavigation>
    );
  }
}
