import {MediaApiConfig} from '../config';
import {RemoteMediaCollectionProvider} from './remoteMediaCollectionProvider';
import {CollectionService, MediaCollectionService, SortDirection} from '../services/collectionService';
import {mediaCollectionProviderFromPool} from './util/mediaCollectionProviderFromPool';
import {Pool} from './util/pool';

export class RemoteMediaCollectionProviderFactory {

  public static fromCollectionService(
    collectionService: CollectionService,
    collectionName: string,
    pageSize: number,
    sortDirection: SortDirection = 'desc'): RemoteMediaCollectionProvider {
      return new RemoteMediaCollectionProvider(
        collectionService,
        collectionName,
        pageSize,
        sortDirection
      );
  }

  public static fromMediaAPI(
    config: MediaApiConfig,
    collectionName: string,
    clientId: string,
    pageSize: number,
    sortDirection: SortDirection = 'desc'): RemoteMediaCollectionProvider {
    return RemoteMediaCollectionProviderFactory.fromCollectionService(
      new MediaCollectionService(config, clientId),
      collectionName,
      pageSize,
      sortDirection
    );
  }

  public static fromPool(
    pool: Pool<RemoteMediaCollectionProvider>,
    config: MediaApiConfig,
    collectionName: string,
    clientId: string,
    pageSize: number,
    sortDirection: SortDirection = 'desc'): RemoteMediaCollectionProvider {

    const poolId = [collectionName, pageSize, sortDirection].join('-');
    const createFn = () => {
      const collectionService = new MediaCollectionService(config, clientId);
      return new RemoteMediaCollectionProvider(
        collectionService,
        collectionName,
        pageSize,
        sortDirection
      );
    };

    return mediaCollectionProviderFromPool<RemoteMediaCollectionProvider>(pool, poolId, createFn);
  }

  public static createPool(): Pool<RemoteMediaCollectionProvider> {
    return new Pool<RemoteMediaCollectionProvider>();
  }
}
