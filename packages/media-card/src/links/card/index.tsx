import * as React from 'react';
import { Component, MouseEvent } from 'react';
import { TrelloBoardLinkApp, UrlPreview, ImageResizeMode } from '@atlaskit/media-core';

import { SharedCardProps, CardStatus } from '../..';
import { LinkCardGenericView } from '../cardGenericView';
import { LinkCardPlayer } from '../cardPlayerView';
import { LinkCardTrelloBoardView } from '../apps/trello';
import { LinkCardViewSmall } from '../cardViewSmall';
import { LinkCardImageView } from '../cardImageView';

export interface LinkCardProps extends SharedCardProps {
  readonly status: CardStatus;
  readonly details?: UrlPreview;
  readonly resizeMode?: ImageResizeMode;

  readonly onClick?: (event: MouseEvent<HTMLElement>) => void;
  readonly onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
}

export class LinkCard extends Component<LinkCardProps, {}> {
  render(): JSX.Element | null {
    const {appearance} = this.props;
    const {resources} = this;

    // If appearance is passed we prioritize that instead of the better looking one
    if (appearance === 'small') {
      return this.renderSmallLink();
    }

    if (appearance === 'image') {
      return this.renderLinkCardImage();
    }

    if (appearance === 'horizontal' || appearance === 'square') {
      return this.renderGenericLink();
    }

    if (resources) {
      if (resources.app) { return this.renderApplicationLink(); }
      if (resources.player) { return this.renderPlayerLink(); }
      if (resources.image) { return this.renderLinkCardImage(); }
    }

    return this.renderGenericLink();
  }

  private renderApplicationLink(): JSX.Element {
    const {app, icon} = this.resources;

    switch (app && app.type) {
      case 'trello_board':
        return this.renderTrelloBoard(app as TrelloBoardLinkApp, icon && icon.url);
      default:
        return this.renderGenericLink();
    }
  }

  private renderTrelloBoard(app: TrelloBoardLinkApp, iconUrl?: string): JSX.Element {
    return <LinkCardTrelloBoardView
      linkUrl={app.url}
      title={app.name}
      thumbnailUrl={app.background}
      iconUrl={iconUrl}
      lists={app.lists}
      members={app.member}
    />;
  }

  private renderPlayerLink(): JSX.Element {
    const { title, site, description } = this.urlPreview;
    const { player } = this.resources;

    const playerUrl = player && player.url ? player.url : '';

    return <LinkCardPlayer
      linkUrl={playerUrl}
      title={title}

      site={site}
      description={description}
      thumbnailUrl={this.thumbnailUrl}
      iconUrl={this.iconUrl}
      playerUrl={playerUrl}
    />;
  }

  private renderGenericLink(): JSX.Element {
    const { url, title, site, description } = this.urlPreview;
    const { dimensions, actions, appearance, onClick, onMouseEnter } = this.props;
    const errorMessage = this.isError ? 'Loading failed' : undefined;

    return <LinkCardGenericView
      error={errorMessage}
      linkUrl={url}
      title={title}
      site={site}
      description={description}
      thumbnailUrl={this.thumbnailUrl}
      iconUrl={this.iconUrl}
      dimensions={dimensions}
      appearance={appearance}
      loading={this.isLoading}
      actions={actions}

      onClick={onClick}
      onMouseEnter={onMouseEnter}
    />;
  }

  private renderSmallLink(): JSX.Element {
    const { url, title, site } = this.urlPreview;
    const { dimensions, actions, onClick, onMouseEnter } = this.props;
    const errorMessage = this.isError ? 'Loading failed' : undefined;

    return (
      <LinkCardViewSmall
        error={errorMessage}
        linkUrl={url}
        title={title}
        site={site}
        thumbnailUrl={this.iconUrl || this.thumbnailUrl}
        dimensions={dimensions}
        loading={this.isLoading}
        actions={actions}

        onClick={onClick}
        onMouseEnter={onMouseEnter}
      />
    );
  }

  private renderLinkCardImage(): JSX.Element {
    const { url, title, site } = this.urlPreview;
    const { status, dimensions, actions, appearance, onClick, onMouseEnter, resizeMode } = this.props;
    const errorMessage = this.isError ? 'Loading failed' : undefined;

    return (
      <LinkCardImageView
        error={errorMessage}
        linkUrl={url}
        title={title}
        site={site}
        thumbnailUrl={this.thumbnailUrl}
        appearance={appearance}
        dimensions={dimensions}
        status={status}
        actions={actions}
        iconUrl={this.iconUrl}
        resizeMode={resizeMode}

        onClick={onClick}
        onMouseEnter={onMouseEnter}
      />
    );
  }

  private get resources() {
    const { resources } = this.urlPreview;
    return resources || {};
  }

  private get urlPreview() {
    const defaultUrlPreview: UrlPreview = {type: '', url: '', title: ''};
    const urlPreview = this.props.details;

    // We provide a defaultUrlPreview in order to conform what the card is expecting and show the right loading status
    return urlPreview || defaultUrlPreview;
  }

  private get thumbnailUrl() {
    const { thumbnail, image } = this.resources;
    const imageUrl = image ? image.url : undefined;
    const thumbnailUrl = thumbnail ? thumbnail.url : undefined;

    // TODO: Should we default here to 'this.iconUrl'?
    return imageUrl || thumbnailUrl;
  }

  private get iconUrl() {
    const { icon } = this.resources;

    return icon ? icon.url : undefined;
  }

  private get isLoading(): boolean {
    const {status} = this.props;
    return status === 'loading' || status === 'processing';
  }

  private get isError(): boolean {
    const {status} = this.props;
    return status === 'error';
  }
}

export default LinkCard;
