import * as sinon from 'sinon';

import { numbers } from '../_numbers';
import { MediaCollectionFileItem } from '../../../src/collection';
import {
  CollectionService,
  SortDirection,
  DetailsType,
  RemoteCollectionItemsResponse
} from '../../../src/services/collectionService';

export class CollectionServiceStub {
  static from(
    collectionName: string,
    items: number,
    pageSize: number,
    sortDirection: SortDirection = 'desc',
    details: DetailsType = 'full'): CollectionService {
    return new CollectionServiceStub().create(
      collectionName,
      items,
      pageSize,
      sortDirection,
      details
    );
  }

  private create(
    collectionName: string,
    items: number,
    pageSize: number,
    sortDirection: SortDirection,
    details: DetailsType): CollectionService {

    const stub = sinon.stub();
    const pageCount = Math.ceil(items / pageSize);
    const pages = numbers(pageCount)
      .map(n => this.getCollectionItems(n, pageSize, n >= pageCount - 1));
    const nextInclusiveStartKey = index => index === 0 ? undefined : `page-${index + 1}`;

    numbers(pageCount)
      .reduce((previousValue, currentValue, currentIndex, array) => {
        return [];
      }, new Array<RemoteCollectionItemsResponse>());

    pages.forEach((page, index) => stub
      .withArgs(collectionName, pageSize, nextInclusiveStartKey(index), sortDirection, details)
      .returns(Promise.resolve(pages[index])));

    return {
      getCollectionItems: stub
    };
  }

  private getCollectionItems(
    page: number,
    limit: number,
    isLastPage = false): RemoteCollectionItemsResponse {
    return {
      items: numbers(limit).map(n => this.getFileItem(`file-${page * limit + n}`)),
      nextInclusiveStartKey: isLastPage ? undefined : `page-${page + 2}`
    };
  }

  private getFileItem(occurrenceKey: string): MediaCollectionFileItem {
    return {
      type: 'file',
      details: {
        occurrenceKey
      }
    };
  };
}
