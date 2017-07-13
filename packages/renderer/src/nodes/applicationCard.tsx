import * as React from 'react';
import { Component } from 'react';
import { AppCardView } from '@atlaskit/media-card';

// NOTE: this has been copied from editor-core/src/schema/nodes/applicationCard.ts
//       This will go away in the New Renderer
export interface Attributes {
  text: string;
  textUrl?: string;
  link?: {
    url: string
  };
  background?: {
    url: string
  };
  collapsible?: boolean;
  preview?: {
    url: string
  };
  title: {
    text: string
  };
  description?: {
    text: string
  };
  details?: Array<Detail>;
}

export interface Detail {
  title?: string;
  text?: string;
  icon?: Icon;
  badge?: {
    value: number;
    max?: number;
    appearance?: 'default' | 'primary' | 'important' | 'added' | 'removed'
  };
  lozenge?: {
    text: string,
    bold?: boolean;
    appearance?: 'default' | 'success' | 'removed' | 'inprogress' | 'new' | 'moved';
  };
  users?: Array<User>;
}

export interface User {
  id?: string;
  icon: Icon;
}

export interface Icon {
  url: string;
  label: string;
}

export interface AppCardAction {
  title: string;
}

export interface AppCardViewProps {
  model: Attributes;
  onClick?: (url?: string) => void;
  onActionClick?: (action: AppCardAction) => void;
}

export default class Media extends Component<AppCardViewProps, {}> {
  state = {};

  private onClick = () => {
    const { onClick, model: { link } } = this.props;

    if (onClick) {
      onClick(link && link.url ? link.url : undefined);
    }
  }

  render() {
    const { model, onActionClick } = this.props;

    return <AppCardView
      onClick={this.onClick}
      model={model}
      onActionClick={onActionClick}
    />;
  }
}
