import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import { MediaItemProvider, MediaCollectionProvider, MediaUrlPreviewProvider } from '../providers/';
import {RemoteMediaCollectionProviderFactory} from '../providers/remoteMediaCollectionProviderFactory';
import { JwtTokenProvider, MediaItemType, MediaItem, UrlPreview } from '../';
import { MediaDataUriService, DataUriService } from '../services/dataUriService';
import { MediaLinkService } from '../services/linkService';
import { LRUCache } from 'lru-fast';
import { DEFAULT_COLLECTION_PAGE_SIZE } from '../services/collectionService';

const DEFAULT_CACHE_SIZE = 200;

export interface Context {
  getMediaItemProvider(id: string, mediaItemType: MediaItemType, collectionName?: string, mediaItem?: MediaItem): MediaItemProvider;
  getMediaCollectionProvider(collectionName: string, pageSize: number): MediaCollectionProvider;
  getUrlPreviewProvider(url: string): MediaUrlPreviewProvider;
  getDataUriService(collectionName?: string): DataUriService;
  addLinkItem(url: string, collectionName: string, metadata?: UrlPreview): Promise<string>;
  refreshCollection(collectionName: string, pageSize: number): void;
  readonly config: ContextConfig;
}

export interface ContextConfig {
  readonly clientId: string;
  readonly serviceHost: string;
  readonly tokenProvider: JwtTokenProvider;
  readonly cacheSize?: number;
}

export class ContextFactory {
  public static create(config: ContextConfig): Context {
    return new ContextImpl(config);
  }
}

class ContextImpl implements Context {
  private readonly collectionPool = RemoteMediaCollectionProviderFactory.createPool();
  private readonly itemPool = MediaItemProvider.createPool();
  private readonly urlPreviewPool = MediaUrlPreviewProvider.createPool();
  private readonly lruCache: LRUCache<string, MediaItem>;

  constructor(readonly config: ContextConfig) {
    this.lruCache = new LRUCache<string, MediaItem>(config.cacheSize || DEFAULT_CACHE_SIZE);
  }

  getMediaItemProvider(id: string, mediaItemType: MediaItemType, collectionName?: string, mediaItem?: MediaItem): MediaItemProvider {
    const isMediaItemLink = mediaItem && mediaItem.type === 'link';
    const isMediaItemFileAndNotPending = mediaItem && mediaItem.type === 'file' && mediaItem.details.processingStatus !== 'pending';

    if (isMediaItemLink || isMediaItemFileAndNotPending) {
      return {
        observable() {
          return Observable.of(mediaItem);
        }
      };
    }

    const provider = MediaItemProvider.fromPool(this.itemPool, this.apiConfig, this.lruCache, mediaItemType, id, this.config.clientId, collectionName);

    if (mediaItem) {
      return {
        observable() {
          return provider.observable().startWith(mediaItem);
        }
      };
    }

    return provider;
  }

  getMediaCollectionProvider(collectionName: string, pageSize: number = DEFAULT_COLLECTION_PAGE_SIZE): MediaCollectionProvider {
    return RemoteMediaCollectionProviderFactory.fromPool(this.collectionPool, this.apiConfig, collectionName, this.config.clientId, pageSize);
  }

  getDataUriService(collectionName?: string): DataUriService {
    return new MediaDataUriService(this.config.clientId, this.config.serviceHost, this.config.tokenProvider, collectionName);
  }

  getUrlPreviewProvider(url: string): MediaUrlPreviewProvider {
    return MediaUrlPreviewProvider.fromPool(this.urlPreviewPool, this.apiConfig, url, this.config.clientId);
  }

  addLinkItem(url: string, collectionName: string, metadata?: UrlPreview): Promise<string> {
    const linkService = new MediaLinkService(this.apiConfig);
    return linkService.addLinkItem(url, this.config.clientId, collectionName, metadata);
  }

  refreshCollection(collectionName: string, pageSize: number): void {
    this.getMediaCollectionProvider(collectionName, pageSize).refresh();
  }

  private get apiConfig() {
    return {
      serviceHost: this.config.serviceHost,
      tokenProvider: this.config.tokenProvider
    };
  }
}
