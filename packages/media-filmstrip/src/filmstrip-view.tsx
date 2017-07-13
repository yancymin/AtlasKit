import * as React from 'react';
import {MouseEvent} from 'react';
import {MediaType, MediaItem, FileDetails, ListAction, CardAction} from '@atlaskit/media-core';
import {CardView, CardEvent} from '@atlaskit/media-card';
import FilmStripNavigator from './filmstrip-navigator';

export interface FilmStripViewItem {
  id?: string;
  loading?: boolean;
  dataURI?: string;
  mediaName: string;
  mediaType: MediaType;
  mediaSize?: number;
  progress?: number;
}

export interface FilmStripCardClickEvent {
  event: MouseEvent<HTMLElement>;
  item: FilmStripViewItem;
  items?: Array<FilmStripViewItem>;
}

export interface FilmStripViewProps {
  items: Array<FilmStripViewItem>;

  onCardClick?: (result: FilmStripCardClickEvent) => void;
  menuActions?: Array<ListAction>;

  onDrop?: (event: DragEvent) => void;
  onDragEnter?: (event: DragEvent) => void;
  onDragOver?: (event: DragEvent) => void;
  width?: number;
}

function onItemClick(item: FilmStripViewItem, props: FilmStripViewProps): (event: CardEvent) => void {
  return (cardEvent: CardEvent) => {
    if (props.onCardClick) {
      props.onCardClick({
        event: cardEvent.event,
        item,
        items: props.items
      });
    }
  };
}

function createCardActions(item: FilmStripViewItem, items: Array<FilmStripViewItem>, actions?: Array<ListAction>): Array<CardAction> {
  const menuActions = (actions || []);
  return menuActions.map((action: ListAction) => {
    return {
      label: action.label,
      type: action.type,
      handler: (mediaItem: MediaItem, event: Event) => {
        action.handler({
          type: 'file',
          details: item
        }, items, event);
      }
    };
  });
}

export function FilmStripView(props: FilmStripViewProps): JSX.Element {
  const itemEls = props.items.map((item, k) => {
    const {mediaName, mediaSize, mediaType, loading, progress, dataURI} = item;

    const fileDetails: FileDetails = {
      name: mediaName,
      size: mediaSize,
      mediaType
    };

    const status = loading ? 'loading' : 'complete';

    return <CardView
      key={k}
      status={status}
      metadata={fileDetails}
      progress={progress}
      dataURI={dataURI}
      onClick={onItemClick(item, props)}
      actions={createCardActions(item, props.items, props.menuActions)}
    />;
  });

  return <FilmStripNavigator onDrop={props.onDrop} onDragEnter={props.onDragEnter} onDragOver={props.onDragOver} width={props.width}>
           {itemEls}
         </FilmStripNavigator>;
}
