/* tslint:disable:variable-name */
import { AxiosError } from 'axios';
import { MediaCollection, MediaCollectionItem } from './collection';
import { MediaItem, FileDetails } from './item';

export type CardEventHandler = (item?: MediaItem, event?: Event) => void;
export type ListEventHandler = (item?: MediaItem, siblings?: Array<FileDetails>, event?: Event) => void;
export type CollectionEventHandler = (item: MediaCollectionItem, collection: MediaCollection, event: Event) => void;

export enum CardActionType {
  click, delete, download, retry, custom
}

export interface CardAction {
  label?: string;
  type?: CardActionType;
  handler: CardEventHandler;
}

export interface ListAction {
  label?: string;
  type?: CardActionType;
  handler: ListEventHandler;
}

export interface CollectionAction {
  label?: string;
  type?: CardActionType;
  handler: CollectionEventHandler;
}

export type CardActionCreator = (eventHandler: CardEventHandler) => CardAction;
export type ListActionCreator = (eventHandler: ListEventHandler) => ListAction;
export type CollectionActionCreator = (eventHandler: CollectionEventHandler) => CollectionAction;

export const CardClick: CardActionCreator = (eventHander: CardEventHandler) => {
  return {
    type: CardActionType.click,
    handler: eventHander
  };
};

export const CardDelete: CardActionCreator = (eventHander: CardEventHandler) => {
  return {
    label: 'Delete',
    type: CardActionType.delete,
    handler: eventHander
  };
};

export const ListCardClick: ListActionCreator = (eventHander: ListEventHandler) => {
  return {
    type: CardActionType.click,
    handler: eventHander
  };
};

export const ListCardDelete: ListActionCreator = (eventHander: ListEventHandler) => {
  return {
    label: 'Delete',
    type: CardActionType.delete,
    handler: eventHander
  };
};

export const CollectionCardClick: CollectionActionCreator = (eventHandler: CollectionEventHandler) => {
  return {
    type: CardActionType.click,
    handler: eventHandler
  };
};

export interface FetchingCollectionSucceeded {
  type: 'FETCHING_COLLECTION_SUCCEEDED';
  collection: MediaCollection;
  hasNextPage: boolean;
}

export interface FetchingCollectionFailed {
  type: 'FETCHING_COLLECTION_FAILED';
  error: AxiosError;
}

export function fetchingCollectionSucceeded(collection: MediaCollection, hasNextPage: boolean): FetchingCollectionSucceeded {
  return {
    type: 'FETCHING_COLLECTION_SUCCEEDED',
    collection: collection,
    hasNextPage: hasNextPage
  };
}

export function fetchingCollectionFailed(error: AxiosError): FetchingCollectionFailed {
  return {
    type: 'FETCHING_COLLECTION_FAILED',
    error
  };
}

export type Action =
  FetchingCollectionSucceeded
  | FetchingCollectionFailed;
