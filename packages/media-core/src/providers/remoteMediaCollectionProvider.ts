import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/publishReplay';

import {MediaCollection, MediaCollectionItem} from '../collection';
import {CollectionService, SortDirection} from '../services/collectionService';
import {MediaCollectionProvider} from './mediaCollectionProvider';

export type MediaCollectionItemPredicate = (item: MediaCollectionItem) => boolean;

export class RemoteMediaCollectionProvider implements MediaCollectionProvider {

  private readonly subject = new Subject<MediaCollection>();
  private readonly connectableObservable = this.subject.publishReplay(1);

  private items: Array<MediaCollectionItem> = [];
  private nextInclusiveStartKey?: string = undefined;
  private isLoading = false;

  constructor(
    private readonly collectionService: CollectionService,
    private readonly collectionName: string,
    private readonly pageSize: number,
    private readonly sortDirection: SortDirection) {
    this.connectableObservable.connect();
    this.loadNextPage();
  }

  observable(): Observable<MediaCollection> {
    return this.connectableObservable;
  }

  loadNextPageUntil(predicate: MediaCollectionItemPredicate): void {
    if (!this.items.some(predicate)) {
      const subscription = this.connectableObservable
        .subscribe({
          next: collection => {
            // an `undefined` `nextInclusiveStartKey` is how we know we've reached the end of a collection
            // (since the `Observable`'s `complete` callback is NEVER called so we can notify the
            // consumer when the list has changed)
            if (!this.nextInclusiveStartKey || collection.items.some(predicate)) {
              subscription.unsubscribe();
            } else {
              this.loadNextPage();
            }
          },
          complete: () => subscription.unsubscribe(),
          error: error => subscription.unsubscribe()
        });
    }
  }

  loadNextPage(): void {
    if (this.isLoading) {
      return;
    } else {
      this.isLoading = true;
    }

    this.collectionService.getCollectionItems(
      this.collectionName,
      this.pageSize,
      this.nextInclusiveStartKey,
      this.sortDirection,
      'full')
      .then(response => {
        this.isLoading = false;
        this.items.push(...response.items);

        const mediaCollection = {
          id: this.collectionName,
          items: this.items
        };

        this.nextInclusiveStartKey = response.nextInclusiveStartKey;
        this.subject.next(mediaCollection);
      }, error => {
        this.isLoading = false;
        this.subject.error(error);
      });
  }

  refresh() {
    if (this.isLoading) {
      return;
    } else {
      this.isLoading = true;
    }

    const oldFirstItemDetails = this.items[0] && this.items[0].details;
    const oldFirstItemId = oldFirstItemDetails && oldFirstItemDetails.id;
    const oldFirstItemOccurrenceKey = oldFirstItemDetails && oldFirstItemDetails.occurrenceKey;
    const newItems: Array<MediaCollectionItem> = [];
    let nextInclusiveStartKey;

    const fetchNewItems = () => {
      this.collectionService.getCollectionItems(
        this.collectionName,
        this.pageSize,
        nextInclusiveStartKey,
        this.sortDirection,
        'full'
      )
        .then(res => {
          let reachedFirstOldItem = false;
          for (let newItem of res.items) {

            const {details: {id, occurrenceKey}} = newItem;
            const reachedFirstItemAlreadyInCollection =  id === oldFirstItemId && occurrenceKey === oldFirstItemOccurrenceKey;

            if (reachedFirstItemAlreadyInCollection) {
              reachedFirstOldItem = true;
              break;
            }

            newItems.push(newItem);

          }

          if (reachedFirstOldItem) {
            this.isLoading = false;

            this.items = [...newItems, ...this.items];

            this.subject.next({
              id: this.collectionName,
              items: this.items
            });

          } else if (res.nextInclusiveStartKey) {
            nextInclusiveStartKey = res.nextInclusiveStartKey;
            fetchNewItems();
          }

        }, error => {
          this.isLoading = false;
          this.subject.error(error);
        });
    };

    fetchNewItems();
  }

}
