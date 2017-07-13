import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { JiraLogo } from '@atlaskit/logo';
import ReactJIRAIssueNode from '../../src/nodeviews/ui/jiraIssue';
import { confluenceJiraIssue } from './_schema-builder';

describe('jiraIssue - React component', () => {
  it('should return a node of type span', () => {
    const node = confluenceJiraIssue({ issueKey: 'test' });
    const wrapper = mount(<ReactJIRAIssueNode node={node}/>);

    expect(wrapper.getDOMNode().tagName).to.equal('SPAN');
  });

  it('should use JiraLogo component', () => {
    const node = confluenceJiraIssue({ issueKey: 'test' });
    const wrapper = mount(<ReactJIRAIssueNode node={node}/>);

    expect(wrapper.find(JiraLogo)).to.have.length(1);
  });

  it('should use issue key as a text', () => {
    const node = confluenceJiraIssue({ issueKey: 'test' });
    const wrapper = mount(<ReactJIRAIssueNode node={node}/>);

    expect(wrapper.text()).to.equal('test');
  });
});
