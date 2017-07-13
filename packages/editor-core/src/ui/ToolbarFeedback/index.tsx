import * as React from 'react';
import { PureComponent } from 'react';
import Spinner from '@atlaskit/spinner';

import { analyticsDecorator as analytics } from '../../analytics';
import ToolbarButton from '../ToolbarButton';
import { version as coreVersion } from '../../version';

const JIRA_ISSUE_COLLECTOR_URL = 'https://product-fabric.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/-j519ub/b/c/78bd26fb4be69a8bdb879359a9397e96/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=en-US&collectorId=305d3263';

export interface Props {
  packageVersion?: string;
  packageName?: string;
}

export interface State {
  jiraIssueCollectorScriptLoading: boolean;
}

declare global {
  interface Window {
    jQuery: any;
    ATL_JQ_PAGE_PROPS: any;
  }
}

export default class ToolbarFeedback extends PureComponent<Props, State> {
  state: State = {
    jiraIssueCollectorScriptLoading: false
  };

  showJiraCollectorDialogCallback?: () => void;

  private handleSpinnerComplete() {}

  render() {
    const iconBefore = this.state.jiraIssueCollectorScriptLoading
      ? <Spinner isCompleting={false} onComplete={this.handleSpinnerComplete} />
      : undefined;

    // JIRA issue collector script is using jQuery internally
    return this.hasJquery()
      ? (
        <span style={{ display: 'inline-block' }}>
          <ToolbarButton
            iconBefore={iconBefore}
            onClick={this.openFeedbackPopup}
            selected={false}
            spacing="compact"
          >
            Feedback
          </ToolbarButton>
        </span>
      )
      : null;
  }

  @analytics('atlassian.editor.feedback.button')
  private openFeedbackPopup = (): boolean => {
    if (typeof this.showJiraCollectorDialogCallback === 'function') {
      this.showJiraCollectorDialogCallback();
      return false;
    }

    this.setState({ jiraIssueCollectorScriptLoading: true });

    // triggerFunction is executed as soon as JIRA issue collector script is loaded
    window.ATL_JQ_PAGE_PROPS = {
      triggerFunction: (showCollectorDialog) => {
        this.setState({ jiraIssueCollectorScriptLoading: false });

        if (typeof showCollectorDialog === 'function') {
          // save reference to `showCollectorDialog` for future calls
          this.showJiraCollectorDialogCallback = showCollectorDialog;

          // and run it now
          // next tick is essential due to JIRA issue collector behaviour
          setTimeout(showCollectorDialog, 0);
        }
      },
      fieldValues: {
        description: `Please describe the problem you're having or feature you'd like to see:\n\n\n---~---~---~---~---~---~---~---~---~---~---~---~---~---~---\n version: ${this.props.packageName}@${this.props.packageVersion} (${coreVersion})\n---~---~---~---~---~---~---~---~---~---~---~---~---~---~---\n\n`
      },
      environment: {
        'Editor Package': this.props.packageName,
        'Editor Version': this.props.packageVersion,
        'Editor Core Version': coreVersion,
      }
    };

    this.loadJiraIssueCollectorScript();
    return true;
  }

  private loadJiraIssueCollectorScript = (): void => {
    if (this.hasJquery()) {
      window.jQuery.ajax({
        url: JIRA_ISSUE_COLLECTOR_URL,
        type: 'get',
        cache: true,
        dataType: 'script'
      });
    }
  }

  private hasJquery = (): boolean => {
    return (typeof window.jQuery !== 'undefined');
  }
}
