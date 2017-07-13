import { MediaItem, MediaItemType, MediaApiConfig } from '../';
import { Observable } from 'rxjs/Observable';
import { FileProvider, FILE_PROVIDER_RETRY_INTERVAL } from './fileProvider';
import { LinkProvider } from './linkProvider';
import { Pool } from './util/pool';
import { observableFromObservablePool } from './util/observableFromObservablePool';
import { LRUCache } from 'lru-fast';

export type MediaItemObservablePool = Pool<Observable<MediaItem>>;

export interface MediaItemProvider {
  observable(): Observable<MediaItem>;
}

export class MediaItemProvider {
  public static fromMediaApi(
    config: MediaApiConfig,
    cache: LRUCache<string, MediaItem>,
    mediaItemType: MediaItemType,
    id: string,
    clientId: string,
    collection?: string): MediaItemProvider {
    switch (mediaItemType) {
      case 'file':
        return FileProvider.fromMediaApi(config, cache, id, clientId, collection, FILE_PROVIDER_RETRY_INTERVAL);
      case 'link':
        return LinkProvider.fromMediaApi(config, id, clientId, collection);
      default:
        throw new Error('invalid media type ' + mediaItemType);
    }
  }

  public static fromPool(
    pool: MediaItemObservablePool,
    config: MediaApiConfig,
    cache: LRUCache<string, MediaItem>,
    mediaItemType: MediaItemType,
    id: string,
    clientId: string,
    collection?: string): MediaItemProvider {
    return {
      observable() {
        const poolId = [mediaItemType, id, collection].join('-');
        return observableFromObservablePool(pool, poolId, () => {
          return MediaItemProvider.fromMediaApi(config, cache, mediaItemType, id, clientId, collection).observable();
        });
      }
    };
  }

  public static createPool(): MediaItemObservablePool {
    return new Pool<Observable<MediaItem>>();
  }
}
