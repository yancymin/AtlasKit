import * as React from 'react';
import {MouseEvent} from 'react';
import {MediaItemType, MediaItemDetails, LinkDetails, UrlPreview, ImageResizeMode} from '@atlaskit/media-core';

import {SharedCardProps, CardStatus, CardEvent, OnSelectChangeFuncResult} from '..';
import {LinkCard} from '../links';
import {FileCard} from '../files';
import {isLinkDetails} from '../utils/isLinkDetails';

export interface CardViewProps extends SharedCardProps {
  readonly status: CardStatus;
  readonly mediaItemType?: MediaItemType;
  readonly metadata?: MediaItemDetails;
  readonly resizeMode?: ImageResizeMode;

  readonly onClick?: (result: CardEvent) => void;
  readonly onMouseEnter?: (result: CardEvent) => void;
  readonly onSelectChange?: (result: OnSelectChangeFuncResult) => void;

  // allow extra props to be passed down to lower views e.g. dataURI to FileCard
  [propName: string]: any;
}

export class CardView extends React.Component<CardViewProps, {}> {  // tslint:disable-line:variable-name
  componentWillReceiveProps(nextProps: CardViewProps) {
    const {selected: currSelected} = this.props;
    const {selectable: nextSelectable, selected: nextSelected} = nextProps;

    // need to coerce to booleans as both "undefined" and "false" are considered NOT selected
    const cs: boolean = !!currSelected;
    const ns: boolean = !!nextSelected;

    if (nextSelectable && cs !== ns) {
      this.fireOnSelectChangeToConsumer(ns);
    }
  }

  private fireOnSelectChangeToConsumer = (newSelectedState: boolean): void => {
    const {metadata, selectable, onSelectChange} = this.props;

    if (selectable && onSelectChange) {
      onSelectChange({selected: newSelectedState, mediaItemDetails: metadata});
    }
  }

  render() {
    const {mediaItemType} = this.props;

    if (mediaItemType === 'link') {
      return this.renderLink();
    } else if (mediaItemType === 'file') {
      return this.renderFile();
    }

    return this.renderCardFromDetails();
  }

  private renderCardFromDetails = () => {
    const {metadata} = this.props;

    if (isLinkDetails(metadata)) {
      return this.renderLink();
    }

    return this.renderFile();
  }

  private renderLink = () => {
    const {mediaItemType, status, metadata, onClick, onMouseEnter, onSelectChange, ...otherProps} = this.props;

    return (
      <LinkCard
        {...otherProps}
        status={status}
        details={metadata as LinkDetails | UrlPreview}

        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
      />
    );
  }

  private renderFile = () => {
    const {mediaItemType, status, metadata, onClick, onMouseEnter, onSelectChange, ...otherProps} = this.props;

    return (
      <FileCard
        {...otherProps}
        status={status}
        details={metadata}

        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
      />
    );
  }

  private onClick = (event: MouseEvent<HTMLDivElement>) => {
    const {onClick, metadata: mediaItemDetails} = this.props;
    if (onClick) {
      onClick({event, mediaItemDetails});
    }
  }

  private onMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    const {onMouseEnter, metadata: mediaItemDetails} = this.props;
    if (onMouseEnter) {
      onMouseEnter({event, mediaItemDetails});
    }
  }
}
