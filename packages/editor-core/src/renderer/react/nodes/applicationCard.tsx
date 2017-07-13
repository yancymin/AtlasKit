import * as React from 'react';
import { PureComponent } from 'react';
import { AppCardView } from '@atlaskit/media-card';
import { Attributes } from '../../../schema/nodes/applicationCard';

export interface AppCardAction {
  title: string;
}

export interface AppCardViewProps extends Attributes {
  onClick?: (url?: string) => void;
  onActionClick?: (action: AppCardAction) => void;
}

export default class ApplicationCard extends PureComponent<AppCardViewProps, {}> {
  state = {};

  private onClick = () => {
    const { onClick, link } = this.props;

    if (onClick) {
      onClick(link && link.url ? link.url : undefined);
    }
  }

  render() {
    const { onActionClick } = this.props;

    return <AppCardView
      onClick={this.onClick}
      model={this.props}
      onActionClick={onActionClick}
    />;
  }
}
