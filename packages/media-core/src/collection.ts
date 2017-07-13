import {FileItem, FileDetails, LinkItem, LinkDetails} from './item';


export interface MediaCollectionFileItemDetails extends FileDetails {
  occurrenceKey: string;
}

export interface MediaCollectionFileItem extends FileItem {
  details: MediaCollectionFileItemDetails;
}

export interface MediaCollectionLinkItemDetails extends LinkDetails {
  occurrenceKey: string;
}

export interface MediaCollectionLinkItem extends LinkItem {
  details: MediaCollectionLinkItemDetails;
}

export type MediaCollectionItem = MediaCollectionFileItem | MediaCollectionLinkItem;

export interface MediaCollection {
  id: string;
  items: Array<MediaCollectionItem>;
}
