import * as React from 'react';
import {Component} from 'react';
import {MediaItemType} from '@atlaskit/media-core';
import FileIcon from '@atlaskit/icon/glyph/file';
import LinkIcon from '@atlaskit/icon/glyph/link';
import {Wrapper} from './styled';

export interface LoadingCardProps {
  mediaItemType?: MediaItemType;
  iconSize?: 'small' | 'medium' | 'large';
}

export class CardLoading extends Component<LoadingCardProps, {}> {
  render() {
    return <Wrapper>
             {this.icon}
           </Wrapper>;
  }

  get iconSize() {
    return this.props.iconSize || 'medium';
  }

  get icon () {
    const {iconSize} = this;
    const {mediaItemType} = this.props;

    return mediaItemType === 'link' ?
      <LinkIcon label="loading" size={iconSize}/> :
      <FileIcon label="loading" size={iconSize}/>;
  }
}
