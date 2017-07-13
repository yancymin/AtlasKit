import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction, FileDetails, ImageResizeMode} from '@atlaskit/media-core';

import {SharedCardProps, CardStatus} from '../..';
import {FileCardImageView} from '../cardImageView';
import {FileCardViewSmall} from '../cardViewSmall';

export interface FileCardProps extends SharedCardProps {
  readonly status: CardStatus;
  readonly details?: FileDetails;
  readonly dataURI?: string;
  readonly progress?: number;
  readonly resizeMode?: ImageResizeMode;

  readonly onClick?: (result: MouseEvent<HTMLElement>) => void;
  readonly onMouseEnter?: (result: MouseEvent<HTMLElement>) => void;
}

export class FileCard extends Component<FileCardProps, {}> {
  static defaultProps: Partial<FileCardProps> = {
    actions: []
  };

  render() {
    return this.renderFile();
  }

  renderFile(): JSX.Element {
    const {status, dimensions, selectable, selected, details, dataURI, progress, onClick, onMouseEnter, resizeMode} = this.props;
    const defaultDetails = {name: undefined, mediaType: undefined, size: undefined};
    const {name, mediaType, size} = details || defaultDetails;
    const errorMessage = this.isError ? 'Error loading card' : undefined;

    const card = (this._isSmall()) ?
      (
        <FileCardViewSmall
          error={errorMessage}
          dimensions={dimensions}
          dataURI={dataURI}
          mediaName={name}
          mediaType={mediaType}
          mediaSize={size}
          loading={this.isLoading}

          actions={this._getActions()}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
        />
      ) : (
        <FileCardImageView
          error={errorMessage}
          dimensions={dimensions}
          selectable={selectable}
          selected={selected}
          dataURI={dataURI}
          mediaName={name}
          mediaType={mediaType}
          mediaSize={size}
          status={status}
          progress={progress}
          resizeMode={resizeMode}

          actions={this._getActions()}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
        />
      );

    return card;
  }

  private _getActions(): Array <CardAction> {
    const {details} = this.props;
    // redundant 'or' guarding to satisfy compiler
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11640
    const actions = this.props.actions || [];

    return actions
      .map((action: CardAction) => {
        return {
          label: action.label,
          type: action.type,
          handler: () => {
            // TODO remove || guarding and update action signature to be correct
            action.handler({type: 'file', details: details || {}});
          }
        };
      });
  }

  private _isSmall(): boolean {
    return this.props.appearance === 'small';
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
