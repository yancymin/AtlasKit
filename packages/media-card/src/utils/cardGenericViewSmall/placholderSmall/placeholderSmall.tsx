import * as React from 'react';
import {Component} from 'react';
import {MediaType} from '@atlaskit/media-core';

import {FileIcon, Placeholder} from '../../../utils';
import {PlaceholderSmallWrapper} from '../styled';

export interface PlaceholderProps {
  mediaType: MediaType;
}

export class PlaceholderSmall extends Component<PlaceholderProps, {}> {
  render() {
    return (
      <PlaceholderSmallWrapper>
        <Placeholder mediaType={this.props.mediaType} />
        <FileIcon mediaType={this.props.mediaType} style={{position: 'absolute', top: '15px', left: '3px'}}/>
      </PlaceholderSmallWrapper>
    );
  }
}
